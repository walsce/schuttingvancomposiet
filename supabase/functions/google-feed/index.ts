import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function escapeXml(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildProductEntry(
  product: Record<string, unknown>,
  images: Record<string, unknown>[],
  storeUrl: string,
  brand: string,
  currency: string,
  shippingCountry: string,
  shippingPrice: number
): string {
  const id = product.id as string;
  const title = escapeXml(product.name as string);
  const description = escapeXml(
    (product.short_description as string) ||
      (product.long_description as string) ||
      ""
  );
  const slug = product.slug as string;
  const link = `${storeUrl}/product/${slug}`;
  const price = product.price as number;
  const priceLabel = product.price_label as string | null;

  const primaryImage = images.find((i) => i.is_primary) || images[0];
  const imageLink = primaryImage
    ? escapeXml(primaryImage.image_url as string)
    : "";
  const additionalImages = images
    .filter((i) => i !== primaryImage)
    .slice(0, 10);

  const categoryMap: Record<string, string> = {
    schuttingen: "Hardware > Fencing & Barriers > Fence Panels",
    gevelbekleding: "Hardware > Building Materials > Wall & Ceiling Cladding",
    vlonderplanken: "Hardware > Building Materials > Decking",
  };
  const googleCategory =
    categoryMap[product.category as string] || "Hardware > Building Materials";

  const specs = (product.specifications || {}) as Record<string, string>;
  const dimensions = (product.dimensions || {}) as Record<string, unknown>;

  let entry = `  <item>
    <g:id>${escapeXml(id)}</g:id>
    <g:title>${title}</g:title>
    <g:description>${description}</g:description>
    <g:link>${escapeXml(link)}</g:link>
    <g:image_link>${imageLink}</g:image_link>
`;

  for (const img of additionalImages) {
    entry += `    <g:additional_image_link>${escapeXml(img.image_url as string)}</g:additional_image_link>\n`;
  }

  const formattedPrice = priceLabel
    ? escapeXml(priceLabel)
    : `${price.toFixed(2)} ${currency}`;

  entry += `    <g:price>${formattedPrice}</g:price>
    <g:availability>in_stock</g:availability>
    <g:condition>new</g:condition>
    <g:brand>${escapeXml(brand)}</g:brand>
    <g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>
    <g:product_type>${escapeXml(product.category as string)}</g:product_type>
`;

  // Material / color from specs
  if (specs.Materiaal) {
    entry += `    <g:material>${escapeXml(specs.Materiaal)}</g:material>\n`;
  }
  if (specs.Kleur || product.tone) {
    entry += `    <g:color>${escapeXml(specs.Kleur || (product.tone as string) || "")}</g:color>\n`;
  }

  // Dimensions
  if (dimensions.length && dimensions.width) {
    entry += `    <g:product_length>${dimensions.length} cm</g:product_length>\n`;
    entry += `    <g:product_width>${dimensions.width} cm</g:product_width>\n`;
  }
  if (dimensions.height) {
    entry += `    <g:product_height>${dimensions.height} cm</g:product_height>\n`;
  }

  // Shipping
  entry += `    <g:shipping>
      <g:country>${escapeXml(shippingCountry)}</g:country>
      <g:price>${shippingPrice.toFixed(2)} ${currency}</g:price>
    </g:shipping>
`;

  // Highlights
  const highlights = (product.highlights || []) as string[];
  for (const h of highlights.slice(0, 6)) {
    entry += `    <g:product_highlight>${escapeXml(h)}</g:product_highlight>\n`;
  }

  entry += `  </item>`;
  return entry;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch feed settings
    const { data: settings } = await supabase
      .from("google_feed_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    const storeUrl = settings?.store_url || "https://schuttingvancomposiet.lovable.app";
    const storeName = settings?.store_name || "Schuttingvancomposiet.nl";
    const brand = settings?.brand_name || "Schuttingvancomposiet";
    const currency = settings?.currency || "EUR";
    const shippingCountry = settings?.shipping_country || "NL";
    const shippingPrice = settings?.shipping_price ?? 0;

    // Fetch published products
    const { data: products, error: prodErr } = await supabase
      .from("cms_products")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (prodErr) throw prodErr;
    if (!products || products.length === 0) {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel><title>${escapeXml(storeName)}</title><link>${escapeXml(storeUrl)}</link></channel></rss>`,
        { headers: { ...corsHeaders, "Content-Type": "application/xml; charset=utf-8" } }
      );
    }

    // Fetch all images for published products in one query
    const productIds = products.map((p) => p.id);
    const { data: allImages } = await supabase
      .from("cms_product_images")
      .select("*")
      .in("product_id", productIds)
      .order("sort_order", { ascending: true });

    const imagesByProduct = new Map<string, Record<string, unknown>[]>();
    for (const img of allImages || []) {
      const list = imagesByProduct.get(img.product_id) || [];
      list.push(img);
      imagesByProduct.set(img.product_id, list);
    }

    // Build XML
    const items = products
      .map((p) =>
        buildProductEntry(
          p,
          imagesByProduct.get(p.id) || [],
          storeUrl,
          brand,
          currency,
          shippingCountry,
          shippingPrice
        )
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>${escapeXml(storeName)}</title>
  <link>${escapeXml(storeUrl)}</link>
  <description>Google Shopping Feed for ${escapeXml(storeName)}</description>
${items}
</channel>
</rss>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
