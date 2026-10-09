import React, { useState } from 'react';
import { Activity, ArrowRight, BookOpen, Bot, ShieldCheck, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  answerGenerationEngine,
  answerRules,
  answerTypes,
  approvalRules,
  approvalStatuses,
  auditEvents,
  auditRules,
  confidenceLevels,
  connectedAssistants,
  dashboardSignals,
  escalationRules,
  faqCategories,
  faqPerformanceMetrics,
  faqRules,
  faqScale,
  faqSearchModes,
  governanceControls,
  knowledgeRouting,
  knowledgeRules,
  learningInputs,
  learningRules,
  performanceRules,
  routingRules,
  searchRules,
  supportedLanguages,
} from '../architecture/Section37AIFAQKnowledgeBaseEngine';

type FAQView = 'overview' | 'routing' | 'governance' | 'performance';

const views: { id: FAQView; label: string }[] = [
  { id: 'overview', label: 'Knowledge Base Overview' },
  { id: 'routing', label: 'Routing and Answers' },
  { id: 'governance', label: 'Approval and Search' },
  { id: 'performance', label: 'Dashboard and Metrics' },
];

export const Section37AIFAQKnowledgeBaseEngineSection: React.FC = () => {
  const [view, setView] = useState<FAQView>('overview');

  return (
    <section id="ai-faq-knowledge-base-engine" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#2DD4BF]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><BookOpen className="h-3.5 w-3.5" />SECTION 37 // AI FAQ & KNOWLEDGE BASE ENGINE</div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Proposed FAQ and knowledge-base architecture.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">This blueprint describes a possible approved knowledge source and assistant routing. Production knowledge services and connections to the 54 AI Workforce Registry entries are not established.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">{views.map((item) => <button key={item.id} onClick={() => { soundEngine.playClick(); setView(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}>{item.label}</button>)}</div>

        {view === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-8"><div className="mb-5 flex items-center gap-3"><BookOpen className="h-6 w-6 text-[#2DD4BF]" /><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">KNOWLEDGE BASE DEFINITION</div><h3 className="mt-1 text-2xl font-bold text-white">One official source of truth for AI answers</h3></div></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{faqCategories.map((category, index) => <div key={category} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-3"><div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500"><span>Category {index + 1}</span><ArrowRight className="h-3 w-3 text-[#2DD4BF]" /></div><div className="text-sm font-semibold text-white">{category}</div></div>)}</div><div className="mt-6 grid gap-3 md:grid-cols-2"><List label="FAQ scale" items={faqScale} /><List label="Supported languages" items={supportedLanguages} /></div></div><div className="space-y-3 lg:col-span-4"><List label="Connected assistants" items={connectedAssistants} /><RuleList label="FAQ rules" rules={faqRules} /></div></div>
        )}

        {view === 'routing' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Knowledge routing engine</h3></div><div className="space-y-2">{knowledgeRouting.map((route) => <div key={route} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{route}</div>)}</div></div><List label="Answer types" items={answerTypes} /><List label="Confidence system" items={confidenceLevels} /></div><div className="space-y-3"><RuleList label="Answer generation engine" rules={answerGenerationEngine.map((step) => ({ title: step, description: 'A governed stage in the Nexus answer pipeline.' }))} /><RuleList label="Routing rules" rules={routingRules} /><RuleList label="Answer rules" rules={answerRules} /></div></div>
        )}

        {view === 'governance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="Approval lifecycle" items={approvalStatuses} /><RuleList label="Approval rules" rules={approvalRules} /><List label="FAQ search engine" items={faqSearchModes} /><RuleList label="Search rules" rules={searchRules} /></div><div className="space-y-3"><List label="Content governance" items={governanceControls} /><RuleList label="Knowledge rules" rules={knowledgeRules} /><List label="AI learning inputs" items={learningInputs} /><RuleList label="Learning rules" rules={learningRules} /></div></div>
        )}

        {view === 'performance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Knowledge dashboard</h3></div><div className="space-y-2">{dashboardSignals.map((item) => <div key={item} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{item}</div>)}</div></div><List label="Audit system" items={auditEvents} /><RuleList label="Audit rules" rules={auditRules} /></div><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Sparkles className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Performance metrics</h3></div><div className="space-y-2">{faqPerformanceMetrics.map((metric) => <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs text-neutral-400">{metric.label}</span><span className="text-sm font-semibold text-white">{metric.value}</span></div>)}</div></div><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div><div className="space-y-2">{escalationRules.map((rule) => <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div><div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div></div>)}</div></div><RuleList label="Performance rules" rules={performanceRules} /></div></div>
        )}
      </div>
    </section>
  );
};

const RuleList: React.FC<{ label: string; rules: { title: string; description: string }[] }> = ({ label, rules }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-2">{rules.map((rule) => <div key={rule.title}><div className="text-xs font-semibold text-white">{rule.title}</div><div className="mt-1 text-xs leading-relaxed text-neutral-400">{rule.description}</div></div>)}</div></div>;

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
