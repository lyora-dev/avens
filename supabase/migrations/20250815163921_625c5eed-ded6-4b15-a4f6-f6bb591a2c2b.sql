-- Create the missing update_updated_at function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create comprehensive schema for EVNTING.COM restructure

-- Hero banners table for home page
CREATE TABLE public.hero_banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  cta_text TEXT,
  cta_link TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Event types table (Wedding, Corporate, etc.)
CREATE TABLE public.event_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  hero_image_url TEXT,
  description TEXT,
  short_description TEXT,
  process_steps JSONB, -- Array of {title, description} objects
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Rental services table
CREATE TABLE public.rental_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Client logos table
CREATE TABLE public.client_logos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Awards table (different from achievements)
CREATE TABLE public.awards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  image_url TEXT,
  year INTEGER,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Products table for e-commerce
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Event galleries (update existing galleries table)
ALTER TABLE public.galleries ADD COLUMN IF NOT EXISTS event_type_id UUID REFERENCES public.event_types(id);
ALTER TABLE public.galleries ADD COLUMN IF NOT EXISTS before_image_url TEXT;
ALTER TABLE public.galleries ADD COLUMN IF NOT EXISTS after_image_url TEXT;
ALTER TABLE public.galleries ADD COLUMN IF NOT EXISTS is_hero BOOLEAN DEFAULT false;

-- About page content
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  founder_name TEXT,
  founder_image_url TEXT,
  founder_note TEXT,
  founder_quote TEXT,
  mission TEXT,
  vision TEXT,
  full_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enquiry requests table
CREATE TABLE public.enquiry_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  event_type TEXT,
  product_id UUID REFERENCES public.products(id),
  source_page TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_requests ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Hero banners are publicly readable" ON public.hero_banners FOR SELECT USING (is_active = true);
CREATE POLICY "Event types are publicly readable" ON public.event_types FOR SELECT USING (is_active = true);
CREATE POLICY "Rental services are publicly readable" ON public.rental_services FOR SELECT USING (is_active = true);
CREATE POLICY "Client logos are publicly readable" ON public.client_logos FOR SELECT USING (is_active = true);
CREATE POLICY "Awards are publicly readable" ON public.awards FOR SELECT USING (is_active = true);
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "About content is publicly readable" ON public.about_content FOR SELECT USING (true);

-- Admin policies
CREATE POLICY "Admins can manage hero banners" ON public.hero_banners FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage event types" ON public.event_types FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage rental services" ON public.rental_services FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage client logos" ON public.client_logos FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage awards" ON public.awards FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage about content" ON public.about_content FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can read enquiry requests" ON public.enquiry_requests FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Public can insert enquiry requests
CREATE POLICY "Anyone can insert enquiry requests" ON public.enquiry_requests FOR INSERT WITH CHECK (true);

-- Add triggers for updated_at
CREATE TRIGGER update_hero_banners_updated_at BEFORE UPDATE ON public.hero_banners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_event_types_updated_at BEFORE UPDATE ON public.event_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rental_services_updated_at BEFORE UPDATE ON public.rental_services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_client_logos_updated_at BEFORE UPDATE ON public.client_logos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_awards_updated_at BEFORE UPDATE ON public.awards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.event_types (name, slug, short_description, sort_order) VALUES
('Weddings', 'weddings', 'Dream weddings with personalized touches', 1),
('Corporate Events', 'corporate', 'Professional corporate gatherings', 2),
('Social Gatherings', 'social', 'Memorable social celebrations', 3),
('Festivals', 'festivals', 'Large-scale festival management', 4),
('Exhibitions', 'exhibitions', 'Trade shows and exhibitions', 5),
('Destination Events', 'destination', 'Exotic destination celebrations', 6);

INSERT INTO public.rental_services (name, description, sort_order) VALUES
('German Hanger', 'Premium German-style event structures', 1),
('Lighting', 'Professional event lighting solutions', 2),
('DJ / Audio Video', 'Complete sound and visual equipment', 3),
('Industrial Event AC', 'Climate control for large venues', 4),
('Stage Setup', 'Professional stage construction', 5),
('LED Walls', 'High-resolution LED display walls', 6);