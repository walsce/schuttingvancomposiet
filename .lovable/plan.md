
# Vlonderplanner Upgrade -- MyDeckPlanner-inspired Features

## Overview
Upgrade the existing deck planner to match the feature set visible in the MyDeckPlanner screenshots. The current tool has 3 shapes and a simple 3-step flow. We will add more shape presets, corner labels on the canvas, accordion-based sidebar sections, laying pattern selection, substructure options, and edge finishing toggles.

## What Changes

### 1. More Shape Presets (8 total)
Add 5 new shapes to match the reference screenshots:
- **Rectangle** (existing)
- **L-shape top-right** (existing, rename to "L-vorm rechts")
- **L-shape top-left** (new, mirrored L)
- **L-shape bottom-right** (new)
- **L-shape bottom-left** (new)
- **U-shape** (existing)
- **T-shape** (new)
- **Circle / Ovaal** (new -- approximated as an octagon for polygon-based area calculation)

The ShapeSelector grid changes from 3 columns to 4 columns with 2 rows.

### 2. Canvas Improvements
- **Corner labels**: Show letters (A, B, C, D...) at each corner point of the shape, positioned just outside the polygon -- matching the reference screenshots
- **Dimension labels in cm**: Switch display from meters (e.g. "4.80m") to centimeters (e.g. "480 cm") to match the reference
- **Midpoint drag handles**: Add smaller midpoint handles on each edge for finer shape manipulation
- **Area display above canvas** in green text like the reference ("Oppervlakte: 15.12 m2")

### 3. Accordion Sidebar (replaces step-based flow)
Replace the current 3-step wizard with an accordion-based sidebar (like the reference), so all sections are visible and expandable simultaneously:

- **Terrasvorm** (expanded by default) -- shape selector + dimension inputs
- **Keuze vlonderplank** -- material/product selector
- **Legpatroon** -- laying pattern options (new)
- **Onderconstructie** -- substructure options (new)
- **Resultaat / Materiaallijst** -- final list (gated behind lead capture)

### 4. Laying Pattern Selection (new section)
Add a new component for choosing the plank laying direction/pattern:
- **Horizontaal** (planks run left-right)
- **Verticaal** (planks run top-bottom)  
- **Diagonaal** (45 degrees)

Each option shown as a small icon/thumbnail. This is stored in state and affects the visual preview on the canvas (planks drawn as lines inside the shape).

### 5. Substructure Options (new section)
Add configuration options matching the reference:
- **Gebruik**: Privegebruik / Commercieel gebruik (toggle)
- **Ondergrond**: Dropdown -- Bodem verdicht, Beton, Tegels
- **Opbouwhoogte**: Slider or input (in cm)

These feed into the materials calculation to adjust rail spacing and pad count.

### 6. Edge Finishing / Randafwerking
- **Welke kanten grenzen aan muur?**: Toggle per side (A-B, B-C, C-D, D-A)  
- **Randplanken**: Ja / Nee toggle
- Sides marked as "wall" get no edge trim; open sides get edge trim boards added to the materials list

### 7. Updated Materials Calculation
Extend `calcMaterials.ts` to account for:
- Laying pattern (diagonal adds ~15% waste)
- Substructure type (commercial = closer rail spacing)
- Edge trim boards when selected
- More accurate clip/screw counts based on plank dimensions

### 8. Plank Preview on Canvas
When a product is selected, draw horizontal/vertical/diagonal lines inside the shape to visually represent the plank layout direction -- similar to the wood-texture view in the reference screenshots.

---

## Technical Details

### Files to Create
- `src/components/planner/LayingPatternSelector.tsx` -- 3-option pattern selector with SVG icons
- `src/components/planner/SubstructureOptions.tsx` -- usage type, ground type, build height inputs
- `src/components/planner/EdgeFinishing.tsx` -- wall-side toggles and edge trim toggle

### Files to Modify
- `src/components/planner/types.ts` -- add new PresetShape values, LayingPattern type, SubstructureConfig type, EdgeConfig type
- `src/components/planner/presets.ts` -- add point generators for 5 new shapes
- `src/components/planner/ShapeSelector.tsx` -- expand to 4x2 grid with 8 shapes and new SVG paths
- `src/components/planner/DeckCanvas.tsx` -- add corner labels (A, B, C...), show dimensions in cm, draw plank pattern lines, add midpoint handles, move area display above canvas
- `src/components/planner/DimensionInputs.tsx` -- show values in cm (multiply by 100 for display, divide for storage)
- `src/components/planner/calcMaterials.ts` -- incorporate laying pattern waste factor, substructure adjustments, edge trim boards
- `src/pages/DeckPlannerPage.tsx` -- replace step wizard with accordion layout using Radix Accordion, add new state for laying pattern / substructure / edge config, wire up new components

### State Additions (DeckPlannerPage)
- `layingPattern`: "horizontal" | "vertical" | "diagonal"
- `substructure`: { usage: "private" | "commercial", ground: string, buildHeight: number }
- `edgeConfig`: { wallSides: boolean[], addEdgeBoards: boolean }

### Layout Change
The current layout is `grid lg:grid-cols-[1fr_340px]`. This stays the same but the sidebar switches from conditional step rendering to an always-visible accordion with all sections. The lead capture modal still gates the final materials list.
