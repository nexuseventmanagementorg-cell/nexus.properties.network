import type { NotificationRecord } from './models';
import { readStore, writeStore } from './storageAdapter';

const NOTIFICATIONS_KEY = 'nexus_notifications';

export const getNotifications = (userId?: string) => readStore<NotificationRecord[]>(NOTIFICATIONS_KEY, []).filter((item) => !userId || item.userId === userId);
export const createNotification = (input: Omit<NotificationRecord, 'id' | 'createdAt' | 'read' | 'status'>) => {
  const notification: NotificationRecord = { ...input, id: `NOT-${Date.now()}`, read: false, status: 'unread', createdAt: new Date().toISOString() };
  writeStore(NOTIFICATIONS_KEY, [...readStore<NotificationRecord[]>(NOTIFICATIONS_KEY, []), notification]);
  return notification;
};
export const markNotificationRead = (id: string) => writeStore(NOTIFICATIONS_KEY, readStore<NotificationRecord[]>(NOTIFICATIONS_KEY, []).map((item) => item.id === id ? { ...item, read: true, status: 'read' } : item));
export const getUnreadNotificationCount = (ownerId?: string) => getNotifications(ownerId).filter((item) => item.status === 'unread').length;
