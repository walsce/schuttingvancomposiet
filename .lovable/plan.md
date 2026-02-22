

# Downloads page: fix titles and images

## 1. `src/data/downloads.ts` — Title casing and images

Change all titles from title case to sentence case (only capitalize the first word and proper nouns):

| Current title | New title |
|---|---|
| Checklist: Composiet Schutting Plaatsen | Checklist: composiet schutting plaatsen |
| Vergelijking: Composiet vs. Houten Schuttingen | Vergelijking: composiet vs. houten schuttingen |
| Gids: Vergunningen & Regels voor Schuttingen | Gids: vergunningen & regels voor schuttingen |
| Checklist: Grondvoorbereiding voor Schuttingen & Vlonders | Checklist: grondvoorbereiding voor schuttingen & vlonders |
| Kleurengids: Het Perfecte Composiet voor Jouw Tuin | Kleurengids: het perfecte composiet voor jouw tuin |
| Onderhoudsgids: Composiet Jarenlang Mooi Houden | Onderhoudsgids: composiet jarenlang mooi houden |

Replace images with more topic-relevant Unsplash photos:

| Guide | Current image issue | New image theme |
|---|---|---|
| Schutting plaatsen | Generic fence photo | Fence installation / construction tools on wood |
| Composiet vs. hout | Abstract texture | Wood planks vs composite side by side / old vs new fence |
| Vergunningen & regels | House exterior (not related) | Dutch neighborhood with fences / official documents |
| Grondvoorbereiding | Garden plants (not soil) | Soil digging / foundation work / concrete posts |
| Kleurengids | Modern house (not colors) | Composite board color samples / garden styling |
| Onderhoudsgids | Generic house | Cleaning a deck / pressure washer / maintenance |

## 2. `src/pages/DownloadsPage.tsx` — Page heading casing

Update the hero heading from "Gratis Gidsen & Checklists" to "Gratis gidsen & checklists" for consistent sentence case.

## 3. `src/components/Footer.tsx`

Check and update the "Gratis Gidsen" footer link to "Gratis gidsen" if needed.

## Files to modify

- `src/data/downloads.ts` — titles (sentence case) + image URLs
- `src/pages/DownloadsPage.tsx` — hero heading + SEO title casing
- `src/components/Footer.tsx` — link text casing

