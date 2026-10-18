import { createClient } from '@supabase/supabase-js';
import type { AgentActivityEvent } from './agentOrchestrator.ts';

const TABLE_NAME = 'nexus_agent_activity';

export class AgentActivityStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AgentActivityStorageError';
  }
}

export interface AgentActivityStorageConfig {
  url?: string;
  serviceRoleKey?: string;
  isProduction?: boolean;
}

function getServerSupabase(config: AgentActivityStorageConfig) {
  const url = config.url;
  const serviceRoleKey = config.serviceRoleKey;
  if (!url || !serviceRoleKey) {
    throw new AgentActivityStorageError('Durable agent activity requires NEXUS_SUPABASE_URL and NEXUS_SUPABASE_SERVICE_ROLE_KEY.');
  }
  if (config.isProduction && new URL(url).protocol !== 'https:') {
    throw new AgentActivityStorageError('Production agent activity storage must use HTTPS.');
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  });
}

function toStorageError(error: { code?: string }): AgentActivityStorageError {
  if (error.code === '42P01' || error.code === 'PGRST205') {
    return new AgentActivityStorageError('Agent activity storage is not installed. Run src/services/databaseMigrations/agent_activity.sql.');
  }
  return new AgentActivityStorageError('Could not save or load durable agent activity.');
}

export async function recordAgentActivity(event: AgentActivityEvent, config: AgentActivityStorageConfig): Promise<void> {
  const { error } = await getServerSupabase(config).from(TABLE_NAME).insert({
    run_id: event.runId,
    step: event.step,
    event_type: event.kind,
    sender_role: event.senderRole,
    recipient_role: event.recipientRole,
    instruction: event.instruction || null,
    reply: event.reply || null,
    artifact: event.artifact || null,
    created_at: event.createdAt,
  });
  if (error) throw toStorageError(error);
}

export async function getRecentAgentActivity(config: AgentActivityStorageConfig, limit = 100): Promise<AgentActivityEvent[]> {
  const { data, error } = await getServerSupabase(config)
    .from(TABLE_NAME)
    .select('run_id, step, event_type, sender_role, recipient_role, instruction, reply, artifact, created_at')
    .order('created_at', { ascending: false })
    .limit(Math.max(1, Math.min(limit, 100)));

  if (error) throw toStorageError(error);
  return (data || []).map((row) => ({
    runId: row.run_id,
    step: row.step,
    kind: row.event_type,
    senderRole: row.sender_role,
    recipientRole: row.recipient_role,
    ...(row.instruction ? { instruction: row.instruction } : {}),
    ...(row.reply ? { reply: row.reply } : {}),
    ...(row.artifact ? { artifact: row.artifact } : {}),
    createdAt: row.created_at,
  }));
}