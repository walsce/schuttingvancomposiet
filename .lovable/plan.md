

# Hekplanner (Fence Planner) - Build Plan

## Overview
Build a new "SchuttingPlanner" page modeled after the MyFencePlanner screenshots. The planner lets users design a fence layout on a grid canvas, configure ground conditions, choose post types, and select a fence panel system -- then generate a materials list with lead capture.

## Page Structure

The planner is a full-screen tool (no site Header/Footer) with:
- A **landing/hero section** shown initially with a CTA "EEN PROJECT STARTEN" button
- After clicking, the **main planner view** appears with a left sidebar + grid canvas layout

## New Files to Create

### 1. `src/pages/FencePlannerPage.tsx`
- Landing hero state vs planner state toggle
- Layout: left sidebar (~340px) + canvas area (flex-1)
- Bottom-right navigation buttons: "VERDER" (next step) and "TERUG" (back)
- Accordion sidebar with 4 sections
- Mobile responsive (sidebar collapses or stacks)

### 2. `src/components/fence-planner/types.ts`
Types for the fence planner:
- `FenceShape`: "straight" | "l-shape" | "u-shape" | "custom" | "location"
- `GroundType`: "flat" | "linear-change" | "wall"
- `PostType`: "inground" | "bolt-down" | "base-plate"
- `PostColor`: "black" | "grey"
- `FenceSystem`: "wpc" | "alu" | "combo" | "decor"
- `FencePanel`: id, name, system, image placeholder
- `FenceColor`: id, name, hex, system
- `FenceSegment`: pointA, pointB, lengthCm
- `FencePlannerState`: shape, segments (array of points), ground config per segment, post config, selected system + panel + color

### 3. `src/components/fence-planner/FenceCanvas.tsx`
SVG canvas similar to DeckCanvas but for fence lines (not areas):
- Grid background with light lines
- Fence segments drawn as thick lines between points (A, B, C...)
- Segment labels showing "Segment A - B" and length in cm
- Draggable endpoint handles (black circles)
- Green highlight on the active/selected line
- Green diamond icon at center-bottom of canvas

### 4. `src/components/fence-planner/FenceShapeSelector.tsx`
Shape selector with 5 icon buttons in a 3+2 grid:
- Straight line (horizontal bar)
- L-shape right
- U-shape
- Custom draw (pencil icon)
- Location pin
Each changes the number of fence segments/points on the canvas

### 5. `src/components/fence-planner/GroundConfig.tsx`
Ground configuration panel with:
- 3 selectable options with SVG icons: "Vlak terrein", "Lineaire wijziging", "Muur invoegen"
- When "Lineaire wijziging" selected: segment selector dropdown (A-B, B-C...) + "Diff. Niveau" input in cm
- When "Muur invoegen" selected: segment selector + "Hoogte" input in cm

### 6. `src/components/fence-planner/PostModelSelector.tsx`
Post model configuration:
- "Type paalbevestiging" label with 3 icon options (in-ground, bolt-down, base-plate)
- "Kleur" label with 2 color swatches (black, grey/dark-grey)

### 7. `src/components/fence-planner/FenceSystemModal.tsx`
A dialog/modal triggered from the "Schuttingsysteem" accordion:
- Title: "Schuttingsytsteem selecteren"
- Green progress bar at top
- Grid of 4 main categories: WPC, Alu, Combo, Decor (image cards with green border on selected)
- Below: sub-panel types in a 4-column grid (Opale/Premium, Opale/Modern, Rhombus/Premium, etc.)
- Color swatches section per system type (WPC colors: Cedar, Teak, Ipe, Lichtgrijs, Donkergrijs, Ebony Black; ALU colors: Donkergrijs, Zwart)
- Two bottom buttons: "TERUG NAAR CONFIGURATIE" (outline) and "OVERNEMEN" (green)

### 8. `src/components/fence-planner/FencePlannerHero.tsx`
Landing hero component:
- Left half: large background image of composite fence (use a placeholder gradient/color)
- Right half: white area with fence panel preview images and green "EEN PROJECT STARTEN" button
- Branding text overlay on left: "Mijn Hek Planner" styled

### 9. `src/components/fence-planner/fencePresets.ts`
Utility functions:
- `getFencePoints(shape, totalLength)` -- returns Point[] for each shape preset
- `calcSegmentLength(a, b)` -- distance between two points
- `getSegmentLabels(points)` -- returns array of {label: "A - B", length: number}

## Files to Modify

### `src/App.tsx`
- Add route: `/schutting-planner` pointing to `FencePlannerPage`

## UI/UX Details from Screenshots

- Sidebar background: light grey (`bg-gray-50`)
- Accordion headers: bold serif font with green diamond bullet
- Canvas: white with subtle grid lines
- Selected items get a green border
- Navigation buttons: "VERDER" = green filled, "TERUG" = outlined with border
- The planner is full-viewport height (no site header/footer visible in planner mode)
- Color swatches are small squares with labels beneath

## Technical Approach

- Reuse existing UI components: Accordion, Button, Dialog, Select, Input, Slider
- SVG-based canvas similar to DeckCanvas pattern but simplified for line segments instead of polygons
- State managed with useState in FencePlannerPage (same pattern as DeckPlannerPage)
- Lead capture modal can reuse the existing LeadCaptureModal pattern
- Mobile: sidebar stacks above canvas on small screens, or use a sheet/drawer

## Implementation Order

1. Types + presets utilities
2. FenceCanvas (core SVG component)
3. FenceShapeSelector
4. GroundConfig
5. PostModelSelector
6. FenceSystemModal
7. FencePlannerHero
8. FencePlannerPage (assembles everything)
9. Route in App.tsx

