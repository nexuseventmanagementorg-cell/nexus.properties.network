import React, { useState } from 'react';
import { Activity, Bot, Globe, ShieldCheck, Map, Building2, Landmark, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  agencyNetworkArchitecture,
  agentNetworkArchitecture,
  aiAssistantsInvolved,
  areaIntelligenceSystem,
  areaNetworkLayer,
  auditRules,
  cityIntelligenceSystem,
  cityNetworkLayer,
  corporateNetworkArchitecture,
  developerNetworkArchitecture,
  escalationRules,
  expansionRules,
  governmentNetworkArchitecture,
  industrialNetworkArchitecture,
  investmentNetworkArchitecture,
  marketplaceHierarchy,
  marketplacePerformanceMetrics,
  marketplaceRules,
  networkRules,
  performanceRules,
  propertyGraphIntegration,
  propertyNetworkLayer,
  provinceLayer,
  searchRules,
  userNetworkLayer,
} from '../architecture/Section29NationalPropertyMarketplaceArchitecture';

type MarketplaceView = 'overview' | 'network' | 'intelligence' | 'governance';

const views: { id: MarketplaceView; label: string }[] = [
  { id: 'overview', label: 'Marketplace Overview' },
  { id: 'network', label: 'National Network' },
  { id: 'intelligence', label: 'Intelligence and Search' },
  { id: 'governance', label: 'Governance and Audit' },
];

export const Section29NationalPropertyMarketplaceArchitectureSection: React.FC = () => {
  const [view, setView] = useState<MarketplaceView>('overview');

  return (
    <section id="national-property-marketplace-architecture" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#D4AF37]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel">
            <Globe className="h-3.5 w-3.5" />
            SECTION 29 // NATIONAL PROPERTY MARKETPLACE ARCHITECTURE
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">From city-level platform to Pakistan-wide property network.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">A national marketplace architecture that connects every province, city, area, property, user, and AI system into one governed real-estate operating network.</p>
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
            <div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-7">
              <div className="mb-5 flex items-center gap-3">
                <Map className="h-6 w-6 text-[#2DD4BF]" />
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">MARKETPLACE HIERARCHY</div>
                  <h3 className="mt-1 text-2xl font-bold text-white">Pakistan national property structure</h3>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {marketplaceHierarchy.map((layer, index) => (
                  <div key={layer} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-3">
                    <div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500">
                      <span>Level {index + 1}</span>
                      <ArrowRight className="h-3 w-3 text-[#2DD4BF]" />
                    </div>
                    <div className="text-sm font-semibold text-white">{layer}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <List label="Province layer" items={provinceLayer} />
                <List label="City network" items={cityNetworkLayer} />
                <List label="Area network" items={areaNetworkLayer} />
                <List label="Property network" items={propertyNetworkLayer} />
              </div>
            </div>

            <div className="space-y-3 lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-[#D4AF37]" />
                  <h3 className="text-xl font-bold text-white">User network layer</h3>
                </div>
                <div className="space-y-2">
                  {userNetworkLayer.map((user) => (
                    <div key={user} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{user}</div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Landmark className="h-5 w-5 text-[#2DD4BF]" />
                  <h3 className="text-xl font-bold text-white">Marketplace rules</h3>
                </div>
                <div className="space-y-2">
                  {marketplaceRules.map((rule) => (
                    <div key={rule.title} className="rounded-xl border border-white/5 bg-black/40 p-3">
                      <div className="text-sm font-semibold text-white">{rule.title}</div>
                      <div className="mt-1 text-xs text-neutral-400">{rule.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'network' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <List label="Agent architecture" items={agentNetworkArchitecture} />
              <List label="Agency architecture" items={agencyNetworkArchitecture} />
              <List label="Developer architecture" items={developerNetworkArchitecture} />
            </div>
            <div className="space-y-3">
              <List label="Investment architecture" items={investmentNetworkArchitecture} />
              <List label="Industrial architecture" items={industrialNetworkArchitecture} />
              <List label="Corporate architecture" items={corporateNetworkArchitecture} />
              <List label="Government architecture" items={governmentNetworkArchitecture} />
            </div>
          </div>
        )}

        {view === 'intelligence' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">City intelligence</h3></div>
                <div className="flex flex-wrap gap-2">{cityIntelligenceSystem.map((item) => <span key={item} className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs text-neutral-200">{item}</span>)}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Area intelligence</h3></div>
                <div className="flex flex-wrap gap-2">{areaIntelligenceSystem.map((item) => <span key={item} className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs text-neutral-200">{item}</span>)}</div>
              </div>
              <List label="Property graph integration" items={propertyGraphIntegration} />
            </div>
            <div className="space-y-3">
              <List label="Marketplace search system" items={searchRules} />
              <List label="Performance rules" items={performanceRules} />
              <List label="AI assistants involved" items={aiAssistantsInvolved} />
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Marketplace performance metrics</h3></div>
                <div className="space-y-2">{marketplacePerformanceMetrics.map((metric) => <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs text-neutral-400">{metric.label}</span><span className="text-sm font-semibold text-white">{metric.value}</span></div>)}</div>
              </div>
            </div>
          </div>
        )}

        {view === 'governance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <List label="National expansion roadmap" items={expansionRules} />
              <List label="Network rules" items={networkRules} />
              <List label="Audit system" items={auditRules} />
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div>
                <div className="space-y-2">{escalationRules.map((rule) => <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div><div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div></div>)}</div>
              </div>
              <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4 text-sm leading-relaxed text-neutral-300">The marketplace remains governed through city intelligence, area intelligence, national intelligence, AI Admin oversight, and final Super Admin authority.</div>
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
