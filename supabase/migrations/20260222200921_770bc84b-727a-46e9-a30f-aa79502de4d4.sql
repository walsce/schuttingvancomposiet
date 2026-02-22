
-- Fix enum values to match actual product data
-- No data exists yet so safe to recreate

-- 1. product_tone: warm/neutraal/koel -> teak/zwart/walnoot/eiken/grijs
ALTER TABLE cms_products ALTER COLUMN tone TYPE text;
DROP TYPE product_tone;
CREATE TYPE product_tone AS ENUM ('teak', 'zwart', 'walnoot', 'eiken', 'grijs');
ALTER TABLE cms_products ALTER COLUMN tone TYPE product_tone USING tone::product_tone;

-- 2. product_durability: basis/premium/ultra -> standaard/premium/massief
ALTER TABLE cms_products ALTER COLUMN durability TYPE text;
DROP TYPE product_durability;
CREATE TYPE product_durability AS ENUM ('standaard', 'premium', 'massief');
ALTER TABLE cms_products ALTER COLUMN durability TYPE product_durability USING durability::product_durability;

-- 3. product_type: massief/holle-kamer/co-extrusie -> plank/paneel/profiel
ALTER TABLE cms_products ALTER COLUMN product_type TYPE text;
DROP TYPE product_type;
CREATE TYPE product_type AS ENUM ('plank', 'paneel', 'profiel');
ALTER TABLE cms_products ALTER COLUMN product_type TYPE product_type USING product_type::product_type;
