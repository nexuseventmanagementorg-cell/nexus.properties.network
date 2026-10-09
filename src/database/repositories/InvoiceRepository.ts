import { BaseRepository } from './BaseRepository';
import type { Invoice } from '../schemas/models';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';

export class InvoiceRepository extends BaseRepository<Invoice> {
  constructor() { super('nexus_db_invoices'); }
  async findByStatus(status: string): Promise<Invoice[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('invoices').select('*').eq('status', status);
      if (error) throw error;
      return (data || []) as Invoice[];
    }
    const invoices = await this.findAll();
    return invoices.filter((invoice) => invoice.status === status);
  }
  async findByType(type: string): Promise<Invoice[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('invoices').select('*').eq('type', type);
      if (error) throw error;
      return (data || []) as Invoice[];
    }
    const invoices = await this.findAll();
    return invoices.filter((invoice) => invoice.type === type);
  }
}

export const invoiceRepository = new InvoiceRepository();
