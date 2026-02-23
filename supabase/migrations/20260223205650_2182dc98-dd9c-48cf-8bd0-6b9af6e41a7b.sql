
-- Enum for email automation types
CREATE TYPE public.email_automation_type AS ENUM (
  'order_confirmation',
  'cart_abandonment_1',
  'cart_abandonment_2',
  'checkout_abandonment_1',
  'checkout_abandonment_2'
);

-- Enum for email status
CREATE TYPE public.email_status AS ENUM (
  'queued',
  'sent',
  'failed',
  'cancelled'
);

-- Email automations queue table
CREATE TABLE public.email_automations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.email_automation_type NOT NULL,
  recipient_email text NOT NULL,
  recipient_name text,
  status public.email_status NOT NULL DEFAULT 'queued',
  scheduled_for timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb,
  html_body text,
  subject text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.email_automations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage email automations"
  ON public.email_automations FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can insert email automations"
  ON public.email_automations FOR INSERT
  WITH CHECK (true);

-- Abandoned carts table
CREATE TABLE public.abandoned_carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  email text,
  cart_data jsonb NOT NULL DEFAULT '[]'::jsonb,
  checkout_started boolean NOT NULL DEFAULT false,
  recovered boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert abandoned carts"
  ON public.abandoned_carts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update abandoned carts"
  ON public.abandoned_carts FOR UPDATE
  USING (true);

CREATE POLICY "Admins can read abandoned carts"
  ON public.abandoned_carts FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Index for session lookups
CREATE INDEX idx_abandoned_carts_session ON public.abandoned_carts (session_id);

-- Index for email queue processing
CREATE INDEX idx_email_automations_queue ON public.email_automations (status, scheduled_for)
  WHERE status = 'queued';

-- Trigger: auto-queue order confirmation email on new order
CREATE OR REPLACE FUNCTION public.queue_order_confirmation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.email_automations (type, recipient_email, recipient_name, status, scheduled_for, subject, metadata)
  VALUES (
    'order_confirmation',
    NEW.customer_email,
    NEW.customer_name,
    'queued',
    now(),
    'Orderbevestiging #' || NEW.order_number,
    jsonb_build_object('order_id', NEW.id, 'order_number', NEW.order_number, 'total', NEW.total, 'items', NEW.items)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_queue_order_confirmation
  AFTER INSERT ON public.cms_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.queue_order_confirmation();

-- Update trigger for abandoned_carts updated_at
CREATE TRIGGER update_abandoned_carts_updated_at
  BEFORE UPDATE ON public.abandoned_carts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
