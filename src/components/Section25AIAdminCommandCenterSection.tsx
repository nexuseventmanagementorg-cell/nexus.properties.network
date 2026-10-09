import React, { useEffect, useState } from 'react';
import { Activity, AlertOctagon, Bot, FileText, ShieldAlert, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { adminDecisionOptions, aiGovernanceRules, auditRules, complianceRules, dashboardModules, emergencyRules, escalationRules, fraudRules, notificationRules, reportingRules, trustRules, type AdminModule } from '../architecture/Section25AIAdminCommandCenter';
import { getInventoryCounters, inventoryUpdatedEvent, InventoryCounters } from '../services/propertyService';

type CommandView = 'modules' | 'reports' | 'controls' | 'governance';

const views: { id: CommandView; label: string }[] = [
  { id: 'modules', label: 'Intelligence Modules' },
  { id: 'reports', label: 'Reports and Alerts' },
  { id: 'controls', label: 'Emergency Controls' },
  { id: 'governance', label: 'Governance and Audit' },
];

export const Section25AIAdminCommandCenterSection: React.FC = () => {
  const [view, setView] = useState<CommandView>('modules');
  const [selectedModule, setSelectedModule] = useState<AdminModule>('System Overview');
  const module = dashboardModules.find((item) => item.name === selectedModule) ?? dashboardModules[0];
  const [inventoryCounters, setInventoryCounters] = useState<InventoryCounters>({ totalLiveListings: 0, totalSampleListings: 0, hiddenSampleListings: 0, archivedListings: 0, citiesWithoutLiveInventory: 0 });

  useEffect(() => {
    const refreshCounters = () => { getInventoryCounters().then(setInventoryCounters).catch(() => undefined); };
    refreshCounters();
    window.addEventListener(inventoryUpdatedEvent, refreshCounters);
    return () => window.removeEventListener(inventoryUpdatedEvent, refreshCounters);
  }, []);

  return (
    <section id="ai-admin-command-center" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#2DD4BF]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><ShieldCheck className="h-3.5 w-3.5" />SECTION 25 // PROPOSED AI ADMIN BLUEPRINT</div><h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Proposed governance and review workspace.</h2><p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">This is an architecture prototype. Production monitoring, privileged actions, and integrations are not established; the AI Workforce Registry contains 54 design entries, not deployed assistants.</p></div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">{views.map((item) => <button key={item.id} onClick={() => { soundEngine.playClick(); setView(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}>{item.label}</button>)}</div>

        {view === 'modules' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="grid max-h-[620px] content-start gap-2 overflow-auto sm:grid-cols-2 lg:col-span-5">{dashboardModules.map((item) => <button key={item.name} onClick={() => { soundEngine.playClick(); setSelectedModule(item.name); }} className={`flex items-center gap-3 rounded-xl border p-3 text-left ${selectedModule === item.name ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 bg-black/35 hover:border-white/20'}`}><Bot className="h-4 w-4 text-[#D4AF37]" /><span className="text-sm font-semibold text-white">{item.name}</span></button>)}</div><div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-7"><div className="mb-5 flex items-center gap-3"><Activity className="h-6 w-6 text-[#2DD4BF]" /><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">COMMAND CENTER MODULE</div><h3 className="mt-1 text-2xl font-bold text-white">{module.name}</h3></div></div><p className="text-sm text-neutral-300">{module.purpose}</p><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5"><Metric label="Live listings" value={inventoryCounters.totalLiveListings} /><Metric label="Sample listings" value={inventoryCounters.totalSampleListings} /><Metric label="Hidden samples" value={inventoryCounters.hiddenSampleListings} /><Metric label="Archived" value={inventoryCounters.archivedListings} /><Metric label="Cities without live" value={inventoryCounters.citiesWithoutLiveInventory} /></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><List label="Monitors" items={module.monitors} /><List label="KPIs" items={module.kpis} /><List label="Actions" items={module.actions} /><List label="Restrictions" items={module.restrictions} /></div></div></div>}

        {view === 'reports' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><div className="flex items-center gap-3"><FileText className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">AI reporting system</h3></div>{reportingRules.map((rule) => <div key={rule.report} className="rounded-xl border border-white/10 bg-black/35 p-4"><div className="flex items-center justify-between"><span className="font-semibold text-white">{rule.report}</span><span className="text-xs font-mono text-[#2DD4BF]">{rule.cadence}</span></div><div className="mt-2 text-xs text-neutral-400">{rule.contents.join(' / ')}</div><div className="mt-1 text-xs text-neutral-500">Audience: {rule.audience}</div></div>)}</div><div className="space-y-3"><List label="Notifications" items={notificationRules.map((rule) => `${rule.event} // ${rule.priority} // ${rule.action}`)} /><List label="Monitoring rules" items={['Platform health', 'User activity', 'Property activity', 'Lead activity', 'Deal activity', 'Financial activity', 'AI activity', 'Fraud signals', 'Trust scores', 'Compliance']} /></div></div>}

        {view === 'controls' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-rose-300/20 bg-rose-300/5 p-6"><div className="mb-5 flex items-center gap-3"><ShieldAlert className="h-6 w-6 text-rose-300" /><div><div className="text-[10px] font-mono tracking-widest text-rose-300">REVIEW AND ESCALATION</div><h3 className="mt-1 text-2xl font-bold text-white">Evidence-led intervention</h3></div></div><div className="grid gap-2 sm:grid-cols-2">{['Flag Listing', 'Request Review', 'Escalate Incident', 'Open Investigation'].map((action) => <button key={action} onClick={() => soundEngine.playClick()} className="rounded-xl border border-white/10 bg-black/35 p-3 text-left text-sm font-semibold text-white hover:border-rose-300/50">{action}</button>)}</div><p className="mt-5 text-sm leading-relaxed text-neutral-300">Blueprint controls only. AI may review, flag, recommend, and escalate. Approve, reject, suspend, and freeze authority remains DECISION REQUIRED; permanent bans require authorized human/Super Admin approval.</p></div><div className="space-y-3"><List label="AI Admin decisions" items={adminDecisionOptions} /><List label="Undecided actions" items={['Approve', 'Reject', 'Suspend', 'Freeze — DECISION REQUIRED']} /><List label="Emergency rules" items={emergencyRules} /><List label="Escalation matrix" items={escalationRules.map((rule) => `${rule.level}. ${rule.owner}: ${rule.trigger} -> ${rule.action}`)} /></div></div>}

        {view === 'governance' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="AI governance rules" items={aiGovernanceRules} /><List label="Trust intelligence" items={trustRules} /><List label="Compliance intelligence" items={complianceRules} /></div><div className="space-y-3"><List label="Fraud intelligence" items={fraudRules} /><List label="Audit intelligence" items={auditRules.map((rule) => `${rule.domain}: ${rule.events.join(', ')} // ${rule.requiredFields.join(', ')}`)} /><div className="flex items-center gap-2 rounded-xl border border-[#2DD4BF]/20 bg-[#2DD4BF]/5 p-4 text-sm text-neutral-300"><AlertOctagon className="h-4 w-4 shrink-0 text-[#2DD4BF]" />AI Admin cannot delete audit history, override Super Admin, remove governance, or alter historical records.</div></div></div>}
      </div>
    </section>
  );
};

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;

const Metric: React.FC<{ label: string; value: number }> = ({ label, value }) => <div className="rounded-xl border border-white/10 bg-black/40 p-3"><div className="text-[10px] font-mono text-neutral-500">{label}</div><div className="mt-1 text-xl font-bold text-white">{value}</div></div>;
