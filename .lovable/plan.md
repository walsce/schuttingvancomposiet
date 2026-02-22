
# Missing Features from MyDeckPlanner Screenshots

After comparing the reference screenshots with the current implementation, here are the components and options that need to be added or enhanced.

## What's Missing

### 1. Extended Ground Types (image-28)
The current dropdown has 3 options but the reference shows 4:
- Bodem verdicht (exists)
- Ondergrond van beton (exists as "Beton" -- rename)
- Plat dak, dakterrassen met afdichtfolie (missing)
- Zachte grond / zand (missing)

### 2. Usage Type with Visual Icons (image-29 + image-31)
The reference shows "Type terrasgebruik" as 3 visual icon options (not 2 text buttons). Currently we only have "Privegebruik" and "Commercieel". The reference appears to show 3 distinct usage patterns. We'll add a third option ("Intensief") and use SVG icons matching the screenshot style.

### 3. Substructure Beam Selection (image-29)
Currently missing entirely. The reference shows "Selecteer onderbouw" with a selectable beam product card (e.g., "StructurAL Alu 60x40mm - 400cm"). We'll add a substructure beam selector to the Onderconstructie accordion section.

### 4. Joint Construction / Voegconstructie (image-29)
Missing. The reference shows "Selecteer voegconstructie" with two options:
- Dubbele balken
- Xtend Stootbeugel
Plus a "Wil je een dubbele balkconstructie gebruiken? Ja / Nee" toggle.

### 5. Leveling / Nivellering (image-30)
Missing entirely. The reference shows:
- Stand (adjustable pedestal)
- Fundatie-schroeven (foundation screws)
These are visual card-style selections.

### 6. Slope / Hoogtepunten (image-30)
Missing. Simple toggle: "zonder helling" / "met helling" (without/with slope).

### 7. Laying Methods / Legmethoden (image-31)
The reference shows 3 laying methods (brick-like patterns): staggered, brick, and running bond. These are different from the existing "Legrichtingen" (directions). We need a separate "Legmethoden" selector alongside the existing direction selector.

### 8. More Laying Directions / Legrichtingen (image-31)
The reference shows 6 direction options (horizontal, vertical, diagonal-right, diagonal-left, chevron/herringbone, mixed). We currently only have 3. We need to expand to 6.

### 9. Start Point Selection (image-31)
Missing. A dropdown to select "Welk punt moet het startpunt van de terrasbekleding zijn?" with options A, B, C, D, etc. (matching the corner labels).

### 10. Plank Offset / First Plank Position (image-31)
Missing. Two inputs:
- "naar links/rechts met: 0 cm"
- "boven/onder door: 0 cm"
These control where the first full plank starts.

### 11. Freeform Drawing + Floor Plan Upload (image-32)
The reference shows "Vrije vorm tekenen" (freeform draw) and "Plattegrond uploaden" (upload floor plan). We already have freeform via draggable points. We can add a visual option for "custom" in the shape selector and a placeholder for floor plan upload.

---

## Technical Details

### Files to Modify

**`src/components/planner/types.ts`**
- Add `UsageType` value: "intensive"
- Add `GroundType` values: "platdak" | "zand"
- Expand `LayingPattern` to include: "diagonal-left" | "chevron" | "mixed"
- Add `LayingMethod` type: "staggered" | "brick" | "running"
- Add `LevelingType`: "stand" | "fundatie"
- Expand `SubstructureConfig` with: `beam`, `jointType`, `doubleBeam`, `leveling`, `slope`, `layingMethod`, `startPoint`, `offsetX`, `offsetY`

**`src/components/planner/SubstructureOptions.tsx`**
- Add 3-icon usage type selector (Prive / Commercieel / Intensief)
- Expand ground type dropdown with 2 new options
- Add substructure beam selector (card-style)
- Add joint construction selector (Dubbele balken / Xtend Stootbeugel) with image-style cards
- Add "Dubbele balkconstructie?" Ja/Nee toggle
- Add Nivellering selector (Stand / Fundatie-schroeven)
- Add Hoogtepunten toggle (zonder helling / met helling)

**`src/components/planner/LayingPatternSelector.tsx`**
- Add "Legmethoden" section with 3 brick-pattern SVG options
- Expand "Legrichtingen" from 3 to 6 direction options
- Add start point dropdown (A, B, C, D...)
- Add plank offset inputs (horizontal cm, vertical cm)

**`src/components/planner/ShapeSelector.tsx`**
- Add a "Vrije vorm" (freeform) option with a pencil/draw icon
- Add a "Plattegrond uploaden" placeholder option

**`src/components/planner/EdgeFinishing.tsx`**
- Change "Randplanken toevoegen" switch to Ja/Nee button toggle (matching reference style)

**`src/components/planner/calcMaterials.ts`**
- Add beam materials to calculation
- Add joint construction materials
- Add leveling materials (stands or screws)
- Adjust waste factors for new laying methods

**`src/pages/DeckPlannerPage.tsx`**
- Wire up new state fields for all additions
- Pass new props to updated components
- Reset new fields in handleReset

### New State Fields in DeckPlannerPage
- `substructure.beam`: string (selected beam product)
- `substructure.jointType`: "dubbele-balken" | "stootbeugel"
- `substructure.doubleBeam`: boolean
- `substructure.leveling`: "stand" | "fundatie"
- `substructure.slope`: boolean
- `layingMethod`: "staggered" | "brick" | "running"
- `startPoint`: string (corner letter, e.g. "A")
- `plankOffsetX`: number (cm)
- `plankOffsetY`: number (cm)

### UI Style
All new selectors follow the existing card-style pattern: bordered boxes with primary highlight when selected, SVG icons where applicable, consistent with the current design language.
