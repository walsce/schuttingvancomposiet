
# Deck Planner Landing Page + Schutting Planner Teaser on Homepage

## 1. New file: `src/components/planner/DeckPlannerHero.tsx`

Create a landing/hero page for the Deck Planner, following the same pattern as `FencePlannerHero.tsx`:

- Full-width hero with `cta-bg.jpg` background, dark gradient overlay
- Badge "Gratis Online Tool"
- Serif heading: "TerrasDesigner Pro"
- Subtitle about designing your deck online
- CTA button "Start de Planner"
- 3-step section ("Hoe werkt het?"):
  - Step 1: Kies uw vorm (Ruler icon)
  - Step 2: Kies materiaal & legpatroon (Settings2 icon) 
  - Step 3: Ontvang materiaallijst (FileText icon)
- USP bar (Gratis, Geen account nodig, Direct materiaallijst, Inclusief onderconstructie)
- Final CTA section
- Includes Header and Footer

## 2. Update: `src/pages/DeckPlannerPage.tsx`

Add a `started` state (like the fence planner). When `started` is false, show the new `DeckPlannerHero` with an `onStart` callback. When true, show the current planner UI.

## 3. Update: `src/pages/Index.tsx`

Replace the current simple "Deck Planner teaser" section (lines 207-220) with a richer two-column section featuring both planners side by side:

- Section title: "Online Planners" or "Gratis Ontwerp Tools"
- Two cards side by side (stacking on mobile):
  - Card 1: TerrasDesigner Pro -- icon, short description, CTA link to `/vlonder-planner`
  - Card 2: Schutting Planner -- icon, short description, CTA link to `/schutting-planner`
- Each card has a colored icon, title, 1-line description, and a button
- Replaces the existing single deck planner teaser section

## Technical Details

### `DeckPlannerHero.tsx` structure
Mirrors `FencePlannerHero.tsx` exactly in layout and styling, with deck-specific content:
- Steps adapted for deck workflow (shape, material/pattern, materials list)
- USPs adapted (e.g., "Inclusief onderconstructie" instead of "Export naar CSV")

### `DeckPlannerPage.tsx` changes
- Add `const [started, setStarted] = useState(false);`
- If not started, render `<DeckPlannerHero onStart={() => setStarted(true)} />`  with its own SEOHead
- If started, render existing planner UI (unchanged)

### `Index.tsx` changes
- Replace the deck planner teaser (lines 207-220) with a new "Gratis Ontwerp Tools" section
- Two side-by-side cards with icons (Layers for deck, Fence/Grid3x3 for schutting), title, description, and CTA button
- Styled with `bg-accent/10 border-b border-border` matching current section
