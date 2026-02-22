

# Phase 4: Data Model Enhancements (SSOT Compliance)

The SEO infrastructure (SEOHead, JsonLd, Breadcrumbs, FAQSection, CTASection) and all page-level upgrades are already in place. What remains is upgrading the **data models** so that SEO metadata, E-E-A-T signals, and internal linking data live in the data layer (the single source of truth) rather than being hardcoded in page components.

---

## What Changes

### 1. Blog Articles (`src/data/blogArticles.ts`)

Add fields to the `BlogArticle` interface and populate them for every article:

| New Field | Type | Purpose |
|---|---|---|
| `author` | `{ name: string; role: string }` | E-E-A-T: shows expertise and authorship |
| `updatedDate` | `string` | Signals freshness to search engines via `dateModified` |
| `relatedProducts` | `string[]` | Product slugs for automatic internal linking on article pages |
| `relatedCategories` | `string[]` | Category slugs for cross-linking to category pages |
| `schemaType` | `"Article" \| "HowTo" \| "FAQPage"` | Controls which JSON-LD schema is emitted per article |

Then update `BlogArticlePage.tsx` to:
- Display the author name and role
- Use `updatedDate` in the Article schema's `dateModified`
- Render internal links to related products and categories automatically
- Conditionally emit `HowTo` schema for installation articles

### 2. Categories in Products (`src/data/products.ts`)

Add fields to each category object:

| New Field | Type | Purpose |
|---|---|---|
| `seoTitle` | `string` | Per-category meta title (60 chars, keyword-optimized) |
| `seoDescription` | `string` | Per-category meta description (155 chars) |
| `faq` | `{ q: string; a: string }[]` | Category-specific FAQs (moves hardcoded data from `CategoryPage.tsx` into the data layer) |
| `relatedBlogSlugs` | `string[]` | Blog slugs for automatic internal linking on category pages |

Then update `CategoryPage.tsx` to:
- Read `seoTitle` and `seoDescription` from the category data instead of building them inline
- Read FAQs from `category.faq` instead of the hardcoded `categoryFaqs` object
- Render links to related blog articles using `relatedBlogSlugs`

### 3. Product Page Enhancements (`ProductPage.tsx`)

With the blog data now containing `relatedProducts`, the product page can:
- Find blog articles that reference this product and display them as "Gerelateerde artikelen" links
- This creates bidirectional internal linking (article links to product, product links back to article)

---

## Files Modified

| File | Changes |
|---|---|
| `src/data/blogArticles.ts` | Add `author`, `updatedDate`, `relatedProducts`, `relatedCategories`, `schemaType` to interface + all articles |
| `src/data/products.ts` | Add `seoTitle`, `seoDescription`, `faq`, `relatedBlogSlugs` to category objects |
| `src/pages/BlogArticlePage.tsx` | Display author, use updatedDate in schema, render related product/category links, conditional HowTo schema |
| `src/pages/CategoryPage.tsx` | Use category data for SEO title/description/FAQ instead of hardcoded values, render related blog links |
| `src/pages/ProductPage.tsx` | Add related blog articles section with bidirectional linking |
| `src/components/JsonLd.tsx` | Add `howToSchema` helper for installation articles |

---

## Why This Matters (SSOT Compliance)

- **SSOT Rule 5 (Database Structure)**: All content metadata must live in structured data tables, not scattered across page components
- **SSOT Rule 6 (Internal Linking)**: Automated based on shared entity relationships
- **SSOT Rule 18 (E-E-A-T)**: Author bio with role demonstrates expertise and authority
- **SSOT Rule 9 (Schema Strategy)**: HowTo schema for installation guides, proper dateModified
- **SSOT Rule 4 (Entity-Driven)**: All entities must interlink -- this enables product-to-blog and blog-to-category cross-references
