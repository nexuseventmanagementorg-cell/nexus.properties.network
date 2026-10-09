import type { UserRecord } from './models';
import type { PlatformSettings } from './platformStore';
import { readStore, writeStore } from './storageAdapter';

const SETTINGS_KEY = 'nexus_platform_settings';

export const getUserSettings = (userId = 'local-user'): PlatformSettings & { userId: string } => readStore(SETTINGS_KEY, { userId, notifications: true, language: 'roman_ur', lastUpdated: new Date().toISOString() });
export const saveUserSettings = (settings: PlatformSettings & { userId?: string }) => writeStore(SETTINGS_KEY, { ...settings, lastUpdated: new Date().toISOString() });
export const toUserModel = (user: UserRecord) => ({ id: user.id, email: user.email, role: user.role, status: user.status, createdAt: user.createdAt, updatedAt: user.updatedAt });

export { getNotifications, createNotification, markNotificationRead, getUnreadNotificationCount } from './notificationService';
export { getMessages, getInbox, getSent, getUnreadMessageCount, createMessage, markMessageRead, getConversations, createConversation } from './messageService';
