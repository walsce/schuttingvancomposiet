

# Fix: Infinite Re-render Loop on Category & Product Pages

## Problem
The app crashes with "Maximum update depth exceeded" when navigating to category pages. This also prevents product pages from loading. The root cause is an infinite render loop between `CategoryPage` and `ProductFilters`.

## Root Cause (step by step)
1. `CategoryPage` runs `products.filter(...)` on every render, producing a new array reference
2. This new reference is passed as `products` prop to `ProductFilters`
3. Inside `ProductFilters`, a `useMemo` hook detects the changed `products` reference, re-runs, and calls `onFiltered(result)` -- this is a side effect inside `useMemo`, which is an anti-pattern
4. `onFiltered` calls `setFilteredProducts` in `CategoryPage`, triggering a re-render
5. The re-render creates yet another new `categoryProducts` array -- back to step 2, infinite loop

## Fix (2 files)

### 1. `src/pages/CategoryPage.tsx`
- Wrap `categoryProducts` in `useMemo` so it keeps a stable reference between renders

### 2. `src/components/ProductFilters.tsx`
- Replace the side-effectful `useMemo` (lines 41-70) with a proper `useEffect`
- This ensures `onFiltered` is only called when filter/sort state actually changes, not during render

## Technical Details

**CategoryPage.tsx change:**
```text
// Before (new array every render):
const categoryProducts = products.filter((p) => p.category === slug);

// After (stable reference):
const categoryProducts = useMemo(
  () => products.filter((p) => p.category === slug),
  [slug]
);
```

**ProductFilters.tsx change:**
```text
// Before (side effect in useMemo -- anti-pattern):
useMemo(() => {
  let result = [...products];
  // ... filter & sort ...
  onFiltered(result);
}, [products, selectedTones, ...]);

// After (proper useEffect):
const filtered = useMemo(() => {
  let result = [...products];
  // ... filter & sort ...
  return result;
}, [products, selectedTones, ...]);

useEffect(() => {
  onFiltered(filtered);
}, [filtered, onFiltered]);
```

These two changes eliminate the infinite loop and restore navigation to category and product pages.

