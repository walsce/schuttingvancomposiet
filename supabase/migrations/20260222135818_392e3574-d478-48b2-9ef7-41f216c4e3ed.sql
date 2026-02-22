
-- Create table for deck planner leads
CREATE TABLE public.deck_planner_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  shape_data JSONB NOT NULL DEFAULT '{}',
  selected_product TEXT,
  area_m2 NUMERIC(10,2),
  materials_list JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.deck_planner_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (lead capture form, no auth required)
CREATE POLICY "Anyone can submit deck planner leads"
ON public.deck_planner_leads
FOR INSERT
WITH CHECK (true);

-- Only service role can read leads (admin access via edge functions)
CREATE POLICY "Service role can read leads"
ON public.deck_planner_leads
FOR SELECT
USING (false);
