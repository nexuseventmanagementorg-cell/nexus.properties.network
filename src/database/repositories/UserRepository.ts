import { BaseRepository } from './BaseRepository';
import type { User } from '../schemas/models';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';

const mapRow = <T,>(row: Record<string, unknown>): T => {
  const mapped: Record<string, unknown> = {};
  Object.entries(row).forEach(([key, value]) => {
    const camelKey = key.replace(/_([a-z])/g, (_match, letter: string) => letter.toUpperCase());
    mapped[camelKey] = value;
  });
  return mapped as T;
};

export class UserRepository extends BaseRepository<User> {
  constructor() { super('nexus_db_users'); }
  async findByEmail(email: string): Promise<User | undefined> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('users').select('*').ilike('email', email).maybeSingle();
      if (error) throw error;
      return data ? mapRow<User>(data as Record<string, unknown>) : undefined;
    }
    const users = await this.findAll();
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }
}

export const userRepository = new UserRepository();
