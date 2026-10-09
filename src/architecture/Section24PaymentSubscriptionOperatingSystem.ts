export type PaymentMethod = 'JazzCash' | 'Easypaisa' | 'Bank Transfer';
export type SubscriptionStatus = 'Pending' | 'Active' | 'Grace Period' | 'Suspended' | 'Cancelled' | 'Expired';
export type BillingCycle = 'Monthly';
export type PaymentStatus = 'Created' | 'Pending' | 'Processing' | 'Paid' | 'Failed' | 'Cancelled' | 'Refunded';

export interface PaymentWorkflowStep {
  order: number;
  state: string;
  owner: string;
  requiredEvidence: string[];
  exitCondition: string;
}

export interface SubscriptionPlan {
  role: string;
  plans: string[];
  billingCycles: BillingCycle[];
  premiumFeatures: string[];
}

export interface InvoiceRule {
  field: string;
  requirement: string;
}

export interface FinancialAuditRule {
  event: string;
  requiredFields: string[];
  retention: string;
}

export const paymentMethods: PaymentMethod[] = ['JazzCash', 'Easypaisa', 'Bank Transfer'];
export const futurePaymentMethods = ['Debit Cards', 'Credit Cards', 'Corporate Billing', 'Enterprise Invoicing', 'Future Gateway Integrations'] as const;
export const futurePaymentMethodsStatus = 'FUTURE / DECISION REQUIRED';
export const revenueSources = ['Subscriptions (runtime prices defined)', 'Premium Listings (runtime prices defined)', 'Lead Lock Fees (DECISION REQUIRED)', 'Deal Lock Fees (DECISION REQUIRED)', 'Verification Services (FUTURE / DECISION REQUIRED)', 'AI Services (FUTURE / DECISION REQUIRED)', 'Advertising Services (FUTURE / DECISION REQUIRED)'];
export const subscriptionStatuses: SubscriptionStatus[] = ['Pending', 'Active', 'Grace Period', 'Suspended', 'Cancelled', 'Expired'];
export const billingCycles: BillingCycle[] = ['Monthly'];
export const legacyBillingCycles = ['Quarterly', 'Semi Annual', 'Yearly', 'Enterprise Custom'] as const;
export const legacyBillingCyclesStatus = 'LEGACY / NON-CANONICAL';
export const legacySubscriptionStatuses = ['Trial', 'Pending Payment', 'Refunded'] as const;
export const legacySubscriptionStatusesStatus = 'LEGACY / NON-CANONICAL';
export const paymentStatuses: PaymentStatus[] = ['Created', 'Pending', 'Processing', 'Paid', 'Failed', 'Cancelled', 'Refunded'];

export const paymentWorkflows: PaymentWorkflowStep[] = [
  { order: 1, state: 'User Selects Plan', owner: 'User or organization', requiredEvidence: ['Role', 'Plan', 'Billing cycle', 'Accepted terms'], exitCondition: 'Plan selection recorded' },
  { order: 2, state: 'Invoice Generated', owner: 'Billing service', requiredEvidence: ['Invoice ID', 'User', 'Role', 'Plan', 'Amount', 'Tax', 'Discount', 'Due date'], exitCondition: 'Immutable invoice created' },
  { order: 3, state: 'Payment Initiated', owner: 'Payment gateway', requiredEvidence: ['Transaction ID', 'Gateway', 'Amount', 'Timestamp'], exitCondition: 'Payment enters processing' },
  { order: 4, state: 'Payment Verification', owner: 'Payment Intelligence AI and gateway', requiredEvidence: ['Gateway response', 'Payment reference', 'Risk state'], exitCondition: 'Paid, failed, or cancelled result; refund follows an authorized process' },
  { order: 5, state: 'Subscription Activated', owner: 'Subscription service', requiredEvidence: ['Verified payment', 'Plan entitlement', 'Activation timestamp'], exitCondition: 'Entitlement available' },
  { order: 6, state: 'Receipt Generated', owner: 'Billing service', requiredEvidence: ['Receipt ID', 'Invoice link', 'Payment status'], exitCondition: 'Receipt delivered' },
  { order: 7, state: 'Audit Logged', owner: 'Financial audit service', requiredEvidence: ['Transaction event', 'AI review', 'Final outcome'], exitCondition: 'Append-only event stored' },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    role: 'Runtime catalog (role eligibility: DECISION REQUIRED)',
    plans: ['Starter — PKR 1,000/month', 'Professional — PKR 5,000/month', 'Enterprise — PKR 25,000/month'],
    billingCycles,
    premiumFeatures: ['DECISION REQUIRED: feature entitlements and quotas.'],
  },
];

