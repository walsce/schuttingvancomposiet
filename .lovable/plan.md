

# Full SSOT-Compliant Page Upgrade

## Current State vs. SSOT Requirements

After a thorough audit of every page, component, and data structure against the SSOT (Master SEO Website), here are all the gaps and the upgrade plan.

---

## Gap Analysis Summary

| SSOT Requirement | Current Status | Priority |
|---|---|---|
| HTML `<head>` SEO (title, meta, OG, canonical) | Generic "Lovable App" defaults | Critical |
| `<html lang="nl">` | Set to "en" | Critical |
| JSON-LD structured data (Organization, Product, BreadcrumbList, FAQPage, Article, etc.) | None | Critical |
| Semantic HTML (proper `<main>`, `<article>`, `<nav>`, heading hierarchy) | Partial -- no `<main>` on most pages, heading hierarchy inconsistent | High |
| Per-page meta titles (60 chars) and descriptions (155 chars) | None -- all pages share generic title | Critical |
| OpenGraph per page | None -- all pages share generic OG | Critical |
| Canonical URLs | Missing entirely | Critical |
| Breadcrumb navigation + BreadcrumbList schema | Only on ProductPage and BlogArticlePage | High |
| FAQ schema (FAQPage) on pages with FAQ content | Missing (Index, ProductPage have FAQ but no schema) | High |
| Internal linking (min 5 contextual + 1 CTA per page) | Partial -- some pages lack sufficient cross-links | Medium |
| CTA progression (TOFU->MOFU->BOFU) | CTAs exist but not intent-mapped | Medium |
| robots.txt with Sitemap reference | robots.txt exists but no sitemap reference | High |
| Min 3 FAQ questions per page | Index has 4, ProductPage varies, other pages have 0 | Medium |
| Content depth (min 800 words except tools) | Blog articles OK, other pages are thin | Medium |
| Footer links to revenue pages | Partial -- missing blog, compare links | Low |
| 404 page in Dutch | English text currently | Low |
| Image alt tags keyword-optimized | Generic alts | Medium |

---

## Implementation Plan

### Phase 1: SEO Infrastructure (Critical)

#### 1.1 Create `SEOHead` component
A reusable component that injects per-page SEO metadata using `document.title` and meta tag manipulation (or react-helmet-async equivalent pattern):
- `title` (60 chars, primary keyword)
- `description` (155 chars)
- `canonical` URL
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- `twitter:card`, `twitter:title`, `twitter:description`
- Accepts optional `jsonLd` prop for structured data injection

#### 1.2 Create `JsonLd` component
A lightweight component that renders `<script type="application/ld+json">` blocks. Supports:
- `Organization` (global, on every page)
- `WebSite` with `SearchAction` (homepage)
- `BreadcrumbList` (all pages except homepage)
- `Product` (product pages)
- `FAQPage` (pages with FAQ content)
- `Article` / `HowTo` (blog articles)
- `Service` (category pages)

#### 1.3 Update `index.html`
- Change `<html lang="en">` to `<html lang="nl">`
- Update default title to "Composietwinkel.nl | Premium Composiet Producten"
- Update default meta description
- Add canonical link element
- Update OG tags with proper defaults

---

### Phase 2: Page-by-Page Upgrades

#### 2.1 Homepage (`Index.tsx`)
- Add SEOHead with title: "Composietwinkel.nl | Premium Composiet voor Tuin & Gevel"
- Add JSON-LD: Organization, WebSite with SearchAction
- Add FAQPage schema for existing FAQ section
- Add breadcrumb (Home only)
- Ensure H1 contains primary keyword (already good)
- Add more internal links in content sections (link to blog, compare page)
- Wrap in semantic `<main>` element

#### 2.2 Category Pages (`CategoryPage.tsx`)
- Add SEOHead with dynamic title per category (e.g., "Composiet Gevelbekleding Kopen | Composietwinkel.nl")
- Add JSON-LD: BreadcrumbList, CollectionPage schema
- Add breadcrumb navigation (Home > Category)
- Add introductory content block with min 3 FAQ questions
- Add CTA section at bottom linking to contact/quote
- Add internal links to related categories and blog articles
- Optimize image alt tags with category keywords

#### 2.3 Product Pages (`ProductPage.tsx`)
- Add SEOHead with dynamic title (e.g., "Rhombus Teak Gevelbekleding | Composietwinkel.nl")
- Add JSON-LD: Product schema (name, description, price, image, availability, brand), BreadcrumbList, FAQPage (when FAQ exists)
- Ensure existing breadcrumbs have schema markup
- Add internal links to related blog articles and comparison page
- Optimize image alt tags with product + category keywords

#### 2.4 Assortiment Page (`AssortimentPage.tsx`)
- Add SEOHead with title: "Composiet Assortiment | Alle Producten | Composietwinkel.nl"
- Add JSON-LD: BreadcrumbList
- Add breadcrumb (Home > Assortiment)
- Add introductory SEO content block
- Add CTA section
- Add internal links to categories, blog, compare

