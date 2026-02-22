
# Noindex + Custom Favicon

## 1. Add noindex to the entire site

The simplest and most reliable approach: add a `<meta name="robots" content="noindex, nofollow">` tag directly in `index.html`. This ensures every page is noindexed regardless of which component renders -- no need to touch individual page components.

**File: `index.html`**
- Add `<meta name="robots" content="noindex, nofollow" />` inside `<head>`

## 2. Create an SVG favicon (composiet fence)

Since I can create SVG files in code, I'll design a simple, clean fence icon as an SVG favicon -- vertical fence boards with a horizontal rail, using the site's primary green color (`#2F5233`). This will look crisp at any size.

**File: `public/favicon.svg`** (new)
- A minimal composiet fence silhouette: 4-5 vertical planks with a horizontal rail
- Uses the site's primary green color
- Clean, recognizable at 32x32px

**File: `index.html`**
- Replace the current `<link rel="icon" href="/favicon.ico">` reference (currently implicit) with `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`

### Technical details

Both changes happen in `index.html` (adding noindex meta + updating favicon link), plus one new SVG file in `public/`.
