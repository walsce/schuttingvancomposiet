

# Rebrand: Composiethekwerk.nl to Schuttingvancomposiet.nl

## Overview

Replace every occurrence of the old brand name with the new one across all files. The navbar and footer logo text will also be updated with a new accent-colored split.

## Files to Update

### 1. `index.html`
- Update `<title>`, meta description, author, canonical URL, OpenGraph tags, and Twitter tags
- Domain: `composiethekwerk.nl` becomes `schuttingvancomposiet.nl`

### 2. `src/components/Header.tsx`
- Change logo from `Composiet<span class="text-accent">hekwerk</span>.nl` to `Schuttingvan<span class="text-accent">composiet</span>.nl`

### 3. `src/components/Footer.tsx`
- Same logo text update
- Email: `info@composiethekwerk.nl` becomes `info@schuttingvancomposiet.nl`
- Copyright line: `Composiethekwerk.nl` becomes `Schuttingvancomposiet.nl`
- Update the tagline from "composiet hekwerk" to "composiet schuttingen"

### 4. `src/components/SEOHead.tsx`
- `BASE_URL` from `https://composiethekwerk.nl` to `https://schuttingvancomposiet.nl`

### 5. `src/components/JsonLd.tsx`
- Organization schema: name, url, logo, email
- Website schema: name, url, search target
- Breadcrumb schema: base URL
- Product schema: brand name, offer URL
- Article schema: author fallback, publisher name, publisher logo, mainEntityOfPage URL

### 6. `src/components/ChatWidget.tsx`
- Welcome message text
- Chat header subtitle

### 7. `src/pages/Index.tsx`
- SEO title, badge text

### 8. `src/pages/ProductPage.tsx`
- "Waarom Composiethekwerk.nl?" trust block heading and comment

### 9. `src/pages/CategoryPage.tsx`
- SEO title fallback, category hero badge text

### 10. `src/pages/AssortimentPage.tsx`
- SEO title

### 11. `src/pages/BlogPage.tsx`
- SEO title

### 12. `src/pages/BlogArticlePage.tsx`
- SEO title

### 13. `src/pages/ComparePage.tsx`
- SEO title

### 14. `src/pages/ContactPage.tsx`
- SEO title, email address displayed on page

### 15. `src/data/products.ts`
- All `seoDescription` fields that end with "Bestel bij Composiethekwerk.nl." (approx. 20+ products)

### 16. `supabase/functions/chat-advisor/index.ts`
- System prompt brand name reference

## Brand Name Styling

The accent-colored portion changes:
- **Old**: Composiet **hekwerk** .nl
- **New**: Schuttingvan **composiet** .nl

The "composiet" part gets the orange accent color (`text-accent`) in both header and footer.

## Technical Notes

- All canonical URLs, schema URLs, and OG URLs switch to `schuttingvancomposiet.nl`
- Email addresses update to `info@schuttingvancomposiet.nl`
- The edge function (chat-advisor) will be redeployed automatically after the update
- No database changes needed
- The custom knowledge/memory note about brand styling will be updated to reflect the new name

