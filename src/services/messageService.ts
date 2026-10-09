import type { Conversation } from '../database/schemas/models';
import type { MessageRecord } from './models';
import { readStore, writeStore } from './storageAdapter';

const MESSAGES_KEY = 'nexus_messages';
const CONVERSATIONS_KEY = 'nexus_conversations';

export const getMessages = (ownerId?: string) => readStore<MessageRecord[]>(MESSAGES_KEY, []).filter((item) => !ownerId || item.ownerId === ownerId);
export const getInbox = (ownerId?: string) => getMessages(ownerId).filter((item) => item.direction === 'inbox');
export const getSent = (ownerId?: string) => getMessages(ownerId).filter((item) => item.direction === 'sent');
export const getUnreadMessageCount = (ownerId?: string) => getInbox(ownerId).filter((item) => item.status === 'unread').length;
export const createMessage = (input: Omit<MessageRecord, 'id' | 'createdAt' | 'read' | 'status'>) => {
  const message: MessageRecord = { ...input, id: `MSG-${Date.now()}`, read: false, status: input.direction === 'inbox' ? 'unread' : 'read', createdAt: new Date().toISOString() };
  writeStore(MESSAGES_KEY, [...readStore<MessageRecord[]>(MESSAGES_KEY, []), message]);
  return message;
};
export const markMessageRead = (id: string) => writeStore(MESSAGES_KEY, readStore<MessageRecord[]>(MESSAGES_KEY, []).map((item) => item.id === id ? { ...item, read: true, status: 'read' } : item));

export const getConversations = (ownerId?: string) => readStore<Conversation[]>(CONVERSATIONS_KEY, []).filter((conversation) => !ownerId || conversation.ownerId === ownerId || conversation.participantIds.includes(ownerId));
export const createConversation = (input: Omit<Conversation, 'id' | 'createdAt' | 'updatedAt' | 'auditId'> & Partial<Pick<Conversation, 'id' | 'createdAt' | 'updatedAt' | 'auditId'>>) => {
  const now = new Date().toISOString();
  const conversation: Conversation = { ...input, id: input.id || `CON-${Date.now()}`, createdAt: input.createdAt || now, updatedAt: now, auditId: input.auditId || `AUD-${Date.now()}` };
  writeStore(CONVERSATIONS_KEY, [...readStore<Conversation[]>(CONVERSATIONS_KEY, []), conversation]);
  return conversation;
};
