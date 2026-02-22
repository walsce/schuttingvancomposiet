
# Use Real Product Images for Panel Style Thumbnails

## Problem
The bottom toolbar in the fence designer shows generic SVG icons for each panel style instead of actual product photos from the catalog.

## Solution
Replace the SVG pattern thumbnails with real product images from the Felix CDN, sourced from the product data already in `products.ts`.

## Changes

### 1. Add image URLs to panel style data
**File: `src/components/fence-planner/designerData.ts`**
- Add an `image` field to each entry in `panelStyles` array
- Map each panel style to the most representative product image:
  - horizontal-planks -> Premium plank image (sc-9)
  - decorative -> Decorpaneel Cirkelpatroon (sc-20)
  - mosaic -> Decorpaneel Blokkenpatroon (sc-17)
  - louvers -> Decorpaneel Streeppatroon (sc-18) 
  - vertical-slats -> Modern plank image (sc-11)
  - aluminium -> Aluminium schuttingplank (sc-12)
  - lamellen-45 -> Aluminium lamellen 45mm (sc-13)
  - lamellen-100 -> Aluminium lamellen 100mm (sc-14)
  - rhombus-lamellen -> Aluminium rhombus lamellen (sc-15)
  - glass-panel -> Matglas 300mm (sc-21)
  - solar-panel -> Zonnepaneel (sc-23)

### 2. Update PanelType interface
**File: `src/components/fence-planner/types.ts`**
- Add `image: string` to the `PanelType` interface

### 3. Replace SVG thumbnails with product images
**File: `src/components/fence-planner/BottomToolbar.tsx`**
- Import `panelStyles` (already imported)
- Replace the `PanelThumbnail` component: remove the entire SVG `patterns` record and instead render an `<img>` tag using the style's `image` field from `panelStyles`
- Keep the same button sizing, border styling, and selection state
- Add `object-cover` and `rounded` classes for clean image display

## Technical Details

### Image source
All images are from `felix-distribution.b-cdn.net` CDN -- already used by the existing product entries in `products.ts`. No new assets need to be downloaded or copied.

### Files changed
1. `src/components/fence-planner/types.ts` -- Add `image` to `PanelType`
2. `src/components/fence-planner/designerData.ts` -- Add image URLs to `panelStyles`
3. `src/components/fence-planner/BottomToolbar.tsx` -- Replace SVG patterns with `<img>` tags
