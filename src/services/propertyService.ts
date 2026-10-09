import { getHiddenSampleIds, InventoryCounters, LiveProperty, matchesFilters } from '../data/inventoryManager';
import { SAMPLE_PROPERTIES, SampleProperty, SamplePropertySearchFilters } from '../data/sampleProperties';
import { isSupabaseConfigured } from './supabaseClient';
import { propertyRepository } from '../database/repositories/PropertyRepository';
import { readStore, writeStore } from './storageAdapter';
import { createNotification } from './userService';
import { PropertyRecord } from './models';
import { recordAudit } from './auditService';

export type { InventoryCounters } from '../data/inventoryManager';

export const inventoryUpdatedEvent = 'nexus-inventory-updated';
const LIVE_STORAGE_KEY = 'nexus_live_inventory';
const ARCHIVED_STORAGE_KEY = 'nexus_archived_inventory';

const notifyInventoryUpdated = () => {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(inventoryUpdatedEvent));
};

export const getProperties = async (): Promise<PropertyRecord[]> => {
  if (isSupabaseConfigured) return (await propertyRepository.findAll()).filter((property) => property.state === 'LIVE PROPERTY');
  return readStore<PropertyRecord[]>(LIVE_STORAGE_KEY, []).filter((property) => property.state === 'LIVE PROPERTY');
};

export const getArchivedPropertyRecords = async (): Promise<PropertyRecord[]> => {
  if (isSupabaseConfigured) return (await propertyRepository.findAll()).filter((property) => property.state === 'ARCHIVED PROPERTY');
  return readStore<PropertyRecord[]>(ARCHIVED_STORAGE_KEY, []).filter((property) => property.state === 'ARCHIVED PROPERTY');
};

export const searchProperties = async (filters: SamplePropertySearchFilters): Promise<Array<SampleProperty | LiveProperty>> => {
  const live = (await getProperties()).filter((property) => matchesFilters(property, filters));
  const hiddenSampleIds = getHiddenSampleIds(await getProperties());
  const samples = SAMPLE_PROPERTIES.filter((property) => !hiddenSampleIds.has(property.propertyId) && matchesFilters(property, filters));
  return [...live, ...samples];
};

export const createProperty = async (input: Pick<LiveProperty, 'title' | 'city' | 'area' | 'phase' | 'propertyType' | 'areaSize' | 'price' | 'priceRaw' | 'purpose' | 'description' | 'image' | 'agent' | 'galleryImages'>, ownerId = 'local-user'): Promise<PropertyRecord> => {
  const now = new Date().toISOString();
  const propertyId = `LIVE-${Date.now()}`;
  const property: PropertyRecord = {
    ...input,
    id: propertyId,
    propertyId,
    propertyStatus: 'For Sale',
    state: 'LIVE PROPERTY',
    status: 'active',
    features: ['Seller submitted'],
    verificationStatus: 'PENDING REVIEW',
    ownerId,
    createdAt: now,
    updatedAt: now,
    auditId: `AUD-${Date.now()}`,
  };
  if (isSupabaseConfigured) await propertyRepository.save(property);
  else writeStore(LIVE_STORAGE_KEY, [...readStore<PropertyRecord[]>(LIVE_STORAGE_KEY, []), property]);
  notifyInventoryUpdated();
  recordAudit({ event: 'listing-create', actorId: ownerId, entityType: 'property', entityId: property.propertyId, metadata: { title: property.title } });
  createNotification({ userId: ownerId, type: 'property-created', title: 'Property created', message: `${property.title} was added to live inventory.` });
  return property;
};

export const updateProperty = async (property: PropertyRecord) => { const updated = { ...property, updatedAt: new Date().toISOString() }; if (isSupabaseConfigured) await propertyRepository.update(property.id, updated); else writeStore(LIVE_STORAGE_KEY, readStore<PropertyRecord[]>(LIVE_STORAGE_KEY, []).map((item) => item.propertyId === property.propertyId ? updated : item)); notifyInventoryUpdated(); recordAudit({ event: 'listing-edit', actorId: property.ownerId, entityType: 'property', entityId: property.propertyId }); return updated; };
export const deleteProperty = async (propertyId: string) => { if (isSupabaseConfigured) await propertyRepository.delete(propertyId); else writeStore(LIVE_STORAGE_KEY, readStore<PropertyRecord[]>(LIVE_STORAGE_KEY, []).filter((item) => item.propertyId !== propertyId)); notifyInventoryUpdated(); };
export const archiveProperty = async (propertyId: string, ownerId = 'local-user') => { const property = (await getProperties()).find((item) => item.propertyId === propertyId); if (!property) return; const archived = { ...property, state: 'ARCHIVED PROPERTY' as const, status: 'archived' }; if (isSupabaseConfigured) await propertyRepository.update(property.id, { state: archived.state, status: archived.status }); else { writeStore(LIVE_STORAGE_KEY, readStore<PropertyRecord[]>(LIVE_STORAGE_KEY, []).filter((item) => item.propertyId !== propertyId)); writeStore(ARCHIVED_STORAGE_KEY, [...readStore<PropertyRecord[]>(ARCHIVED_STORAGE_KEY, []), archived]); } notifyInventoryUpdated(); recordAudit({ event: 'listing-archive', actorId: ownerId, entityType: 'property', entityId: propertyId }); createNotification({ userId: ownerId, type: 'property-archived', title: 'Property archived', message: `Property ${propertyId} was archived.` }); };
export const restoreProperty = async (propertyId: string, ownerId = 'local-user') => { const archived = await getArchivedPropertyRecords(); const property = archived.find((item) => item.propertyId === propertyId); if (!property) return; const restored = { ...property, state: 'LIVE PROPERTY' as const, status: 'active' }; if (isSupabaseConfigured) await propertyRepository.update(property.id, { state: restored.state, status: restored.status }); else { writeStore(ARCHIVED_STORAGE_KEY, archived.filter((item) => item.propertyId !== propertyId)); writeStore(LIVE_STORAGE_KEY, [...readStore<PropertyRecord[]>(LIVE_STORAGE_KEY, []), restored]); } notifyInventoryUpdated(); createNotification({ userId: ownerId, type: 'property-restored', title: 'Property restored', message: `Property ${propertyId} was restored to live inventory.` }); };

export const getInventoryCounters = async (): Promise<InventoryCounters> => { const live = await getProperties(); const archived = await getArchivedPropertyRecords(); const hidden = getHiddenSampleIds(live); const liveCities = new Set(live.map((property) => property.city.toLowerCase())); return { totalLiveListings: live.length, totalSampleListings: SAMPLE_PROPERTIES.length - hidden.size, hiddenSampleListings: hidden.size, archivedListings: archived.length, citiesWithoutLiveInventory: new Set(SAMPLE_PROPERTIES.map((property) => property.city.toLowerCase())).size - liveCities.size }; };
