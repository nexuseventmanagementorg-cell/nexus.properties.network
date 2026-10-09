export type DataProviderType = 'local' | 'supabase' | 'postgres';

export interface RepositoryProvider {
  type: DataProviderType;
  isReady: boolean;
  users: unknown;
  properties: unknown;
  leads: unknown;
  deals: unknown;
  messages: unknown;
  notifications: unknown;
  payments: unknown;
  subscriptions: unknown;
  verifications: unknown;
}

export const getCurrentProvider = (): RepositoryProvider => {
  const isSupabaseConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  return {
    type: isSupabaseConfigured ? 'supabase' : 'local',
    isReady: isSupabaseConfigured,
    users: isSupabaseConfigured ? 'supabase' : 'local',
    properties: isSupabaseConfigured ? 'supabase' : 'local',
    leads: isSupabaseConfigured ? 'supabase' : 'local',
    deals: isSupabaseConfigured ? 'supabase' : 'local',
    messages: isSupabaseConfigured ? 'supabase' : 'local',
    notifications: isSupabaseConfigured ? 'supabase' : 'local',
    payments: isSupabaseConfigured ? 'supabase' : 'local',
    subscriptions: isSupabaseConfigured ? 'supabase' : 'local',
    verifications: isSupabaseConfigured ? 'supabase' : 'local',
  };
};

export const createProvider = (type: DataProviderType): RepositoryProvider => ({
  type,
  isReady: type === 'supabase' || type === 'postgres',
  users: type,
  properties: type,
  leads: type,
  deals: type,
  messages: type,
  notifications: type,
  payments: type,
  subscriptions: type,
  verifications: type,
});
