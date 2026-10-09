CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY,
  owner_id UUID NOT NULL,
  title TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  phase TEXT,
  property_type TEXT,
  price NUMERIC,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  audit_id TEXT
);
