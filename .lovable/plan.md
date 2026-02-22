

# Fix Horizontal Overflow on Vlonder Planner (Mobile)

## Problem
The planner page creates unwanted horizontal scroll on mobile devices. Multiple elements can contribute to this: the header top bar, the `container` class with 2rem padding, the MaterialsList table, and content inside accordion panels that doesn't respect the viewport boundary.

## Root Causes Identified

1. **Root wrapper** on DeckPlannerPage has no overflow constraint -- only `<main>` has `overflow-x-hidden`, but the Header and Footer sit outside it
2. **`container` class** uses `padding: 2rem` (32px each side), which on narrow phones can combine with wide child elements
3. **MaterialsList Table** -- HTML tables expand to fit content and can push beyond viewport
4. **Header top bar** text ("Gratis offerte aanvragen") may not wrap on narrow screens
5. **Global CSS** -- no body-level overflow-x prevention

## Fix Strategy

Apply a layered defense so no single element can cause horizontal scroll:

### 1. Global `overflow-x: hidden` on body (`src/index.css`)
- Add `overflow-x: hidden` to the `body` rule to act as the ultimate safety net

### 2. Root wrapper overflow on DeckPlannerPage (`src/pages/DeckPlannerPage.tsx`)
- Add `overflow-x-hidden` to the outer `<div>` so the entire page (including Header/Footer) is clipped

### 3. MaterialsList table scroll containment (`src/components/planner/MaterialsList.tsx`)
- Wrap the table in a `div` with `overflow-x-auto` so it scrolls within its container instead of pushing the page

### 4. Header top bar mobile fix (`src/components/Header.tsx`)
- Add `overflow-hidden` and `text-ellipsis` / `whitespace-nowrap` to prevent the top bar from pushing content
- Reduce top bar padding on small screens

### 5. Accordion content overflow (`src/pages/DeckPlannerPage.tsx`)
- Add `overflow-hidden` to the accordion sidebar wrapper to contain any rogue child elements

---

## Technical Details

### `src/index.css`
Add `overflow-x: hidden` to the `body` styles.

### `src/pages/DeckPlannerPage.tsx`
- Line 140: Change outer `<div>` from `min-h-screen flex flex-col bg-background` to `min-h-screen flex flex-col bg-background overflow-x-hidden`
- Line 213: Change sidebar `<div>` from `space-y-4` to `space-y-4 min-w-0 overflow-hidden`

### `src/components/planner/MaterialsList.tsx`
- Line 19: Wrap the `<Table>` in `<div className="overflow-x-auto">` so wide tables scroll inside their box

### `src/components/Header.tsx`
- Line 22: Add `overflow-hidden` to top bar container
- Line 23: Add `min-w-0` and `overflow-hidden` to the inner flex containers to prevent text overflow

