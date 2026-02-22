
# Product Images & Sample Ordering Upgrade

## Problem

1. **Most products only have 1 image** in their `images` array, even though the source website (mthekwerken.nl) has 2-10 gallery images per product. The product page gallery code already supports multiple images (with prev/next buttons and thumbnails), but the data only contains single images.

2. **Sample ordering just links to the Contact page** with no context about which product the user wants. The source website has dedicated sample products (at 3.95 EUR) per category. We need a proper sample request flow that pre-fills the product name.

---

## Part 1: Add All Scraped Product Images

Update the `images` array for every product in `src/data/products.ts` with the full gallery images scraped from mthekwerken.nl. Here is the complete mapping:

### Gevelbekleding (8 products)

| Product | Current images | Images to add |
|---|---|---|
| Rhombus Teak (gv-1) | 2 | +1: `composiet-gevelbekleding-Teak-300x174-2.png`, `Teak-gevelbekleding-300x225-2.jpg` |
| Rhombus Teak/Zwart (gv-2) | 1 | +4: `gevelbekleding-rhombus-teakzwart-2.jpg`, `foto-gevel-rhombus-teakzwart-2.jpg`, `gevelbekleding-rhombus-teak-zwarte-achtergrond-2.jpg`, `teak-zwart-twee-300x200-2.png` |
| Rhombus Zwart (gv-3) | 1 | +2: `gevelbeklding-zwart-twee-300x200-2.png`, `Gevelbekleding-zwart-300x400-2.jpg` |
| Rhombus Walnoot (gv-4) | 1 | Needs scraping for extra images |
| Rhombus Eiken (gv-5) | 1 | Needs scraping for extra images |
| Rhombus Grijs/Zwart (gv-6) | 1 | Needs scraping for extra images |
| Hoekprofiel Teak (gv-7) | 1 | Keep as-is (accessory) |
| Hoekprofiel Zwart (gv-8) | 1 | Keep as-is (accessory) |

### Schuttingen (8 products)

| Product | Current images | Images to add |
|---|---|---|
| Schutting Rhombus Teak (sc-1) | 1 | +9: `PHOTO-2025-05-15-18-27-42.jpg`, `foto-rhombus-Teak-1.jpg`, `IMG_2101-3-4.jpg`, `IMG_5099-9.jpg`, `7c3fa9a2-...4.jpg`, `IMG_3952-4.jpg`, `7FC631AB-...4.jpg`, `IMG_4881-3.jpg`, `Macom-composiet-plank-modern-teak-5.png` |
| Schutting Teak (sc-2) | 1 | Needs scraping |
| Schutting Rhombus Zwart (sc-3) | 1 | +7: `IMG_2102-1-4.jpg`, `foto-Rhombus-zwart-scaled-4.jpg`, `Rhombus-zwart-met-hekwerk-scaled-3.jpg`, `4ea6febf-...4.jpg`, `c938138b-...3.jpg`, `Rhombus-zwart-met-staafmat-hekwerk-scaled-3.jpg`, `Macom-composiet-modern-zwart-plank-6.png` |
| Schutting Zwart (sc-4) | 1 | Needs scraping |
| Schutting Rhombus Walnoot (sc-5) | 1 | Needs scraping |
| Schutting Walnoot (sc-6) | 1 | Needs scraping |
| Schutting Rhombus Eiken (sc-7) | 1 | Needs scraping |
| Schutting Rhombus Grijs (sc-8) | 1 | Needs scraping |

### Vlonderplanken (7 products)

| Product | Current images | Images to add |
|---|---|---|
| Vlonder Donker Grijs (vl-1) | 1 | +1: `Deck-Dark-Grey-5.png` |
| Vlonder Teak (vl-2) | 1 | Needs scraping |
| Vlonder Vergrijsd Eiken (vl-3) | 1 | Needs scraping |
| Vlonder Walnoot (vl-4) | 1 | Needs scraping |
| Vlonder Massief Grijs (vl-5) | 1 | +4: `Massief-plank-donker-grijs-close-scaled.jpg`, `Massief-plank-donker-grijs.png`, `massief-plank-donkergrijs-met-clips-scaled.jpg`, `Vlonderplank-massief-donkergrijd-rails-en-clips-scaled.jpg` |
| Vlonder Massief Teak (vl-6) | 1 | Needs scraping |
| Vlonder Massief Zwart (vl-7) | 1 | Needs scraping |

For products marked "Needs scraping" -- we will scrape each individual product page during implementation to collect all gallery images and add the full-resolution URLs (without size suffixes like `-300x200`) to the `images` arrays.

---

## Part 2: Sample Request Flow

Currently the "Sample Aanvragen" button on the product page just links to `/contact` with no context. We need to improve this:

### Changes to `ContactPage.tsx`
- Accept a `product` query parameter (e.g., `/contact?type=sample&product=rhombus-teak`)
- Pre-fill the form textarea with "Sample aanvraag voor: [product name]"
- Show a highlighted banner when arriving from a sample request: "U vraagt een sample aan voor: [product name]"

### Changes to `ProductPage.tsx`
- Update the "Sample Aanvragen" button to pass the product name: `<Link to={'/contact?type=sample&product=' + product.slug}>Sample Aanvragen</Link>`
- Add a "Gratis sample" badge/indicator near the sample button (samples are 3.95 EUR on the source site)
- Add a small info text: "Ontvang een gratis sample om de kleur en kwaliteit thuis te ervaren"

### Changes to `CategoryPage.tsx`
- Add a "Sample aanvragen" button in the category page linking to the contact page with the category pre-filled

---

## Files Modified

| File | Changes |
|---|---|
| `src/data/products.ts` | Add multiple gallery images to all 23 products' `images` arrays |
| `src/pages/ProductPage.tsx` | Update Sample button link with query params, add sample info text |
| `src/pages/ContactPage.tsx` | Read `type` and `product` query params, pre-fill form, show sample banner |
| `src/pages/CategoryPage.tsx` | Add sample request link |

---

## Technical Notes

- All image URLs use the full-resolution versions from mthekwerken.nl (without `-300x200` size suffixes where possible)
- The product page gallery already has working prev/next navigation and thumbnail strip -- once we populate the `images` arrays, it will "just work"
- The contact form pre-fill uses `useSearchParams` from react-router-dom (already installed)
- Implementation will require scraping the remaining ~15 product pages that weren't scraped yet to collect their full image galleries
