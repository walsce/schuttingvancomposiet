import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const { session_id, cart_data, email, checkout_started, order_completed } = body;

    if (!session_id) {
      return new Response(JSON.stringify({ error: "session_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // If order completed, cancel pending abandonment emails and mark cart recovered
    if (order_completed && email) {
      await supabase
        .from("email_automations")
        .update({ status: "cancelled" })
        .eq("recipient_email", email)
        .eq("status", "queued")
        .in("type", [
          "cart_abandonment_1",
          "cart_abandonment_2",
          "checkout_abandonment_1",
          "checkout_abandonment_2",
        ]);

      await supabase
        .from("abandoned_carts")
        .update({ recovered: true })
        .eq("session_id", session_id);

      return new Response(JSON.stringify({ ok: true, action: "recovered" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Upsert abandoned cart
    const { data: existing } = await supabase
      .from("abandoned_carts")
      .select("id, email, checkout_started")
      .eq("session_id", session_id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("abandoned_carts")
        .update({
          cart_data: cart_data || [],
          email: email || existing.email,
          checkout_started: checkout_started || existing.checkout_started,
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("abandoned_carts").insert({
        session_id,
        cart_data: cart_data || [],
        email: email || null,
        checkout_started: checkout_started || false,
      });
    }

    // Schedule abandonment emails if we have an email and cart items
    const effectiveEmail = email || existing?.email;
    const hasItems = Array.isArray(cart_data) && cart_data.length > 0;

    if (effectiveEmail && hasItems) {
      const cartMeta = { cart_items: cart_data, session_id };

      if (checkout_started) {
        // Cancel any existing cart abandonment emails, schedule checkout abandonment
        await supabase
          .from("email_automations")
          .update({ status: "cancelled" })
          .eq("recipient_email", effectiveEmail)
          .eq("status", "queued")
          .in("type", ["cart_abandonment_1", "cart_abandonment_2"]);

        // Check if checkout abandonment already scheduled
        const { data: existingCheckout } = await supabase
          .from("email_automations")
          .select("id")
          .eq("recipient_email", effectiveEmail)
          .eq("status", "queued")
          .eq("type", "checkout_abandonment_1")
          .maybeSingle();

        if (!existingCheckout) {
          const now = new Date();
          await supabase.from("email_automations").insert([
            {
              type: "checkout_abandonment_1",
              recipient_email: effectiveEmail,
              status: "queued",
              scheduled_for: new Date(now.getTime() + 30 * 60 * 1000).toISOString(),
              metadata: cartMeta,
            },
            {
              type: "checkout_abandonment_2",
              recipient_email: effectiveEmail,
              status: "queued",
              scheduled_for: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
              metadata: cartMeta,
            },
          ]);
        }
      } else {
        // Schedule cart abandonment if not already scheduled
        const { data: existingCart } = await supabase
          .from("email_automations")
          .select("id")
          .eq("recipient_email", effectiveEmail)
          .eq("status", "queued")
          .eq("type", "cart_abandonment_1")
          .maybeSingle();

        if (!existingCart) {
          const now = new Date();
          await supabase.from("email_automations").insert([
            {
              type: "cart_abandonment_1",
              recipient_email: effectiveEmail,
              status: "queued",
              scheduled_for: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
              metadata: cartMeta,
            },
            {
              type: "cart_abandonment_2",
              recipient_email: effectiveEmail,
              status: "queued",
              scheduled_for: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
              metadata: cartMeta,
            },
          ]);
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("track-cart error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
