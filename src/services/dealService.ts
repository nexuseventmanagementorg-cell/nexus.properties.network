import type { DealRecord } from './models';
import type { DealStatus, PlatformRole } from './platformStore';
import { createNotification } from './userService';
import { readStore, writeStore } from './storageAdapter';
import { recordAudit } from './auditService';

const DEALS_KEY = 'nexus_platform_deals';
export const getDeals = (ownerId?: string) => readStore<DealRecord[]>(DEALS_KEY, []).filter((deal) => !ownerId || deal.ownerId === ownerId);
export const createDeal = (input: { propertyId: string; title: string; ownerRole: PlatformRole; assignedTo: string; status: DealStatus; ownerId?: string }) => {
  const now = new Date().toISOString();
  const deal: DealRecord = { ...input, ownerId: input.ownerId || 'local-user', id: `DEAL-${Date.now()}`, createdAt: now, updatedAt: now };
  writeStore(DEALS_KEY, [...readStore<DealRecord[]>(DEALS_KEY, []), deal]);
  recordAudit({ event: 'deal-create', actorId: deal.ownerId, entityType: 'deal', entityId: deal.id, metadata: { propertyId: deal.propertyId } });
  createNotification({ userId: deal.ownerId, type: 'deal-created', title: 'Deal created', message: `${deal.title} was added to the deal inbox.` });
  return deal;
};
export const updateDeal = (deal: DealRecord) => { const updated = { ...deal, updatedAt: new Date().toISOString() }; writeStore(DEALS_KEY, getDeals().map((item) => item.id === deal.id ? updated : item)); if (deal.status === 'Pending Payment') recordAudit({ event: 'deal-lock', actorId: deal.ownerId, entityType: 'deal', entityId: deal.id }); return updated; };
