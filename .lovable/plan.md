
# 3D Planner Drag-and-Drop + New Fence Accessories from Felix Catalog

## Overview

Two major changes:
1. Add drag-and-drop panel placement to the 3D view (currently panels can only be added/removed in 2D view)
2. Add new fence accessory products sourced from Felix Distribution's catalog, renamed to fit the SchuttingVanComposiet.nl brand, and integrate them into both the product portfolio and the fence planner

---

## Part 1: 3D Planner Drag-and-Drop

Currently, the 3D view (`ThreeDViewCanvas`) is display-only -- it renders placed panels but has no interactivity for adding, removing, or reordering them. Users must switch to the 2D view to manipulate panels.

### Changes

**File: `src/components/fence-planner/ThreeDViewCanvas.tsx`**
- Add props for `onAddPanel`, `onRemovePanel`, `onReorderPanels` (same callbacks already used by `PanelDesignerCanvas`)
- Make each 3D panel clickable (raycasting via R3F's `onClick` events)
- Add an "add panel" button/zone at the end of the fence (3D Html overlay or clickable transparent mesh)
- When a panel is clicked, show a floating overlay with "Delete" and drag handles
- Implement drag-to-reorder: user clicks and drags a panel along the X-axis to swap positions with adjacent panels
- Add visual feedback: highlight panel on hover (emissive glow), show drop zones between panels during drag
- On mobile: tap-to-select, then use arrow buttons in an overlay to reorder, and a delete button

**File: `src/components/fence-planner/FenceDesignerView.tsx`**
- Pass `onAddPanel`, `onRemovePanel`, `onReorderPanels` to `ThreeDViewCanvas` (currently only passed to `PanelDesignerCanvas`)
- No other changes needed -- the same state management handles all views

### Technical approach for 3D drag
- Use R3F `onPointerDown` / `onPointerMove` / `onPointerUp` on each Panel group
- During drag, temporarily offset the dragged panel's X position based on pointer delta (using `useThree` to convert screen coords to world coords)
- When dragged panel overlaps an adjacent panel's center, swap their positions in the array
- On drop, call `onReorderPanels` with the new order
- Resize is NOT needed in 3D (keep that in 2D only for precision)

---

## Part 2: New Fence Accessory Products

From the Felix Distribution catalog, the following product categories are relevant as new additions. All will be renamed to fit the SchuttingVanComposiet.nl brand (no "BOSTON", no "Fiberdeck"):

### New products to add to `src/data/products.ts`

| Felix Original Name | Our Name | Category | Type |
|---|---|---|---|
| BOSTON - Houtcomposiet fence board PREMIUM | Composiet schuttingplank Premium | schuttingen | plank |
| BOSTON - Houtcomposiet fence board PREMIUM XL | Composiet schuttingplank Premium XL | schuttingen | plank |
| BOSTON - Houtcomposiet fence board MODERN | Composiet schuttingplank Modern | schuttingen | plank |
| BOSTON - fence board ALUMINIUM | Aluminium schuttingplank | schuttingen | plank |
| BOSTON - Aluminium lamellen 45mm | Aluminium lamellen 45mm | schuttingen | profiel |
| BOSTON - Aluminium lamellen 100mm | Aluminium lamellen 100mm | schuttingen | profiel |
| BOSTON - Aluminium rhombus lamellen | Aluminium rhombus lamellen | schuttingen | profiel |
| BOSTON - Aluminium rhombus lamellen 155 | Aluminium rhombus lamellen breed | schuttingen | profiel |
| BOSTON - Decopaneel Crios horizontaal | Decorpaneel Blokkenpatroon | schuttingen | paneel |
| BOSTON - Decopaneel Hera horizontaal | Decorpaneel Streeppatroon | schuttingen | paneel |
| BOSTON - Decopaneel Lamia horizontaal | Decorpaneel Golfpatroon | schuttingen | paneel |
| BOSTON - Decopaneel Paxos horizontaal | Decorpaneel Cirkelpatroon | schuttingen | paneel |
| BOSTON - Decopaneel matglas 300mm | Decorpaneel Matglas Smal | schuttingen | paneel |
| BOSTON - Decopaneel matglas 450mm | Decorpaneel Matglas Breed | schuttingen | paneel |
| Helios zonnepaneel | Zonnepaneel voor schutting | schuttingen | paneel |

Each product will include:
- Unique `id` (sc-9 through sc-23)
- Descriptive `name` (no Felix/Boston branding)
- `image` from Felix CDN (their images are public CDN URLs)
- `category: 'schuttingen'`
- `tone`, `durability`, `productType` mapped appropriately
- `price` and `priceLabel` set to "Op aanvraag" or estimated pricing
- `specifications` with dimensions from scraped data
- `longDescription` written in our brand voice
- `highlights`, `features`, `faq` sections
- `slug` following our convention

### File changes

**File: `src/data/products.ts`**
- Add 15 new product entries after sc-8 (before the vlonderplanken section)
- Products use Felix CDN image URLs for product photos
- Descriptions rewritten -- no mention of Felix, Fiberdeck, or Boston

**File: `src/components/fence-planner/FenceSystemModal.tsx`**
- Already filters by `category === 'schuttingen'` so new products automatically appear
- No changes needed

**File: `src/components/fence-planner/designerData.ts`**
- Add new `PanelStyleId` entries for the new panel types (aluminium, lamellen, decorative patterns, glass)
- Update `toneColorMap` with aluminium colors (RAL7016 antraciet, RAL9005 zwart)

**File: `src/components/fence-planner/types.ts`**
- Extend `PanelStyleId` union with new style IDs: `"aluminium"`, `"lamellen-45"`, `"lamellen-100"`, `"rhombus-lamellen"`, `"glass-panel"`, `"solar-panel"`

**File: `src/components/fence-planner/panelPatterns.tsx`**
- Add SVG pattern renderers for new panel styles (aluminium solid, lamellen with gaps, frosted glass, solar panel grid)

**File: `src/components/fence-planner/ThreeDViewCanvas.tsx`**
- Add 3D renderers for new panel styles in the `Panel` component (aluminium slats, glass panels, etc.)

---

## Summary of files to modify

1. `src/components/fence-planner/ThreeDViewCanvas.tsx` -- Add drag-and-drop + new panel 3D renderers
2. `src/components/fence-planner/FenceDesignerView.tsx` -- Pass interaction callbacks to 3D view
3. `src/data/products.ts` -- Add 15 new products
4. `src/components/fence-planner/types.ts` -- Extend PanelStyleId
5. `src/components/fence-planner/designerData.ts` -- Add new panel styles + colors
6. `src/components/fence-planner/panelPatterns.tsx` -- Add SVG patterns for new styles
