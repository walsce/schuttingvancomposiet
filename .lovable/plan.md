
# Premium redesign of branded customer PDFs

## Problem

The current PDFs (`supabase/functions/generate-branded-pdf/index.ts`) use a hand-rolled PDF writer with only the core Helvetica font, flat color rectangles, no images, no curves, no real typography hierarchy. The result feels like a 2003 instruction sheet — not a €25-jaar-garantie premium brand. Cover is a flat green block, section headers are tiny, tables are cramped, no product imagery, no icons, no real visual rhythm.

## Goal

Rebuild the PDF engine to produce magazine-quality, on-brand documents that feel like the catalog of a premium composite manufacturer — comparable to a Trex / Fiberon / Eva-Last printed brochure.

## Approach

Replace the hand-rolled writer with **pdf-lib** (`npm:pdf-lib@1.17.1`), which runs in Deno edge functions and supports embedded TTF fonts, PNG/JPEG images, vector graphics, opacity, and gradients. Keep the same `documents` array and HTTP contract — only the renderer changes.

### 1. Typography
- Embed two real TTFs (fetched from Google Fonts CDN at build, cached in module scope):
  - **Display / headings**: Playfair Display (serif, matches site's `font-serif`)
  - **Body / UI**: Inter (sans)
- Three weights each (Regular, SemiBold/Medium, Bold).
- Proper hierarchy: H1 36pt, H2 18pt, H3 13pt, body 10pt, caption 8pt, all with measured line-height and tracking.

### 2. Cover page — magazine spread
- Full-bleed hero photo (fetched from existing product images in `product-images` bucket, picked per-document via a new `coverImage` field on `BrandedDoc`).
- Dark gradient overlay (bottom-left → transparent top-right) for legibility.
- Top-left: small brand wordmark + thin rule + "Editie 2026".
- Bottom-left stack: eyebrow label (e.g. "MONTAGEHANDLEIDING") in orange small-caps, then huge serif title, then subtitle, then a thin orange rule.
- Bottom-right: circular "25 jaar garantie" seal (vector — concentric circles + curved text path approximation with rotated glyphs).
- Bottom strip: brand URL + edition + page count in small tracked caps on a translucent bar.

### 3. Inside pages — editorial chrome
- Slim header: brand wordmark left, document short-title centered, page number right, hairline rule beneath. No more chunky green bar.
- Generous margins (60pt outer, 75pt top, 70pt bottom).
- Two-tone footer: thin orange rule + muted footer line with website, email, and "25 jaar fabrieksgarantie" badge on the right.

### 4. Section design
- Each section opens with a large numbered marker ("01", "02"…) in a light outline serif, the heading in serif beside it, and a thin orange rule beneath spanning the column.
- Lead paragraph in slightly larger body size (11pt), subsequent paragraphs 10pt with proper leading.
- Bullets: small filled orange square + 6pt gutter + body text; supports multi-line wrap with hanging indent.
- Pull-quote / callout block: light warm-grey panel with a 3pt orange left bar, used for tips, warnings, and key metrics.

### 5. Tables — premium spec sheet style
- Header row: solid dark-green band, white SemiBold tracked text, 10pt.
- Zebra rows: alternating warm off-white and pure white, 1pt hairline dividers in pale grey.
- Cell text wraps properly across lines (current version truncates with "..").
- Right-aligned numeric columns auto-detected.
- 8pt vertical padding so rows breathe.

### 6. Image blocks
- New optional `images?: string[]` on Section (paths inside `product-images` bucket).
- Renderer fetches them once, embeds as JPEG via pdf-lib, and lays them out as a 2- or 3-up grid with rounded-corner masks (drawn via clipping path) and a small italic caption beneath each.
- A "product gallery" page is auto-inserted before the closing CTA for `productcatalogus`, `kleurengids`, and `prijslijst` showing the 7 tones and 3 profile types from existing site assets in `/public/images/gamrat/`.

### 7. Closing CTA page
- Full-bleed warm-cream background.
- Centered serif "Klaar om te starten?" + subtitle.
- Three icon-led contact tiles (phone / email / web) drawn as vector circles with monogram glyphs.
- Orange button-shaped rectangle with "Vraag gratis advies aan" + URL.
- Bottom: 25-jaar garantie seal reprised, slightly smaller.

### 8. Per-document cover images & gallery wiring
Extend each entry in `documents` with:
- `coverImage`: storage path or local public path (best-matching hero per topic — schutting, vlonder, tuindeur, gevelbekleding, rhombus, accessoires, kleuren).
- `eyebrow`: short label ("MONTAGEHANDLEIDING", "ONDERHOUDSGIDS", "CHECKLIST", "PRODUCTCATALOGUS", "PRIJSLIJST 2026", "KLEURENGIDS").
- Optional `gallery`: array of `{src, caption}` for the catalog/colour/price docs.

Image sources reused from already-shipped assets so no new uploads required:
`/public/images/gamrat/wpc-*.jpg`, `/public/images/wpc/*.webp`, plus existing product photos.

### 9. Regeneration & verification
1. Implement renderer.
2. Invoke edge function `{ all: true }` to rebuild all 16 PDFs.
3. Download a sample of 3 (cover-heavy: `productcatalogus`, `kleurengids`, `handleiding-composiet-schutting`) to `/mnt/documents/branded-pdfs-v2/`.
4. Convert page 1 of each to JPG with `pdftoppm` and visually inspect for: cover image rendering, font embedding (no Helvetica fallback), correct colors, no clipped text, table wrapping, gallery layout.
5. Iterate on any issues, regenerate, re-verify.
6. Refresh the local `/mnt/documents/branded-pdfs/` copies the user opens.

## Technical notes

- Switch to `npm:pdf-lib@1.17.1` and `npm:@pdf-lib/fontkit@1.1.1` for TTF embedding.
- Fonts and cover images fetched once per cold-start, cached in module-scope `Map`s to keep per-doc generation fast during the `{ all: true }` batch.
- Keep `escapePdf` removed — pdf-lib handles encoding natively, so we get real accents (é, ë, €) instead of the current ASCII-fold.
- `documents` array stays the same shape aside from the new optional fields above — no changes needed to `src/data/downloads.ts` or the download modal.
- `cleanup` branch and HTTP contract unchanged.

## Out of scope

- Adding new document IDs (the 16 stay as-is).
- Changing PDF filenames / storage paths.
- Email-gated capture, frontend modal, or downloads page layout.
- Translating PDFs to other languages.
