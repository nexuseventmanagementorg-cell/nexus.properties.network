import React, { useState } from 'react';
import { Activity, Bot, Database, FileText, GitFork, Layers, Lock, Network, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { aiSystemLayers, dashboardBlueprints, databaseSchema, developmentRoadmap, faqKnowledgeRepository, paymentProviders, voiceArchitecture } from '../architecture/nexusEnterpriseArchitecture';

type View = 'roadmap' | 'schema' | 'dashboards' | 'systems';

const views: { id: View; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'roadmap', label: 'Development Roadmap', icon: GitFork },
  { id: 'schema', label: 'Database Schema', icon: Database },
  { id: 'dashboards', label: 'Dashboard Blueprints', icon: Layers },
  { id: 'systems', label: 'System Layers', icon: Network },
];

export const EnterpriseArchitectureSection: React.FC = () => {
  const [view, setView] = useState<View>('roadmap');
  const [selectedRoadmap, setSelectedRoadmap] = useState(0);
  const [selectedTable, setSelectedTable] = useState(0);
  const [selectedDashboard, setSelectedDashboard] = useState(0);
  const roadmap = developmentRoadmap[selectedRoadmap];
  const schema = databaseSchema[selectedTable];
  const dashboard = dashboardBlueprints[selectedDashboard];

  return (
    <section id="enterprise-architecture" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#2DD4BF]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><Database className="h-3.5 w-3.5" />PHASE 18 // ENTERPRISE EXPANSION</div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Nexus development architecture.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">An additive implementation blueprint for the next platform layer. Existing approved sections, visual systems, animations, 3D effects, and AI workforce remain unchanged.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">
          {views.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { soundEngine.playClick(); setView(id); }} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}><Icon className="h-3.5 w-3.5" />{label}</button>)}
        </div>

        {view === 'roadmap' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="space-y-2 lg:col-span-5">{developmentRoadmap.map((phase, index) => <button key={phase.id} onClick={() => { soundEngine.playClick(); setSelectedRoadmap(index); }} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left ${selectedRoadmap === index ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 bg-black/35 hover:border-white/20'}`}><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-[#D4AF37]">{phase.id}</span><span className="text-sm font-semibold text-white">{phase.title}</span></button>)}</div><div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-7"><div className="mb-5 flex items-center justify-between"><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">PHASE {roadmap.id}</div><h3 className="mt-1 text-2xl font-bold text-white">{roadmap.title}</h3></div><Activity className="h-6 w-6 text-[#2DD4BF]" /></div><div className="grid gap-3 sm:grid-cols-2"><Info label="Progress" value={roadmap.progress} /><Info label="Status" value={roadmap.status} /><List label="Dependencies" items={roadmap.dependencies} /><List label="Milestones" items={roadmap.milestones} /></div></div></div>}

        {view === 'schema' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="grid max-h-[560px] grid-cols-2 content-start gap-2 overflow-auto lg:col-span-4">{databaseSchema.map((item, index) => <button key={item.name} onClick={() => { soundEngine.playClick(); setSelectedTable(index); }} className={`rounded-xl border p-3 text-left font-mono text-xs ${selectedTable === index ? 'border-[#2DD4BF] bg-[#2DD4BF]/10 text-[#2DD4BF]' : 'border-white/10 bg-black/35 text-neutral-400 hover:text-white'}`}>{item.name}</button>)}</div><div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-8"><div className="mb-5 flex items-center gap-3"><Database className="h-6 w-6 text-[#2DD4BF]" /><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">SCHEMA TABLE</div><h3 className="text-2xl font-bold text-white">{schema.name}</h3></div></div><div className="grid gap-3 sm:grid-cols-2"><List label="Primary key" items={[schema.primaryKey]} /><List label="Foreign keys" items={schema.foreignKeys} /><List label="Indexes" items={schema.indexes} /><List label="Constraints" items={schema.constraints} /><List label="Relationships" items={schema.relationships} /></div></div></div>}

        {view === 'dashboards' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="space-y-2 lg:col-span-4">{dashboardBlueprints.map((item, index) => <button key={item.role} onClick={() => { soundEngine.playClick(); setSelectedDashboard(index); }} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left ${selectedDashboard === index ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 bg-black/35 hover:border-white/20'}`}><ShieldCheck className="h-4 w-4 text-[#D4AF37]" /><span className="text-sm font-semibold text-white">{item.role}</span></button>)}</div><div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-8"><div className="mb-4 text-[10px] font-mono tracking-widest text-[#D4AF37]">ROLE BLUEPRINT</div><h3 className="text-2xl font-bold text-white">{dashboard.role} dashboard</h3><p className="mt-2 text-sm text-neutral-300">{dashboard.purpose}</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><List label="Modules" items={dashboard.modules} /><List label="Permissions" items={dashboard.permissions} /></div></div></div>}

        {view === 'systems' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3">{aiSystemLayers.map((layer) => <div key={layer.name} className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="flex items-center gap-3"><Bot className="h-5 w-5 text-[#2DD4BF]" /><h3 className="font-bold text-white">{layer.name}</h3></div><p className="mt-2 text-sm leading-relaxed text-neutral-400">{layer.purpose}</p></div>)}</div><div className="space-y-3"><Info label="FAQ knowledge system" value={`${faqKnowledgeRepository.targetCount}+ records // ${faqKnowledgeRepository.status}`} /><List label="FAQ categories" items={faqKnowledgeRepository.categories} /><List label="Repository record shape" items={faqKnowledgeRepository.recordShape} /><List label="Payment providers" items={paymentProviders} /><Info label="Voice architecture" value={`${voiceArchitecture.defaultLanguage} default // ${voiceArchitecture.providers.join(', ')}`} /><p className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5 text-sm leading-relaxed text-neutral-300">{faqKnowledgeRepository.rule} {voiceArchitecture.rule}</p></div></div>}
      </div>
    </section>
  );
};

const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 text-sm font-semibold text-white">{value}</div></div>;
const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
