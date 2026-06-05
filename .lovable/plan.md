# Full alignment with the new catalog

The catalog was replaced with 66 mthekwerken-sourced composite products across 5 categories: **vlonderplanken, schuttingen, tuindeuren, gevelbekleding, accessoires**. Colors are now **teak, eiken, walnoot, grijs, donker grijs, vergrijsd eiken, zwart** and lines are **standard vs. Rhombus (horizontaal / verticaal)**.

A lot of supporting surfaces still reference the old Gamrat-style lines (Elegance / Classic / Premium / Slim / Max / Komorowa / Eco) and the old color names (orzech, grafit, gorski dab). This plan cleans every remaining surface.

## 1. Navigation & footer

- `src/components/Header.tsx` — add **Tuindeuren** and **Gevelbekleding** to `navLinks`, in this order: Assortiment · Vlonderplanken · Schuttingen · Tuindeuren · Gevelbekleding · Accessoires · Productadvies · Contact. Collapse less-critical items behind a "Meer" dropdown on `lg` if width gets tight.
- `src/components/Footer.tsx` — extend the Assortiment column with Tuindeuren and Gevelbekleding links.
- `src/App.tsx` — confirm `/categorie/tuindeuren` and `/categorie/gevelbekleding` resolve via the existing `CategoryPage` route (param-based, no change needed if already dynamic; otherwise register the two slugs).

## 2. Blog content (`src/data/blogArticles.ts`, `src/data/blogArticlesExpansion.ts`)

- Remove every mention of Elegance / Classic / Premium / Slim / Max / Eco / Komorowa / orzech / grafit / gorski dab / miodowy dab.
- Rewrite affected paragraphs to talk about the new lines (**standaard composiet vs. Rhombus**) and new tones (teak, eiken, walnoot, grijs, donker grijs, vergrijsd eiken, zwart).
- Re-map every `relatedProducts: [...]` array to slugs that actually exist in `cms_products` (e.g. `composiet-vlonderplank-teak`, `composiet-schutting-rhombus-walnoot`, `composiet-tuindeur-eiken`).
- Add 2 new short articles to cover the new ranges:
  - "Composiet tuindeur kiezen: Rhombus of dicht paneel?"
  - "Composiet gevelbekleding Rhombus: complete gids"
  Each follows the existing E-E-A-T template (author block, FAQ, internal links, schema).

## 3. Downloads (`src/data/downloads.ts` + PDFs)

- Edit each existing entry to drop Komorowa/Classic/Premium/Elegance bullets; replace with the actual specs of the live catalog (standaard massief, naadloos massief, Rhombus).
- Replace `relatedCategory` typing to include `"tuindeuren" | "gevelbekleding"`.
- Add four new guides:
  1. Montagehandleiding composiet tuindeur (incl. scharnier/slotset)
  2. Montagehandleiding composiet gevelbekleding Rhombus + aluminium regelwerk
  3. Onderhoudsgids Rhombus profielen
  4. Checklist: tuindeur op maat bestellen
- Trigger `generate-branded-pdf` for the four new IDs after migration (handled in build mode via the existing edge function); placeholder cards display until PDFs are generated.

## 4. SEO data files

- `src/data/seoVlonderPages.ts`, `src/data/seoMateriaalPages.ts`, `src/data/seoSchuttingExpansion.ts`, `src/data/seoGevelPages.ts`, `src/data/seoPages.ts`:
  - Strip all old line/color names.
  - Update product references to live slugs.
  - Add a **tuindeuren cluster** (new file `src/data/seoTuindeurPages.ts`) with 6 pages (Rhombus tuindeur, dichte tuindeur, tuindeur op maat, tuindeur met slot, tuindeur zwart, tuindeur teak) wired into `App.tsx` and `SEOContentPage`.
  - Refresh the gevelbekleding cluster copy to reference Rhombus tones (teak/eiken/walnoot/grijs/zwart and combo zwart varianten) that exist in DB.

## 5. Planners & advisor

- `src/components/fence-planner/designerData.ts` and `src/components/planner/presets.ts` / `MaterialSelector.tsx`: replace the old line/color presets with the new tones and the two structural choices (standaard vs. Rhombus).
- `src/components/advisor/AdvisorQuiz.tsx` + `supabase/functions/chat-advisor/index.ts`: update the system prompt + recommendation rules to the new product taxonomy and slugs.
- `src/data/products.ts`: confirm the `Product['category']` union already includes `tuindeuren` and `gevelbekleding` (it does); remove any remaining hard-coded old slugs in static featured arrays.

## 6. Discoverability

- `public/sitemap.xml` (or `scripts/generate-sitemap.ts` if/when introduced): regenerate to include `/categorie/tuindeuren`, `/categorie/gevelbekleding`, all 66 product slugs, the new blog posts, the new SEO tuindeur pages and the new downloads.
- `public/robots.txt`: keep open, ensure `Sitemap:` line points at the .nl domain.
- `index.html`: refresh the homepage meta description + `Organization`/`WebSite` JSON-LD to list the five categories.

## 7. Verification

After edits:
- `rg -i "gamrat|elegance|classic|premium|slim|max|komorowa|orzech|grafit|gorski|miodowy|naturalny|eco "` returns nothing in `src/`, `public/`, `supabase/functions/`.
- Every `relatedProducts` slug in blog/SEO data exists in `cms_products` (cross-check via a quick psql query).
- Visual pass on `/`, `/assortiment`, `/categorie/tuindeuren`, `/categorie/gevelbekleding`, `/downloads`, `/blog`, `/productadvies`.

## Out of scope

- Re-scraping or further product imports (catalog is already live).
- Visual redesign — copy + data only, no layout changes.
- Removing the temporary `/admin/scrape` tool (kept as ops utility).

Ready to switch to build mode and execute end-to-end?
