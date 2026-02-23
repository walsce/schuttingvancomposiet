

# Replace All Products with Silvadec Catalog

## Overview

This plan replaces the entire product inventory with real Silvadec products scraped from en.silvadec.com. All product images will be hotlinked directly from the Silvadec CDN (which serves public product images). Product descriptions, specs, and FAQs will be written in Dutch to match the existing site language.

---

## Product Inventory (from scraped data)

### Category: Vlonderplanken (Decking) -- 8 products

| Product | Color | Range | Type | Finish |
|---------|-------|-------|------|--------|
| Atmosphere Ushuaia Grijs | Grey | Atmosphere | Co-extrusie | Brushed |
| Atmosphere Cayenne Grijs | Grey | Atmosphere | Co-extrusie | Brushed |
| Atmosphere Belem Grijs | Grey | Atmosphere | Co-extrusie | Brushed |
| Atmosphere Lima Bruin | Brown | Atmosphere | Co-extrusie | Brushed |
| Atmosphere Sao Paulo Bruin | Brown | Atmosphere | Co-extrusie | Brushed |
| Atmosphere Rio Bruin | Brown | Atmosphere | Co-extrusie | Brushed |
| Nuances Ipe | Brown | Nuances | Co-extrusie | Brushed |
| Nuances Licht Eiken | Brown | Nuances | Co-extrusie | Brushed |
| Elegance Colorado Bruin (grooved) | Brown | Elegance | Mono-extrusie | Grooved |
| Elegance Exotic Bruin (grooved) | Brown | Elegance | Mono-extrusie | Grooved |
| Elegance Iroise Grijs (grooved) | Grey | Elegance | Mono-extrusie | Grooved |
| Elegance Antraciet Grijs (grooved) | Grey | Elegance | Mono-extrusie | Grooved |
| Emotion Savanne Bruin | Brown | Emotion | Mono-extrusie | Smooth |
| Emotion Equateur Bruin | Brown | Emotion | Mono-extrusie | Smooth |

### Category: Schuttingen (Fencing) -- 8 products

| Product | Color | Range |
|---------|-------|-------|
| Atmosphere Antraciet Grijs | Grey | Composite |
| Atmosphere Licht Grijs | Grey | Composite |
| Atmosphere Wild Grijs | Grey | Composite |
| Atmosphere Zonnig Bruin | Brown | Composite |
| Atmosphere Licht Eiken | Brown | Composite |
| Aluminium Antraciet Grijs | Grey | Aluminium |
| Aluminium Metaal Grijs | Grey | Aluminium |
| Aluminium Zwart | Black | Aluminium |

### Category: Gevelbekleding (Cladding) -- 6 products

| Product | Color | Range |
|---------|-------|-------|
| Atmosphere 175 Wit Ceruse | White | Cladding 175 |
| Atmosphere 175 Zonnig Bruin | Brown | Cladding 175 |
| Atmosphere 175 Donker Bruin | Brown | Cladding 175 |
| Open Rhombus Licht Bruin | Brown | Open Rhombus |
| Open Rhombus Donker Bruin | Brown | Open Rhombus |
| Open Rhombus Antraciet Grijs | Grey | Open Rhombus |

**Total: ~28 products** (trimmed from 38 to avoid duplicates like grooved/smooth/embossed variants of the same color)

---

## Image Strategy

All product images will be hotlinked from the Silvadec CDN URLs already scraped. Each product will have:
- 1 primary product shot (packshot/close-up)
- 2-4 additional lifestyle/installation images
- Images sourced from the `max_1300x1300` size variant for quality

Category hero images will also use Silvadec lifestyle shots from the homepage.

---

## Files to Modify

### 1. `src/data/products.ts` -- Complete rewrite
- Replace all 38 existing products with ~28 Silvadec products
- Update `Tone` type to: `'bruin' | 'grijs' | 'zwart' | 'wit' | 'eiken'`
- Update `Durability` type to: `'standaard' | 'premium' | 'co-extrusie'`
- Keep `ProductType` as is
- Update `toneLabels`, `durabilityLabels` accordingly
- Each product includes: Dutch name, Dutch descriptions, Silvadec CDN images, realistic specs, FAQs, SEO titles/descriptions
- Categories array updated with new Silvadec imagery

### 2. `src/data/blogArticles.ts` -- Update `relatedProducts`
- Update `relatedProducts` slugs to match new product slugs

### 3. `supabase/functions/seed-products/index.ts` -- Complete rewrite
- Replace all seed data with new Silvadec products
- Update images, FAQs, descriptions to match new inventory

### 4. `src/components/fence-planner/designerData.ts` -- Update panel images
- Replace panel style images with Silvadec fencing product images

### 5. `src/components/fence-planner/FenceSystemModal.tsx` -- No code change needed
- Already reads from `products.ts` filtered by `schuttingen` category

### 6. `src/pages/Index.tsx` -- Update featured products
- Update `featuredSlugs` array to reference new product slugs
- Update hero image and category images

### 7. `src/components/ProductFilters.tsx` -- Update tone colors
- Update `toneColors` map to match new tone values

---

## Data Shape Per Product (example)

```text
{
  id: "silvadec-atmo-ushuaia",
  name: "Silvadec Atmosphere Ushuaia Grijs",
  price: 89,
  priceLabel: "Vanaf EUR 89,- /m2",
  image: "[Silvadec CDN URL]",
  category: "vlonderplanken",
  tone: "grijs",
  durability: "co-extrusie",
  productType: "plank",
  slug: "atmosphere-ushuaia-grijs-vlonderplank",
  features: ["Co-extrusie", "Geborsteld", "25 jaar garantie"],
  guarantee: "25 jaar fabrieksgarantie",
  deliveryTime: "5-8 werkdagen",
  description: "...",
  longDescription: "... (markdown, ~800 words)",
  specifications: { Breedte: "138 mm", Dikte: "23 mm", ... },
  images: ["url1", "url2", "url3"],
  highlights: ["Kleurvast door co-extrusie", ...],
  faq: [{ question: "...", answer: "..." }],
  seoTitle: "Silvadec Atmosphere Ushuaia Grijs | Composiet Vlonderplank",
  seoDescription: "..."
}
```

---

## Database Sync

After updating `products.ts`, the seed Edge Function will also be updated. We will then re-run the seed to update the database with the new Silvadec products, ensuring admin CMS, Google Feed, and storefront all reflect the new inventory.

---

## Enum Migration

A database migration will update the `product_tone` enum to match the new values:
- Old: `teak, zwart, walnoot, eiken, grijs`
- New: `bruin, grijs, zwart, wit, eiken`

---

## What Stays the Same

- All page templates (ProductPage, CategoryPage, etc.) -- no changes needed
- Product card component -- no changes
- CRM system -- no changes
- Admin pages -- no changes (they read from DB)
- Fence planner logic -- only image URLs change
- Deck planner -- only product data changes

---

## Implementation Order

1. Update `src/data/products.ts` with all Silvadec products and new types
2. Update `src/data/blogArticles.ts` related product slugs
3. Update `src/components/fence-planner/designerData.ts` panel images
4. Update `src/components/ProductFilters.tsx` tone color map
5. Update `src/pages/Index.tsx` featured products and hero images
6. Database migration for updated enums
7. Update and re-run `seed-products` Edge Function
8. Verify all pages render correctly

