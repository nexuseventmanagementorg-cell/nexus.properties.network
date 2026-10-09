CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY,
  owner_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'PKR',
  provider TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  audit_id TEXT
);
