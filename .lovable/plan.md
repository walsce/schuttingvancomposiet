

# Remove Silvadec Branding and Create Branded PDFs

## Overview

Two major changes: (1) strip all "Silvadec" references across the entire site, replacing with generic composiet terminology or "SchuttingenvanComposiet.nl" where appropriate, and (2) generate new branded PDF documents from the extracted content using a server-side PDF generator.

---

## Part 1: Remove "Silvadec" from All Content

### Files affected

| File | Occurrences | Change |
|------|------------|--------|
| `src/data/products.ts` | ~735 | Remove "Silvadec" from all product names, descriptions, longDescriptions, seoTitles, seoDescriptions, FAQs, and specifications (remove `Merk: 'Silvadec'`) |
| `src/data/downloads.ts` | ~30 | Remove "Silvadec" from all download descriptions and bullet points |
| `src/data/blogArticles.ts` | ~10 | Remove "Silvadec" from blog article content |
| `src/pages/DownloadsPage.tsx` | ~3 | Remove from FAQ answers, SEO meta, and JSON-LD |

### Naming convention after removal

- "Silvadec Atmosphere 175 Wit Ceruse" becomes "Atmosphere 175 Wit Ceruse"
- "Silvadec composiet schuttingen" becomes "composiet schuttingen"
- "Silvadec Reversil aluminium onderbalken" becomes "Reversil aluminium onderbalken"
- Product range names (Atmosphere, Elegance, Emotion, Nuances) stay -- these describe the product line, not the manufacturer
- "Silvawash" and "Silvaction" product names stay as-is -- these are specific product names for cleaning/maintenance items

---

## Part 2: Generate Branded PDFs

Since the original PDFs contain complex technical diagrams that cannot be recreated, we will take a hybrid approach:

### A. Text-based guides (checklists, gidsen) -- Generate new branded PDFs

Create a backend function that generates branded PDF documents for the non-technical guides:
- Checklist: composiet schutting plaatsen
- Checklist: grondvoorbereiding
- Gids: vergunningen en regels
- Kleurengids
- Milieuverklaring (EPD) summary
- Onderhoudsadvies

Each generated PDF will include:
- SchuttingenvanComposiet.nl header with accent color branding
- Dutch content extracted from the download data
- Bullet points, tables, and structured sections
- Footer with website URL and contact info
- No Silvadec references

### B. Technical installation PDFs -- Keep originals with disclaimer

The 8 technical installation PDFs contain detailed engineering diagrams, exploded views, and measurement tables that cannot be programmatically recreated. These will:
- Remain as-is in `public/downloads/`
- Have their download card descriptions updated to say "Fabrikantdocumentatie" (manufacturer documentation) rather than referencing Silvadec by name

### Technical approach for PDF generation

- Create a backend function `generate-branded-pdf` using Deno + jsPDF (or similar)
- The function takes a document ID, pulls content from a structured data source, and returns a branded PDF
- Generated PDFs are stored in file storage and served from there
- Download cards link to the generated PDFs instead of the originals

---

## Implementation Order

1. Strip "Silvadec" from `src/data/products.ts` (~28 products: names, descriptions, SEO, FAQs, specs)
2. Strip "Silvadec" from `src/data/downloads.ts` (descriptions, bullet points)
3. Strip "Silvadec" from `src/data/blogArticles.ts` (article content)
4. Strip "Silvadec" from `src/pages/DownloadsPage.tsx` (FAQ, meta, JSON-LD)
5. Create `generate-branded-pdf` backend function
6. Generate branded PDFs for the 6 text-based guides
7. Update download paths to point to new branded PDFs
8. Update seed-products function to match de-branded data

---

## Technical Details

### Backend function: `generate-branded-pdf`

```text
supabase/functions/generate-branded-pdf/index.ts

- Uses jsPDF library for PDF generation
- Accepts document config (title, sections, bullets, tables)
- Applies branded header: "SchuttingenvanComposiet.nl" in accent color
- Generates A4 PDF with proper margins
- Uploads to Lovable Cloud file storage
- Returns public URL
```

### Product name examples (before/after)

```text
BEFORE: "Silvadec Atmosphere 175 Wit Ceruse"
AFTER:  "Atmosphere 175 Wit Ceruse"

BEFORE: "Silvadec Nuances Ipe Vlonderplank"  
AFTER:  "Nuances Ipe Vlonderplank"

BEFORE: "Silvadec Aluminium Schutting Zwart"
AFTER:  "Aluminium Schutting Zwart"
```

### SEO title examples (before/after)

```text
BEFORE: "Silvadec Atmosphere 175 Wit Ceruse | Composiet Gevelbekleding"
AFTER:  "Atmosphere 175 Wit Ceruse | Composiet Gevelbekleding"
```

