import { paymentRepository } from '../database/repositories/PaymentRepository';
import { invoiceRepository } from '../database/repositories/InvoiceRepository';
import type { Payment } from '../database/schemas/models';
import { generateInvoice, InvoiceType } from './invoiceService';
import { activateSubscription, createSubscription, subscriptionPlans, SubscriptionPlan } from './subscriptionService';

export type PaymentProvider = 'JazzCash' | 'Easypaisa' | 'Bank Transfer';
export type PaymentFlowType = 'subscription' | 'lead-lock' | 'deal-lock' | 'premium-listing';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'Cancelled';

export interface CreatePaymentInput {
  ownerId: string;
  amount: number;
  provider: PaymentProvider;
  flowType: PaymentFlowType;
  reference?: string;
  currency?: string;
  subscriptionId?: string;
}

export interface GatewayPaymentRequest {
  paymentId: string;
  amount: number;
  currency: string;
  reference: string;
  callbackUrl?: string;
}

export interface GatewayPaymentResponse {
  providerReference: string;
  checkoutUrl?: string;
  raw: unknown;
}

export interface GatewayCallbackResult {
  providerReference: string;
  status: PaymentStatus;
  raw: unknown;
}

export interface PaymentGateway {
  readonly provider: Exclude<PaymentProvider, 'Bank Transfer'>;
  createPayment(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse>;
  handleCallback(payload: unknown): Promise<GatewayCallbackResult>;
}

const getEnv = (name: string) => String(import.meta.env[name] || '').trim();

class SandboxGateway implements PaymentGateway {
  constructor(public readonly provider: Exclude<PaymentProvider, 'Bank Transfer'>, private readonly endpointEnv: string) {}

  async createPayment(request: GatewayPaymentRequest): Promise<GatewayPaymentResponse> {
    const endpoint = getEnv(this.endpointEnv);
    if (!endpoint) throw new Error(`${this.provider} sandbox endpoint is not configured (${this.endpointEnv}).`);
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Nexus-Environment': 'sandbox' }, body: JSON.stringify(request) });
    if (!response.ok) throw new Error(`${this.provider} sandbox payment creation failed with HTTP ${response.status}.`);
    const raw = await response.json() as Record<string, unknown>;
    const providerReference = String(raw.providerReference || raw.transactionId || raw.txnRef || '');
    if (!providerReference) throw new Error(`${this.provider} sandbox returned no provider reference.`);
    return { providerReference, checkoutUrl: typeof raw.checkoutUrl === 'string' ? raw.checkoutUrl : undefined, raw };
  }