#### 2.5 Blog Index (`BlogPage.tsx`)
- Add SEOHead with title: "Blog & Advies over Composiet | Composietwinkel.nl"
- Add JSON-LD: BreadcrumbList, CollectionPage
- Add breadcrumb (Home > Blog)
- Add internal links to product categories
- Add CTA at bottom

#### 2.6 Blog Article Pages (`BlogArticlePage.tsx`)
- Add SEOHead with dynamic title from article title
- Add JSON-LD: Article schema (headline, author, datePublished, dateModified, image, publisher), BreadcrumbList
- Add HowTo schema for installation articles
- Add FAQPage schema where applicable
- Ensure proper heading hierarchy (H1 > H2 > H3)
- Add internal links to related products and categories

#### 2.7 Compare Page (`ComparePage.tsx`)
- Add SEOHead with title: "Composiet Vergelijken | Gevelbekleding vs Schuttingen vs Vlonderplanken"
- Add JSON-LD: BreadcrumbList
- Add breadcrumb (Home > Vergelijken)
- Add FAQ section with comparison questions
- Add FAQPage schema

#### 2.8 Contact Page (`ContactPage.tsx`)
- Add SEOHead with title: "Contact & Offerte Aanvragen | Composietwinkel.nl"
- Add JSON-LD: BreadcrumbList, Organization (with contactPoint)
- Add breadcrumb (Home > Contact)
- Add FAQ section about ordering/delivery
- Add internal links to products

#### 2.9 404 Page (`NotFound.tsx`)
- Translate to Dutch
- Add internal links to homepage, categories, and contact
- Add search suggestion or popular products

---

### Phase 3: Global Components

#### 3.1 Header (`Header.tsx`)
- Add semantic `<nav aria-label="Hoofdnavigatie">` attribute
- Ensure mobile menu has proper ARIA labels

#### 3.2 Footer (`Footer.tsx`)
- Add links to Blog and Vergelijken pages
- Add structured data friendly markup
- Add "Over Ons" section reference
- Ensure all links lead to revenue-driving pages

#### 3.3 `robots.txt`
- Add `Sitemap: https://composietwinkel.nl/sitemap.xml` directive

---

### Phase 4: Data Model Enhancements

#### 4.1 Blog Articles (`blogArticles.ts`)
- Add `author` field (name, role) for E-E-A-T
- Add `updatedDate` field
- Add `relatedProducts` array linking to product slugs
- Add `relatedCategories` for internal linking automation
- Add `schemaType` field (Article, HowTo, FAQPage)

#### 4.2 Categories in Products (`products.ts`)
- Add `seoTitle`, `seoDescription`, `faq` fields to category objects
- Add `relatedBlogSlugs` for automatic internal linking on category pages

---

## New Files

| File | Purpose |
|---|---|
| `src/components/SEOHead.tsx` | Reusable per-page meta tag manager |
| `src/components/JsonLd.tsx` | JSON-LD structured data renderer |
| `src/components/Breadcrumbs.tsx` | Reusable breadcrumb with schema support |
| `src/components/FAQSection.tsx` | Reusable FAQ block with FAQPage schema |
| `src/components/CTASection.tsx` | Reusable CTA block for page bottoms |

## Modified Files

| File | Changes |
|---|---|
| `index.html` | lang="nl", updated defaults |
| `src/pages/Index.tsx` | SEOHead, JsonLd, semantic HTML, internal links |
| `src/pages/CategoryPage.tsx` | SEOHead, JsonLd, breadcrumb, FAQ, CTA, content |
| `src/pages/ProductPage.tsx` | SEOHead, Product schema, enhanced breadcrumbs |
| `src/pages/AssortimentPage.tsx` | SEOHead, breadcrumb, content, CTA |
| `src/pages/BlogPage.tsx` | SEOHead, breadcrumb, CTA |
| `src/pages/BlogArticlePage.tsx` | SEOHead, Article/HowTo schema, internal links |
| `src/pages/ComparePage.tsx` | SEOHead, breadcrumb, FAQ section |
| `src/pages/ContactPage.tsx` | SEOHead, breadcrumb, FAQ section |
| `src/pages/NotFound.tsx` | Dutch translation, internal links |
| `src/components/Header.tsx` | Semantic nav attributes |
| `src/components/Footer.tsx` | Additional links |
| `src/data/blogArticles.ts` | Author, schema, related fields |
| `src/data/products.ts` | Category SEO fields |
| `public/robots.txt` | Sitemap directive |

---

## Implementation Note

Due to the scope of changes (15+ files, 5 new components), this will be implemented in 2-3 sequential steps:
1. First: SEO infrastructure (SEOHead, JsonLd, Breadcrumbs, FAQSection, CTASection) + index.html + robots.txt
2. Second: All page upgrades (Index, Category, Product, Assortiment, Blog, Compare, Contact, 404)
3. Third: Data model enhancements + Footer/Header updates

