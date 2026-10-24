import { BaseRepository } from './BaseRepository';
import type { Payment } from '../schemas/models';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';
import { assertUuid } from '../../services/uuid';

export class PaymentRepository extends BaseRepository<Payment> {
  constructor() { super('nexus_db_payments'); }
  async findByStatus(status: string): Promise<Payment[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('payments').select('*').eq('status', status);
      if (error) throw error;
      return (data || []) as Payment[];
    }
    const payments = await this.findAll();
    return payments.filter((payment) => payment.status === status);
  }
  async findByOwner(ownerId: string): Promise<Payment[]> {
    if (isSupabaseConfigured) {
      assertUuid(ownerId, 'ownerId');
      const { data, error } = await supabaseClient.from('payments').select('*').eq('owner_id', ownerId);
      if (error) throw error;
      return (data || []) as Payment[];
    }
    return super.findByOwner(ownerId);
  }
}

export const paymentRepository = new PaymentRepository();
