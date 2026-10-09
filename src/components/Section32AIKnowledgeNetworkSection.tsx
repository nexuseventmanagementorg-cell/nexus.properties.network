import React, { useState } from 'react';
import { Activity, ArrowRight, Bot, Database, Search, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  aiLearningSystem,
  aiMemorySystem,
  auditRules,
  connectedAssistants,
  escalationRules,
  faqKnowledgeSystem,
  faqRules,
  governanceRules,
  knowledgeDashboardSignals,
  knowledgeLayers,
  knowledgePerformanceMetrics,
  knowledgeRules,
  knowledgeSearchTargets,
  knowledgeSources,
  learningRules,
  memoryRules,
  performanceRules,
  searchRules,
} from '../architecture/Section32AIKnowledgeNetwork';

type KnowledgeView = 'overview' | 'layers' | 'intelligence' | 'governance';

const views: { id: KnowledgeView; label: string }[] = [
  { id: 'overview', label: 'Knowledge Overview' },
  { id: 'layers', label: 'Knowledge Layers' },
  { id: 'intelligence', label: 'Memory and Learning' },
  { id: 'governance', label: 'Governance and Metrics' },
];

export const Section32AIKnowledgeNetworkSection: React.FC = () => {
  const [view, setView] = useState<KnowledgeView>('overview');

  return (
    <section id="ai-knowledge-network" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#2DD4BF]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel">
            <Bot className="h-3.5 w-3.5" />
            SECTION 32 // AI KNOWLEDGE NETWORK
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Proposed knowledge architecture for the Nexus AI registry.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">This is a design blueprint for future knowledge and memory services. The 54 registry entries are not connected production assistants, and shared memory, learning, and nationwide integrations are not established.</p>
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
                <Database className="h-6 w-6 text-[#2DD4BF]" />
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">KNOWLEDGE NETWORK DEFINITION</div>
                  <h3 className="mt-1 text-2xl font-bold text-white">Shared intelligence with one governed source of truth</h3>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {knowledgeLayers.map((layer, index) => (
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
                <div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Proposed assistant connections</h3></div>
                <div className="space-y-2">
                  {connectedAssistants.map((item) => <div key={item} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{item}</div>)}
                </div>
              </div>
              <List label="Knowledge sources" items={knowledgeSources} />
            </div>
          </div>
        )}

        {view === 'layers' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              {knowledgeLayers.slice(0, 5).map((layer) => <LayerList key={layer.name} layer={layer} />)}
            </div>
            <div className="space-y-3">
              {knowledgeLayers.slice(5).map((layer) => <LayerList key={layer.name} layer={layer} />)}
            </div>
          </div>
        )}

        {view === 'intelligence' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <List label="AI memory system" items={aiMemorySystem} />
              <List label="AI learning system" items={aiLearningSystem} />
              <List label="FAQ knowledge system" items={faqKnowledgeSystem} />
            </div>
            <div className="space-y-3">
              <List label="Knowledge search engine" items={knowledgeSearchTargets} />
              <RuleList label="Knowledge rules" rules={knowledgeRules} />
              <RuleList label="Memory rules" rules={memoryRules} />
              <RuleList label="Learning rules" rules={learningRules} />
              <RuleList label="FAQ rules" rules={faqRules} />
              <RuleList label="Search rules" rules={searchRules} />
            </div>
          </div>
        )}

        {view === 'governance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <RuleList label="Knowledge governance" rules={governanceRules} />
              <RuleList label="Performance rules" rules={performanceRules} />
              <RuleList label="Audit rules" rules={auditRules} />
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Knowledge dashboard</h3></div>
                <div className="space-y-2">{knowledgeDashboardSignals.map((item) => <div key={item} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{item}</div>)}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Performance metrics</h3></div>
                <div className="space-y-2">{knowledgePerformanceMetrics.map((metric) => <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs text-neutral-400">{metric.label}</span><span className="text-sm font-semibold text-white">{metric.value}</span></div>)}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Search className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div>
                <div className="space-y-2">{escalationRules.map((rule) => <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div><div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div></div>)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const LayerList: React.FC<{ layer: { name: string; description: string; records: string[] } }> = ({ layer }) => (
  <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
    <div className="mb-2 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">{layer.name}</div>
    <div className="mb-3 text-xs leading-relaxed text-neutral-400">{layer.description}</div>
    <div className="flex flex-wrap gap-2">{layer.records.map((record) => <span key={record} className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs text-neutral-200">{record}</span>)}</div>
  </div>
);

const RuleList: React.FC<{ label: string; rules: { title: string; description: string }[] }> = ({ label, rules }) => (
  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
    <div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div>
    <div className="mt-2 space-y-2">{rules.map((rule) => <div key={rule.title}><div className="text-xs font-semibold text-white">{rule.title}</div><div className="mt-1 text-xs leading-relaxed text-neutral-400">{rule.description}</div></div>)}</div>
  </div>
);

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => (
  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
    <div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div>
    <div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div>
  </div>
);