export const subscriptionRules = [
  'CANONICAL: Starter is PKR 1,000/month; Professional is PKR 5,000/month; Enterprise is PKR 25,000/month.',
  'A subscription becomes Active only after payment is verified.',
  'DECISION REQUIRED: role eligibility, features, quotas and entitlements.',
  'DECISION REQUIRED: grace duration, suspension, renewal, cancellation, refund and entitlement behavior.',
];
export const subscriptionIntelligenceResponsibilities = ['Track plan usage', 'Track renewal probability', 'Recommend upgrades', 'Detect downgrade risk', 'Monitor subscription health', 'Predict churn'];

export const invoiceRules: InvoiceRule[] = [
  { field: 'Invoice ID', requirement: 'Unique, immutable identifier.' },
  { field: 'User and Role', requirement: 'Billing owner and verified role are required.' },
  { field: 'Plan', requirement: 'Plan and billing cycle must be recorded.' },
  { field: 'Amount, Tax, Discount', requirement: 'Amounts must be calculated, itemized, and non-negative.' },
  { field: 'Status', requirement: 'Invoice status follows payment state transitions.' },
  { field: 'Due Date and Payment Date', requirement: 'Dates are timestamped and timezone-aware.' },
];

export const refundRules = ['Duplicate charges require transaction correlation.', 'Failed activations require entitlement and gateway comparison.', 'Manual approval requires reason, reviewer, and evidence.', 'Compliance requests require policy reference and authorized review.', 'AI Admin review is required for risk, abuse, or disputed refunds.', 'Refunds never erase original transaction or invoice history.'];
export const financialFraudRules = ['Detect fake payments and invalid gateway references.', 'Detect duplicate payments and duplicate invoice settlement.', 'Detect payment abuse and abnormal payment patterns.', 'Detect chargeback abuse and repeated reversals.', 'Detect subscription manipulation and entitlement bypass.', 'Detect invoice manipulation, amount changes, or unauthorized discounts.'];
export const paymentIntelligenceResponsibilities = ['Monitor transactions', 'Detect risks', 'Track revenue', 'Track subscription health', 'Generate reports', 'Predict churn'];

export const premiumListingTiers = [
  { tier: 'Featured Listing', pricePKR: 15000, features: ['DECISION REQUIRED: tier entitlements.'], metrics: ['DECISION REQUIRED: tier metrics.'] },
  { tier: 'Premium Listing', pricePKR: 30000, features: ['DECISION REQUIRED: tier entitlements.'], metrics: ['DECISION REQUIRED: tier metrics.'] },
  { tier: 'Developer Spotlight', pricePKR: 50000, features: ['DECISION REQUIRED: tier entitlements.'], metrics: ['DECISION REQUIRED: tier metrics.'] },
];
export const legacyPremiumListingTiers = ['Basic Listing', 'Verified Listing', 'Enterprise Listing'] as const;
export const legacyPremiumListingTiersStatus = 'LEGACY / NON-CANONICAL';

export const lockPaymentRules = [
  { type: 'Lead Lock Payment', fields: ['Fee: DECISION REQUIRED', 'Canonical duration: 48 hours', 'Payment prerequisite: DECISION REQUIRED'] },
  { type: 'Deal Lock Payment', fields: ['Fee: DECISION REQUIRED', 'Canonical duration: 7 days initial / 15 days maximum total', 'Payment prerequisite: DECISION REQUIRED'] },
];

