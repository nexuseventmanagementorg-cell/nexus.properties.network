import type { LeadRecord } from './models';
import type { PlatformRole, LeadStatus } from './platformStore';
import { createNotification } from './userService';
import { readStore, writeStore } from './storageAdapter';
import { recordAudit } from './auditService';
import { createUuid } from './uuid';

const LEADS_KEY = 'nexus_platform_leads';
export const getLeads = (ownerId?: string) => readStore<LeadRecord[]>(LEADS_KEY, []).filter((lead) => !ownerId || lead.ownerId === ownerId);
export const createLead = (input: { propertyId: string; title: string; ownerRole: PlatformRole; assignedTo: string; status: LeadStatus; ownerId?: string }) => {
  const now = new Date().toISOString();
  const lead: LeadRecord = { ...input, ownerId: input.ownerId || 'local-user', id: createUuid(), createdAt: now, updatedAt: now };
  writeStore(LEADS_KEY, [...readStore<LeadRecord[]>(LEADS_KEY, []), lead]);
  recordAudit({ event: 'lead-create', actorId: lead.ownerId, entityType: 'lead', entityId: lead.id, metadata: { propertyId: lead.propertyId } });
  createNotification({ userId: lead.ownerId, type: 'lead-created', title: 'Lead created', message: `${lead.title} was added to the lead inbox.` });
  return lead;
};
export const updateLead = (lead: LeadRecord) => { const updated = { ...lead, updatedAt: new Date().toISOString() }; writeStore(LEADS_KEY, getLeads().map((item) => item.id === lead.id ? updated : item)); if (lead.status === 'Negotiating') recordAudit({ event: 'lead-lock', actorId: lead.ownerId, entityType: 'lead', entityId: lead.id }); return updated; };
