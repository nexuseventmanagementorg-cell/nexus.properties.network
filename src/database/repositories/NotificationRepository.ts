import { BaseRepository } from './BaseRepository';
import type { Notification } from '../schemas/models';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';

export class NotificationRepository extends BaseRepository<Notification> {
  constructor() { super('nexus_db_notifications'); }
  async findUnread(recipientId: string): Promise<Notification[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('notifications').select('*').eq('recipient_id', recipientId).eq('read', false);
      if (error) throw error;
      return (data || []) as Notification[];
    }
    const notifications = await this.findAll();
    return notifications.filter((notification) => notification.recipientId === recipientId && !notification.read);
  }
}

export const notificationRepository = new NotificationRepository();
