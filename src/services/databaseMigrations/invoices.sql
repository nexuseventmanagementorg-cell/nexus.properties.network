CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY,
  owner_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'PKR',
  type TEXT NOT NULL,
  reference TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  audit_id TEXT
);
