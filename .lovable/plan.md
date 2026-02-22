

# Fix Product Description Styling

## Problem

The product description tab has two issues visible in the screenshot:

1. **Excessive bold text** (`**co-extrusie beschermlaag**`, `**0%**`, `**95% gerecycled materiaal**`, etc.) scattered throughout every product description -- this gives the content a distinctly AI-generated look and feel
2. **Headings lack visual hierarchy** -- the `##` and `###` headings don't have enough spacing, size differentiation, or visual weight to create a scannable, easy-to-read structure

## Changes

### 1. Remove all bold markdown from longDescription (all 23 products)

**File: `src/data/products.ts`**

Strip every `**...**` wrapper from the `longDescription` field across all products. The text content stays identical, just without the bold formatting. For example:

- `**co-extrusie beschermlaag**` becomes `co-extrusie beschermlaag`
- `**0%**` becomes `0%`
- `**95% gerecycled materiaal**` becomes `95% gerecycled materiaal`
- `**schroeven mee bij elke plank**` becomes `schroeven mee bij elke plank`

This applies to all 23 products' `longDescription` fields.

### 2. Improve prose heading styles for readability

**File: `src/pages/ProductPage.tsx`** (line 217)

Update the `article` className for the markdown rendering to give headings more breathing room and clearer visual hierarchy:

- Add `prose-h2:mt-8 prose-h2:mb-3` for spacing above/below H2s
- Add `prose-h3:mt-6 prose-h3:mb-2` for spacing above/below H3s
- Change `prose-h3:text-base` to `prose-h3:text-lg` for slightly larger sub-headings
- Add `prose-p:leading-relaxed` for more comfortable body text line-height
- Add `prose-li:leading-relaxed` for list items

This creates a clear visual rhythm: large spaced H2 sections, medium H3 sub-sections, and comfortable body text -- making the content easy to scan without relying on bold text for emphasis.

## Files Modified

| File | Changes |
|---|---|
| `src/data/products.ts` | Remove all `**...**` bold markers from `longDescription` in all 23 products |
| `src/pages/ProductPage.tsx` | Update prose classes on the markdown article element for better heading hierarchy and spacing |

