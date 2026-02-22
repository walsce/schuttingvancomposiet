
# Hekplanner Step 2: Panel Designer View

## Overview
After the initial configuration (shape, ground, posts, system selection), clicking "VERDER" transitions to a **Panel Designer** view. This new full-screen view allows users to visually place fence panels along each segment, see dimensions, and switch between 2D front/plan views.

## What the Screenshots Show

1. **2D Front View** (images 46-47): Fence panels rendered as rectangles with post pillars between them. Users can click "+" to add panels. Shows the selected panel style visually (wood planks, decorative patterns, etc.)
2. **Plan/Dimension View** (image 48): Top-down segment view with dimension markers showing each panel width and post positions. Title "SegmentA - B" with total length "600 cm"
3. **3D View** (image 49): Perspective rendering of the fence (simplified for now)

## New Components to Create

### 1. `src/components/fence-planner/FenceDesignerView.tsx`
The main Step 2 container replacing the sidebar+canvas layout. Full-screen with:
- **Top bar**: Segment selector dropdown, "Restlengte" (remaining length), view mode toggle (Plan/2D/3D), zoom controls, config status text
- **Main canvas area**: Renders the selected view mode
- **Left sidebar**: Collapsible green "MENU" vertical tab to go back to configuration
- **Right sidebar**: Icon buttons (collapse menu, save, download, reset, language)
- **Bottom toolbar**: Model + Product dropdowns, panel thumbnails, color swatches

### 2. `src/components/fence-planner/PanelDesignerCanvas.tsx`
The 2D front-view SVG canvas showing:
- Ground line at bottom
- Posts as dark grey vertical rectangles at panel boundaries
- Fence panels as colored rectangles between posts (with pattern indication)
- A "+" button at the end to add another panel
- Dimension lines above showing panel widths
- Panel height visualization

### 3. `src/components/fence-planner/PlanViewCanvas.tsx`
The plan/dimension view SVG canvas showing:
- Segment title ("SegmentA - B") and total length centered at top
- Horizontal line representing the fence from above
- Post markers (dark grey squares) along the line
- Dimension arrows above showing each panel section width
- Panel sections colored to show material

### 4. `src/components/fence-planner/BottomToolbar.tsx`
The bottom toolbar with:
- "Model" dropdown (Decor, WPC, ALU, Combo)
- "Product" dropdown (Paxos/Exotics, etc.)
- "Schutting" label with green diamond
- Row of panel type thumbnail buttons (5-6 styles)
- Row of color swatches below thumbnails

### 5. `src/components/fence-planner/DesignerTopBar.tsx`
Top bar with:
- "Pagina-selectie" segment dropdown
- "Restlengte: X cm" display
- View mode toggle buttons (Plan icon, 2D, 3D)
- Zoom in/out buttons
- Fullscreen toggle
- "Config-nr.: Niet opgeslagen" status text

### 6. Update `src/components/fence-planner/types.ts`
Add new types:
- `PlacedPanel`: id, panelTypeId, colorId, widthCm, segmentIndex, position
- `ViewMode`: "plan" | "2d" | "3d"
- `DesignerState`: placedPanels per segment, activeSegmentIndex, viewMode, selectedModel, selectedProduct

## Modifications to Existing Files

### `src/pages/FencePlannerPage.tsx`
- When `step >= 1` (after clicking VERDER from config), render `FenceDesignerView` instead of the sidebar+canvas layout
- Pass all config state (system, panel type, color, segments, posts) to the designer
- Manage placed panels state at page level

## Data Flow

```text
FencePlannerPage (state owner)
  |-- step 0: Sidebar + FenceCanvas (current config view)
  |-- step 1: FenceDesignerView
        |-- DesignerTopBar (segment selector, view mode)
        |-- PanelDesignerCanvas (2D front) OR PlanViewCanvas (plan)
        |-- BottomToolbar (panel/color selection)
```

## Panel Placement Logic
- Each segment has a total length (e.g. 600 cm)
- Standard panel widths: ~182 cm (standard) + post width (~7 cm)
- "Restlengte" = total segment length minus sum of placed panels and posts
- Users click panel thumbnails in the bottom toolbar to add panels
- The "+" button on canvas also adds the currently selected panel type
- Panels stack left-to-right along the segment

## Technical Details

### Panel Types Data Structure
Each system (Decor, WPC, etc.) has panel variants with:
- Thumbnail pattern (SVG-rendered or CSS-based patterns for wood planks, lattice, mosaic, louvered)
- Standard width options
- Compatible color palette

### View Modes
- **2D Front**: SVG rendering showing panels face-on with post pillars, ground line, and "+" add button
- **Plan**: SVG rendering showing top-down with dimension arrows and measurement labels
- **3D**: Placeholder view for now (can show a simple CSS 3D perspective transform of the 2D view)

### Bottom Toolbar Panel Thumbnails
Render 5-6 panel style options as small square buttons with simplified SVG patterns:
1. Horizontal planks (wood-look)
2. Decorative organic pattern
3. Small mosaic/pixel pattern
4. Horizontal louvers/blinds
5. Vertical slats

### Responsive Behavior
- On mobile, bottom toolbar scrolls horizontally
- Top bar items wrap or simplify
- Canvas scales via viewBox

## Implementation Order
1. Add new types to `types.ts`
2. Create `DesignerTopBar.tsx`
3. Create `BottomToolbar.tsx`
4. Create `PanelDesignerCanvas.tsx` (2D front view)
5. Create `PlanViewCanvas.tsx` (plan/dimension view)
6. Create `FenceDesignerView.tsx` (assembles all above)
7. Update `FencePlannerPage.tsx` to switch to designer view on step 1
