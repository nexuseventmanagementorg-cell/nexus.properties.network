import { getCurrentProvider } from './databaseProvider';

export interface SupabaseClientLike {
  from: (table: string) => { select: () => Promise<{ data: unknown[]; error?: unknown }>; insert: (payload: unknown) => Promise<{ data: unknown[]; error?: unknown }>; update: (payload: unknown) => Promise<{ data: unknown[]; error?: unknown }>; delete: () => Promise<{ data: unknown[]; error?: unknown }> };
}

export class SupabaseProvider {
  public readonly provider = getCurrentProvider();
  constructor(private readonly client?: SupabaseClientLike) {}
  public async isAvailable(): Promise<boolean> { return Boolean(this.client); }
  public async getUsers() { return this.client ? this.client.from('users').select() : { data: [], error: null }; }
  public async getProperties() { return this.client ? this.client.from('properties').select() : { data: [], error: null }; }
  public async getLeads() { return this.client ? this.client.from('leads').select() : { data: [], error: null }; }
  public async getDeals() { return this.client ? this.client.from('deals').select() : { data: [], error: null }; }
  public async getMessages() { return this.client ? this.client.from('messages').select() : { data: [], error: null }; }
  public async getNotifications() { return this.client ? this.client.from('notifications').select() : { data: [], error: null }; }
}

export const supabaseProvider = new SupabaseProvider();
