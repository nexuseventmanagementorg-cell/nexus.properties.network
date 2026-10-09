import React, { useState } from 'react';
import {
  ArrowRight,
  Activity,
  Bot,
  Building2,
  CheckCircle2,
  DollarSign,
  Sparkles,
  Landmark,
  Lock,
  MessageCircle,
  Network,
  Building,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { soundEngine } from '../utils/sound';

type PlanGroup = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  plans: { name: string; price: string; description: string }[];
};

const planGroups: PlanGroup[] = [
  {
    label: 'Runtime plans',
    icon: Users,
    plans: [
      { name: 'Starter', price: 'PKR 1,000 / month', description: 'Entitlements: DECISION REQUIRED' },
      { name: 'Professional', price: 'PKR 5,000 / month', description: 'Entitlements: DECISION REQUIRED' },
      { name: 'Enterprise', price: 'PKR 25,000 / month', description: 'Entitlements: DECISION REQUIRED' },
    ],
  },
];

const revenuePillars = [
  { title: 'Listing Economy', detail: 'Basic, verified, premium, and featured listing services.', icon: Building },
  { title: 'Lead Lock Economy', detail: 'Canonical lock duration is 48 hours. Any fee and payment prerequisite are DECISION REQUIRED.', icon: Lock },
  { title: 'Deal Lock Economy', detail: 'Canonical duration is 7 days initially, with a 15-day maximum total. Any fee and payment prerequisite are DECISION REQUIRED.', icon: ShieldCheck },
  { title: 'Verification Economy', detail: 'Owner, document, property, agent, and agency verification.', icon: ShieldCheck },
  { title: 'AI Services Economy', detail: 'Property analysis, market intelligence, and portfolio reports.', icon: Bot },
  { title: 'Enterprise AI Licensing', detail: 'Custom operating layers for developers, banks, agencies, and departments.', icon: Network },
  { title: 'WhatsApp AI Economy', detail: 'Lead qualification, follow-up, and property assistant subscriptions.', icon: MessageCircle },
  { title: 'Education and Events', detail: 'Training, certification, expos, summits, and conferences.', icon: Sparkles },
  { title: 'Data Intelligence', detail: 'Anonymous market, demand, area, and trend reports only.', icon: Activity },
  { title: 'Government Services', detail: 'Property, urban, housing, and development intelligence contracts.', icon: Landmark },
];

const scalingPhases = ['Lahore', 'Major Cities', 'All Pakistan', 'Overseas Pakistanis', 'Regional Expansion'];

export const RevenueEngineSection: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = planGroups[activeGroup];

  return (
    <section id="revenue-engine" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-28">
      <div className="pointer-events-none absolute left-1/3 top-0 h-[500px] w-[700px] rounded-full bg-[#D4AF37]/7 blur-[170px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/5 blur-[170px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel">
            <DollarSign className="h-3.5 w-3.5" />
            <span>SECTION 11 // REVENUE ENGINE &amp; ECONOMIC MODEL</span>
          </div>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Revenue follows protected trust.
          </h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">
            Nexus does not depend on advertising. The proposed model earns through verification, intelligence, subscriptions, and protected transactions while keeping user data private.
          </p>
        </div>

        <div className="mb-10 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/12 via-black/40 to-[#2DD4BF]/10 p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">RUNTIME SUBSCRIPTION PRICES</span>
              <h3 className="mt-1 text-2xl font-bold text-white">Subscription economy</h3>
            </div>
            <span className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-mono text-neutral-400">Plan eligibility and entitlements: DECISION REQUIRED</span>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {planGroups.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => { soundEngine.playClick(); setActiveGroup(index); }}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${activeGroup === index ? 'bg-[#D4AF37] text-black' : 'border border-white/10 bg-black/40 text-neutral-400 hover:text-white'}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {group.plans.map((plan, index) => (
              <div key={plan.name} className={`rounded-2xl border p-5 ${index === group.plans.length - 1 ? 'border-[#2DD4BF]/50 bg-[#2DD4BF]/10' : 'border-white/10 bg-black/45'}`}>
                <div className="mb-8 flex items-start justify-between gap-3">
                  <h4 className="text-sm font-bold text-white">{plan.name}</h4>
                  {index === group.plans.length - 1 && <Sparkles className="h-4 w-4 shrink-0 text-[#D4AF37]" />}
                </div>
                <div className="text-lg font-extrabold text-[#D4AF37]">{plan.price}</div>
                <p className="mt-2 text-xs leading-relaxed text-neutral-400">{plan.description}</p>
                <div className="mt-5 flex items-center gap-1.5 text-[10px] font-mono text-amber-300">Entitlements: DECISION REQUIRED</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#2DD4BF]">TRANSACTION AND SERVICE LAYERS</span>
                <h3 className="mt-1 text-2xl font-bold text-white">Fourteen revenue pillars, one governed model</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {revenuePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="rounded-2xl border border-white/10 bg-black/45 p-4 transition-colors hover:border-[#D4AF37]/40">
                    <div className="mb-3 flex items-center gap-3"><Icon className="h-5 w-5 text-[#D4AF37]" /><h4 className="text-sm font-bold text-white">{pillar.title}</h4></div>
                    <p className="text-xs leading-relaxed text-neutral-400">{pillar.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 p-6 lg:col-span-4">
            <Lock className="mb-5 h-7 w-7 text-[#2DD4BF]" />
            <h3 className="text-2xl font-bold text-white">Privacy-first intelligence</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">Nexus never sells personal user data. Only aggregated, anonymous market intelligence can be packaged for approved reporting.</p>
            <div className="mt-6 space-y-2.5 text-xs font-mono">
              {['Anonymous market reports', 'Area demand reports', 'Trend intelligence', 'No personal data resale'].map((item) => <div key={item} className="flex items-center gap-2 text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5" />{item}</div>)}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">NEXUS SCALING STRATEGY</span>
              <h3 className="mt-1 text-2xl font-bold text-white">From Lahore to regional infrastructure</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500"><Network className="h-4 w-4 text-[#2DD4BF]" /> Phased expansion model</div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
            {scalingPhases.map((phase, index) => (
              <div key={phase} className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] font-mono text-[#D4AF37]">PHASE {index + 1}</div>
                <div className="mt-2 text-sm font-bold text-white">{phase}</div>
                {index < scalingPhases.length - 1 && <ArrowRight className="absolute -bottom-6 left-1/2 hidden h-4 w-4 text-neutral-600 sm:block" />}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5 text-xs font-mono tracking-widest text-[#D4AF37]">
            <span>PROTECT THE LEAD</span><span className="text-neutral-600">//</span><span>PROTECT THE DEAL</span><span className="text-neutral-600">//</span><span>PROTECT THE TRUST</span><span className="text-neutral-600">//</span><span className="text-white">THE REVENUE WILL FOLLOW</span>
          </div>
        </div>
      </div>
    </section>
  );
};
