# Update downloadable customer assets

## Audit findings

The downloads page lists **17 guides** with up-to-date copy in `src/data/downloads.ts`. However the actual PDF files are out of sync:

**1. Missing from storage (4 PDFs — cards currently 404 on download):**
- `handleiding-composiet-tuindeur.pdf`
- `checklist-tuindeur-op-maat.pdf`
- `handleiding-composiet-gevelbekleding.pdf`
- `onderhoud-rhombus-profielen.pdf`

**2. Stale generator content** — `supabase/functions/generate-branded-pdf/index.ts` (the source of all PDFs) still references the **old Gamrat lines and colours** we removed everywhere else:
- Lines/products: Classic, Premium, Elegance, Komorowa, Eco, Slim, Max
- Colours: Berg Eiken, Honing Eiken, Naturel Eiken, Orzech, Grafit
- Outdated prices and spec tables
- No definitions for the 4 new docs above

So even the 13 PDFs that *do* exist in storage contain copy that contradicts the website. Customers downloading them today get the old catalog.

**3. Orphan asset:** `branded-pdfs/onderhoud-elegance-emotion.pdf` in storage — no longer referenced anywhere. Delete.

**4. Minor data fix:** `wpc-prijslijst` currently re-uses `productcatalogus.pdf`. Should have its own `prijslijst.pdf` or be removed from the listing.

**5. Styling:** the branded-PDF chrome itself (green header bar, orange accent stripe, 25-jaar garantie badge, footer) is on-brand and stays as-is — only the *content* sections need rewriting.

## Plan

### Step 1 — Rewrite `supabase/functions/generate-branded-pdf/index.ts`

Replace the `documents: BrandedDoc[]` array entirely so it contains exactly the **17 ids** from `src/data/downloads.ts`, in the same order. For each doc:
- Strip every mention of Classic / Premium / Elegance / Komorowa / Eco / Slim / Max / Orzech / Grafit / Berg-Honing-Naturel Eiken / Miodowy / Gorski.
- Rewrite spec tables and bullets around the live taxonomy: **standaard composiet vs. naadloos massief vs. Rhombus**, tones **teak / eiken / walnoot / grijs / donker grijs / vergrijsd eiken / zwart**, categories **vlonderplanken / schuttingen / tuindeuren / gevelbekleding / accessoires**.
- Use real 2026 prices from the live catalog (pricing memory).
- Add four brand-new doc bodies for the missing PDFs:
  - `handleiding-composiet-tuindeur` — inhangen, scharnier-/slotset, aansluiting op schutting, onderhoud.
  - `checklist-tuindeur-op-maat` — dagmaat/sponningmaat, draairichting, slot/greep, kleurmatch.
  - `handleiding-composiet-gevelbekleding` — aluminium regelwerk h.o.h. 50 cm, ventilatie, hoek-/eindprofielen, tinten-combo.
  - `onderhoud-rhombus-profielen` — reinigen tussen ribbels, lakbus kleurherstel, jaarschema.
- Add a separate `wpc-prijslijst` body (or drop the card from `downloads.ts` — see Step 3).

Keep the existing cover layout, page chrome, table renderer, footer and "25 jaar garantie" badge — purely a content swap.

### Step 2 — Regenerate every PDF

Invoke the edge function once with `{ all: true }` so all 17 PDFs are rebuilt and uploaded to `product-images/branded-pdfs/` (upsert: true → overwrites the 13 stale ones and creates the 4 missing ones).

### Step 3 — Tidy `src/data/downloads.ts`

- Point `wpc-prijslijst` at `pdfUrl("prijslijst")` (Step 1 generates it) instead of re-using `productcatalogus.pdf`.
- No other data changes — the 17 cards, categories, images and bullets are already aligned with the new catalog.

### Step 4 — Delete the orphan

Remove `branded-pdfs/onderhoud-elegance-emotion.pdf` from storage so it can't be deep-linked.

### Step 5 — Verify

- `psql` list of `branded-pdfs/*` shows exactly 17 files matching the `downloads` ids.
- Open `/downloads`, click through each card → PDF opens, cover shows correct title, no Classic/Premium/Elegance copy anywhere (`pdftotext` spot check on 3 PDFs).
- Confirm PressBar / FAQ / SEO references aren't affected.

## Out of scope

- Changing the visual PDF template (header bar, fonts, colours) — already on brand.
- Adding new download categories beyond the existing 17 entries.
- Email-gated lead capture flow (already works).
