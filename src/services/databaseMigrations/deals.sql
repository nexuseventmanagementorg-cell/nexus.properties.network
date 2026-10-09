CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY,
  property_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  assigned_to TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  audit_id TEXT
);
