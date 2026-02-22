
# Phase 1: Fix Build Errors + Full E-Commerce CMS Plan

This plan has two parts: an immediate fix for the build errors, followed by a comprehensive roadmap for your own CMS/e-commerce platform.

---

## Part A: Fix Build Errors (Immediate)

Three TypeScript errors where `catch(err)` / `catch(error)` variables are typed as `unknown` and need casting.

### File 1: `supabase/functions/batch-generate-images/index.ts`
- Line 242: Change `err.message` to `(err instanceof Error ? err.message : String(err))`
- Line 253: Change `error.message` to `(error instanceof Error ? error.message : String(error))`

### File 2: `supabase/functions/generate-product-image/index.ts`
- Line 127: Change `error.message` to `(error instanceof Error ? error.message : String(error))`

---

## Part B: Full E-Commerce CMS Platform

Yes, this is absolutely possible. Here is the complete architecture. Given the size, this will be built incrementally over multiple sessions.

### What You Get

1. **Admin CMS Dashboard** (`/admin`) -- Full product management with CRUD
2. **Google Shopping Feed** (`/api/google-feed`) -- Automated XML feed for Google Ads
3. **Database-driven storefront** -- Products served from database instead of hardcoded file
4. **Image upload system** -- Upload product images to storage
5. **Mollie-ready checkout architecture** -- One-page checkout (Mollie integration added later)
6. **Order management** -- Track orders and status
7. **Customer accounts** -- Optional login for order history

### Database Schema (New Tables)

```text
cms_products
  - id (uuid, PK)
  - name, slug, price, price_label
  - category (enum: gevelbekleding, schuttingen, vlonderplanken)
  - tone, durability, product_type
  - short_description, long_description
  - seo_title, seo_description
  - specifications (jsonb)
  - highlights (text[])
  - features (text[])
  - guarantee, delivery_time
  - dimensions (jsonb)
  - options (jsonb)
  - video_url
  - is_published (boolean)
  - sort_order (integer)
  - created_at, updated_at

cms_product_images
  - id (uuid, PK)
  - product_id (FK -> cms_products)
  - image_url, alt_text
  - is_primary (boolean)
  - sort_order (integer)

cms_product_faqs
  - id (uuid, PK)
  - product_id (FK -> cms_products)
  - question, answer
  - sort_order (integer)

cms_categories
  - id (uuid, PK)
  - name, slug, description
  - image_url
  - seo_title, seo_description
  - sort_order (integer)

cms_orders
  - id (uuid, PK)
  - order_number (serial)
  - customer_email, customer_name, customer_phone
  - shipping_address (jsonb)
  - billing_address (jsonb)
  - items (jsonb)
  - subtotal, shipping_cost, total
  - status (enum: pending, paid, processing, shipped, delivered, cancelled)
  - payment_id (for Mollie later)
  - notes
  - created_at, updated_at

cms_order_items
  - id (uuid, PK)
  - order_id (FK -> cms_orders)
  - product_id (FK -> cms_products)
  - product_name, quantity, unit_price, total_price
  - options (jsonb)

google_feed_settings
  - id (uuid, PK)
  - store_name, store_url, currency
  - brand_name, shipping_country, shipping_price
  - updated_at
```

### Authentication and Roles
- Admin users managed via `user_roles` table with `app_role` enum
- RLS policies: Only admins can write to CMS tables
- Public can read published products (for storefront)

### Admin Dashboard Pages
- `/admin` -- Dashboard overview (order count, product count, revenue)
- `/admin/products` -- Product list with search, filter, bulk actions
- `/admin/products/new` -- Add product form (all fields, image upload, FAQ editor)
- `/admin/products/:id` -- Edit product
- `/admin/categories` -- Category management
- `/admin/orders` -- Order list with status management
- `/admin/feed` -- Google Shopping feed settings and preview
- `/admin/settings` -- Store settings

### Google Shopping Feed
- Edge function that generates XML feed from `cms_products`
- Fields: id, title, description, link, image_link, price, availability, brand, condition, google_product_category, gtin/mpn
- Accessible at a public URL for Google Merchant Center
- Auto-updates as products change in CMS

### One-Page Checkout (Mollie-Ready)
- Cart stored in localStorage (or DB for logged-in users)
- Single-page checkout: shipping info, order summary, payment
- Creates order in `cms_orders` with status "pending"
- Mollie webhook endpoint ready for payment confirmation (integration added later)

### Migration from Hardcoded Data
- Seed script to import current `products.ts` data into the new database tables
- Storefront pages updated to query database instead of importing from file
- Existing URLs and SEO preserved

### Implementation Order
1. Fix build errors (immediate)
2. Create database tables + RLS policies + auth
3. Admin login page
4. Admin product CRUD (list, create, edit, delete)
5. Image upload in admin
6. Seed existing products into database
7. Update storefront to read from database
8. Google Shopping feed edge function
9. Cart + one-page checkout UI
10. Order management admin
11. Mollie payment integration (future session)

### Files Changed (Phase 1 only -- build fix)
1. `supabase/functions/batch-generate-images/index.ts` -- Fix 2 TypeScript errors
2. `supabase/functions/generate-product-image/index.ts` -- Fix 1 TypeScript error
