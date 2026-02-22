

# Redesign Fence Planner Hero Page

## Problem
The current hero page is plain -- a flat green gradient on the left with placeholder panels on the right. It doesn't match the polished, professional style of the rest of the website (hero images, accent colors, USPs, serif headings, etc.).

## Design Approach
Redesign to match the main website's aesthetic: full-width hero with a real background image, clear value proposition, step indicators, and trust signals -- all using the existing design system (primary green, accent orange, Fraunces serif headings, DM Sans body).

## Changes to `src/components/fence-planner/FencePlannerHero.tsx`

### 1. Full-Width Hero Section (top)
- Full-width hero with the existing `cta-bg.jpg` as background (reusing the asset already in `src/assets/`)
- Dark gradient overlay (matching homepage hero pattern)
- Large serif heading: "Schutting Planner"
- Subtitle explaining the tool
- Prominent CTA button using accent color (orange, matching site convention)
- Badge/pill above the heading: "Gratis Online Tool"

### 2. Steps Section (below hero)
- Replace the 4 blank "Paneel" boxes with 3 illustrated steps:
  - Step 1: Kies uw vorm (icon: layout/shapes)
  - Step 2: Configureer panelen (icon: settings)
  - Step 3: Ontvang materiaallijst (icon: file-text/download)
- Each step shown as a card with an icon, number badge, title, and short description
- Uses the existing card styling with primary/accent colors

### 3. Trust/USP Bar
- A compact bar with 3-4 USPs (Gratis, Geen account nodig, Direct materiaallijst, Export naar CSV)
- Matches the homepage USP bar pattern

### 4. Final CTA
- Large centered button "Start de Planner" with arrow icon
- Secondary text: "Geen account nodig -- direct beginnen"

### Layout
- Single-column, vertically stacked (no split screen)
- Header and Footer included for consistent navigation (currently missing)
- Responsive: stacks naturally on mobile

### Technical Notes
- Import `Header` and `Footer` components
- Import `cta-bg.jpg` from assets (already exists)
- Use Lucide icons: `Ruler`, `Settings2`, `FileText`, `ArrowRight`, `Check`
- No new dependencies needed
