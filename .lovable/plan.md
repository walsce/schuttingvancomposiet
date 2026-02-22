

# Fix downloads page hero and CTA button visibility

## Issues identified

1. **Hero breadcrumbs have a white background bar** -- The `Breadcrumbs` component has hardcoded `bg-card border-b border-border` classes, creating a white strip inside the dark hero section. This looks broken.

2. **CTA "Bekijk Assortiment" button barely visible** -- The outline button uses `border-primary-foreground/30 text-primary-foreground` on the green (`bg-primary`) background. The 30% opacity border makes it nearly invisible.

## Changes

### 1. `src/components/Breadcrumbs.tsx`
- Make the breadcrumb wrapper styles configurable via an optional `className` prop
- Default keeps current styling, but allow overriding for dark sections
- Remove the hardcoded `bg-card border-b border-border` from the inner wrapper when a custom class is passed

### 2. `src/pages/DownloadsPage.tsx`
- Pass a dark-friendly className to the Breadcrumbs component in the hero, removing the white background and border so it blends into the dark hero
- Remove the wrapping `<div className="mb-6 text-background/60">` and instead style breadcrumbs directly for the dark context

### 3. `src/components/CTASection.tsx`
- Increase the outline button border opacity from `border-primary-foreground/30` to `border-primary-foreground/60` for better visibility
- Ensure the button text remains clearly readable on the green background

## Technical details

**Breadcrumbs fix approach**: Add a `variant` prop (`"default" | "dark"`) to the Breadcrumbs component. When `variant="dark"`, skip the `bg-card border-b border-border` wrapper styles and use transparent/dark-friendly text colors instead. This keeps other pages unaffected.

**Files to modify**:
- `src/components/Breadcrumbs.tsx` -- add variant prop
- `src/pages/DownloadsPage.tsx` -- use dark variant for hero breadcrumbs
- `src/components/CTASection.tsx` -- improve outline button contrast
