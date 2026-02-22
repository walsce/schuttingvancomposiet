

# Free Branded PDF Lead Magnets -- Downloads Page

## PDF Content Ideas

We will create a dedicated `/downloads` page offering 6 free branded PDF guides, each targeting a specific high-intent search cluster. Users provide their email to download (lead capture).

### The 6 PDFs

| # | Title (NL) | Topic | Search Intent |
|---|---|---|---|
| 1 | **Checklist: Composiet Schutting Plaatsen** | Step-by-step checklist for installing a composite fence -- tools needed, preparation, soil assessment, drainage, post spacing, mounting | MOFU |
| 2 | **Vergelijking: Composiet vs. Houten Schuttingen** | Side-by-side comparison on price, lifespan, maintenance, aesthetics, environmental impact, warranty | MOFU |
| 3 | **Gids: Vergunningen & Regels voor Schuttingen in Nederland** | Dutch local government rules (gemeente), maximum heights, boundary rules (erfgrens), burenrecht, permit requirements per situation | TOFU |
| 4 | **Checklist: Grondvoorbereiding voor Schuttingen & Vlonders** | Soil types, drainage, foundation options (betonpoeren, paaltjes), frost depth, slope handling, ground preparation steps | TOFU |
| 5 | **Kleurengids: Het Perfecte Composiet voor Jouw Tuin** | Color selection guide with style matching, tone guidance (warm/cool), combining with garden elements, fade resistance info | BOFU |
| 6 | **Onderhoudsgids: Composiet Jarenlang Mooi Houden** | Seasonal maintenance calendar, cleaning instructions, stain removal, what to avoid, warranty conditions | TOFU |

## Implementation

### 1. New page: `src/pages/DownloadsPage.tsx`

A branded downloads/resources page at `/downloads` with:
- SEO-optimized hero section with heading "Gratis Gidsen & Checklists"
- 6 download cards in a responsive grid (2-3 columns)
- Each card shows: title, short description, bullet points of what's inside, and a "Download Gratis" button
- Clicking a download button opens a modal with an email capture form
- After submitting email, show a success message (the actual PDF generation/hosting can be added later)
- FAQ section with questions about the guides
- CTA section at the bottom

### 2. Download data: `src/data/downloads.ts`

A data file containing the 6 guide definitions with:
- `id`, `title`, `slug`, `description`, `bulletPoints`, `category` (checklist/guide/comparison), `icon`, `relatedLinks`

### 3. Email capture modal component: `src/components/DownloadModal.tsx`

A dialog/modal with:
- Guide title displayed
- Email input field
- Name input field
- Submit button "Download PDF"
- Success state with confirmation message
- Note: form submission will initially just show a success toast (no backend email storage yet -- can be added later with a database table)

### 4. Route registration: `src/App.tsx`

Add route `/downloads` pointing to `DownloadsPage`

### 5. Footer link: `src/components/Footer.tsx`

Add "Gratis Gidsen" link under "Informatie" section, linking to `/downloads`

### 6. Homepage teaser: `src/pages/Index.tsx`

Add a small section or banner promoting the free guides, between the blog teaser and FAQ sections

## Technical Details

### Download card structure
Each card will use the existing Card component with:
- A colored icon/badge indicating type (Checklist / Vergelijking / Gids)
- Title as h3
- 3-4 bullet points showing what's inside
- "Download Gratis" CTA button

### Email capture flow
1. User clicks "Download Gratis" on a card
2. Modal opens with guide title + email/name form
3. User submits -> success toast appears
4. Future enhancement: store leads in database table, send actual PDF via email

### Files to create
| File | Purpose |
|---|---|
| `src/data/downloads.ts` | Guide definitions data |
| `src/components/DownloadModal.tsx` | Email capture modal |
| `src/pages/DownloadsPage.tsx` | Downloads landing page |

### Files to modify
| File | Change |
|---|---|
| `src/App.tsx` | Add `/downloads` route |
| `src/components/Footer.tsx` | Add "Gratis Gidsen" link |
| `src/pages/Index.tsx` | Add downloads teaser section |

