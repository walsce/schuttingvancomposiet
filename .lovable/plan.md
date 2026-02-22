
# Make H2 Headings More Visible in Product Descriptions

## Problem

The H2 headings in the product description tab (e.g., "Duurzaam en onderhoudsvrij", "Flexibele montage", "Voordelen in een oogopslag") are barely distinguishable from body text. They lack sufficient size, weight, and spacing to create a clear visual break.

## Changes

**File: `src/pages/ProductPage.tsx`** (line 217)

Update the prose classes on the `article` element to make H2s stand out:

- Increase H2 size from `prose-h2:text-xl` to `prose-h2:text-2xl` for more visual weight
- Add `prose-h2:font-bold` to ensure they are clearly bold (headings, not body text)
- Add `prose-h2:border-b prose-h2:border-border prose-h2:pb-2` to add a subtle bottom border separator
- Increase top margin from `prose-h2:mt-8` to `prose-h2:mt-10` for more breathing room between sections

This makes each H2 act as a clear section divider -- larger text, bold weight, and a subtle underline -- so readers can instantly scan the content structure.

## Files Modified

| File | Change |
|---|---|
| `src/pages/ProductPage.tsx` | Update prose H2 classes for size, weight, and border separator |
