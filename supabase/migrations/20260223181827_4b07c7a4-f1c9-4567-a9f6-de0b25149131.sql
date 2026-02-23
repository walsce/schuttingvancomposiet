-- Update product_tone enum: add new values, remove old ones
ALTER TYPE public.product_tone ADD VALUE IF NOT EXISTS 'bruin';
ALTER TYPE public.product_tone ADD VALUE IF NOT EXISTS 'wit';

-- Update product_durability enum: add co-extrusie
ALTER TYPE public.product_durability ADD VALUE IF NOT EXISTS 'co-extrusie';

-- Note: PostgreSQL doesn't support removing enum values, but old values (teak, walnoot) 
-- won't be used by new products. They remain in the enum harmlessly.