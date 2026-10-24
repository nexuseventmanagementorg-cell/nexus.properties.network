-- NEXUS foundation: profiles, reference catalogs, and private properties.
-- This file is versioned for review; it has not been applied.

CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE RESTRICT,
  full_name TEXT NOT NULL DEFAULT 'Nexus User',
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Buyer'
    CHECK (role IN (
      'Buyer', 'Seller', 'Agent', 'Agency', 'Developer', 'Investor',
      'Industrial', 'Corporate', 'Government', 'AI Admin', 'Super Admin'
    )),
  status TEXT NOT NULL DEFAULT 'pending_verification'
    CHECK (status IN ('pending_verification', 'active', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

CREATE UNIQUE INDEX users_email_lower_uidx ON public.users (LOWER(email));

CREATE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, role, status)
  VALUES (
    NEW.id,
    COALESCE(NULLIF(BTRIM(NEW.raw_user_meta_data ->> 'full_name'), ''), 'Nexus User'),
    NEW.email,
    'Buyer',
    CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN 'active' ELSE 'pending_verification' END
  );
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.handle_new_auth_user() IS
  'Trigger-only profile creation: fixed Buyer role, fixed search_path, and no direct execution grants.';

REVOKE ALL ON FUNCTION public.handle_new_auth_user() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

CREATE FUNCTION public.sync_auth_user_verification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.users AS profile
  SET status = CASE
    WHEN profile.status = 'suspended' THEN 'suspended'
    WHEN NEW.email_confirmed_at IS NOT NULL THEN 'active'
    ELSE 'pending_verification'
  END,
  updated_at = NOW()
  WHERE profile.id = NEW.id;
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.sync_auth_user_verification() IS
  'Trigger-only synchronization of the Supabase Auth email confirmation state; it cannot assign roles.';

REVOKE ALL ON FUNCTION public.sync_auth_user_verification() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER on_auth_user_verification_changed
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.sync_auth_user_verification();

CREATE TABLE public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  province TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX cities_name_lower_idx ON public.cities (LOWER(name));

CREATE TABLE public.areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID NOT NULL REFERENCES public.cities (id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (city_id, id)
);

CREATE INDEX areas_city_id_idx ON public.areas (city_id);
CREATE INDEX areas_city_name_lower_idx ON public.areas (city_id, LOWER(name));

CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  property_type TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT,
  city_id UUID REFERENCES public.cities (id) ON DELETE RESTRICT,
  area TEXT NOT NULL,
  area_id UUID,
  phase TEXT NOT NULL,
  price TEXT NOT NULL,
  price_raw NUMERIC NOT NULL CHECK (price_raw >= 0),
  area_size TEXT NOT NULL,
  bedrooms INTEGER CHECK (bedrooms IS NULL OR bedrooms >= 0),
  bathrooms INTEGER CHECK (bathrooms IS NULL OR bathrooms >= 0),
  property_status TEXT NOT NULL DEFAULT 'For Sale',
  purpose TEXT NOT NULL CHECK (purpose IN ('Residential', 'Commercial', 'Investment')),
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  gallery_images TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] NOT NULL DEFAULT '{}',
  agent TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'PENDING REVIEW',
  state TEXT NOT NULL DEFAULT 'LIVE PROPERTY'
    CHECK (state IN ('LIVE PROPERTY', 'ARCHIVED PROPERTY')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  audit_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (area_id IS NULL OR city_id IS NOT NULL),
  FOREIGN KEY (city_id, area_id) REFERENCES public.areas (city_id, id) ON DELETE RESTRICT
);

CREATE INDEX properties_owner_id_idx ON public.properties (owner_id);
CREATE INDEX properties_city_area_idx ON public.properties (city_id, area_id);
CREATE INDEX properties_owner_state_idx ON public.properties (owner_id, state, status);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.users, public.cities, public.areas, public.properties FROM PUBLIC, anon, authenticated;
REVOKE ALL ON SCHEMA public FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON TABLE public.users TO authenticated;
GRANT UPDATE (full_name, updated_at) ON TABLE public.users TO authenticated;
GRANT SELECT ON TABLE public.cities, public.areas TO authenticated;

GRANT SELECT, DELETE ON TABLE public.properties TO authenticated;
GRANT INSERT (
  id, owner_id, title, property_type, city, province, city_id,
  area, area_id, phase, price, price_raw, area_size, bedrooms, bathrooms,
  property_status, purpose, description, image, gallery_images, features,
  agent, verification_status, state, status, audit_id, created_at, updated_at
) ON TABLE public.properties TO authenticated;
GRANT UPDATE (
  title, property_type, city, province, city_id, area, area_id, phase, price,
  price_raw, area_size, bedrooms, bathrooms, property_status, purpose,
  description, image, gallery_images, features, agent, state, status, updated_at
) ON TABLE public.properties TO authenticated;

CREATE POLICY users_read_own_profile
  ON public.users FOR SELECT TO authenticated
  USING (id = (SELECT auth.uid()));

CREATE POLICY users_update_own_name
  ON public.users FOR UPDATE TO authenticated
  USING (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));

CREATE POLICY cities_authenticated_read
  ON public.cities FOR SELECT TO authenticated
  USING (true);

CREATE POLICY areas_authenticated_read
  ON public.areas FOR SELECT TO authenticated
  USING (true);

CREATE POLICY properties_read_own
  ON public.properties FOR SELECT TO authenticated
  USING (
    owner_id = (SELECT auth.uid())
    AND (SELECT u.status FROM public.users AS u WHERE u.id = (SELECT auth.uid())) = 'active'
  );

CREATE POLICY properties_insert_own
  ON public.properties FOR INSERT TO authenticated
  WITH CHECK (
    owner_id = (SELECT auth.uid())
    AND verification_status = 'PENDING REVIEW'
    AND (SELECT u.status FROM public.users AS u WHERE u.id = (SELECT auth.uid())) = 'active'
  );

CREATE POLICY properties_update_own
  ON public.properties FOR UPDATE TO authenticated
  USING (
    owner_id = (SELECT auth.uid())
    AND (SELECT u.status FROM public.users AS u WHERE u.id = (SELECT auth.uid())) = 'active'
  )
  WITH CHECK (
    owner_id = (SELECT auth.uid())
    AND (SELECT u.status FROM public.users AS u WHERE u.id = (SELECT auth.uid())) = 'active'
  );

CREATE POLICY properties_delete_own
  ON public.properties FOR DELETE TO authenticated
  USING (
    owner_id = (SELECT auth.uid())
    AND (SELECT u.status FROM public.users AS u WHERE u.id = (SELECT auth.uid())) = 'active'
  );
