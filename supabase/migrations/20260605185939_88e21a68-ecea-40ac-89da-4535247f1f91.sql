CREATE OR REPLACE FUNCTION public.import_composiet_bulk(payload jsonb)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  p jsonb;
  image_url text;
  inserted_count integer := 0;
  pid uuid;
  img_idx integer;
BEGIN
  FOR p IN SELECT * FROM jsonb_array_elements(payload) LOOP
    pid := gen_random_uuid();
    INSERT INTO public.cms_products (
      id, slug, name, category, category_id, price,
      short_description, long_description, seo_title, seo_description,
      price_label, is_published, sort_order, guarantee, delivery_time
    ) VALUES (
      pid,
      p->>'slug',
      p->>'name',
      (p->>'category')::product_category,
      NULLIF(p->>'category_id', '')::uuid,
      COALESCE(NULLIF(p->>'price', '')::numeric, 0),
      p->>'short',
      NULLIF(p->>'long', ''),
      LEFT((p->>'name') || ' | SchuttingvanComposiet.nl', 60),
      LEFT(COALESCE(p->>'short', p->>'name'), 160),
      COALESCE(NULLIF(p->>'price_label', ''), CASE WHEN COALESCE(NULLIF(p->>'price', '')::numeric, 0) > 0 THEN '€' || replace(COALESCE(NULLIF(p->>'price', '')::numeric, 0)::text, '.', ',') ELSE 'Prijs op aanvraag' END),
      true,
      inserted_count,
      '25 jaar garantie',
      '5-10 werkdagen'
    );

    img_idx := 0;
    FOR image_url IN SELECT jsonb_array_elements_text(COALESCE(p->'images', '[]'::jsonb)) LOOP
      INSERT INTO public.cms_product_images (product_id, image_url, alt_text, is_primary, sort_order)
      VALUES (pid, image_url, p->>'name', img_idx = 0, img_idx);
      img_idx := img_idx + 1;
    END LOOP;

    inserted_count := inserted_count + 1;
  END LOOP;
  RETURN inserted_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.import_composiet_bulk(jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.import_composiet_bulk(jsonb) TO authenticated;