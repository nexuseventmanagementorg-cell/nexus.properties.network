import { subscriptionRepository } from '../database/repositories/SubscriptionRepository';
import type { Subscription } from '../database/schemas/models';

export type SubscriptionPlan = 'Starter' | 'Professional' | 'Enterprise';
export type SubscriptionLifecycle = 'Pending' | 'Active' | 'Expired' | 'Cancelled';

export const subscriptionPlans: Record<SubscriptionPlan, number> = {
  Starter: 1000,
  Professional: 5000,
  Enterprise: 25000,
};

export const createSubscription = async (ownerId: string, plan: SubscriptionPlan, provider = 'JazzCash'): Promise<Subscription> => {
  const now = new Date().toISOString();
  return subscriptionRepository.save({
    id: `SUB-${Date.now()}`,
    ownerId,
    plan,
    billingCycle: 'monthly',
    provider,
    status: 'Pending',
    createdAt: now,
    updatedAt: now,
    auditId: `AUD-${Date.now()}`,
  } as Subscription);
};

export const activateSubscription = async (subscriptionId: string) => {
  const subscription = await subscriptionRepository.findById(subscriptionId);
  if (!subscription) return undefined;
  return subscriptionRepository.update(subscriptionId, { status: 'Active', updatedAt: new Date().toISOString() });
};

export const cancelSubscription = async (subscriptionId: string) => {
  const subscription = await subscriptionRepository.findById(subscriptionId);
  if (!subscription) return undefined;
  return subscriptionRepository.update(subscriptionId, { status: 'Cancelled', updatedAt: new Date().toISOString() });
};

export const getSubscriptionSummary = async () => {
  const subscriptions = await subscriptionRepository.findAll();
  return {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter((s) => s.status === 'Active').length,
    pendingSubscriptions: subscriptions.filter((s) => s.status === 'Pending').length,
    expiredSubscriptions: subscriptions.filter((s) => s.status === 'Expired').length,
  };
};
