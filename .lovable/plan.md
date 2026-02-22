
# Realistic Plank Preview on Canvas

## Overview
Replace the current simple line-based plank pattern on the canvas with realistic-looking plank rectangles that reflect the selected product color, laying direction, laying method (staggered/brick/running bond), and visible gaps between planks -- matching the MyDeckPlanner reference screenshot.

## What Changes

### 1. Product Color Mapping
Add a color lookup that maps each vlonderplank product slug to a realistic fill color:
- `vlonder-donker-grijs` -> dark grey (#6B6B6B)
- `vlonder-teak` -> warm teak (#B08050)
- `vlonder-vergrijsd-eiken` -> weathered oak (#9E9285)
- `vlonder-walnoot` -> walnut brown (#7A5C3E)
- `vlonder-massief-grijs` -> medium grey (#808080)
- `vlonder-massief-teak` -> rich teak (#C4935A)
- `vlonder-massief-zwart` -> near-black (#3A3A3A)
- Default (no product selected) -> neutral brown (#A08060)

### 2. Plank Rendering Instead of Lines
Replace the current `patternLines` (simple stroke lines) with `patternPlanks` -- filled rectangles representing individual planks:
- Each plank has a width matching realistic proportions (~13.8cm scaled to canvas pixels)
- A 3-4px gap between planks
- Planks are clipped to the deck shape via the existing `clipPath`
- Subtle wood-grain effect using alternating slightly varied fill colors per plank row

### 3. Laying Method Visualization
The plank layout changes based on the selected `LayingMethod`:
- **Staggered**: Random offset per row (current default behavior)
- **Brick (half verband)**: Each row offset by exactly half a plank length
- **Running (wild verband)**: Each row offset by a third of a plank length

### 4. Laying Direction Support
Planks rotate based on `LayingPattern`:
- **Horizontal**: Planks run left to right
- **Vertical**: Planks run top to bottom
- **Diagonal / Diagonal-left**: Planks at 45 degrees (with transform)
- **Chevron**: V-pattern (two diagonal halves)
- **Mixed**: Alternating sections

### 5. Background Fill
When a product is selected, the shape fill changes from the current transparent primary tint to the product's base color, giving a solid wood-look background behind the planks.

---

## Technical Details

### Files to Modify

**`src/components/planner/DeckCanvas.tsx`**
- Add a `selectedProduct` prop (string | null) to receive the selected product slug
- Add a `PRODUCT_COLORS` map from slug to hex color
- Add a `layingMethod` prop (LayingMethod) to control joint stagger pattern
- Replace the `patternLines` useMemo with a `patternPlanks` useMemo that generates an array of plank rectangle objects: `{ x, y, w, h, fill }` -- accounting for direction, method offset, and gap spacing
- Render planks as `<rect>` elements inside the existing `<g clipPath="url(#shapeClip)">` instead of `<line>` elements
- Add subtle wood grain via an SVG filter (`<feTurbulence>` + `<feColorMatrix>`) or by alternating 2-3 slightly different shades per plank
- Keep the shape outline stroke on top of the planks

**`src/pages/DeckPlannerPage.tsx`**
- Pass `selectedProduct` and `layingConfig.method` to `DeckCanvas`

### New Props on DeckCanvas
```
selectedProduct?: string | null;
layingMethod?: LayingMethod;
```

### Plank Generation Logic (pseudocode)
```
plankWidth = 13.8cm * scale (in pixels)
plankGap = 3px
plankLength varies: 300cm or 400cm scaled

For each row (spaced by plankWidth + plankGap):
  offset = method === "brick" ? halfLength * (row % 2)
         : method === "running" ? (row * length/3) % length
         : random seed based offset
  
  For each plank in row (spaced by plankLength + gap):
    push { x: startX + offset, y: rowY, w: plankLength, h: plankWidth, fill: color }
```

For diagonal patterns, the entire plank group is wrapped in a `<g transform="rotate(45, cx, cy)">` with an expanded generation area to cover the rotated bounding box.

### Visual Details
- Gap between planks: 3px (representing ~5mm real gap)
- Plank width: scaled from 13.8cm product width
- Each plank gets a very slight color variation (+/- 5% lightness) for realism
- SVG `<defs>` adds a subtle noise texture filter for wood grain effect
- Shape outline (primary color, 2px stroke) renders on top of everything
