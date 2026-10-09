import React, { useState } from 'react';
import { Activity, ArrowRight, Bot, Globe, ShieldCheck, Webhook } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  aiApiOperations,
  aiApiRules,
  analyticsApiOperations,
  analyticsApiRules,
  apiCategories,
  apiPerformanceMetrics,
  apiVisionConsumers,
  auditEvents,
  auditRules,
  authenticationApiRules,
  authenticationMethods,
  crmApiOperations,
  crmApiRules,
  dealApiOperations,
  dealApiRules,
  developerPortal,
  escalationRules,
  knowledgeApiOperations,
  leadApiOperations,
  leadApiRules,
  paymentApiRules,
  paymentProviders,
  propertyApiOperations,
  propertyApiRules,
  securityControls,
  securityRules,
  thirdPartyIntegrations,
  voiceApiOperations,
  webhookEvents,
} from '../architecture/Section38NexusAPIEcosystem';

type APIView = 'overview' | 'domains' | 'integrations' | 'governance';

const views: { id: APIView; label: string }[] = [
  { id: 'overview', label: 'API Overview' },
  { id: 'domains', label: 'API Domains' },
  { id: 'integrations', label: 'Integrations and Portal' },
  { id: 'governance', label: 'Security and Metrics' },
];

export const Section38NexusAPIEcosystemSection: React.FC = () => {
  const [view, setView] = useState<APIView>('overview');

  return (
    <section id="nexus-api-ecosystem" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#2DD4BF]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><Globe className="h-3.5 w-3.5" />SECTION 38 // NEXUS API ECOSYSTEM</div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">One API layer for the entire Nexus ecosystem.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">The Nexus API Ecosystem connects the website, mobile apps, CRM, channels, AI workforce, payment providers, government systems, partners, developers, and enterprise clients through governed interfaces.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">{views.map((item) => <button key={item.id} onClick={() => { soundEngine.playClick(); setView(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}>{item.label}</button>)}</div>

        {view === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-8"><div className="mb-5 flex items-center gap-3"><Globe className="h-6 w-6 text-[#2DD4BF]" /><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">API VISION</div><h3 className="mt-1 text-2xl font-bold text-white">One unified Nexus API layer</h3></div></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{apiVisionConsumers.map((consumer, index) => <div key={consumer} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-3"><div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500"><span>Consumer {index + 1}</span><ArrowRight className="h-3 w-3 text-[#2DD4BF]" /></div><div className="text-sm font-semibold text-white">{consumer}</div></div>)}</div><div className="mt-6 grid gap-3 md:grid-cols-2"><List label="API categories" items={apiCategories} /><List label="Authentication" items={authenticationMethods} /></div></div><div className="space-y-3 lg:col-span-4"><RuleList label="Authentication API rules" rules={authenticationApiRules} /><List label="Webhook system" items={webhookEvents} /></div></div>
        )}

        {view === 'domains' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><RuleList label="Property API" rules={propertyApiRules} /><List label="Property operations" items={propertyApiOperations} /><RuleList label="Lead API" rules={leadApiRules} /><List label="Lead operations" items={leadApiOperations} /><RuleList label="Deal API" rules={dealApiRules} /><List label="Deal operations" items={dealApiOperations} /></div><div className="space-y-3"><RuleList label="Payment API" rules={paymentApiRules} /><List label="Payment providers and operations" items={paymentProviders} /><RuleList label="CRM API" rules={crmApiRules} /><List label="CRM operations" items={crmApiOperations} /><RuleList label="AI API" rules={aiApiRules} /><List label="AI operations" items={aiApiOperations} /><List label="Voice API operations" items={voiceApiOperations} /><List label="Knowledge API operations" items={knowledgeApiOperations} /><RuleList label="Analytics API" rules={analyticsApiRules} /><List label="Analytics operations" items={analyticsApiOperations} /></div></div>
        )}

        {view === 'integrations' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Webhook className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Webhook system</h3></div><div className="space-y-2">{webhookEvents.map((event) => <div key={event} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{event}</div>)}</div></div><List label="Third-party integrations" items={thirdPartyIntegrations} /></div><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Developer portal</h3></div><div className="grid gap-2 sm:grid-cols-2">{developerPortal.map((item) => <div key={item} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{item}</div>)}</div></div><RuleList label="Security controls" rules={securityRules} /></div></div>
        )}

        {view === 'governance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="Security" items={securityControls} /><RuleList label="Security rules" rules={securityRules} /><List label="Audit system" items={auditEvents} /><RuleList label="Audit rules" rules={auditRules} /></div><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">API performance metrics</h3></div><div className="space-y-2">{apiPerformanceMetrics.map((metric) => <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs text-neutral-400">{metric.label}</span><span className="text-sm font-semibold text-white">{metric.value}</span></div>)}</div></div><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div><div className="space-y-2">{escalationRules.map((rule) => <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div><div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div></div>)}</div></div></div></div>
        )}
      </div>
    </section>
  );
};

const RuleList: React.FC<{ label: string; rules: { title: string; description: string }[] }> = ({ label, rules }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-2">{rules.map((rule) => <div key={rule.title}><div className="text-xs font-semibold text-white">{rule.title}</div><div className="mt-1 text-xs leading-relaxed text-neutral-400">{rule.description}</div></div>)}</div></div>;

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
