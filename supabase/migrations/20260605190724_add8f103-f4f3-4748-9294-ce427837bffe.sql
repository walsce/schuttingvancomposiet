REVOKE EXECUTE ON FUNCTION public.import_composiet_bulk(jsonb) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.import_composiet_bulk(jsonb) TO service_role;