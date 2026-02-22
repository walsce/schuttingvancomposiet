
-- =============================================
-- ENUMS
-- =============================================
CREATE TYPE public.product_category AS ENUM ('gevelbekleding', 'schuttingen', 'vlonderplanken');
CREATE TYPE public.product_tone AS ENUM ('warm', 'neutraal', 'koel');
CREATE TYPE public.product_durability AS ENUM ('basis', 'premium', 'ultra');
CREATE TYPE public.product_type AS ENUM ('massief', 'holle-kamer', 'co-extrusie');
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- =============================================
-- USER ROLES TABLE
-- =============================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: admins can see all roles, users can see their own
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- CMS CATEGORIES
-- =============================================
CREATE TABLE public.cms_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read categories" ON public.cms_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON public.cms_categories
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- CMS PRODUCTS
-- =============================================
CREATE TABLE public.cms_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC NOT NULL DEFAULT 0,
  price_label TEXT,
  category product_category NOT NULL,
  category_id UUID REFERENCES public.cms_categories(id) ON DELETE SET NULL,
  tone product_tone,
  durability product_durability,
  product_type product_type,
  short_description TEXT,
  long_description TEXT,
  seo_title TEXT,
  seo_description TEXT,
  specifications JSONB DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  guarantee TEXT,
  delivery_time TEXT,
  dimensions JSONB,
  options JSONB,
  video_url TEXT,
  is_published BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published products" ON public.cms_products
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can read all products" ON public.cms_products
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert products" ON public.cms_products
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products" ON public.cms_products
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products" ON public.cms_products
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- CMS PRODUCT IMAGES
-- =============================================
CREATE TABLE public.cms_product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.cms_products(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read product images" ON public.cms_product_images
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage product images" ON public.cms_product_images
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- CMS PRODUCT FAQS
-- =============================================
CREATE TABLE public.cms_product_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.cms_products(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_product_faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read product FAQs" ON public.cms_product_faqs
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage product FAQs" ON public.cms_product_faqs
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- CMS ORDERS
-- =============================================
CREATE TABLE public.cms_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number SERIAL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  shipping_address JSONB,
  billing_address JSONB,
  items JSONB DEFAULT '[]',
  subtotal NUMERIC NOT NULL DEFAULT 0,
  shipping_cost NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  status order_status NOT NULL DEFAULT 'pending',
  payment_id TEXT,
  notes TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON public.cms_orders
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create orders" ON public.cms_orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all orders" ON public.cms_orders
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- CMS ORDER ITEMS
-- =============================================
CREATE TABLE public.cms_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.cms_orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.cms_products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL DEFAULT 0,
  total_price NUMERIC NOT NULL DEFAULT 0,
  options JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items" ON public.cms_order_items
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.cms_orders
      WHERE cms_orders.id = cms_order_items.order_id
      AND cms_orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create order items" ON public.cms_order_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all order items" ON public.cms_order_items
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- GOOGLE FEED SETTINGS
-- =============================================
CREATE TABLE public.google_feed_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name TEXT DEFAULT 'Schuttingvancomposiet.nl',
  store_url TEXT DEFAULT 'https://schuttingvancomposiet.lovable.app',
  currency TEXT DEFAULT 'EUR',
  brand_name TEXT DEFAULT 'Schuttingvancomposiet',
  shipping_country TEXT DEFAULT 'NL',
  shipping_price NUMERIC DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.google_feed_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read feed settings" ON public.google_feed_settings
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage feed settings" ON public.google_feed_settings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert default feed settings
INSERT INTO public.google_feed_settings (store_name) VALUES ('Schuttingvancomposiet.nl');

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_cms_products_updated_at
  BEFORE UPDATE ON public.cms_products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_categories_updated_at
  BEFORE UPDATE ON public.cms_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_orders_updated_at
  BEFORE UPDATE ON public.cms_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_google_feed_settings_updated_at
  BEFORE UPDATE ON public.google_feed_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_cms_products_category ON public.cms_products(category);
CREATE INDEX idx_cms_products_slug ON public.cms_products(slug);
CREATE INDEX idx_cms_products_published ON public.cms_products(is_published);
CREATE INDEX idx_cms_categories_slug ON public.cms_categories(slug);
CREATE INDEX idx_cms_orders_status ON public.cms_orders(status);
CREATE INDEX idx_cms_orders_user ON public.cms_orders(user_id);
CREATE INDEX idx_cms_product_images_product ON public.cms_product_images(product_id);
CREATE INDEX idx_cms_product_faqs_product ON public.cms_product_faqs(product_id);
CREATE INDEX idx_cms_order_items_order ON public.cms_order_items(order_id);
CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);
