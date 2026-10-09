import { getProductionStore, productionProvider } from './ProductionProvider';
import { readStore, writeStore } from './storageAdapter';

const resolve = <T>(key: string, init: T): T => {
  const store = getProductionStore();
  if (productionProvider.isProduction && Object.prototype.hasOwnProperty.call(store, key)) {
    return store[key] as T;
  }
  return readStore<T>(key, init);
};

const persist = <T>(key: string, value: T) => {
  const store = getProductionStore();
  store[key] = value;
  writeStore(key, value);
};

export const supabaseRepositories = {
  users: { getAll: <T>(key: string, init: T) => resolve(key, init), save: <T>(key: string, value: T) => persist(key, value) },
  properties: { getAll: <T>(key: string, init: T) => resolve(key, init), save: <T>(key: string, value: T) => persist(key, value) },
  leads: { getAll: <T>(key: string, init: T) => resolve(key, init), save: <T>(key: string, value: T) => persist(key, value) },
  deals: { getAll: <T>(key: string, init: T) => resolve(key, init), save: <T>(key: string, value: T) => persist(key, value) },
  messages: { getAll: <T>(key: string, init: T) => resolve(key, init), save: <T>(key: string, value: T) => persist(key, value) },
  notifications: { getAll: <T>(key: string, init: T) => resolve(key, init), save: <T>(key: string, value: T) => persist(key, value) },
  payments: { getAll: <T>(key: string, init: T) => resolve(key, init), save: <T>(key: string, value: T) => persist(key, value) },
  subscriptions: { getAll: <T>(key: string, init: T) => resolve(key, init), save: <T>(key: string, value: T) => persist(key, value) },
  verifications: { getAll: <T>(key: string, init: T) => resolve(key, init), save: <T>(key: string, value: T) => persist(key, value) },
};
