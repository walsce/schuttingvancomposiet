import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Product prompts mapped by product ID
const productPrompts: Record<string, { prompt: string; fileName: string }> = {
  // ─── GEVELBEKLEDING ──────────────────────────────────────────
  "gv-1": {
    prompt: "Professional studio product photograph of a single composite rhombus cladding plank in warm teak brown color with realistic wood grain texture, angled view showing the rhombus diagonal profile, clean white background, professional commercial photography, high resolution, studio lighting",
    fileName: "gevelbekleding/rhombus-teak",
  },
  "gv-1-gallery-1": {
    prompt: "Modern Dutch house exterior with warm teak brown composite rhombus cladding on facade wall, residential architecture, sunny day, professional architectural photography",
    fileName: "gevelbekleding/rhombus-teak-insitu",
  },
  "gv-2": {
    prompt: "Professional studio product photograph of a composite rhombus cladding plank showing two sides - warm teak brown on one side and sleek black on the other, both sides visible, clean white background, commercial product photography, studio lighting",
    fileName: "gevelbekleding/rhombus-teak-zwart",
  },
  "gv-2-gallery-1": {
    prompt: "Modern Dutch house facade with teak and black composite rhombus cladding, showing depth effect, residential architecture, professional architectural photography",
    fileName: "gevelbekleding/rhombus-teak-zwart-insitu",
  },
  "gv-3": {
    prompt: "Professional studio product photograph of a single composite rhombus cladding plank in matte black color with subtle wood grain texture, angled view showing rhombus profile, clean white background, commercial photography, studio lighting",
    fileName: "gevelbekleding/rhombus-zwart",
  },
  "gv-3-gallery-1": {
    prompt: "Modern minimalist house exterior with black composite rhombus cladding on facade, contemporary Dutch architecture, professional architectural photography",
    fileName: "gevelbekleding/rhombus-zwart-insitu",
  },
  "gv-4": {
    prompt: "Professional studio product photograph of a composite rhombus cladding plank in rich dark walnut brown color with natural wood grain texture, angled view showing rhombus profile, clean white background, commercial photography",
    fileName: "gevelbekleding/rhombus-walnoot",
  },
  "gv-4-gallery-1": {
    prompt: "Elegant Dutch house exterior with dark walnut brown composite rhombus cladding on facade, warm luxurious appearance, professional architectural photography",
    fileName: "gevelbekleding/rhombus-walnoot-insitu",
  },
  "gv-5": {
    prompt: "Professional studio product photograph of a composite rhombus cladding plank in light warm oak color with natural wood grain texture, angled view showing rhombus profile, clean white background, commercial photography",
    fileName: "gevelbekleding/rhombus-eiken",
  },
  "gv-6": {
    prompt: "Professional studio product photograph of a composite rhombus cladding plank showing two sides - cool grey on one side and black on the other, clean white background, industrial modern look, commercial photography",
    fileName: "gevelbekleding/rhombus-grijs-zwart",
  },
  "gv-7": {
    prompt: "Professional studio product photograph of an L-shaped composite corner profile trim piece in warm teak brown color, showing the 90-degree angle shape, clean white background, commercial photography",
    fileName: "gevelbekleding/hoekprofiel-teak",
  },
  "gv-8": {
    prompt: "Professional studio product photograph of an L-shaped composite corner profile trim piece in matte black color, showing the 90-degree angle shape, clean white background, commercial photography",
    fileName: "gevelbekleding/hoekprofiel-zwart",
  },

  // ─── SCHUTTINGEN ──────────────────────────────────────────
  "sc-1": {
    prompt: "Professional product photograph of a composite fence panel section with horizontal rhombus profile planks in warm teak brown color, showing multiple planks assembled between aluminium posts, clean white background, studio lighting, commercial photography",
    fileName: "schuttingen/rhombus-teak",
  },
  "sc-1-gallery-1": {
    prompt: "Beautiful modern Dutch garden with composite fence in warm teak brown rhombus profile, green lawn, residential backyard, sunny day, contemporary architecture, professional landscape photography",
    fileName: "schuttingen/rhombus-teak-insitu",
  },
  "sc-2": {
    prompt: "Professional product photograph of a composite fence panel section with horizontal wood-grain profile planks in warm teak color, showing realistic wood texture, assembled between posts, clean white background, studio lighting",
    fileName: "schuttingen/houtnerf-teak",
  },
  "sc-2-gallery-1": {
    prompt: "Beautiful Dutch garden with teak colored composite fence with wood grain texture, green lawn, flower beds, residential setting, professional landscape photography",
    fileName: "schuttingen/houtnerf-teak-insitu",
  },
  "sc-3": {
    prompt: "Professional product photograph of a composite fence panel section with horizontal rhombus profile planks in sleek black color, showing shadow effect between planks, assembled between aluminium posts, clean white background",
    fileName: "schuttingen/rhombus-zwart",
  },
  "sc-3-gallery-1": {
    prompt: "Modern Dutch garden with black composite rhombus fence, contemporary outdoor setting, green lawn, minimalist garden design, professional landscape photography",
    fileName: "schuttingen/rhombus-zwart-insitu",
  },
  "sc-4": {
    prompt: "Professional product photograph of a composite fence panel section with horizontal wood-grain profile planks in black color with subtle wood texture, assembled between posts, clean white background, studio lighting",
    fileName: "schuttingen/houtnerf-zwart",
  },
  "sc-4-gallery-1": {
    prompt: "Modern garden with black wood-grain composite fence, contemporary residential setting, trimmed lawn, professional landscape photography",
    fileName: "schuttingen/houtnerf-zwart-insitu",
  },
  "sc-5": {
    prompt: "Professional product photograph of a composite fence panel section with horizontal rhombus profile planks in rich dark walnut brown color, showing shadow play, clean white background, commercial photography",
    fileName: "schuttingen/rhombus-walnoot",
  },
  "sc-5-gallery-1": {
    prompt: "Beautiful garden with walnut brown composite rhombus fence, lush green lawn, plants, Dutch residential backyard, warm atmosphere, professional landscape photography",
    fileName: "schuttingen/rhombus-walnoot-insitu",
  },
  "sc-6": {
    prompt: "Professional product photograph of a composite fence panel with horizontal wood-grain profile planks in rich walnut brown color with realistic wood texture, clean white background, studio lighting",
    fileName: "schuttingen/houtnerf-walnoot",
  },
  "sc-7": {
    prompt: "Professional product photograph of a composite fence panel section with horizontal rhombus profile planks in light warm oak color, showing shadow effect, clean white background, studio lighting",
    fileName: "schuttingen/rhombus-eiken",
  },
  "sc-8": {
    prompt: "Professional product photograph of a composite fence panel section with horizontal rhombus profile planks in neutral grey color, modern minimal look, clean white background, commercial photography",
    fileName: "schuttingen/rhombus-grijs",
  },
  "sc-8-gallery-1": {
    prompt: "Modern garden with grey composite rhombus fence, contemporary Dutch residential garden, clean minimalist landscape design, professional photography",
    fileName: "schuttingen/rhombus-grijs-insitu",
  },

  // ─── VLONDERPLANKEN ──────────────────────────────────────────
  "vl-1": {
    prompt: "Professional studio product photograph of a composite decking board in dark grey color, showing wood grain surface texture on top, angled perspective view showing the board profile, clean white background, commercial photography",
    fileName: "vlonderplanken/vlonder-donker-grijs",
  },
  "vl-1-gallery-1": {
    prompt: "Modern terrace with dark grey composite decking boards, outdoor furniture, Dutch residential garden, sunny day, professional architecture photography",
    fileName: "vlonderplanken/vlonder-donker-grijs-insitu",
  },
  "vl-2": {
    prompt: "Professional studio product photograph of a composite decking board in warm teak brown color, showing wood grain surface texture, angled perspective view, clean white background, commercial photography",
    fileName: "vlonderplanken/vlonder-teak",
  },
  "vl-3": {
    prompt: "Professional studio product photograph of a composite decking board in weathered grey-oak color, showing subtle wood grain texture, angled perspective view, clean white background, commercial photography",
    fileName: "vlonderplanken/vlonder-vergrijsd-eiken",
  },
  "vl-4": {
    prompt: "Professional studio product photograph of a composite decking board in dark walnut brown color, showing wood grain surface texture, angled perspective view, clean white background, commercial photography",
    fileName: "vlonderplanken/vlonder-walnoot",
  },
  "vl-5": {
    prompt: "Professional studio product photograph of a solid composite decking board in dark grey color with seamless smooth surface and anti-slip coating texture visible, showing the solid cross-section, clean white background, commercial photography",
    fileName: "vlonderplanken/vlonder-massief-grijs",
  },
  "vl-5-gallery-1": {
    prompt: "Luxury modern terrace with dark grey solid composite decking, outdoor lounge furniture, swimming pool area, Dutch residential garden, professional landscape photography",
    fileName: "vlonderplanken/vlonder-massief-grijs-insitu",
  },
  "vl-6": {
    prompt: "Professional studio product photograph of a solid composite decking board in warm teak color with seamless smooth surface and anti-slip coating, showing solid cross-section, clean white background, commercial photography",
    fileName: "vlonderplanken/vlonder-massief-teak",
  },
  "vl-7": {
    prompt: "Professional studio product photograph of a solid composite decking board in matte black color with seamless smooth surface and anti-slip coating, showing solid cross-section, clean white background, commercial photography",
    fileName: "vlonderplanken/vlonder-massief-zwart",
  },

  // ─── CATEGORY IMAGES ──────────────────────────────────────────
  "cat-gevelbekleding": {
    prompt: "Beautiful modern Dutch house with composite rhombus cladding on the facade in warm teak and black colors, contemporary residential architecture, professional architectural photography, 16:9 aspect ratio wide shot",
    fileName: "categories/gevelbekleding-hero",
  },
  "cat-schuttingen": {
    prompt: "Beautiful Dutch garden with a long composite fence in multiple colors showing teak, walnut and black panels, green lawn, residential backyard setting, professional landscape photography, 16:9 aspect ratio wide shot",
    fileName: "categories/schuttingen-hero",
  },
  "cat-vlonderplanken": {
    prompt: "Beautiful modern terrace with composite decking boards in teak color, outdoor dining area, Dutch residential garden, professional landscape photography, 16:9 aspect ratio wide shot",
    fileName: "categories/vlonderplanken-hero",
  },

  // ─── HERO IMAGE ──────────────────────────────────────────
  "hero": {
    prompt: "Stunning wide angle photograph of a modern Dutch garden showing all three composite products: a composite fence in warm teak rhombus profile as boundary, composite decking boards on the terrace, and composite cladding on the garden wall. Lush green garden, contemporary architecture, golden hour lighting, professional architectural photography, 16:9 ultra wide shot",
    fileName: "hero/homepage-hero",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productIds, all } = await req.json();

    const idsToGenerate: string[] = all
      ? Object.keys(productPrompts)
      : (productIds || []);

    if (idsToGenerate.length === 0) {
      return new Response(
        JSON.stringify({ error: "Provide productIds array or set all: true" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const results: Record<string, { url?: string; error?: string }> = {};
    
    // Process sequentially to avoid rate limits
    for (const id of idsToGenerate) {
      const promptData = productPrompts[id];
      if (!promptData) {
        results[id] = { error: "Unknown product ID" };
        continue;
      }

      try {
        console.log(`Generating image for ${id}...`);
        
        const response = await fetch(
          `${supabaseUrl}/functions/v1/generate-product-image`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${supabaseAnonKey}`,
            },
            body: JSON.stringify({
              prompt: promptData.prompt,
              fileName: promptData.fileName,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed for ${id}:`, errorText);
          results[id] = { error: `HTTP ${response.status}: ${errorText}` };
        } else {
          const data = await response.json();
          results[id] = { url: data.url };
          console.log(`Success: ${id} -> ${data.url}`);
        }

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (err) {
        console.error(`Error generating ${id}:`, err);
        results[id] = { error: err instanceof Error ? err.message : String(err) };
      }
    }

    return new Response(
      JSON.stringify({ results, total: idsToGenerate.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Batch error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
