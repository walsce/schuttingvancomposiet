
-- Extend product_category enum with new categories from mthekwerken
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'tuindeuren';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'accessoires';

-- Staging table for scraped data
CREATE TABLE IF NOT EXISTS public.scrape_staging (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  source_url text NOT NULL UNIQUE,
  kind text NOT NULL,
  category_slug text,
  title text,
  raw jsonb NOT NULL DEFAULT '{}'::jsonb,
  imported boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.scrape_staging TO authenticated;
GRANT ALL ON public.scrape_staging TO service_role;

ALTER TABLE public.scrape_staging ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage scrape_staging"
ON public.scrape_staging
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_scrape_staging_updated_at
BEFORE UPDATE ON public.scrape_staging
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
