## Problem

The rest of the site (homepage, category pages, product pages, assortiment) reads from `src/data/cmsCatalog.ts`, which holds the live **Highlander / MThekwerken** catalog imported from the CMS. The two planners still import the legacy **Gamrat WPC** list from `src/data/products.ts`:

- `src/components/fence-planner/FenceSystemModal.tsx` → `products.filter(category === "schuttingen")` (Gamrat fences)
- `src/components/planner/MaterialSelector.tsx` → `products.filter(category === "vlonderplanken")` (Gamrat decking)
- `src/components/planner/calcMaterials.ts` → looks up the selected slug in the Gamrat list, so dimensions/prices in the BOM are wrong

The fence panel style thumbnails in `src/components/fence-planner/designerData.ts` also point to `/images/wpc/...` (Gamrat renders), not Highlander imagery.

## Fix

1. **SchuttingPlanner Pro** — swap `FenceSystemModal` to source from `cmsCatalog` (`category === "schuttingen"`). Keep the same selection contract (`slug`, `name`, `colorHex`, `image`).
2. **TerrasDesigner Pro** — swap `MaterialSelector` and `calcMaterials` to source from `cmsCatalog` (`category === "vlonderplanken"`). Materials lookup, plank length/width parsing, and price math all need to resolve against the Highlander products.
3. **Panel style thumbnails** — replace the six `/images/wpc/*.webp` thumbnails in `designerData.ts` with representative Highlander product images pulled from `cmsCatalog` (matching classic-horizontaal, premium-horizontaal, verticale-latten, lamellen, aluminium, matglas where available; fall back to closest Highlander schutting image otherwise).
4. **Tone → colour map** — keep the existing `toneColorMap` (the Highlander products use the same `Tone` enum), but verify each Highlander schutting in `cmsCatalog` resolves to a hex; add any missing tone keys.
5. **No backend changes.** No edits to `cmsCatalog.ts` content, no DB migrations, no edge-function changes, no edits to `src/data/products.ts` (still used elsewhere for typings + non-planner flows).

## Verification

- Open `/planner-schutting` → "Schutting kiezen" modal shows Highlander products only, with real Highlander imagery and prices.
- Open `/planner-vlonder` → material selector lists Highlander vlonderplanken; the materials/BOM table recomputes correctly with Highlander plank dimensions and pricing.
- Panel style thumbnails in the fence designer use Highlander photography.

## Out of scope

- Restyling either planner UI
- Editing the cmsCatalog content or re-running the importer
- Touching the PDF generator, downloads, or any non-planner page
