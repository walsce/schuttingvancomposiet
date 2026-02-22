
# Add "Hoek" (Angle) Input to Laying Pattern Selector

## What's Missing
The reference screenshot shows a **"Hoek" (angle) input** with minus (-) and plus (+) buttons, positioned directly below the "Legrichtingen" grid. It displays a numeric value (e.g., 125) representing the laying angle in degrees. This control is currently absent from the `LayingPatternSelector` component.

## Changes

### 1. Add `angle` field to `LayingConfig` type
- **File:** `src/components/planner/types.ts`
- Add `angle: number` (in degrees, default 0 or 125) to the `LayingConfig` interface

### 2. Add the "Hoek" stepper input to the UI
- **File:** `src/components/planner/LayingPatternSelector.tsx`
- Insert a new section between the "Legrichting" grid and the "Startpunt" dropdown
- Render a label "Hoek", a minus button, a numeric input showing the angle value, and a plus button
- Stepping by 1 or 5 degrees per click
- Wire it to `onChange({ ...value, angle: newAngle })`

### 3. Set default angle in DeckPlannerPage
- **File:** `src/pages/DeckPlannerPage.tsx`
- Add `angle: 0` to the `defaultLayingConfig`
- Reset it in `handleReset`

### 4. Use angle in DeckCanvas plank rendering
- **File:** `src/components/planner/DeckCanvas.tsx`
- Apply the `angle` value from `layingConfig` as a rotation transform on the plank pattern group, so custom angles are reflected visually on the canvas

---

## Technical Details

**`src/components/planner/types.ts`** -- add one field:
```ts
export interface LayingConfig {
  pattern: LayingPattern;
  method: LayingMethod;
  startPoint: string;
  offsetX: number;
  offsetY: number;
  angle: number; // degrees
}
```

**`src/components/planner/LayingPatternSelector.tsx`** -- add between directions grid and start point:
```text
<Label>Hoek</Label>
[ - ]  [ 125 ]  [ + ]
```
Uses a Button with "-" / "+" and an Input in the center, styled inline.

**`src/pages/DeckPlannerPage.tsx`** -- update default:
```ts
const defaultLayingConfig: LayingConfig = {
  ...existing fields,
  angle: 0,
};
```

**`src/components/planner/DeckCanvas.tsx`** -- apply rotation:
- Accept `angle` (from `layingConfig`) and wrap the plank `<g>` in a `transform="rotate(angle, cx, cy)"` so the planks rotate to the specified angle on the canvas.
