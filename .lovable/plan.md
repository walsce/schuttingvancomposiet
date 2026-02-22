

# Scrape Product Pages and Add Product Detail Pages

## Overview
I've scraped all the individual product pages from mthekwerken.nl and gathered detailed content including descriptions, specifications, dimensions, images, FAQs, and installation info. This plan adds that rich content to each product and creates dedicated product detail pages.

## What was scraped
I successfully scraped product pages across all three categories and extracted:

- **Gevelbekleding**: Full descriptions, dimensions (290cm x 20cm, 0.58m2 per plank), co-extrusie details, montage info, multiple product images, FAQ content
- **Schuttingen**: Detailed descriptions, height options (180cm/200cm), opbouw info, what's included per order, plank thickness (2.5cm), installation PDFs, related products, multiple images per product
- **Vlonderplanken**: Full specs (300cm x 13.8cm/14.5cm, 2.3cm/2.2cm thick), two-sided finishing options, attachment options (clips/screws), naadloos massief details, antislip coating info, installation videos

## Changes

### 1. Extend Product Data Model (`src/data/products.ts`)
Add detailed content fields to the `Product` interface:
- `description`: Full product description (HTML/markdown)
- `specifications`: Key-value pairs (dimensions, weight, material, etc.)
- `images`: Array of all product images (currently only 1 per product)
- `deliveryTime`: Delivery timeframe text
- `highlights`: Bullet-point advantages list
- `dimensions`: Structured object with length, width, thickness, coverage
- `options`: Product variants/options (height, color, attachment material)
- `videoUrl`: YouTube installation video URL (where available)
- `faq`: Array of question/answer pairs from scraped FAQ sections

Populate all existing products with the scraped detailed content, and add the missing products discovered during scraping:
- Gevelbekleding: Walnoot/Zwart, Eiken/Zwart, Sample, Hoekprofiel Eiken/Walnoot, Eindprofielen (Zwart/Eiken/Teak/Walnoot), Aluminium Regelwerk
- Schuttingen: Verticale variants (Teak/Zwart/Walnoot/Eiken/Grijs), Eiken, Grijs (houtnerf), Composiet Schuttingplank, Sample, Aluminium paal, Tuindeuren
- Vlonderplanken: Vergrijsd Eiken massief, Walnoot massief, Sample

### 2. Create Product Detail Page (`src/pages/ProductPage.tsx`)
A new dedicated product page featuring:
- **Image gallery** with thumbnail navigation (multiple images per product)
- **Product title, price, and delivery time**
- **Key highlights** as badges/bullets
- **Tabbed content area** with:
  - Omschrijving (description)
  - Specificaties (specs table)
  - FAQ (if available)
- **Product options** display (height, color, attachment choices)
- **Call-to-action buttons**: "Offerte Aanvragen" and "Sample Aanvragen" links
- **Related products** section showing other products from same category
- **Installation video** embed (where available)
- **Breadcrumb navigation**: Home > Category > Product

### 3. Update Routing (`src/App.tsx`)
Add route: `/product/:slug` pointing to `ProductPage`

### 4. Update ProductCard Component (`src/components/ProductCard.tsx`)
Change the `Link` destination from `/categorie/{category}` to `/product/{slug}` so clicking a product card goes to its detail page instead of the category page.

### 5. Update Navigation Links
Ensure category pages link product cards through to the new detail pages.

## Technical Details

### Product interface additions
```text
interface Product {
  // ... existing fields ...
  description: string;           // Rich text product description
  specifications: Record<string, string>;  // e.g. { Lengte: '290 cm', Breedte: '20 cm' }
  images: string[];              // Array of image URLs
  deliveryTime: string;          // e.g. 'Tussen de 2 en 15 werkdagen'
  highlights: string[];          // Key selling points
  dimensions?: {
    length?: string;
    width?: string;
    thickness?: string;
    coverage?: string;
  };
  options?: { label: string; values: string[] }[];
  videoUrl?: string;
  faq?: { question: string; answer: string }[];
}
```

### New files
- `src/pages/ProductPage.tsx` -- Product detail page component

### Modified files
- `src/data/products.ts` -- Extended interface + enriched product data + new products
- `src/components/ProductCard.tsx` -- Link to `/product/:slug` instead of category
- `src/App.tsx` -- Add `/product/:slug` route

