CREATE TABLE IF NOT EXISTS nexus_agent_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL,
  step INTEGER NOT NULL CHECK (step > 0),
  event_type TEXT NOT NULL CHECK (event_type IN ('dispatched', 'replied', 'failed', 'completed')),
  sender_role TEXT NOT NULL CHECK (char_length(sender_role) <= 100),
  recipient_role TEXT NOT NULL CHECK (char_length(recipient_role) <= 100),
  instruction TEXT CHECK (instruction IS NULL OR char_length(instruction) <= 4000),
  reply TEXT CHECK (reply IS NULL OR char_length(reply) <= 12000),
  artifact TEXT CHECK (artifact IS NULL OR char_length(artifact) <= 200),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nexus_agent_activity_run_created
  ON nexus_agent_activity (run_id, created_at ASC);

CREATE INDEX IF NOT EXISTS idx_nexus_agent_activity_created
  ON nexus_agent_activity (created_at DESC);

ALTER TABLE nexus_agent_activity ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE nexus_agent_activity FROM anon, authenticated;
GRANT ALL ON TABLE nexus_agent_activity TO service_role;