import type { SampleProperty, SamplePropertySearchFilters } from '../data/sampleProperties';
import type { PlatformRole } from './platformStore';
import type { DealRecord, LeadRecord, MessageRecord, NotificationRecord } from './models';

export type AdapterAvailability = 'READY' | 'DEMO' | 'PENDING' | 'NOT CONNECTED';

export interface AdapterResult<T> {
  availability: AdapterAvailability;
  data?: T;
  message?: string;
}

export interface PropertyCatalogAdapter {
  search(filters: SamplePropertySearchFilters): Promise<AdapterResult<SampleProperty[]>>;
  getById(propertyId: string): Promise<AdapterResult<SampleProperty>>;
  saveDraft(input: Partial<SampleProperty>): Promise<AdapterResult<{ draftId: string }>>;
  submitDraft(draftId: string): Promise<AdapterResult<{ status: 'SUBMITTED' | 'PENDING' }>>;
}

export interface LeadLockView {
  status: 'AVAILABLE' | 'ACTIVE' | 'RELEASED' | 'EXPIRED' | 'NOT CONNECTED';
  holderId?: string;
  startedAt?: string;
  expiresAt?: string;
  history?: Array<{ actorId: string; event: string; at: string }>;
}

export interface LeadLockAdapter {
  getState(leadId: string): Promise<AdapterResult<LeadLockView>>;
  requestLock(leadId: string): Promise<AdapterResult<LeadLockView>>;
  requestRelease(leadId: string, reason: string): Promise<AdapterResult<LeadLockView>>;
}

export interface DealAdapter {
  getById(dealId: string): Promise<AdapterResult<DealRecord>>;
  list(): Promise<AdapterResult<DealRecord[]>>;
}

export interface DealLockAdapter {
  getState(dealId: string): Promise<AdapterResult<LeadLockView>>;
  requestLock(dealId: string): Promise<AdapterResult<LeadLockView>>;
  requestExtension(dealId: string, reason: string): Promise<AdapterResult<LeadLockView>>;
}

export interface AgentDirectoryAdapter {
  search(query: string): Promise<AdapterResult<Array<{ id: string; name: string }>>>;
  getProfile(agentId: string): Promise<AdapterResult<{ id: string; name: string }>>;
}

export interface PaymentAdapter {
  list(): Promise<AdapterResult<Array<{ id: string; amount?: number; status: string }>>>;
  begin(input: { amount: number; currency: 'PKR'; provider: 'JazzCash' | 'Easypaisa' | 'Bank Transfer' }): Promise<AdapterResult<{ paymentId: string; status: 'PENDING' }>>;
}

export interface SubscriptionAdapter {
  list(): Promise<AdapterResult<Array<{ id: string; role: PlatformRole; plan: string; status: string }>>>;
  request(plan: 'Starter' | 'Professional' | 'Enterprise'): Promise<AdapterResult<{ subscriptionId: string; status: 'PENDING' }>>;
}

export interface VerificationAdapter {
  getStatus(subjectId: string): Promise<AdapterResult<{ status: string; updatedAt?: string }>>;
  submit(subjectId: string): Promise<AdapterResult<{ caseId: string; status: 'PENDING' }>>;
}

export interface NotificationAdapter {
  list(): Promise<AdapterResult<NotificationRecord[]>>;
  markRead(notificationId: string): Promise<AdapterResult<void>>;
}

export interface MessagingAdapter {
  list(): Promise<AdapterResult<MessageRecord[]>>;
  send(threadId: string, body: string): Promise<AdapterResult<MessageRecord>>;
}

export interface LeadAdapter {
  list(): Promise<AdapterResult<LeadRecord[]>>;
  updateStatus(leadId: string, status: LeadRecord['status']): Promise<AdapterResult<LeadRecord>>;
}

export interface CrmAdapter {
  listContacts(): Promise<AdapterResult<Array<{ id: string; displayName: string }>>>;
}

export interface AiAssistantAdapter {
  availability: AdapterAvailability;
  suggest(prompt: string): Promise<AdapterResult<{ text: string; provenance: 'AI SUGGESTION' }>>;
}

export interface NexusFrontendAdapters {
  properties: PropertyCatalogAdapter;
  agents: AgentDirectoryAdapter;
  leads: LeadAdapter;
  leadLocks: LeadLockAdapter;
  deals: DealAdapter;
  dealLocks: DealLockAdapter;
  payments: PaymentAdapter;
  subscriptions: SubscriptionAdapter;
  verification: VerificationAdapter;
  notifications: NotificationAdapter;
  messaging: MessagingAdapter;
  crm: CrmAdapter;
  ai: AiAssistantAdapter;
}
