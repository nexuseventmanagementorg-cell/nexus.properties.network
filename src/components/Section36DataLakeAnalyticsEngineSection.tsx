import React, { useState } from 'react';
import { Activity, ArrowRight, BarChart3, Bot, Database, ShieldCheck, TrendingUp } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  aiAnalytics,
  analyticsLayers,
  analyticsPerformanceMetrics,
  analyticsRules,
  auditEvents,
  auditRules,
  businessIntelligenceDashboards,
  dataCategories,
  dataSourceRules,
  dataSources,
  dealAnalytics,
  escalationRules,
  fraudAnalytics,
  fraudRules,
  governanceControls,
  governanceRules,
  leadAnalytics,
  marketAnalytics,
  performanceRules,
  predictionEngine,
  predictionRules,
  propertyAnalytics,
  reportingPeriods,
  revenueAnalytics,
  revenueRules,
  trustAnalytics,
  trustRules,
} from '../architecture/Section36DataLakeAnalyticsEngine';

type AnalyticsView = 'overview' | 'layers' | 'predictions' | 'governance';

const views: { id: AnalyticsView; label: string }[] = [
  { id: 'overview', label: 'Data Lake Overview' },
  { id: 'layers', label: 'Analytics Layers' },
  { id: 'predictions', label: 'Predictions and BI' },
  { id: 'governance', label: 'Governance and Metrics' },
];

export const Section36DataLakeAnalyticsEngineSection: React.FC = () => {
  const [view, setView] = useState<AnalyticsView>('overview');

  return (
    <section id="data-lake-analytics-engine" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#D4AF37]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><Database className="h-3.5 w-3.5" />SECTION 36 // DATA LAKE & ANALYTICS ENGINE</div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">The data intelligence engine behind Nexus OS.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">The Nexus Data Lake turns platform activity, marketplace events, graph relationships, AI usage, trust signals, and financial outcomes into governed intelligence, forecasts, and decision-ready dashboards.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">{views.map((item) => <button key={item.id} onClick={() => { soundEngine.playClick(); setView(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}>{item.label}</button>)}</div>

        {view === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-8"><div className="mb-5 flex items-center gap-3"><Database className="h-6 w-6 text-[#2DD4BF]" /><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">DATA LAKE DEFINITION</div><h3 className="mt-1 text-2xl font-bold text-white">One governed source of platform intelligence</h3></div></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{dataSources.map((source, index) => <div key={source} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-3"><div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500"><span>Source {index + 1}</span><ArrowRight className="h-3 w-3 text-[#2DD4BF]" /></div><div className="text-sm font-semibold text-white">{source}</div></div>)}</div><div className="mt-6 grid gap-3 md:grid-cols-2"><List label="Data categories" items={dataCategories} /><List label="Analytics layers" items={analyticsLayers} /></div></div>
            <div className="space-y-3 lg:col-span-4"><RuleList label="Data source rules" rules={dataSourceRules} /><List label="Reporting system" items={reportingPeriods} /></div>
          </div>
        )}

        {view === 'layers' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="Property analytics" items={propertyAnalytics} /><List label="Market analytics" items={marketAnalytics} /><List label="Lead analytics" items={leadAnalytics} /><List label="Deal analytics" items={dealAnalytics} /></div><div className="space-y-3"><List label="Revenue analytics" items={revenueAnalytics} /><List label="Trust analytics" items={trustAnalytics} /><List label="Fraud analytics" items={fraudAnalytics} /><List label="AI analytics" items={aiAnalytics} /><RuleList label="Analytics rules" rules={analyticsRules} /></div></div>
        )}

        {view === 'predictions' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><TrendingUp className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Prediction engine</h3></div><div className="space-y-2">{predictionEngine.map((item, index) => <div key={item} className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs font-mono text-[#D4AF37]">{String(index + 1).padStart(2, '0')}</span><span className="text-sm text-neutral-200">{item}</span></div>)}</div></div><div className="space-y-3"><RuleList label="Prediction rules" rules={predictionRules} /><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><BarChart3 className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Business intelligence dashboards</h3></div><div className="grid gap-2 sm:grid-cols-2">{businessIntelligenceDashboards.map((item) => <div key={item} className="rounded-xl border border-white/5 bg-black/40 p-3 text-sm text-neutral-200">{item}</div>)}</div></div></div></div>
        )}

        {view === 'governance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="Governance controls" items={governanceControls} /><RuleList label="Governance rules" rules={governanceRules} /><RuleList label="Revenue rules" rules={revenueRules} /><RuleList label="Trust rules" rules={trustRules} /><RuleList label="Fraud rules" rules={fraudRules} /></div><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Analytics performance metrics</h3></div><div className="space-y-2">{analyticsPerformanceMetrics.map((metric) => <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs text-neutral-400">{metric.label}</span><span className="text-sm font-semibold text-white">{metric.value}</span></div>)}</div></div><List label="Audit system" items={auditEvents} /><RuleList label="Audit rules" rules={auditRules} /><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div><div className="space-y-2">{escalationRules.map((rule) => <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div><div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div></div>)}</div></div><RuleList label="Performance rules" rules={performanceRules} /></div></div>
        )}
      </div>
    </section>
  );
};

const RuleList: React.FC<{ label: string; rules: { title: string; description: string }[] }> = ({ label, rules }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-2">{rules.map((rule) => <div key={rule.title}><div className="text-xs font-semibold text-white">{rule.title}</div><div className="mt-1 text-xs leading-relaxed text-neutral-400">{rule.description}</div></div>)}</div></div>;

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
