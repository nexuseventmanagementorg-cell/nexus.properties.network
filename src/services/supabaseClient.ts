import { createClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  storageBucket?: string;
}

const url = import.meta.env.VITE_SUPABASE_URL || '';
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET || 'property-images';

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabaseConfig: SupabaseConfig = {
  url,
  anonKey,
  storageBucket,
};

const configError = (feature: string) => new Error(`Production ${feature} requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.`);

export const supabaseClient: any = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
      global: {
        headers: {
          'X-Client-Info': 'nexus-os-auth',
        },
      },
    })
  : {
      config: supabaseConfig,
      auth: {
        getSession: async () => { throw configError('auth'); },
        signUp: async () => { throw configError('auth'); },
        signInWithPassword: async () => { throw configError('auth'); },
        signInWithOAuth: async () => { throw configError('OAuth'); },
        signOut: async () => { throw configError('auth'); },
        resetPasswordForEmail: async () => { throw configError('auth'); },
      },
      from: () => { throw configError('database'); },
      storage: {
        from: () => { throw configError('storage'); },
      },
    };

export const getSupabaseClient = () => {
  if (!isSupabaseConfigured) throw configError('client');
  return supabaseClient;
};
