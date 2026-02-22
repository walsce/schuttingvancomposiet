
-- Create enum types
CREATE TYPE public.crm_pipeline_stage AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost');
CREATE TYPE public.crm_activity_type AS ENUM ('note', 'call', 'email', 'status_change', 'order');

-- Create crm_contacts table
CREATE TABLE public.crm_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  phone text,
  company text,
  source text DEFAULT 'manual',
  pipeline_stage crm_pipeline_stage NOT NULL DEFAULT 'new',
  assigned_to text,
  tags text[] DEFAULT '{}',
  notes text,
  total_revenue numeric DEFAULT 0,
  last_contact_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes on crm_contacts
CREATE UNIQUE INDEX idx_crm_contacts_email ON public.crm_contacts (email);
CREATE INDEX idx_crm_contacts_pipeline ON public.crm_contacts (pipeline_stage);
CREATE INDEX idx_crm_contacts_source ON public.crm_contacts (source);

-- Create crm_activities table
CREATE TABLE public.crm_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid NOT NULL REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  type crm_activity_type NOT NULL DEFAULT 'note',
  title text,
  description text,
  metadata jsonb DEFAULT '{}',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_crm_activities_contact ON public.crm_activities (contact_id);
CREATE INDEX idx_crm_activities_created ON public.crm_activities (created_at DESC);

-- Enable RLS
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;

-- RLS policies for crm_contacts (admin-only)
CREATE POLICY "Admins can manage contacts"
ON public.crm_contacts FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS policies for crm_activities (admin-only)
CREATE POLICY "Admins can manage activities"
ON public.crm_activities FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add updated_at trigger on crm_contacts
CREATE TRIGGER update_crm_contacts_updated_at
BEFORE UPDATE ON public.crm_contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-sync: when an order is inserted, upsert crm_contacts
CREATE OR REPLACE FUNCTION public.sync_order_to_crm()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.crm_contacts (email, name, phone, source, total_revenue, last_contact_at)
  VALUES (NEW.customer_email, NEW.customer_name, NEW.customer_phone, 'order', NEW.total, now())
  ON CONFLICT (email) DO UPDATE SET
    name = COALESCE(EXCLUDED.name, crm_contacts.name),
    phone = COALESCE(EXCLUDED.phone, crm_contacts.phone),
    total_revenue = crm_contacts.total_revenue + EXCLUDED.total_revenue,
    last_contact_at = now(),
    updated_at = now();

  -- Log activity
  INSERT INTO public.crm_activities (contact_id, type, title, description, metadata)
  SELECT c.id, 'order', 'Nieuwe bestelling #' || NEW.order_number,
    'Bestelling van €' || NEW.total, jsonb_build_object('order_id', NEW.id, 'total', NEW.total)
  FROM public.crm_contacts c WHERE c.email = NEW.customer_email;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_sync_order_to_crm
AFTER INSERT ON public.cms_orders
FOR EACH ROW
EXECUTE FUNCTION public.sync_order_to_crm();
