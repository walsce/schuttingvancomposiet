import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// HTML email templates
function orderConfirmationHtml(meta: Record<string, unknown>): string {
  const items = (meta.items as any[]) || [];
  const rows = items
    .map(
      (i: any) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee">${i.product_name}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">€${Number(i.total_price).toFixed(2)}</td></tr>`
    )
    .join("");
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
    <h1 style="color:#1a1a1a;font-size:24px">Bedankt voor je bestelling!</h1>
    <p>Bestelnummer: <strong>#${meta.order_number}</strong></p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <thead><tr style="background:#f5f5f5"><th style="padding:8px;text-align:left">Product</th><th style="padding:8px;text-align:center">Aantal</th><th style="padding:8px;text-align:right">Prijs</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="font-size:18px;font-weight:bold">Totaal: €${Number(meta.total).toFixed(2)}</p>
    <p style="color:#666;font-size:14px">We houden je op de hoogte van de verzending.</p>
  </div>`;
}

function cartAbandonmentHtml(meta: Record<string, unknown>, isSecond: boolean): string {
  const items = (meta.cart_items as any[]) || [];
  const itemList = items.map((i: any) => `<li>${i.name || i.product_name} (${i.quantity}×)</li>`).join("");
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
    <h1 style="color:#1a1a1a;font-size:24px">${isSecond ? "Je winkelwagen mist je! 🛒" : "Vergeet je winkelwagen niet!"}</h1>
    <p>Je hebt nog producten in je winkelwagen:</p>
    <ul>${itemList}</ul>
    <a href="https://schuttingvancomposiet.lovable.app/winkelwagen" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px">Terug naar winkelwagen →</a>
    ${isSecond ? '<p style="color:#666;font-size:13px;margin-top:16px">Dit is onze laatste herinnering. Vragen? Neem gerust contact op.</p>' : ""}
  </div>`;
}

function checkoutAbandonmentHtml(meta: Record<string, unknown>, isSecond: boolean): string {
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
    <h1 style="color:#1a1a1a;font-size:24px">${isSecond ? "Laatste kans: rond je bestelling af" : "Je bestelling is bijna compleet!"}</h1>
    <p>Je was bezig met afrekenen maar hebt je bestelling nog niet afgerond.</p>
    <a href="https://schuttingvancomposiet.lovable.app/afrekenen" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px">Afrekenen →</a>
    ${isSecond ? '<p style="color:#666;font-size:13px;margin-top:16px">Na vandaag bewaren we je gegevens niet meer.</p>' : ""}
  </div>`;
}

function renderEmail(type: string, meta: Record<string, unknown>): { subject: string; html: string } {
  switch (type) {
    case "order_confirmation":
      return { subject: `Orderbevestiging #${meta.order_number}`, html: orderConfirmationHtml(meta) };
    case "cart_abandonment_1":
      return { subject: "Vergeet je winkelwagen niet!", html: cartAbandonmentHtml(meta, false) };
    case "cart_abandonment_2":
      return { subject: "Je winkelwagen mist je! 🛒", html: cartAbandonmentHtml(meta, true) };
    case "checkout_abandonment_1":
      return { subject: "Je bestelling is bijna compleet!", html: checkoutAbandonmentHtml(meta, false) };
    case "checkout_abandonment_2":
      return { subject: "Laatste kans: rond je bestelling af", html: checkoutAbandonmentHtml(meta, true) };
    default:
      return { subject: "Notificatie", html: "<p>Onbekend e-mail type</p>" };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch queued emails that are due
    const { data: emails, error } = await supabase
      .from("email_automations")
      .select("*")
      .eq("status", "queued")
      .lte("scheduled_for", new Date().toISOString())
      .order("scheduled_for", { ascending: true })
      .limit(50);

    if (error) throw error;
    if (!emails?.length) {
      return new Response(JSON.stringify({ processed: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sent = 0;
    for (const email of emails) {
      const meta = (email.metadata as Record<string, unknown>) || {};
      const { subject, html } = renderEmail(email.type, meta);

      // PLACEHOLDER: Log instead of sending. Replace this block with Resend API call later.
      console.log(`[PLACEHOLDER] Sending email to ${email.recipient_email}: ${subject}`);

      await supabase
        .from("email_automations")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
          subject,
          html_body: html,
        })
        .eq("id", email.id);

      sent++;
    }

    return new Response(JSON.stringify({ processed: sent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-email error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
