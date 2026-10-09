CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY,
  owner_id UUID NOT NULL,
  plan TEXT NOT NULL,
  billing_cycle TEXT DEFAULT 'monthly',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  audit_id TEXT
);
