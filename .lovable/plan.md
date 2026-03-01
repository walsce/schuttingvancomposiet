

# Complete Website Overhaul: Silvadec to Gamrat WPC

## Context

The website currently sells Silvadec products (French manufacturer) with three categories: gevelbekleding, schuttingen, vlonderplanken. The new provider is **Gamrat WPC** (Polish manufacturer) with a different product structure: **Deski tarasowe** (decking boards), **Ogrodzenia** (fencing), and **Akcesoria** (accessories). Gamrat does NOT have gevelbekleding (cladding) products.

## Scraped Data Summary

From gamratwpc.pl, the complete product catalog is:

### Decking Boards (Deski tarasowe) - 7 products
| Product | Dimensions | Colors | Structure |
|---------|-----------|--------|-----------|
| Komorowa (Chamber) | 25x160mm, 3/4m | Ciemny braz, Grafit, Orzech, Szary, Ciemny szary | Hollow, dual-sided grooves |
| Classic (Solid) | 20x160mm, 3/4m | Ciemny braz, Grafit, Orzech + custom: Szary, Ciemny szary | Solid, brushed |
| Premium (Solid) | 20x160mm, 3/4m | Ciemny braz, Grafit, Orzech + custom: Szary, Ciemny szary | Solid, wood-grain pattern |
| Elegance | 25x140mm, 4m only | Gorski dab, Miodowy dab, Naturalny dab | RENOLIT foil + corundum layer |
| Eco | 25x140mm, 3/4m | Ciemny braz, Grafit, Orzech + custom: Szary, Ciemny szary | Eco-friendly, fine groove |
| Slim | 25x140mm, 3m | Ciemny braz, Grafit, Orzech | Budget, thin construction |
| MAX | 20x185mm, 3/4m | Ciemny braz, Grafit, Orzech | Wide, pallet-only sales |

### Fencing (Ogrodzenia) - 4 products
| Product | Dimensions | Colors |
|---------|-----------|--------|
| Deska ogrodzeniowa Classic | 19x150mm, 2m | Ciemny braz, Grafit, Orzech |
| Deska ogrodzeniowa Premium | 19x150mm, 2m | Ciemny braz, Grafit, Orzech |
| Uniwersalny profil Classic/Premium | 19x150mm, 1.25/1.5/2m | Ciemny braz, Grafit, Orzech |
| Ceownik WPC | 30x40mm, 2m | Ciemny braz, Grafit, Orzech |
| Slupek ogrodzeniowy | 60x60mm, 2m | Ciemny braz, Grafit, Orzech |

### Accessories (Akcesoria)
| Product | Details |
|---------|---------|
| Legar WPC | 50x30mm, 3m |
| Legar aluminiowy niski | 36.4x24mm, 4m |
| Legar aluminiowy wysoki | 38x51mm, 4m |
| Zestawy montazowe | 2m² and 10m² sets |
| Listwa plaska | Flat trim |
| Listwa L kompozytowa | L-trim composite |
| Listwa L aluminiowa | L-trim aluminum |
| Wsporniki regulowane | 25-260mm height range |

### Brand USPs
- 25 jaar garantie (25 year warranty)
- Polski producent (Polish manufacturer)
- 100% recykling
- Brak koniecznosci impregnacji (no impregnation needed)
- Wysoka klasa niepalnosci (high fire resistance)
- Koekstruzja (co-extrusion)

### Images from Gamrat CDN
All product images are available at `gamratwpc.pl/wp-content/uploads/2025/...` in `.webp` format. Realization photos also available.

---

## Implementation Plan

### Phase 1: Replace Product Data (`src/data/products.ts`)

**What changes:**
- Remove ALL existing Silvadec products (~50 products)
- Replace with Gamrat WPC products mapped to the existing `Product` interface
- Change categories from `gevelbekleding | schuttingen | vlonderplanken` to `vlonderplanken | schuttingen | accessoires`
  - Note: The Product type union needs updating
- Each Gamrat decking board has multiple color variants, so each color = separate Product entry (same pattern as current variant system)
- Update `categories` array with new Gamrat-specific data, images, descriptions, and FAQs
- Update all `toneLabels` to match Gamrat color palette (bruin, grijs, zwart remain; add "eiken" for Elegance oak colors)
- Update `durabilityLabels` to reflect Gamrat terminology (komorowa, pełna, co-extrusie)
- All images hotlinked from `gamratwpc.pl/wp-content/uploads/...`
- All content translated to Dutch (existing site language)
- Prices: Since Gamrat is B2B ("zapytaj o produkt"), use "Prijs op aanvraag" or derive from the downloadable price list PDF

