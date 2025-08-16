-- Create or replace timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Profiles table to manage admin access
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  display_name text,
  is_admin boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY IF NOT EXISTS "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.profiles p
  WHERE p.id = auth.uid() AND p.is_admin = true
));

CREATE POLICY IF NOT EXISTS "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Admins can update any profile"
ON public.profiles FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.profiles p
  WHERE p.id = auth.uid() AND p.is_admin = true
));

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  featured_image_url text,
  content text,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Blogs are publicly readable"
ON public.blogs FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Admins can insert blogs"
ON public.blogs FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can update blogs"
ON public.blogs FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can delete blogs"
ON public.blogs FOR DELETE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

DROP TRIGGER IF EXISTS update_blogs_updated_at ON public.blogs;
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- News table
CREATE TABLE IF NOT EXISTS public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_desc text,
  content text,
  image_url text,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "News are publicly readable"
ON public.news FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Admins can insert news"
ON public.news FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can update news"
ON public.news FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can delete news"
ON public.news FOR DELETE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

DROP TRIGGER IF EXISTS update_news_updated_at ON public.news;
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text,
  short_desc text,
  occurred_at date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Achievements are publicly readable"
ON public.achievements FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Admins can insert achievements"
ON public.achievements FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can update achievements"
ON public.achievements FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can delete achievements"
ON public.achievements FOR DELETE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

DROP TRIGGER IF EXISTS update_achievements_updated_at ON public.achievements;
CREATE TRIGGER update_achievements_updated_at
BEFORE UPDATE ON public.achievements
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Galleries (events)
CREATE TABLE IF NOT EXISTS public.galleries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  event_date date,
  cover_image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Galleries are publicly readable"
ON public.galleries FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Admins can insert galleries"
ON public.galleries FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can update galleries"
ON public.galleries FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can delete galleries"
ON public.galleries FOR DELETE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

DROP TRIGGER IF EXISTS update_galleries_updated_at ON public.galleries;
CREATE TRIGGER update_galleries_updated_at
BEFORE UPDATE ON public.galleries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Gallery images
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id uuid NOT NULL REFERENCES public.galleries(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  sort_order int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Gallery images are publicly readable"
ON public.gallery_images FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Admins can insert gallery images"
ON public.gallery_images FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can update gallery images"
ON public.gallery_images FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can delete gallery images"
ON public.gallery_images FOR DELETE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

-- Contact requests (sensitive)
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  message text,
  source_page text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can create a contact request
CREATE POLICY IF NOT EXISTS "Anyone can insert contact requests"
ON public.contact_requests FOR INSERT
WITH CHECK (true);

-- Only admins can read/update/delete contact requests
CREATE POLICY IF NOT EXISTS "Admins can read contact requests"
ON public.contact_requests FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can update contact requests"
ON public.contact_requests FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

CREATE POLICY IF NOT EXISTS "Admins can delete contact requests"
ON public.contact_requests FOR DELETE
USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin));

-- Storage bucket for site media (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for the media bucket
CREATE POLICY IF NOT EXISTS "Public read access to media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY IF NOT EXISTS "Admins can upload to media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media' AND
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin)
);

CREATE POLICY IF NOT EXISTS "Admins can update media"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'media' AND
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin)
)
WITH CHECK (
  bucket_id = 'media' AND
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin)
);

CREATE POLICY IF NOT EXISTS "Admins can delete media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'media' AND
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin)
);
