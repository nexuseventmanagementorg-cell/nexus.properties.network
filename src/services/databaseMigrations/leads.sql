CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY,
  property_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  assigned_to TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  audit_id TEXT
);
