

# Improve Product Page Readability and E-E-A-T Signals

## Problem

The product description content appears flat and hard to read (as seen in the screenshot of the Walnoot schutting page). Key issues:
- Description content is thin -- short, sparse paragraphs without enough depth
- No E-E-A-T (Experience, Expertise, Authority, Trust) signals on product pages
- No author/expert attribution
- No "last updated" or "reviewed by" indicators
- No trust badges or social proof near the content
- The tab-hidden description hurts crawlability (content behind tabs is deprioritized by Google)

## Changes

### 1. Remove tabs -- show description and specs together (readability + SEO)

**File: `src/pages/ProductPage.tsx`**

Replace the `Tabs` component with sequential sections. This ensures all content is always visible to crawlers and easier to scan for users. The description and specifications will be displayed as separate sections stacked vertically, each with clear headings.

### 2. Add E-E-A-T trust bar below the "In het kort" box

**File: `src/pages/ProductPage.tsx`**

Add a new trust/authority section with:
- "Beoordeeld door een composiet specialist" badge with an icon
- "Laatste update: [date]" indicator (using a new `updatedDate` field or fallback)
- "15+ jaar ervaring in composiet materialen" credibility statement
- Small trust icons (ShieldCheck, Award, Clock) for visual weight

### 3. Add "Waarom Composiethekwerk.nl?" trust block

**File: `src/pages/ProductPage.tsx`**

Add a compact trust/authority section before the CTA area with 3-4 trust points:
- Eigen bezorgservice door heel Nederland
- 15 jaar productgarantie
- Persoonlijk advies van specialisten
- Gratis sample beschikbaar

### 4. Add `updatedDate` field to product data model

**File: `src/data/products.ts`**

- Add optional `updatedDate: string` field to the `Product` interface
- Add `updatedDate` to each product (e.g., `"2026-02-15"`)
- This feeds the E-E-A-T "freshness" signal on the page

### 5. Improve description content styling

**File: `src/pages/ProductPage.tsx`**

- Add a subtle left border accent on the description section for visual hierarchy
- Add more generous padding and max-width for comfortable reading
- Style the bullet lists with checkmark icons instead of plain dots (via prose customization)

### 6. Add CTASection at the bottom of product pages

**File: `src/pages/ProductPage.tsx`**

Add the existing `CTASection` component before the footer, which is currently imported but never used on the product page.

---

## Technical Details

### Product interface change (`src/data/products.ts`)
```
// Add to Product interface:
updatedDate?: string;
```

### E-E-A-T trust bar component (inline in ProductPage.tsx)
A small horizontal bar with icons showing:
- Shield icon + "15 jaar garantie"
- Award icon + "Composiet specialist beoordeeld"  
- Clock icon + "Bijgewerkt: feb 2026"

### Tab removal
Replace the `Tabs`/`TabsList`/`TabsContent` structure with two plain `section` elements, each with their own `h2` heading. This makes all content immediately visible and crawlable.

### Files modified
| File | Change |
|---|---|
| `src/data/products.ts` | Add `updatedDate` to interface + all products |
| `src/pages/ProductPage.tsx` | Remove tabs, add E-E-A-T bar, add trust block, add CTASection, improve description styling |