  async handleCallback(payload: unknown): Promise<GatewayCallbackResult> {
    const callbackEndpoint = getEnv('VITE_PAYMENT_CALLBACK_API_URL');
    if (!callbackEndpoint) throw new Error('Payment callback API endpoint is not configured. Callback signature verification must run server-side.');
    const response = await fetch(callbackEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Nexus-Provider': this.provider }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error(`${this.provider} callback handling failed with HTTP ${response.status}.`);
    const callback = await response.json() as Record<string, unknown>;
    const status = String(callback.status || '').toLowerCase();
    const normalized: PaymentStatus = ['paid', 'success', 'successful', 'completed'].includes(status) ? 'Paid' : ['cancelled', 'canceled'].includes(status) ? 'Cancelled' : ['failed', 'failure'].includes(status) ? 'Failed' : 'Pending';
    const providerReference = String(callback.providerReference || callback.transactionId || callback.txnRef || '');
    if (!providerReference) throw new Error(`${this.provider} callback response contains no provider reference.`);
    return { providerReference, status: normalized, raw: callback };
  }
}

export const paymentGateways: Record<'JazzCash' | 'Easypaisa', PaymentGateway> = {
  JazzCash: new SandboxGateway('JazzCash', 'VITE_JAZZCASH_SANDBOX_URL'),
  Easypaisa: new SandboxGateway('Easypaisa', 'VITE_EASYPAISA_SANDBOX_URL'),
};

export const PAYMENT_PROVIDERS: PaymentProvider[] = ['JazzCash', 'Easypaisa', 'Bank Transfer'];

export const createPayment = async (input: CreatePaymentInput): Promise<Payment & { checkoutUrl?: string }> => {
  const now = new Date().toISOString();
  const paymentId = `PAY-${Date.now()}`;
  const reference = input.reference || `REF-${Date.now()}`;
  const gateway = input.provider === 'Bank Transfer' ? undefined : paymentGateways[input.provider];
  const gatewayResponse = gateway ? await gateway.createPayment({ paymentId, amount: input.amount, currency: input.currency || 'PKR', reference, callbackUrl: getEnv('VITE_PAYMENT_CALLBACK_URL') || undefined }) : undefined;
  const payment = await paymentRepository.save({
    id: paymentId,
    ownerId: input.ownerId,
    amount: input.amount,
    currency: input.currency || 'PKR',
    provider: input.provider,
    eventType: input.flowType,
    reference: gatewayResponse?.providerReference || reference,
    subscriptionId: input.subscriptionId,
    status: 'Pending',
    createdAt: now,
    updatedAt: now,
    auditId: `AUD-${Date.now()}`,
  } as Payment);
  await generateInvoice({ ownerId: input.ownerId, amount: input.amount, type: input.flowType === 'subscription' ? 'Subscription Invoice' : `${input.flowType.replace('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())} Invoice` as InvoiceType, reference: payment.reference });
  return Object.assign(payment, { checkoutUrl: gatewayResponse?.checkoutUrl });
};

export const createSubscriptionPayment = async (input: { ownerId: string; plan: SubscriptionPlan; provider: Exclude<PaymentProvider, 'Bank Transfer'> }) => {
  const subscription = await createSubscription(input.ownerId, input.plan, input.provider);
  const payment = await createPayment({ ownerId: input.ownerId, amount: subscriptionPlans[input.plan], provider: input.provider, flowType: 'subscription', subscriptionId: subscription.id, reference: `SUB-${subscription.id}` });
  return { subscription, payment };
};

export const markPaymentStatus = async (paymentId: string, status: PaymentStatus) => {
  const payment = await paymentRepository.findById(paymentId);
  if (!payment) return undefined;
  return paymentRepository.update(paymentId, { status, updatedAt: new Date().toISOString() });
};

export const handlePaymentCallback = async (provider: Exclude<PaymentProvider, 'Bank Transfer'>, payload: unknown) => {
  const result = await paymentGateways[provider].handleCallback(payload);
  const payments = await paymentRepository.findAll();
  const payment = payments.find((item) => item.reference === result.providerReference);
  if (!payment) throw new Error(`No payment matches provider reference ${result.providerReference}.`);
  const updated = await markPaymentStatus(payment.id, result.status);
  const invoices = await invoiceRepository.findAll();
  const invoice = invoices.find((item) => item.reference === payment.reference);
  if (invoice) await invoiceRepository.update(invoice.id, { status: result.status === 'Paid' ? 'Paid' : result.status === 'Failed' ? 'Failed' : invoice.status });
  if (result.status === 'Paid' && payment.subscriptionId) await activateSubscription(payment.subscriptionId);
  return { payment: updated, status: result.status, raw: result.raw };
};

export const createLeadLockPayment = (ownerId: string, amount: number, provider: PaymentProvider = 'JazzCash') =>
  createPayment({ ownerId, amount, provider, flowType: 'lead-lock', reference: `LEAD-LOCK-${Date.now()}` });

export const createDealLockPayment = (ownerId: string, amount: number, provider: PaymentProvider = 'Bank Transfer') =>
  createPayment({ ownerId, amount, provider, flowType: 'deal-lock', reference: `DEAL-LOCK-${Date.now()}` });

export const getPaymentSummary = async () => {
  const payments = await paymentRepository.findAll();
  return {
    totalRevenue: payments.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + Number(p.amount), 0),
    pendingPayments: payments.filter((p) => p.status === 'Pending').length,
    failedPayments: payments.filter((p) => p.status === 'Failed').length,
    payments: payments.length,
  };
};
