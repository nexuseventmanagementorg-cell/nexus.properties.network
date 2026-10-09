import React, { useState } from 'react';
import { Activity, ArrowRight, Bot, Building2, Globe, Landmark, ShieldCheck, Zap } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  countryRules,
  currencyRules,
  escalationRules,
  expansionPhases,
  expansionVision,
  globalAiWorkforceRules,
  globalAuditSystem,
  globalComplianceLayer,
  globalDashboardSystem,
  globalInvestmentNetwork,
  globalMarketplaceHierarchy,
  globalPerformanceMetrics,
  globalPropertyCategories,
  globalRevenueModel,
  globalTrustNetwork,
  investmentRules,
  languageRules,
  marketplaceRules,
  multiCurrencySupport,
  multiLanguageSupport,
  performanceRules,
  revenueRules,
  auditRules,
  complianceRules,
  targetUserGroups,
} from '../architecture/Section31GlobalExpansionArchitecture';

type GlobalExpansionView = 'overview' | 'phases' | 'network' | 'governance';

const views: { id: GlobalExpansionView; label: string }[] = [
  { id: 'overview', label: 'Expansion Overview' },
  { id: 'phases', label: 'Expansion Phases' },
  { id: 'network', label: 'Global Network' },
  { id: 'governance', label: 'Governance and Metrics' },
];

export const Section31GlobalExpansionArchitectureSection: React.FC = () => {
  const [view, setView] = useState<GlobalExpansionView>('overview');

  return (
    <section id="global-expansion-architecture" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#D4AF37]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel">
            <Globe className="h-3.5 w-3.5" />
            SECTION 31 // GLOBAL EXPANSION ARCHITECTURE
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">From Lahore to a global property operating system.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">Nexus expands from Pakistan into the GCC, the UK, Europe, and beyond through a connected trust network, compliant marketplace model, and region-aware operating system.</p>
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
                <MapPinIcon />
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">GLOBAL VISION</div>
                  <h3 className="mt-1 text-2xl font-bold text-white">Regional expansion to global property network</h3>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {expansionVision.map((step, index) => (
                  <div key={step} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-3">
                    <div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500">
                      <span>Stage {index + 1}</span>
                      <ArrowRight className="h-3 w-3 text-[#2DD4BF]" />
                    </div>
                    <div className="text-sm font-semibold text-white">{step}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <List label="Target user groups" items={targetUserGroups} />
                <List label="Global property categories" items={globalPropertyCategories} />
              </div>
            </div>

            <div className="space-y-3 lg:col-span-4">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Building2 className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Global trust model</h3></div>
                <div className="space-y-2">
                  {globalTrustNetwork.map((item) => (
                    <div key={item} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{item}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Global compliance layer</h3></div>
                <div className="space-y-2">
                  {globalComplianceLayer.map((item) => (
                    <div key={item} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'phases' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {expansionPhases.map((phase) => (
              <div key={phase.name} className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-3 text-[10px] font-mono tracking-widest text-[#D4AF37]">{phase.name}</div>
                <h3 className="mb-3 text-xl font-bold text-white">{phase.focus}</h3>
                <div className="space-y-2">
                  {phase.cities.map((city) => (
                    <div key={`${phase.name}-${city}`} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{city}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'network' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <List label="Global marketplace hierarchy" items={globalMarketplaceHierarchy} />
              <List label="Global investment network" items={globalInvestmentNetwork} />
              <List label="Global revenue model" items={globalRevenueModel} />
              <List label="Global dashboards" items={globalDashboardSystem} />
            </div>
            <div className="space-y-3">
              <List label="Multi-language support" items={multiLanguageSupport} />
              <List label="Multi-currency support" items={multiCurrencySupport} />
              <List label="Global AI workforce" items={globalAiWorkforceRules} />
              <List label="Global property categories" items={globalPropertyCategories} />
            </div>
          </div>
        )}

        {view === 'governance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Governance rules</h3></div>
                <div className="space-y-2">
                  {countryRules.map((rule) => (
                    <div key={rule.title} className="rounded-xl border border-white/5 bg-black/40 p-3">
                      <div className="text-sm font-semibold text-white">{rule.title}</div>
                      <div className="mt-1 text-xs text-neutral-400">{rule.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              <List label="Marketplace rules" items={marketplaceRules.map((rule) => rule.title)} />
              <List label="Investment rules" items={investmentRules.map((rule) => rule.title)} />
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Global performance metrics</h3></div>
                <div className="space-y-2">
                  {globalPerformanceMetrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3">
                      <span className="text-xs text-neutral-400">{metric.label}</span>
                      <span className="text-sm font-semibold text-white">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <List label="Global audit system" items={globalAuditSystem} />
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div>
                <div className="space-y-2">
                  {escalationRules.map((rule) => (
                    <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3">
                      <div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div>
                      <div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div>
                      <div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div>
                    </div>
                  ))}
                </div>
              </div>
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

const MapPinIcon: React.FC = () => (
  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
    <Landmark className="h-5 w-5" />
  </div>
);
