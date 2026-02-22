
# Mobile-Friendly Deck Planner with Fancy Branding

## Overview
Two changes: (1) rebrand the tool with a catchy name -- "TerrasDesigner Pro" -- and (2) make the entire planner page fully mobile-responsive so it works well on phones and tablets.

## 1. Fancy Name & Branding

Rename from "Vlonderplanner" to **TerrasDesigner Pro** throughout:

- **Page title (H1):** "TerrasDesigner Pro"
- **Badge:** "Gratis online tool"
- **Subtitle:** "Ontwerp je droomterras in enkele minuten -- kies vorm, materiaal en ontvang direct je materiaallijst."
- **SEO title:** "TerrasDesigner Pro | Ontwerp je composiet terras online | Schuttingvancomposiet.nl"
- **Breadcrumb:** "TerrasDesigner Pro" instead of "Vlonderplanner"
- **Route stays** `/vlonder-planner` (no URL change to avoid breaking links)

## 2. Mobile Layout Changes

### DeckPlannerPage.tsx
- Change the two-column grid from `lg:grid-cols-[1fr_360px]` to a **stacked layout on mobile**: canvas on top, accordion sidebar below
- On mobile, the canvas takes full width with reduced padding
- Add `overflow-x-hidden` to prevent horizontal scroll
- Reduce hero padding on small screens (`pt-4 sm:pt-8`)
- Make the "Opnieuw" reset button smaller on mobile

### DeckCanvas.tsx
- Remove `max-w-[600px]` constraint so the canvas fills the available width on mobile
- The SVG viewBox stays at 600x450 but scales naturally via `w-full`
- Touch event support: add `onTouchStart`, `onTouchMove`, `onTouchEnd` handlers mirroring the mouse handlers (for freehand drawing and point dragging)

### ShapeSelector.tsx
- Change grid from `grid-cols-5` to `grid-cols-3 sm:grid-cols-5` so shape buttons don't get too tiny on phones

### LayingPatternSelector.tsx
- The existing `grid-cols-3` works well, but reduce `p-3` to `p-2` on mobile for the icon buttons
- Keep the "Hoek" stepper as-is (already compact)

### SubstructureOptions.tsx
- Already uses `grid-cols-3` and `grid-cols-2` which works well on mobile -- no changes needed

### MaterialSelector.tsx
- Already fully responsive with full-width cards -- no changes needed

---

## Technical Details

### Files to modify

**`src/pages/DeckPlannerPage.tsx`**
- Update SEO title, H1 text, badge text, subtitle, and breadcrumb label
- Change grid: `grid lg:grid-cols-[1fr_360px]` stays but canvas wrapper gets `w-full`
- Add responsive padding: `px-3 sm:px-4`, `pt-4 sm:pt-8`
- Add `overflow-x-hidden` to prevent scroll issues

**`src/components/planner/DeckCanvas.tsx`**
- Remove `max-w-[600px]` class from the SVG
- Add touch event handlers (`onTouchStart`, `onTouchMove`, `onTouchEnd`) that extract coordinates from `e.touches[0]` and call the same logic as mouse handlers
- Update `getSvgCoords` to accept both Mouse and Touch event coords

**`src/components/planner/ShapeSelector.tsx`**
- Change grid to `grid-cols-3 sm:grid-cols-5`

**`src/components/planner/LayingPatternSelector.tsx`**
- Add responsive padding to icon buttons: `p-2 sm:p-3`

### Touch Support Details (DeckCanvas)
```
getSvgCoords now accepts { clientX, clientY } instead of full MouseEvent

onTouchStart -> same as onMouseDown (for dragging) or handleFreehandDown
onTouchMove -> same as onMouseMove / handleFreehandMove  
onTouchEnd -> same as onMouseUp / handleFreehandUp
e.preventDefault() on touch events to prevent scroll while drawing
```
