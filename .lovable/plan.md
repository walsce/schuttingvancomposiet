

# Download Cards: Replace Icons with Stock Images + Gradient

## Overview

Replace the current icon-based download cards with image-based cards featuring realistic stock photos and a gradient overlay, similar to the CategoryCard component style.

## Changes

### 1. `src/data/downloads.ts`

- Add an `image` field to each download guide (URL to a relevant Unsplash stock photo)
- Remove the `icon` import and field (no longer needed)
- Update the `DownloadGuide` interface accordingly

Stock image mapping:
| Guide | Image Theme |
|---|---|
| Checklist: Schutting Plaatsen | Person installing a fence / tools laid out |
| Composiet vs. Hout | Side-by-side wood vs composite fence |
| Vergunningen & Regels | Dutch house with garden fence |
| Grondvoorbereiding | Soil preparation / digging foundations |
| Kleurengids | Colorful composite boards / garden styling |
| Onderhoudsgids | Clean composite deck / maintenance |

### 2. `src/pages/DownloadsPage.tsx`

Redesign each card to use the image as a background with a gradient overlay (inspired by CategoryCard):
- Card has a top image section (aspect ratio ~16/9 or 4/3) with gradient overlay
- Badge and title overlaid on the image at the bottom
- Below the image: description, bullet points, and download button
- The gradient goes from dark at bottom to transparent at top, making white text readable over the photo

### 3. `src/pages/Index.tsx`

If the downloads teaser section on the homepage also uses icons, update it to match the new image-based style.

## Technical Details

- Images sourced from Unsplash (free, high-quality stock photos) via direct URLs
- Each card structure: relative container with `<img>` + gradient div overlay + text content below
- Lazy loading on all images for performance
- No icon imports needed anymore -- Lucide icon imports removed from `downloads.ts`

