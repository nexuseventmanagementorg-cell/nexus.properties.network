export type ProviderMode = 'local' | 'supabase';

export interface RepositoryProviderConfig {
  mode: ProviderMode;
  isProduction: boolean;
}

const hasSupabaseConfig = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

export const getProviderMode = (): ProviderMode => {
  const envMode = (import.meta.env.VITE_PROVIDER_MODE || '').toLowerCase();
  if (envMode === 'supabase' || hasSupabaseConfig) return 'supabase';
  return 'local';
};

export const productionProvider = {
  mode: getProviderMode(),
  isProduction: import.meta.env.VITE_ENABLE_REAL_BACKEND === 'true' || hasSupabaseConfig || getProviderMode() === 'supabase',
};

export const getProviderName = () => productionProvider.isProduction ? 'supabase' : 'local';

export const getProductionStore = () => {
  const root = (globalThis as Record<string, unknown>).nexusProductionStore as Record<string, unknown> | undefined;
  if (!root) {
    (globalThis as Record<string, unknown>).nexusProductionStore = {} as Record<string, unknown>;
  }
  return (globalThis as Record<string, unknown>).nexusProductionStore as Record<string, unknown>;
};
