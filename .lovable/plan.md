

# Full E-E-A-T Product Content Upgrade

## The Problem

Right now, product pages are SEO-thin and will lose in both traditional rankings and Zero-Click/AI-search results:

- Descriptions are 1-3 sentences (the source website has 300+ words per product with multiple sections)
- Only 2 out of 23 products have FAQs
- No per-product `seoTitle` or `seoDescription` fields
- The description tab renders a single `<p>` tag -- no headings, no bullet lists, no structure
- No definition blocks, comparison tables, or step-by-step sections that AI search engines extract for Zero-Click answers
- Missing E-E-A-T signals like material expertise content, sustainability credentials, montage guidance

## What Changes

### 1. Expand Product Interface (`src/data/products.ts`)

Add new fields to the `Product` interface:

| Field | Type | Purpose |
|---|---|---|
| `seoTitle` | `string` | Keyword-optimized meta title (60 chars) |
| `seoDescription` | `string` | Keyword-optimized meta description (155 chars) |
| `longDescription` | `string` (markdown) | Full rich product content (300-500 words) with H2/H3, bullet lists, bold text |

### 2. Scrape and Write Full Descriptions for All 23 Products

Each product page on mthekwerken.nl will be scraped to extract the full description content. The `longDescription` field will contain structured markdown with:

- **Product introduction** (what it is, key benefit)
- **"Duurzaam en onderhoudsvrij"** section (sustainability, materials, 0% moisture)
- **"Flexibele montage"** section (installation method, screws/clips)
- **"Voordelen in een oogopslag"** bulleted list
- **Closing paragraph** with call-to-action text

The existing short `description` stays as-is (used for cards, meta fallbacks, excerpts).

### 3. Add FAQs to All 21 Products That Are Missing Them

Every product will get 3-5 product-specific FAQs based on common questions from the source site:

- Installation questions ("Hoe monteer ik...?")
- Material/durability questions ("Hoe lang gaat het mee?")
- Sizing/measurement questions ("Hoeveel heb ik nodig?")
- Maintenance questions ("Hoe onderhoud ik...?")
- Comparison questions ("Wat is het verschil tussen...?")

### 4. Add `seoTitle` and `seoDescription` to All 23 Products

Each product gets a unique, keyword-optimized:
- `seoTitle`: "{Product Name} Kopen | Composiethekwerk.nl" (60 chars)
- `seoDescription`: Feature-benefit description with primary keyword (155 chars)

### 5. Upgrade ProductPage.tsx for Rich Content Rendering

The description tab currently renders `<p>{product.description}</p>`. It needs to become a full content engine:

- Render `longDescription` as markdown (using `react-markdown` already installed) with proper H2/H3, lists, bold
- Add a **"Voordelen"** visual section with checkmark icons (extracted from highlights but rendered prominently)
- Add a **"Technische samenvatting"** definition block above the tabs -- a quick-reference box with key specs that AI search engines will extract for Zero-Click results
- Use `seoTitle` and `seoDescription` in the SEOHead component instead of auto-generating them
- Ensure every product page has FAQ schema (JSON-LD) emitted

### 6. Add Zero-Click Optimized Sections to ProductPage

New sections designed specifically for Google SGE / Bing Copilot / Perplexity extraction:

- **"In het kort"** summary box: 2-3 sentence product summary at the top of the description, wrapped in a visually distinct card. This is the snippet AI engines will pull.
- **Specifications table** stays but gets a visible H2 heading for crawlability
- **FAQ section** rendered directly on-page (not just inside a tab) so crawlers always see it

---

## Files Modified

| File | Changes |
|---|---|
| `src/data/products.ts` | Add `seoTitle`, `seoDescription`, `longDescription` to interface. Populate all 23 products with scraped full descriptions, per-product SEO fields, and 3-5 FAQs each |
| `src/pages/ProductPage.tsx` | Render `longDescription` as markdown, add "In het kort" summary box, show FAQ on-page, use `seoTitle`/`seoDescription` from data, add definition block for Zero-Click |

---

## Implementation Approach

The product descriptions will be scraped from mthekwerken.nl for each of the 23 products during implementation, then rewritten for Composiethekwerk.nl branding. This ensures authentic, detailed product content rather than thin AI-generated text.

The ProductPage upgrade focuses on semantic HTML structure (proper heading hierarchy, definition lists, structured FAQ) that both traditional Googlebot and AI-search retrievers can parse effectively.

