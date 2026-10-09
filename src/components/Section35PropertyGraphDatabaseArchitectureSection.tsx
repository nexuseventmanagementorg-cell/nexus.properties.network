import React, { useState } from 'react';
import { Activity, ArrowRight, Bot, Database, Search, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  aiIntelligenceGraph,
  analyticsRules,
  auditRules,
  coreNodeTypes,
  escalationRules,
  graphAnalytics,
  graphPerformanceMetrics,
  graphRules,
  graphSearchTargets,
  graphEntities,
  matchingRules,
  nodeRules,
  recommendationRules,
  relationshipRules,
  relationshipTypes,
  trustGraphSignals,
  trustRules,
} from '../architecture/Section35PropertyGraphDatabaseArchitecture';

type GraphView = 'overview' | 'nodes' | 'intelligence' | 'governance';

const views: { id: GraphView; label: string }[] = [
  { id: 'overview', label: 'Graph Overview' },
  { id: 'nodes', label: 'Nodes and Relationships' },
  { id: 'intelligence', label: 'Matching and Intelligence' },
  { id: 'governance', label: 'Analytics and Governance' },
];

export const Section35PropertyGraphDatabaseArchitectureSection: React.FC = () => {
  const [view, setView] = useState<GraphView>('overview');

  return (
    <section id="property-graph-database-architecture" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#2DD4BF]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><Database className="h-3.5 w-3.5" />SECTION 35 // PROPERTY GRAPH DATABASE ARCHITECTURE</div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">The relationship graph behind Nexus intelligence.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">The Property Graph connects users, properties, markets, leads, deals, payments, trust, and AI systems so Nexus can understand relationships instead of storing isolated records.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">{views.map((item) => <button key={item.id} onClick={() => { soundEngine.playClick(); setView(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}>{item.label}</button>)}</div>

        {view === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-8">
              <div className="mb-5 flex items-center gap-3"><Database className="h-6 w-6 text-[#2DD4BF]" /><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">PROPERTY GRAPH DEFINITION</div><h3 className="mt-1 text-2xl font-bold text-white">One connected intelligence backbone</h3></div></div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{graphEntities.map((entity, index) => <div key={entity} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-3"><div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500"><span>Graph domain {index + 1}</span><ArrowRight className="h-3 w-3 text-[#2DD4BF]" /></div><div className="text-sm font-semibold text-white">{entity}</div></div>)}</div>
              <div className="mt-6 grid gap-3 md:grid-cols-2"><List label="Trust graph" items={trustGraphSignals} /><List label="AI intelligence graph" items={aiIntelligenceGraph} /></div>
            </div>
            <div className="space-y-3 lg:col-span-4"><RuleList label="Graph rules" rules={graphRules} /><List label="Graph search engine" items={graphSearchTargets} /></div>
          </div>
        )}

        {view === 'nodes' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3">{coreNodeTypes.slice(0, 8).map((node) => <NodeCard key={node.name} node={node} />)}</div><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><ArrowRight className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Relationship types</h3></div><div className="grid gap-2 sm:grid-cols-2">{relationshipTypes.map((relationship) => <div key={relationship} className="rounded-xl border border-white/5 bg-black/40 p-3 text-xs text-neutral-200">{relationship}</div>)}</div></div>{coreNodeTypes.slice(8).map((node) => <NodeCard key={node.name} node={node} />)}<RuleList label="Relationship rules" rules={relationshipRules} /></div></div>
        )}

        {view === 'intelligence' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><RuleList label="Matching engine" rules={matchingRules} /><RuleList label="Recommendation engine" rules={recommendationRules} /></div><div className="space-y-3"><RuleList label="Node rules" rules={nodeRules} /><RuleList label="Trust rules" rules={trustRules} /><List label="Graph analytics" items={graphAnalytics} /></div></div>
        )}

        {view === 'governance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><RuleList label="Analytics rules" rules={analyticsRules} /><RuleList label="Audit rules" rules={auditRules} /></div><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Graph performance metrics</h3></div><div className="space-y-2">{graphPerformanceMetrics.map((metric) => <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs text-neutral-400">{metric.label}</span><span className="text-sm font-semibold text-white">{metric.value}</span></div>)}</div></div><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div><div className="space-y-2">{escalationRules.map((rule) => <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div><div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div></div>)}</div></div><RuleList label="Graph governance" rules={graphRules} /></div></div>
        )}
      </div>
    </section>
  );
};

const NodeCard: React.FC<{ node: { name: string; description: string; attributes: string[] } }> = ({ node }) => <div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-2 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">{node.name} node</h3></div><div className="mb-3 text-xs leading-relaxed text-neutral-400">{node.description}</div><div className="flex flex-wrap gap-2">{node.attributes.map((attribute) => <span key={attribute} className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs text-neutral-200">{attribute}</span>)}</div></div>;

const RuleList: React.FC<{ label: string; rules: { title: string; description: string }[] }> = ({ label, rules }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-2">{rules.map((rule) => <div key={rule.title}><div className="text-xs font-semibold text-white">{rule.title}</div><div className="mt-1 text-xs leading-relaxed text-neutral-400">{rule.description}</div></div>)}</div></div>;

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
