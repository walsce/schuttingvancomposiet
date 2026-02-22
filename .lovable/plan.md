
# Mobile-Optimized Fence Planner + Real Products + Rename

## Problem
The fence planner (step 0 configuration page) uses a desktop sidebar+canvas layout that completely breaks on mobile -- the sidebar takes the full width, the canvas is hidden or tiny, and the bottom toolbar/designer view overflows. Additionally, the system/panel/color selection uses hardcoded fake products (WPC/ALU/Combo/Decor) instead of the actual products from the website (8 composiet schuttingen in the products data).

## Changes Overview

### 1. Rename: "Hek Planner" to "Schutting Planner"
- Update the sidebar title in `FencePlannerPage.tsx` from "Hek Planner" to "Schutting Planner"

### 2. Replace fake product system with real website products
**File: `FenceSystemModal.tsx`** -- Complete rewrite
- Remove the fake WPC/ALU/Combo/Decor systems and their fake panels/colors
- Instead, import `products` from `@/data/products` and filter by `category === 'schuttingen'`
- Show a product selector grid with real product images, names, and prices
- The user picks a product (e.g., "Composiet schutting Rhombus Teak") -- that's the selection
- Remove the 3-step system/panel/color flow; replace with a single product picker
- Each product card shows its image, name, price, and tone/color info from specs

**File: `FenceDesignerView.tsx`** -- Update BottomToolbar integration
- Replace the model/product/color dropdowns with a simpler display of the selected product
- The BottomToolbar will show the selected product name and its color from specifications
- Panel style and color derived from chosen product's `tone` field

**File: `BottomToolbar.tsx`** -- Simplify
- Remove the Model and Product dropdowns (no longer relevant)
- Keep panel style thumbnails and show the selected product's color
- Derive available colors from the selected real product's tone

**File: `designerData.ts`** -- Remove fake model/product/color data
- Remove `modelOptions`, `productsByModel`, `colorsByModel`
- Keep `panelStyles`, `POST_WIDTH_CM`, `STANDARD_PANEL_WIDTH`, `PANEL_HEIGHT_CM`

**File: `types.ts`** -- Simplify
- Remove `FenceSystem` type (no longer needed for fake systems)
- Add a simpler product reference type

### 3. Mobile-optimized FencePlannerPage (step 0)
**File: `FencePlannerPage.tsx`** -- Major layout rework

Current problem: `h-screen flex flex-col lg:flex-row` with a 340px sidebar doesn't work on mobile -- the sidebar fills the screen and the canvas is invisible.

New mobile approach:
- On mobile, use a **step-based wizard** instead of sidebar+canvas side by side
- Step indicators at the top (1. Vorm, 2. Grond, 3. Paal, 4. Product)
- Each step shows one configuration section full-width
- The canvas preview is shown as a collapsible preview card between steps
- Navigation with large touch-friendly "Volgende" / "Terug" buttons at the bottom
- On desktop (lg+), keep the current sidebar+canvas layout

Mobile step flow:
- Step 0: Shape selector + total length input (full width, large touch targets)
- Step 1: Ground config (full width)
- Step 2: Post type + color (full width)
- Step 3: Product selector (grid of real products with images)
- After step 3: go to designer view

### 4. Mobile-optimized FenceDesignerView
**File: `FenceDesignerView.tsx`**
- On mobile, stack the toolbar at the bottom as a horizontal scrollable strip
- The canvas area uses full viewport height minus top bar and bottom toolbar
- Remove the floating back button on mobile; put it in the top bar instead
- The DesignerTopBar wraps properly on mobile (segment selector stacks, zoom controls hidden on mobile)

**File: `DesignerTopBar.tsx`**
- Make responsive: on mobile, show only segment selector and view mode toggle
- Hide zoom controls on mobile (use pinch-to-zoom on the canvas)
- Wrap items properly

**File: `BottomToolbar.tsx`**
- On mobile, make scrollable horizontal with larger touch targets
- Panel thumbnails slightly bigger on mobile
- Color swatches bigger on mobile

## Technical Details

### Product data mapping
The 8 schutting products from `products.ts` have:
- `id`: sc-1 through sc-8
- `name`: e.g., "Composiet schutting Rhombus Teak"
- `slug`: e.g., "schutting-rhombus-teak"  
- `image`: product photo URL
- `tone`: teak, zwart, walnoot, eiken, grijs
- `priceLabel`: "Vanaf EUR139,95"
- `specifications.Profiel`: Rhombus or Houtnerf
- `specifications.Kleur`: color name

These replace all the fake WPC/ALU/Combo/Decor data.

### Mobile breakpoint
Using the existing `useIsMobile` hook (768px breakpoint) to switch between mobile wizard and desktop sidebar layout.

### Files changed (summary)
1. `src/pages/FencePlannerPage.tsx` -- Mobile wizard layout + rename
2. `src/components/fence-planner/FenceSystemModal.tsx` -- Real products grid
3. `src/components/fence-planner/FenceDesignerView.tsx` -- Mobile responsive + real products
4. `src/components/fence-planner/BottomToolbar.tsx` -- Mobile responsive + simplified
5. `src/components/fence-planner/DesignerTopBar.tsx` -- Mobile responsive
6. `src/components/fence-planner/designerData.ts` -- Remove fake data
7. `src/components/fence-planner/types.ts` -- Simplify types
