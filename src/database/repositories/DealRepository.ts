import { BaseRepository } from './BaseRepository';
import type { Deal } from '../schemas/models';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';

export class DealRepository extends BaseRepository<Deal> {
  constructor() { super('nexus_db_deals'); }
  async findByStatus(status: string): Promise<Deal[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('deals').select('*').eq('status', status);
      if (error) throw error;
      return (data || []) as Deal[];
    }
    const deals = await this.findAll();
    return deals.filter((deal) => deal.status === status);
  }
}

export const dealRepository = new DealRepository();
