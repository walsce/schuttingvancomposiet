
# Fix Broken Product Images with Real CDN URLs

## Problem
All 15 fence products (sc-9 through sc-23) have broken image URLs pointing to a non-existent `felix-distribution.b-cdn.net` domain. The actual product images live on `cdn.forestia-group.com` (Felix Distribution's real CDN). The bottom toolbar thumbnails in the fence designer also reference the same broken URLs.

## Solution
Replace all broken image URLs with the real working CDN URLs scraped from felixdistribution.com. Update both `products.ts` and `designerData.ts`.

## Changes

### 1. Fix product images in `src/data/products.ts`
Replace `image` and `images[]` fields for all 15 products:

| ID | Product | New Image URL |
|---|---|---|
| sc-9 | Composiet schuttingplank Premium | `https://cdn.forestia-group.com/storage/7d92b26c-0c0e-432b-91a7-front/m-boston-lame-premium-21x150mm_default-2.jpg?w=750&f=webp&q=85` |
| sc-10 | Composiet schuttingplank Premium XL | `https://cdn.forestia-group.com/storage/973c89cc-2133-4274-8f28-front/m-lame-premium-21x310mm-fsc_default.jpg?w=750&f=webp&q=85` |
| sc-11 | Composiet schuttingplank Modern | `https://cdn.forestia-group.com/storage/1c509db2-515e-496d-b322-front/m-boston-modern-21x150mm_default-2.jpg?w=750&f=webp&q=85` |
| sc-12 | Aluminium schuttingplank | `https://cdn.forestia-group.com/storage/e96e85e1-98f9-4738-9c73-front/m-boston-lame-alu-opale_default.jpg?w=750&f=webp&q=85` |
| sc-13 | Aluminium lamellen 45mm | `https://cdn.forestia-group.com/storage/ad8d64ff-8bb0-4cff-9df8-front/m-boston-lame-alu-open45_default.jpg?w=750&f=webp&q=85` |
| sc-14 | Aluminium lamellen 100mm | `https://cdn.forestia-group.com/storage/edb1b2ad-9fb5-4b8e-9970-front/m-boston-lame-alu-open100_default.jpg?w=750&f=webp&q=85` |
| sc-15 | Aluminium rhombus lamellen | `https://cdn.forestia-group.com/storage/551ccfd7-2335-44c9-ab57-front/m-boston-lame-alu-rhombus_default.jpg?w=750&f=webp&q=85` |
| sc-16 | Aluminium rhombus lamellen breed | `https://cdn.forestia-group.com/storage/705a4fc9-dc35-4cc4-9de8-front/m-boston-lame-alu-rhombus-150_default.jpg?w=750&f=webp&q=85` |
| sc-17 | Decorpaneel Blokkenpatroon | `https://cdn.forestia-group.com/storage/03a5d086-706c-4811-a70d-front/m-boston-decor-crios-horizontal_default.jpg?w=750&f=webp&q=85` |
| sc-18 | Decorpaneel Streeppatroon | `https://cdn.forestia-group.com/storage/609ba26b-d744-4936-a1d9-front/m-boston-decor-hera-horizontal_default.jpg?w=750&f=webp&q=85` |
| sc-19 | Decorpaneel Golfpatroon | `https://cdn.forestia-group.com/storage/de462963-4ed1-447e-8de2-front/m-boston-decor-lamia-horizontal_default.jpg?w=750&f=webp&q=85` |
| sc-20 | Decorpaneel Cirkelpatroon | `https://cdn.forestia-group.com/storage/f98efaab-f989-4711-b2b4-front/m-boston-decor-paxos-horizontal_default.jpg?w=750&f=webp&q=85` |
| sc-21 | Decorpaneel Matglas Smal | `https://cdn.forestia-group.com/storage/bbcb3fa5-16ae-4285-965a-front/m-boston-decor-verre300_default.jpg?w=750&f=webp&q=85` |
| sc-22 | Decorpaneel Matglas Breed | `https://cdn.forestia-group.com/storage/90080926-1be2-4ea8-9dc9-front/m-boston-decor-verre450_default.jpg?w=750&f=webp&q=85` |
| sc-23 | Zonnepaneel voor schutting | `https://cdn.forestia-group.com/storage/6ada5f90-08a7-45e5-9a15-front/m-helios_default.jpg?w=750&f=webp&q=85` |

### 2. Fix panel style thumbnails in `src/components/fence-planner/designerData.ts`
Update the `image` field for each panel style to use the same real CDN URLs (matching the representative product).

### 3. No category changes needed
All 15 products already belong to `category: 'schuttingen'` which is an existing category. The screenshot shows they display correctly grouped -- the only issue is the broken image URLs.

## Files changed
1. `src/data/products.ts` -- Replace 15 broken image URLs (both `image` and `images[]` fields)
2. `src/components/fence-planner/designerData.ts` -- Replace 11 broken thumbnail image URLs
