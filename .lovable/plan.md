

# Optimize Planner Pages for Website Alignment

## Current Gaps

Both planner pages (TerrasDesigner Pro + SchuttingPlanner Pro) are functional tools but lack the SEO and branding elements present on other pages like ProductAdvisor:

1. **No JSON-LD schema** — missing `SoftwareApplication`, `BreadcrumbList`, `FAQPage` structured data
2. **No Breadcrumbs** — DeckPlanner has them, FencePlanner does not
3. **No FAQ section** — neither planner has an FAQ block below the tool (SEO content)
4. **No AuthorBlock / trust signals** — no E-E-A-T elements on planner pages
5. **No InternalLinkBlock** — no contextual links to related products, blog, other tools
6. **Hero pages lack SEO content** — both hero/landing pages are thin (no 800+ word content)
7. **Weak meta descriptions** — not optimized for click-through with USPs and call-to-action
8. **No CTA below the planner** — after using the tool there's no guidance to next steps (offerte, contact, related products)

## Plan

### 1. Enhance Hero/Landing Pages (DeckPlannerHero + FencePlannerHero)
Add below the existing USP bar and before the final CTA:
- **"Waarom onze planner?" section** — 3-4 trust points (25 jaar garantie, 500+ projecten, gratis)
- **FAQ section** — 5-6 planner-specific FAQs (e.g., "Is de planner gratis?", "Hoe nauwkeurig is de materiaallijst?")
- **SEO content block** — 300-500 words of contextual content about composite decking/fencing planning
- **InternalLinkBlock** — links to categories, products, blog, other planner
- **AuthorBlock** — expertise signal

### 2. Add JSON-LD Schema to Both Planners
- `SoftwareApplication` schema (name, description, applicationCategory: "DesignApplication", offers: free)
- `BreadcrumbList` schema
- `FAQPage` schema for the FAQ block
- Add to both hero pages AND the active planner views

### 3. Fix FencePlanner Missing Breadcrumbs
- Add `Breadcrumbs` component to FencePlannerPage (already present on DeckPlannerPage)

### 4. Add Below-Tool CTA Section (Both Planners)
After the tool canvas area, add:
- Trust badges row (25 jaar garantie, gratis bezorging, etc.)
- CTA to contact/offerte
- Related products teaser (3 featured products from the relevant category)
- Link to the other planner tool

### 5. Optimize Meta Tags
- DeckPlanner: "TerrasDesigner Pro | Gratis Composiet Terras Planner | 25 Jaar Garantie"
- FencePlanner: "SchuttingPlanner Pro | Gratis Composiet Schutting Ontwerpen | Direct Materiaallijst"
- Longer descriptions with USPs and action words

## Files Modified
- `src/components/planner/DeckPlannerHero.tsx` — add FAQ, SEO content, trust signals, internal links, schema
- `src/components/fence-planner/FencePlannerHero.tsx` — same additions
- `src/pages/DeckPlannerPage.tsx` — add JsonLd, update meta, add below-tool CTA section
- `src/pages/FencePlannerPage.tsx` — add Breadcrumbs, JsonLd, update meta, add below-tool CTA
- `src/components/JsonLd.tsx` — add `softwareApplicationSchema` helper (if needed)

## Technical Details
- Reuse existing components: `FAQSection`, `AuthorBlock`, `InternalLinkBlock`, `TrustCTA`, `JsonLd`
- FAQ data defined as constants in each hero component
- Schema follows SoftwareApplication spec with `offers.price: 0` and `applicationCategory: DesignApplication`

