import { BaseRepository } from './BaseRepository';
import type { Message } from '../schemas/models';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';

export class MessageRepository extends BaseRepository<Message> {
  constructor() { super('nexus_db_messages'); }
  async findByConversation(conversationId: string): Promise<Message[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('messages').select('*').eq('conversation_id', conversationId);
      if (error) throw error;
      return (data || []) as Message[];
    }
    const messages = await this.findAll();
    return messages.filter((message) => message.conversationId === conversationId);
  }
}

export const messageRepository = new MessageRepository();