export const roleAccessRules: Record<string, string[]> = {
  Buyer: ['View own payments and invoices; payment authority DECISION REQUIRED'],
  Seller: ['View own billing and settlement records; settlement permissions DECISION REQUIRED'],
  Agent: ['View own invoices and subscription; payment and settlement authority DECISION REQUIRED'],
  Agency: ['Organization billing scope DECISION REQUIRED'],
  Developer: ['Project billing scope DECISION REQUIRED'],
  Investor: ['View own payments; investment plan and settlement scope DECISION REQUIRED'],
  Industrial: ['View own billing; plan and payment scope DECISION REQUIRED'],
  Corporate: ['Organization billing scope DECISION REQUIRED'],
  Government: ['Institutional billing scope DECISION REQUIRED'],
  'AI Admin': ['Monitor and flag financial risk; financial actions DECISION REQUIRED'],
  'Super Admin': ['Privileged financial action scope and approvals DECISION REQUIRED'],
};

export const financialDashboardModules = ['Revenue Overview', 'Subscriptions', 'Invoices', 'Transactions', 'Refunds', 'Chargebacks', 'Lead Lock Revenue', 'Deal Lock Revenue', 'Premium Listing Revenue'];
export const notificationRules = ['Payment Initiated', 'Payment Successful', 'Payment Failed', 'Subscription Activated', 'Invoice Due', 'Refund Processed', 'Chargeback Opened', 'Financial Risk Escalated'];

export const financialAuditRules: FinancialAuditRule[] = [
  { event: 'Transaction created or updated', requiredFields: ['transactionId', 'user', 'amount', 'gateway', 'timestamp', 'status'], retention: 'Append-only financial record' },
  { event: 'Subscription entitlement changed', requiredFields: ['user', 'role', 'plan', 'status', 'timestamp', 'AI review'], retention: 'Retained for subscription lifetime and audit period' },
  { event: 'Refund, reversal, or chargeback', requiredFields: ['transactionId', 'reason', 'reviewer', 'AI review', 'final outcome'], retention: 'Immutable dispute and refund record' },
  { event: 'Revenue or invoice adjustment', requiredFields: ['invoiceId', 'actor', 'amountBefore', 'amountAfter', 'reason', 'timestamp'], retention: 'Immutable accounting audit trail' },
];

export const escalationRules = [
  { level: 1, owner: 'Payment Intelligence AI', trigger: 'Transaction anomaly or subscription health risk', action: 'Review, report, or request gateway verification' },
  { level: 2, owner: 'Fraud Detection AI', trigger: 'Fake, duplicate, abusive, or manipulated payment signal', action: 'Flag and preserve evidence; payment/workflow freeze authority is DECISION REQUIRED' },
  { level: 3, owner: 'Compliance AI', trigger: 'Policy, billing, privacy, or regulatory concern', action: 'Classify compliance risk and prepare report' },
  { level: 4, owner: 'AI Admin', trigger: 'Material financial risk, refund exception, or chargeback conflict', action: 'Review, flag, recommend, and escalate; financial action/approval authority is DECISION REQUIRED' },
  { level: 5, owner: 'Super Admin', trigger: 'Unresolved, exceptional, or platform-wide financial issue', action: 'Final human governance decision' },
];

export const revenueRules = ['DECISION REQUIRED: revenue-source accounting, invoice linkage, taxes, refunds, and reconciliation rules.', 'Lead Lock and Deal Lock fees are not defined; do not charge until their fees and payment prerequisites are approved.', 'Runtime premium listing prices are preserved; tier entitlements and performance metrics are DECISION REQUIRED.', 'Production revenue reports must not treat unverified payment status as settled revenue.'];
export const paymentSubscriptionOperatingSystemVersion = '24.0.0';
