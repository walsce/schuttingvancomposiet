

# Increase Product Thumbnail Image Quality

## Problem

The thumbnail images in the product gallery are currently 80x80px (`w-20 h-20` = 5rem = 80px), which makes them appear tiny and hard to distinguish, as highlighted in your screenshot.

## Changes

**File: `src/pages/ProductPage.tsx`** (line 117-118)

- Increase thumbnail size from `w-20 h-20` (80px) to `w-24 h-24` (96px) for better visibility and quality
- Add `object-contain` with padding so product images aren't awkwardly cropped
- Add a light background (`bg-muted`) so images with transparency look clean

This is a single two-line change in `ProductPage.tsx`.

