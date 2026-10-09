import React, { useState } from 'react';
import { Activity, ArrowRight, Bot, Globe, Smartphone, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  adminAppFeatures,
  agencyAppFeatures,
  agentAppFeatures,
  aiFeatures,
  analyticsRules,
  analyticsSignals,
  applicationRules,
  auditEvents,
  auditRules,
  buyerAppFeatures,
  coreMobileFeatures,
  developerAppFeatures,
  escalationRules,
  featureRules,
  investorAppFeatures,
  mobileApplications,
  mobilePerformanceMetrics,
  mobilePlatforms,
  notificationRules,
  notificationTypes,
  offlineFeatures,
  offlineRules,
  securityFeatures,
  securityRules,
  sellerAppFeatures,
  voiceFeatures,
  voiceRules,
} from '../architecture/Section39MobileAppArchitecture';

type MobileView = 'overview' | 'roles' | 'experience' | 'governance';

const views: { id: MobileView; label: string }[] = [
  { id: 'overview', label: 'Mobile Overview' },
  { id: 'roles', label: 'Role Applications' },
  { id: 'experience', label: 'Features and Offline' },
  { id: 'governance', label: 'Security and Metrics' },
];

export const Section39MobileAppArchitectureSection: React.FC = () => {
  const [view, setView] = useState<MobileView>('overview');

  return (
    <section id="mobile-app-architecture" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#D4AF37]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><Smartphone className="h-3.5 w-3.5" />SECTION 39 // MOBILE APP ARCHITECTURE</div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">One mobile ecosystem for every Nexus role.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">The Nexus mobile architecture brings property discovery, graph intelligence, AI, voice, leads, deals, CRM, payments, verification, and governance into role-aware Android, iOS, and tablet experiences.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">{views.map((item) => <button key={item.id} onClick={() => { soundEngine.playClick(); setView(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}>{item.label}</button>)}</div>

        {view === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-8"><div className="mb-5 flex items-center gap-3"><Smartphone className="h-6 w-6 text-[#2DD4BF]" /><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">MOBILE APP VISION</div><h3 className="mt-1 text-2xl font-bold text-white">One Nexus mobile ecosystem</h3></div></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{mobilePlatforms.map((platform, index) => <div key={platform} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-3"><div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500"><span>Platform {index + 1}</span><ArrowRight className="h-3 w-3 text-[#2DD4BF]" /></div><div className="text-sm font-semibold text-white">{platform}</div></div>)}</div><div className="mt-6 grid gap-3 md:grid-cols-2"><List label="Applications" items={mobileApplications} /><List label="Core features" items={coreMobileFeatures} /></div></div><div className="space-y-3 lg:col-span-4"><RuleList label="Application rules" rules={applicationRules} /><List label="AI features" items={aiFeatures} /></div></div>
        )}

        {view === 'roles' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="Buyer App" items={buyerAppFeatures} /><List label="Seller App" items={sellerAppFeatures} /><List label="Agent App" items={agentAppFeatures} /><List label="Agency App" items={agencyAppFeatures} /></div><div className="space-y-3"><List label="Developer App" items={developerAppFeatures} /><List label="Investor App" items={investorAppFeatures} /><List label="Admin Apps" items={adminAppFeatures} /><RuleList label="Feature rules" rules={featureRules} /></div></div>
        )}

        {view === 'experience' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><RuleList label="Voice rules" rules={voiceRules} /><List label="Voice features" items={voiceFeatures} /><RuleList label="Offline rules" rules={offlineRules} /><List label="Offline features" items={offlineFeatures} /></div><div className="space-y-3"><RuleList label="Notification rules" rules={notificationRules} /><List label="Notification types" items={notificationTypes} /><List label="Analytics signals" items={analyticsSignals} /><RuleList label="Analytics rules" rules={analyticsRules} /></div></div>
        )}

        {view === 'governance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="Security" items={securityFeatures} /><RuleList label="Security rules" rules={securityRules} /><List label="Audit system" items={auditEvents} /><RuleList label="Audit rules" rules={auditRules} /></div><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Mobile performance metrics</h3></div><div className="space-y-2">{mobilePerformanceMetrics.map((metric) => <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs text-neutral-400">{metric.label}</span><span className="text-sm font-semibold text-white">{metric.value}</span></div>)}</div></div><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div><div className="space-y-2">{escalationRules.map((rule) => <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div><div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div></div>)}</div></div><RuleList label="Mobile governance" rules={applicationRules} /></div></div>
        )}
      </div>
    </section>
  );
};

const RuleList: React.FC<{ label: string; rules: { title: string; description: string }[] }> = ({ label, rules }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-2">{rules.map((rule) => <div key={rule.title}><div className="text-xs font-semibold text-white">{rule.title}</div><div className="mt-1 text-xs leading-relaxed text-neutral-400">{rule.description}</div></div>)}</div></div>;

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
