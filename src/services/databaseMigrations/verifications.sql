CREATE TABLE IF NOT EXISTS verifications (
  id UUID PRIMARY KEY,
  owner_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  audit_id TEXT
);
