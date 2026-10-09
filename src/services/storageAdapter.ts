import { productionProvider, getProductionStore } from './ProductionProvider';

export const PLATFORM_UPDATED_EVENT = 'nexus-platform-updated';
const MEMORY_STORE = new Map<string, unknown>();

export const readStore = <T,>(key: string, fallback: T): T => {
  const productionStore = getProductionStore();
  if (productionProvider.isProduction && Object.prototype.hasOwnProperty.call(productionStore, key)) {
    return productionStore[key] as T;
  }
  return MEMORY_STORE.has(key) ? (MEMORY_STORE.get(key) as T) : fallback;
};

export const writeStore = <T,>(key: string, value: T) => {
  const productionStore = getProductionStore();
  productionStore[key] = value;
  MEMORY_STORE.set(key, value);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(PLATFORM_UPDATED_EVENT));
  }
};

export const removeStore = (key: string) => {
  const productionStore = getProductionStore();
  delete productionStore[key];
  MEMORY_STORE.delete(key);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(PLATFORM_UPDATED_EVENT));
  }
};
