import type { LiveProperty } from '../data/inventoryManager';
import type { BaseRecord } from '../database/schemas/models';
import type { PlatformRole, LeadStatus, DealStatus } from './platformStore';

export interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  role: PlatformRole;
  password: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  status: 'pending_verification' | 'active' | 'suspended';
}

export type PropertyRecord = LiveProperty & BaseRecord;

export interface LeadRecord {
  id: string;
  propertyId: string;
  title: string;
  ownerRole: PlatformRole;
  ownerId: string;
  assignedTo: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DealRecord {
  id: string;
  propertyId: string;
  title: string;
  ownerRole: PlatformRole;
  ownerId: string;
  assignedTo: string;
  status: DealStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationRecord {
  id: string;
  userId: string;
  type: 'property-created' | 'lead-created' | 'deal-created' | 'property-archived' | 'property-restored' | 'system';
  title: string;
  message: string;
  read: boolean;
  status: 'unread' | 'read';
  createdAt: string;
}

export interface MessageRecord {
  id: string;
  ownerId: string;
  threadId: string;
  direction: 'inbox' | 'sent';
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  read: boolean;
  status: 'unread' | 'read';
  createdAt: string;
}
