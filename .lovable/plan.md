
# Replace All MT Hekwerken Images with AI-Generated Product Images

## Problem
The product catalog contains ~80+ images hotlinked from `mthekwerken.nl`. These need to be replaced with original AI-generated images that depict the same type of products (composite fencing, cladding, decking) but are unique to this store.

## Scope
- **311 image references** across `src/data/products.ts` and `src/pages/Index.tsx`
- **~30 products** across 3 categories: gevelbekleding (cladding), schuttingen (fencing), vlonderplanken (decking)
- Each product has 1 primary image + 1-8 gallery images
- The `designerData.ts` file already uses legitimate supplier CDN URLs and does NOT need changes

## Solution Architecture

### Phase 1: Infrastructure Setup
1. **Create a Supabase Storage bucket** called `product-images` (public access) to host all generated images
2. **Create an edge function** `generate-product-image` that:
   - Accepts a text prompt describing the product
   - Calls the Lovable AI image generation API (`google/gemini-2.5-flash-image`)
   - Uploads the resulting image to the `product-images` storage bucket
   - Returns the public URL

### Phase 2: Batch Image Generation
3. **Create an admin edge function** `batch-generate-images` that:
   - Contains a mapping of every product ID to descriptive prompts (e.g., "Professional product photo of a composite rhombus cladding plank in teak color, wood-grain texture, on white background, 290cm long, studio lighting")
   - Calls the generation function for each product
   - Returns a mapping of product ID to new image URLs
   - Generates 1 primary image per product initially (gallery images can follow)

### Phase 3: Update Product Data
4. **Update `src/data/products.ts`**: Replace all `mthekwerken.nl` URLs with the new Supabase storage URLs
5. **Update `src/pages/Index.tsx`**: Replace the hero/showcase image URL

## Image Generation Prompts Strategy
Each prompt will be carefully crafted per product type:

- **Gevelbekleding (Cladding)**: "Studio product photograph of a single composite rhombus cladding plank, [COLOR] color with natural wood grain texture, angled view showing the rhombus profile, clean white background, professional commercial photography"
- **Schuttingen (Fencing)**: "Professional product photograph of a composite fence panel section, [COLOR] color, [PROFILE] profile, showing multiple horizontal planks assembled, clean white background, studio lighting"
- **Vlonderplanken (Decking)**: "Studio product photograph of composite decking boards in [COLOR] color, showing wood grain surface texture, angled perspective view, clean white background, professional commercial photography"
- **In-situ/gallery images**: "Modern Dutch garden with composite [PRODUCT TYPE] in [COLOR], residential backyard setting, green lawn, contemporary architecture, professional architectural photography"

## Technical Details

### Edge Function: `generate-product-image`
```text
Input: { prompt: string, fileName: string }
Process:
  1. Call Lovable AI gateway with google/gemini-2.5-flash-image
  2. Receive base64 image
  3. Convert to binary and upload to storage bucket
  4. Return public URL
```

### Storage Bucket
- Name: `product-images`
- Public access (no auth required for reading)
- Organized by category: `gevelbekleding/`, `schuttingen/`, `vlonderplanken/`

### Execution Order
1. Create storage bucket (migration)
2. Deploy `generate-product-image` edge function
3. Generate images product by product (calling the edge function)
4. Collect all new URLs
5. Update `products.ts` with new URLs
6. Update `Index.tsx` hero image

## Files Changed
1. `supabase/functions/generate-product-image/index.ts` -- New edge function for AI image generation + storage upload
2. `src/data/products.ts` -- Replace all ~80 mthekwerken.nl image URLs
3. `src/pages/Index.tsx` -- Replace 1 hero image URL
4. Database migration for storage bucket creation

## Risk Mitigation
- AI-generated product images will be generic composite material photos, not copies of any existing brand imagery
- Each prompt describes the material type, color, and profile in generic terms
- Images are stored on your own infrastructure (Supabase storage)
- The `designerData.ts` images from `cdn.forestia-group.com` are from your actual supplier (Felix Distribution / Forestia) and are legitimate to use -- these stay unchanged
