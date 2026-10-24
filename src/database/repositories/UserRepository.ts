import type { User } from '../schemas/models';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';
import { readStore } from '../../services/storageAdapter';
import { assertUuid } from '../../services/uuid';

const mapRow = (row: Record<string, unknown>): User => {
  const mapped: Record<string, unknown> = {};
  Object.entries(row).forEach(([key, value]) => {
    const camelKey = key.replace(/_([a-z])/g, (_match, letter: string) => letter.toUpperCase());
    mapped[camelKey] = value;
  });
  return mapped as unknown as User;
};

const storageKey = 'nexus_db_users';

export class UserRepository {
  async findById(id: string): Promise<User | undefined> {
    if (isSupabaseConfigured) {
      assertUuid(id, 'id');
      const { data, error } = await supabaseClient.from('users').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data ? mapRow(data as Record<string, unknown>) : undefined;
    }
    return readStore<User[]>(storageKey, []).find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('users').select('*').ilike('email', email).maybeSingle();
      if (error) throw error;
      return data ? mapRow(data as Record<string, unknown>) : undefined;
    }
    const users = readStore<User[]>(storageKey, []);
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }
}

export const userRepository = new UserRepository();
