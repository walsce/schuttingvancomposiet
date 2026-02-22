
# Switch Product Page Colors from Green to Orange

## What Changes

Replace the green (`text-primary`) color with the orange accent (`text-accent`) on key product page elements, matching the footer's branding style.

## Affected Elements

**File: `src/pages/ProductPage.tsx`** -- 5 changes:

| Element | Line | Change |
|---|---|---|
| Price label ("€25,95 per stuk") | 129 | `text-primary` to `text-accent` |
| Delivery truck icon | 134 | `text-primary` to `text-accent` |
| Guarantee shield icon | 138 | `text-primary` to `text-accent` |
| Highlight checkmark icons | 147 | `text-primary` to `text-accent` |
| "In het kort" info icon | 193 | `text-primary` to `text-accent` |

**File: `src/components/ProductCard.tsx`** -- 1 change:

| Element | Line | Change |
|---|---|---|
| Price label on product cards | 34 | `text-primary` to `text-accent` |

## What Stays Green

- CTA buttons ("Offerte Aanvragen") -- these use the green primary button style, which works well for action buttons
- Related article hover color and internal link colors -- these are navigational and green is appropriate