**Estimated products after mapping:**
- Vlonderplanken: ~25 products (7 board types x 3-5 colors each)
- Schuttingen: ~12 products (fence boards Classic/Premium x 3 colors + profiles + posts)
- Accessoires: ~8 products (legars, clips, trims, supports)
- Total: ~45 products

### Phase 2: Update Homepage Hero (`src/pages/Index.tsx`)

**What changes:**
- Remove the Silvadec video (`/videos/hero-silvadec.mp4`) and hero image reference
- Replace with a static hero image from Gamrat: `https://gamratwpc.pl/wp-content/uploads/2025/04/gamrat-wpc-systemy-tarasowe-slider-2.webp`
- Update hero copy from "Premium Composiet voor Tuin & Gevel" to "Premium Composiet Vlonderplanken & Schuttingen"
- Update USPs: change "15 jaar garantie" to "25 jaar garantie", add "Polski producent" / "100% recycleerbaar"
- Update `featuredSlugs` to reference new Gamrat product slugs
- Remove gevelbekleding references from the homepage

### Phase 3: Update Category Structure

**Files affected:**
- `src/data/products.ts` - category type union
- `src/pages/CategoryPage.tsx` - no structural changes needed (data-driven)
- `src/components/CategoryCard.tsx` - no changes (data-driven)
- `src/pages/AssortimentPage.tsx` - no changes (data-driven)

**What changes:**
- Category type changes from `'gevelbekleding' | 'schuttingen' | 'vlonderplanken'` to `'vlonderplanken' | 'schuttingen' | 'accessoires'`
- Add new category images from Gamrat CDN
- Update category descriptions, SEO titles, and FAQs

### Phase 4: Update Header Navigation & Footer

**Files affected:**
- `src/components/Header.tsx` - update nav links (remove "Gevelbekleding" references if any exist in navigation)
- `src/components/Footer.tsx` - update company info, press bar

### Phase 5: Update SEO Content Pages

**Files affected:**
- `src/data/seoPages.ts` - remove Silvadec-specific content from gevel pages
- `src/data/seoGevelPages.ts` - this entire file becomes obsolete (no gevelbekleding)
- `src/data/seoVlonderPages.ts` - update to reference Gamrat products
- `src/data/seoSchuttingExpansion.ts` - update to reference Gamrat products
- `src/data/seoMateriaalPages.ts` - update material composition (Gamrat uses 45% wood flour + 45% PVC + 10% additives)

### Phase 6: Update Blog Articles

**Files affected:**
- `src/data/blogArticles.ts` / `blogArticlesExpansion.ts` - update product references, remove Silvadec brand mentions, update specifications

### Phase 7: Update Planner Tools

**Files affected:**
- `src/components/planner/presets.ts` - update material options to Gamrat products
- `src/components/planner/MaterialSelector.tsx` - update board options
- `src/components/fence-planner/fencePresets.ts` - update fence options
- `src/components/fence-planner/designerData.ts` - update panel dimensions

### Phase 8: Update Downloads

**Files affected:**
- `src/data/downloads.ts` - replace Silvadec PDFs with Gamrat WPC PDFs:
  - Katalog: `gamratwpc.pl/wp-content/uploads/2025/05/Katalog-Deski-2026-PL-_-podglad.pdf`
  - Cennik: `gamratwpc.pl/wp-content/uploads/2026/01/CENNIK-PL-EDYCJA-1.2026-OD-01.2026.pdf`
  - Montage instructions and certifications from scraped download links
- Remove/replace local PDFs in `public/downloads/`

### Phase 9: Update Remaining References

- `src/components/PressBar.tsx` - update press outlets
- `src/components/seo/` components - update brand references
- `src/pages/ComparePage.tsx` - update comparison data
- `public/robots.txt` - no change
- `index.html` - update meta tags if needed

---

## Technical Details

### Category Type Change
The `Product` interface category field needs updating:
```typescript
category: 'vlonderplanken' | 'schuttingen' | 'accessoires';
```
This is a breaking change that will cascade through:
- `ProductFilters.tsx`
- `CategoryPage.tsx`
- All SEO data files
- Admin pages

### Image Strategy
All images will be hotlinked from `gamratwpc.pl/wp-content/uploads/...` (same pattern as current Silvadec CDN hotlinking). Full-size `.webp` images available.

### Pricing Strategy
Gamrat WPC operates B2B with a downloadable price list. Options:
1. Use "Prijs op aanvraag" (price on request)
2. Extract prices from the PDF price list and display them
3. Keep current pricing format but update values

### Implementation Order
Due to the massive scope, this should be done in stages:
1. Products data + category type change (foundation)
2. Homepage hero replacement
3. Category updates
4. SEO pages cleanup
5. Blog + downloads
6. Planner tools
7. Final review

This is approximately 8-12 implementation messages to complete fully.

