

# Fix spacing in product description markdown

## Problem
The product long description rendered via `ReactMarkdown` lacks vertical spacing between headings and paragraphs, making it look like one continuous block of text. H3 headings ("Duurzaam en onderhoudsvrij", "Eenvoudige montage", etc.) are not visually separated from surrounding paragraphs.

## Solution
Update the Tailwind `prose` classes on the `<article>` element in `src/pages/ProductPage.tsx` (around line 171) to add more spacing:

- Increase `prose-h3:mt-8` to `prose-h3:mt-10` for more top margin before subheadings
- Add `prose-h3:mb-4` (currently `mb-3`) for more breathing room below subheadings
- Add `prose-ul:mt-3 prose-ul:mb-6` for list spacing
- Add `prose-p:mt-0` to prevent double-spacing at top of paragraphs while keeping `prose-p:mb-4` for bottom

## File to modify
- `src/pages/ProductPage.tsx` -- update the prose classes on the `<article>` element in the description section (line ~171)
