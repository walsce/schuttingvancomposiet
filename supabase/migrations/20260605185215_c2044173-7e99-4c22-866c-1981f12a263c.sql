CREATE OR REPLACE FUNCTION public.import_composiet_bulk(payload jsonb)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  p jsonb;
  img jsonb;
  inserted_count integer := 0;
  pid uuid;
  img_idx integer;
BEGIN
  FOR p IN SELECT * FROM jsonb_array_elements(payload) LOOP
    pid := gen_random_uuid();
    INSERT INTO public.cms_products (
      id, slug, name, category, category_id, price,
      short_description, seo_title, seo_description, is_published, sort_order
    ) VALUES (
      pid,
      p->>'slug',
      p->>'name',
      (p->>'category')::product_category,
      (p->>'category_id')::uuid,
      COALESCE((p->>'price')::numeric, 0),
      p->>'short',
      LEFT((p->>'name') || ' | SchuttingvanComposiet.nl', 60),
      LEFT(p->>'short', 160),
      true,
      inserted_count
    );
    img_idx := 0;
    FOR img IN SELECT * FROM jsonb_array_elements_text(p->'images') LOOP
      INSERT INTO public.cms_product_images (product_id, image_url, alt_text, is_primary, sort_order)
      VALUES (pid, img #>> '{}', p->>'name', img_idx = 0, img_idx);
      img_idx := img_idx + 1;
    END LOOP;
    inserted_count := inserted_count + 1;
  END LOOP;
  RETURN inserted_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.import_composiet_bulk(jsonb) TO service_role;