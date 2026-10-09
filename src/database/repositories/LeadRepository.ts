import { BaseRepository } from './BaseRepository';
import type { Lead } from '../schemas/models';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';

export class LeadRepository extends BaseRepository<Lead> {
  constructor() { super('nexus_db_leads'); }
  async findByStatus(status: string): Promise<Lead[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('leads').select('*').eq('status', status);
      if (error) throw error;
      return (data || []) as Lead[];
    }
    const leads = await this.findAll();
    return leads.filter((lead) => lead.status === status);
  }
}

export const leadRepository = new LeadRepository();
