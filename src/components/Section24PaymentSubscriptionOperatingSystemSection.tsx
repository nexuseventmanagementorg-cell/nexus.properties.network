import React, { useState } from 'react';
import { Activity, AlertOctagon, FileText, ShieldCheck, Wallet } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { billingCycles, escalationRules, financialAuditRules, financialDashboardModules, financialFraudRules, invoiceRules, lockPaymentRules, notificationRules, paymentIntelligenceResponsibilities, paymentMethods, paymentStatuses, paymentWorkflows, premiumListingTiers, refundRules, revenueRules, revenueSources, roleAccessRules, subscriptionIntelligenceResponsibilities, subscriptionPlans, subscriptionRules, subscriptionStatuses, type PaymentStatus } from '../architecture/Section24PaymentSubscriptionOperatingSystem';

type PaymentView = 'workflow' | 'subscriptions' | 'revenue' | 'governance';

const views: { id: PaymentView; label: string }[] = [
  { id: 'workflow', label: 'Payment Workflow' },
  { id: 'subscriptions', label: 'Subscriptions and Listings' },
  { id: 'revenue', label: 'Revenue Dashboard' },
  { id: 'governance', label: 'Fraud and Audit' },
];

export const Section24PaymentSubscriptionOperatingSystemSection: React.FC = () => {
  const [view, setView] = useState<PaymentView>('workflow');
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus>('Pending');
  const statusIndex = paymentStatuses.indexOf(selectedStatus);

  return (
    <section id="payment-subscription-operating-system" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#D4AF37]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><Wallet className="h-3.5 w-3.5" />SECTION 24 // PAYMENT &amp; SUBSCRIPTION OPERATING SYSTEM</div><h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">A governed financial layer.</h2><p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">A financial operating system for subscriptions, invoices, payments, premium features, lock fees, revenue, refunds, fraud controls, role access, and auditable settlement.</p></div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">{views.map((item) => <button key={item.id} onClick={() => { soundEngine.playClick(); setView(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}>{item.label}</button>)}</div>

        {view === 'workflow' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="space-y-2 lg:col-span-5">{paymentWorkflows.map((step) => <div key={step.order} className="flex gap-3 rounded-xl border border-white/10 bg-black/35 p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-xs font-bold text-[#D4AF37]">{step.order}</span><div><div className="text-sm font-semibold text-white">{step.state}</div><div className="mt-1 text-xs text-neutral-400">Owner: {step.owner}</div><div className="mt-2 text-xs text-[#2DD4BF]">Exit: {step.exitCondition}</div></div></div>)}</div><div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-7"><div className="mb-5 flex items-center gap-3"><Wallet className="h-6 w-6 text-[#2DD4BF]" /><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">PAYMENT STATE MACHINE</div><h3 className="mt-1 text-2xl font-bold text-white">Payment status control</h3></div></div><div className="mb-4 flex flex-wrap gap-2">{paymentStatuses.map((status) => <button key={status} onClick={() => { soundEngine.playClick(); setSelectedStatus(status); }} className={`rounded-lg border px-2.5 py-1.5 text-xs ${selectedStatus === status ? 'border-[#2DD4BF] bg-[#2DD4BF]/10 text-[#2DD4BF]' : 'border-white/10 text-neutral-400'}`}>{status}</button>)}</div><div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">Selected status</div><div className="mt-1 text-xl font-bold text-white">{statusIndex + 1}. {selectedStatus}</div><p className="mt-2 text-sm text-neutral-300">Payment transitions require gateway evidence, audit events, and entitlement rules.</p></div><List label="Supported payment methods" items={paymentMethods} /><List label="Subscription statuses" items={subscriptionStatuses} /></div></div>}

        {view === 'subscriptions' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Runtime subscription prices</h3></div>
              {subscriptionPlans.map((plan) => (
                <div key={plan.role} className="rounded-xl border border-white/10 bg-black/35 p-4">
                  <div className="font-semibold text-white">{plan.role}</div>
                  <div className="mt-2 text-xs text-neutral-400">Plans: {plan.plans.join(' / ')}</div>
                  <div className="mt-1 text-xs text-[#2DD4BF]">Billing cycle: {plan.billingCycles.join(' / ')}</div>
                  <div className="mt-2 text-xs text-neutral-300">Entitlements: {plan.premiumFeatures.join(' / ')}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <List label="Subscription rules" items={subscriptionRules} />
              <List label="Subscription Intelligence AI" items={subscriptionIntelligenceResponsibilities} />
              <div className="rounded-xl border border-white/10 bg-black/35 p-5">
                <div className="text-[10px] font-mono uppercase text-neutral-500">Runtime premium listing prices</div>
                <div className="mt-3 space-y-2">
                  {premiumListingTiers.map((tier) => (
                    <div key={tier.tier} className="rounded-lg border border-white/5 bg-black/40 p-3">
                      <div className="text-sm font-semibold text-white">{tier.tier} — PKR {tier.pricePKR}</div>
                      <div className="mt-1 text-xs text-neutral-400">{tier.features.join(' / ')}</div>
                      <div className="mt-1 text-xs text-[#2DD4BF]">Metrics: {tier.metrics.join(' / ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'revenue' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="Financial dashboard modules" items={financialDashboardModules} /><List label="Revenue sources" items={revenueSources} /><List label="Lead and deal lock payments" items={lockPaymentRules.map((rule) => `${rule.type}: ${rule.fields.join(', ')}`)} /></div><div className="space-y-3"><List label="Invoice rules" items={invoiceRules.map((rule) => `${rule.field}: ${rule.requirement}`)} /><List label="Role access" items={Object.entries(roleAccessRules).map(([role, access]) => `${role}: ${access.join(' / ')}`)} /><div className="rounded-xl border border-[#2DD4BF]/20 bg-[#2DD4BF]/5 p-4 text-sm leading-relaxed text-neutral-300">{revenueRules.join(' ')}</div></div></div>}

        {view === 'governance' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="Payment Intelligence AI" items={paymentIntelligenceResponsibilities} /><List label="Financial fraud detection" items={financialFraudRules} /><List label="Refund rules" items={refundRules} /><List label="Notifications" items={notificationRules} /></div><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div><div className="space-y-2">{escalationRules.map((rule) => <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div><div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div></div>)}</div></div><List label="Financial audit rules" items={financialAuditRules.map((rule) => `${rule.event} // ${rule.requiredFields.join(', ')}`)} /><div className="flex items-center gap-2 rounded-xl border border-rose-300/20 bg-rose-300/5 p-4 text-sm text-neutral-300"><AlertOctagon className="h-4 w-4 shrink-0 text-rose-300" />Financial history remains immutable through refunds, reversals, disputes, and chargebacks.</div></div></div>}
      </div>
    </section>
  );
};

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
