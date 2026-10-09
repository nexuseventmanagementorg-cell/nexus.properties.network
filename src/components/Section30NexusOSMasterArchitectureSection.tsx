import React, { useState } from 'react';
import { Activity, ArrowRight, Bot, Globe, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  aiRules,
  auditRules,
  dataFlowRules,
  expansionRules,
  governanceRules,
  masterPerformanceMetrics,
  operatingLayers,
  operatingPrinciples,
  paymentLayer,
  performanceRules,
  propertyLayer,
  revenueRules,
  trustRules,
  userLayer,
  marketplaceLayer,
  leadLayer,
  dealLayer,
  crmLayer,
  aiLayer,
  governanceLayer,
  nationalIntelligenceLayer,
} from '../architecture/Section30NexusOSMasterArchitecture';

type MasterView = 'overview' | 'layers' | 'flow' | 'governance';

const views: { id: MasterView; label: string }[] = [
  { id: 'overview', label: 'Operating Overview' },
  { id: 'layers', label: 'Core Layers' },
  { id: 'flow', label: 'Data and AI Flow' },
  { id: 'governance', label: 'Governance and Metrics' },
];

export const Section30NexusOSMasterArchitectureSection: React.FC = () => {
  const [view, setView] = useState<MasterView>('overview');

  return (
    <section id="nexus-os-master-architecture" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#D4AF37]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel">
            <Globe className="h-3.5 w-3.5" />
            SECTION 30 // NEXUS OS MASTER ARCHITECTURE
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">The complete operating system behind Nexus Property Network.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">Nexus OS is a national real-estate operating system that connects buyers, sellers, agents, agencies, developers, investors, industrial users, corporate users, government entities, and the AI workforce into one intelligent network.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">
          {views.map((item) => (
            <button
              key={item.id}
              onClick={() => { soundEngine.playClick(); setView(item.id); }}
              className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {view === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-8">
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-[#2DD4BF]" />
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">NEXUS OS DEFINITION</div>
                  <h3 className="mt-1 text-2xl font-bold text-white">One operating system for an entire market</h3>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {operatingLayers.map((layer, index) => (
                  <div key={layer.name} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-3">
                    <div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500">
                      <span>Layer {index + 1}</span>
                      <ArrowRight className="h-3 w-3 text-[#2DD4BF]" />
                    </div>
                    <div className="text-sm font-semibold text-white">{layer.name}</div>
                    <div className="mt-2 text-[11px] leading-relaxed text-neutral-400">{layer.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 lg:col-span-4">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Operating principles</h3></div>
                <div className="space-y-2">
                  {operatingPrinciples.map((item) => (
                    <div key={item} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{item}</div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">National expansion model</h3></div>
                <div className="space-y-2">
                  {expansionRules.map((item) => (
                    <div key={item} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'layers' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <List label="User layer" items={userLayer} />
              <List label="Property layer" items={propertyLayer} />
              <List label="Marketplace layer" items={marketplaceLayer} />
              <List label="Lead layer" items={leadLayer} />
              <List label="Deal layer" items={dealLayer} />
            </div>
            <div className="space-y-3">
              <List label="Payment layer" items={paymentLayer} />
              <List label="CRM layer" items={crmLayer} />
              <List label="AI layer" items={aiLayer} />
              <List label="Governance layer" items={governanceLayer} />
              <List label="National intelligence layer" items={nationalIntelligenceLayer} />
            </div>
          </div>
        )}

        {view === 'flow' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
              <div className="mb-4 flex items-center gap-3"><ArrowRight className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Data flow architecture</h3></div>
              <div className="space-y-2">
                {dataFlowRules.map((flow) => (
                  <div key={flow} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{flow}</div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
              <div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">AI workforce integration</h3></div>
              <div className="space-y-2">
                {aiRules.map((rule) => (
                  <div key={rule} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{rule}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'governance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Governance and trust</h3></div>
                <div className="space-y-2">
                  {governanceRules.map((rule) => (
                    <div key={rule.owner} className="rounded-xl border border-white/5 bg-black/40 p-3">
                      <div className="text-sm font-semibold text-white">{rule.owner}</div>
                      <div className="mt-1 text-xs text-neutral-400">{rule.scope}</div>
                      <div className="mt-1 text-xs text-[#2DD4BF]">{rule.control}</div>
                    </div>
                  ))}
                </div>
              </div>
              <List label="Trust network" items={trustRules} />
              <List label="Revenue engine" items={revenueRules} />
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Master performance metrics</h3></div>
                <div className="space-y-2">
                  {masterPerformanceMetrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3">
                      <span className="text-xs text-neutral-400">{metric.label}</span>
                      <span className="text-sm font-semibold text-white">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <List label="Master audit system" items={auditRules} />
              <List label="Master performance rules" items={performanceRules} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => (
  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
    <div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div>
    <div className="mt-2 space-y-1.5">
      {items.map((item) => (
        <div key={item} className="flex gap-2 text-xs text-neutral-200">
          <span className="text-[#2DD4BF]">•</span>
          {item}
        </div>
      ))}
    </div>
  </div>
);
