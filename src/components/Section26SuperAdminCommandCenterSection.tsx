import React, { useState } from 'react';
import { Activity, AlertOctagon, FileText, Gavel, ShieldAlert, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { aiGovernanceRules, auditRules, businessGovernanceRules, dashboardModules, emergencyRules, governanceRules, notificationRules, overrideRules, reportingRules, superAdminLimitations, superAdminPowers, type SuperAdminModule } from '../architecture/Section26SuperAdminCommandCenter';

type ControlView = 'modules' | 'reports' | 'emergency' | 'governance';

const views: { id: ControlView; label: string }[] = [
  { id: 'modules', label: 'Executive Modules' },
  { id: 'reports', label: 'Reports and Alerts' },
  { id: 'emergency', label: 'Emergency Controls' },
  { id: 'governance', label: 'Governance and Audit' },
];

export const Section26SuperAdminCommandCenterSection: React.FC = () => {
  const [view, setView] = useState<ControlView>('modules');
  const [selectedModule, setSelectedModule] = useState<SuperAdminModule>('Executive Overview');
  const module = dashboardModules.find((item) => item.name === selectedModule) ?? dashboardModules[0];

  return (
    <section id="super-admin-command-center" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#D4AF37]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><Gavel className="h-3.5 w-3.5" />SECTION 26 // SUPER ADMIN COMMAND CENTER</div><h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">The final governance layer.</h2><p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">A master control-center architecture for executive oversight, business and financial intelligence, AI governance, strategic planning, emergency control, and immutable platform audit.</p></div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">{views.map((item) => <button key={item.id} onClick={() => { soundEngine.playClick(); setView(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}>{item.label}</button>)}</div>

        {view === 'modules' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="grid max-h-[620px] content-start gap-2 overflow-auto sm:grid-cols-2 lg:col-span-5">{dashboardModules.map((item) => <button key={item.name} onClick={() => { soundEngine.playClick(); setSelectedModule(item.name); }} className={`flex items-center gap-3 rounded-xl border p-3 text-left ${selectedModule === item.name ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 bg-black/35 hover:border-white/20'}`}><ShieldCheck className="h-4 w-4 text-[#D4AF37]" /><span className="text-sm font-semibold text-white">{item.name}</span></button>)}</div><div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-7"><div className="mb-5 flex items-center gap-3"><Activity className="h-6 w-6 text-[#2DD4BF]" /><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">MASTER CONTROL MODULE</div><h3 className="mt-1 text-2xl font-bold text-white">{module.name}</h3></div></div><p className="text-sm text-neutral-300">{module.purpose}</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><List label="Monitors" items={module.monitors} /><List label="KPIs" items={module.kpis} /><List label="Powers" items={module.actions} /><List label="Restrictions" items={module.restrictions} /></div></div></div>}

        {view === 'reports' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><div className="flex items-center gap-3"><FileText className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Super Admin reporting</h3></div>{reportingRules.map((rule) => <div key={rule.report} className="rounded-xl border border-white/10 bg-black/35 p-4"><div className="flex items-center justify-between"><span className="font-semibold text-white">{rule.report}</span><span className="text-xs font-mono text-[#2DD4BF]">{rule.cadence}</span></div><div className="mt-2 text-xs text-neutral-400">{rule.contents.join(' / ')}</div><div className="mt-1 text-xs text-neutral-500">Audience: {rule.audience}</div></div>)}</div><div className="space-y-3"><List label="Critical notifications" items={notificationRules.map((rule) => `${rule.event} // ${rule.priority} // ${rule.action}`)} /><List label="Governance domains" items={governanceRules.map((rule) => `${rule.domain}: ${rule.rules.join(' / ')}`)} /></div></div>}

        {view === 'emergency' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-rose-300/20 bg-rose-300/5 p-6"><div className="mb-5 flex items-center gap-3"><ShieldAlert className="h-6 w-6 text-rose-300" /><div><div className="text-[10px] font-mono tracking-widest text-rose-300">EMERGENCY CONTROL CENTER</div><h3 className="mt-1 text-2xl font-bold text-white">Platform intervention</h3></div></div><div className="grid gap-2 sm:grid-cols-2">{dashboardModules.find((item) => item.name === 'Emergency Control Center')?.actions.map((action) => <button key={action} onClick={() => soundEngine.playClick()} className="rounded-xl border border-white/10 bg-black/35 p-3 text-left text-sm font-semibold text-white hover:border-rose-300/50">{action}</button>)}</div><p className="mt-5 text-sm leading-relaxed text-neutral-300">Emergency controls are blueprint actions. Production execution requires scope, reason code, audit event, notification, recovery owner, and review.</p></div><div className="space-y-3"><List label="Super Admin powers" items={superAdminPowers} /><List label="Emergency rules" items={emergencyRules} /><List label="Limitations" items={superAdminLimitations} /></div></div>}

        {view === 'governance' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="AI governance rules" items={aiGovernanceRules} /><List label="Business governance rules" items={businessGovernanceRules} /><List label="Governance rules" items={governanceRules.map((rule) => `${rule.domain}: ${rule.rules.join(' / ')} // Owner: ${rule.owner}`)} /></div><div className="space-y-3"><List label="Audit intelligence" items={auditRules.map((rule) => `${rule.domain}: ${rule.events.join(', ')} // ${rule.requiredFields.join(', ')}`)} /><div className="flex items-center gap-2 rounded-xl border border-[#2DD4BF]/20 bg-[#2DD4BF]/5 p-4 text-sm text-neutral-300"><AlertOctagon className="h-4 w-4 shrink-0 text-[#2DD4BF]" />All overrides, governance changes, and emergency actions remain logged. Audit history cannot be deleted.</div></div></div>}
      </div>
    </section>
  );
};

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
