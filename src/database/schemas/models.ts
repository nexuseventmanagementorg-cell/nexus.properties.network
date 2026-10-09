export type Role = 'Buyer' | 'Seller' | 'Agent' | 'Agency' | 'Developer' | 'Investor' | 'Industrial' | 'Corporate' | 'Government' | 'AI Admin' | 'Super Admin';
export type EntityStatus = 'active' | 'inactive' | 'pending' | 'archived' | 'suspended';

export interface BaseRecord { id: string; createdAt: string; updatedAt: string; ownerId: string; status: string; auditId: string; }
export interface User extends BaseRecord { fullName: string; email: string; role: Role; verificationStatus: string; }
export interface Property extends BaseRecord { title: string; city: string; area: string; phase: string; propertyType: string; price: number; verificationStatus: string; }
export interface Lead extends BaseRecord { propertyId: string; assignedTo: string; status: string; source: string; }
export interface Deal extends BaseRecord { propertyId: string; assignedTo: string; status: string; amount?: number; }
export interface Notification extends BaseRecord { recipientId: string; type: 'success' | 'warning' | 'error' | 'system' | 'ai-alert'; title: string; message: string; read: boolean; }
export interface Message extends BaseRecord { conversationId: string; senderId: string; recipientId: string; direction: 'inbox' | 'sent'; subject: string; body: string; read: boolean; }
export interface Conversation extends BaseRecord { participantIds: string[]; channel: 'user-to-user' | 'user-to-agent' | 'agent-to-seller' | 'ai-to-user' | 'admin-to-user'; lastMessageAt: string; }
export interface Verification extends BaseRecord { entityType: 'user' | 'property' | 'deal'; entityId: string; reviewerId?: string; decision?: string; evidence: string[]; }
export interface Subscription extends BaseRecord { plan: string; billingCycle: string; provider?: string; status: 'Pending' | 'Active' | 'Expired' | 'Cancelled'; }
export interface Payment extends BaseRecord { amount: number; currency: string; provider: string; eventType: string; reference?: string; subscriptionId?: string; status: 'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'Cancelled'; }
export interface Invoice extends BaseRecord { amount: number; currency: string; type: 'Subscription Invoice' | 'Lead Lock Invoice' | 'Deal Lock Invoice' | 'Premium Listing Invoice'; reference?: string; status: 'Pending' | 'Paid' | 'Failed' | 'Cancelled'; }
