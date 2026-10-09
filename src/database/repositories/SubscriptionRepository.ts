import { BaseRepository } from './BaseRepository';
import type { Subscription } from '../schemas/models';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';

export class SubscriptionRepository extends BaseRepository<Subscription> {
  constructor() { super('nexus_db_subscriptions'); }
  async findByStatus(status: string): Promise<Subscription[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('subscriptions').select('*').eq('status', status);
      if (error) throw error;
      return (data || []) as Subscription[];
    }
    const subscriptions = await this.findAll();
    return subscriptions.filter((subscription) => subscription.status === status);
  }
  async findByPlan(plan: string): Promise<Subscription[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('subscriptions').select('*').eq('plan', plan);
      if (error) throw error;
      return (data || []) as Subscription[];
    }
    const subscriptions = await this.findAll();
    return subscriptions.filter((subscription) => subscription.plan === plan);
  }
}

export const subscriptionRepository = new SubscriptionRepository();
