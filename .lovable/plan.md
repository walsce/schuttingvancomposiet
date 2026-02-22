

# Rename Blog to Artikelen and Move to Footer Only

## Changes

### 1. `src/components/Header.tsx`
- Remove the `{ label: "Blog", href: "/blog" }` entry from the `navLinks` array

### 2. `src/components/Footer.tsx`
- Change "Blog & Advies" link text to "Artikelen" (the href `/blog` stays the same since the route doesn't change)

### 3. `src/pages/BlogPage.tsx`
- Update the SEO title from "Blog & Advies over Composiet" to "Artikelen over Composiet"
- Update the hero section heading from "Blog & Advies" to "Artikelen"
- Update the hero subtitle text accordingly
- Update the breadcrumb label from "Blog" to "Artikelen"

### 4. `src/pages/BlogArticlePage.tsx`
- Update the breadcrumb label "Blog" to "Artikelen" in the breadcrumb trail

### 5. `src/components/JsonLd.tsx`
- If there are any schema references to "Blog", update them to "Artikelen"

### 6. `index.html`
- No changes needed (blog is not referenced in the HTML head)

## What stays the same
- The URL routes (`/blog`, `/blog/:slug`) remain unchanged to preserve any existing links or SEO value
- The blog page content and filtering functionality stays identical
- Only the visible label changes from "Blog" to "Artikelen"

