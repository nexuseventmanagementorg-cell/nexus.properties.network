import { readStore, writeStore } from './storageAdapter';

export type AuditEventType = 'login' | 'logout' | 'listing-create' | 'listing-edit' | 'listing-archive' | 'lead-create' | 'lead-lock' | 'deal-create' | 'deal-lock' | 'payment-event' | 'verification-event';
export interface AuditEvent { id: string; auditId: string; event: AuditEventType; actorId: string; entityType: string; entityId?: string; metadata?: Record<string, unknown>; createdAt: string; }
const AUDIT_KEY = 'nexus_audit_events';

export const recordAudit = (input: Omit<AuditEvent, 'id' | 'auditId' | 'createdAt'>) => {
  const now = new Date().toISOString();
  const event: AuditEvent = { ...input, id: `AUD-EVENT-${Date.now()}`, auditId: `AUD-${Date.now()}`, createdAt: now };
  writeStore(AUDIT_KEY, [...readStore<AuditEvent[]>(AUDIT_KEY, []), event]);
  return event;
};
export const getAuditEvents = (actorId?: string) => readStore<AuditEvent[]>(AUDIT_KEY, []).filter((event) => !actorId || event.actorId === actorId);
export const recordPaymentEvent = (actorId: string, entityId: string, metadata?: Record<string, unknown>) => recordAudit({ event: 'payment-event', actorId, entityType: 'payment', entityId, metadata });
export const recordVerificationEvent = (actorId: string, entityId: string, metadata?: Record<string, unknown>) => recordAudit({ event: 'verification-event', actorId, entityType: 'verification', entityId, metadata });
