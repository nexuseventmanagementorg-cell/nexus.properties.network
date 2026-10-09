import React, { useState } from 'react';
import { Activity, Bot, CheckCircle2, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { commonDashboardSystems, dashboardDefinitions, dashboardPermissionMatrix, notificationMatrix, roleDashboardMatrix, type NexusRole } from '../architecture/Section20DashboardOperatingSystem';

type DashboardView = 'dashboards' | 'systems' | 'matrices';

const views: { id: DashboardView; label: string }[] = [
  { id: 'dashboards', label: 'Dashboard Definitions' },
  { id: 'systems', label: 'Common Systems' },
  { id: 'matrices', label: 'Operating Matrices' },
];

export const Section20DashboardOperatingSystemSection: React.FC = () => {
  const [view, setView] = useState<DashboardView>('dashboards');
  const [selectedRole, setSelectedRole] = useState<NexusRole>('Buyer');
  const dashboard = dashboardDefinitions.find((item) => item.role === selectedRole) ?? dashboardDefinitions[0];

  return (
    <section id="dashboard-operating-system" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#2DD4BF]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><ShieldCheck className="h-3.5 w-3.5" />SECTION 20 // DASHBOARD OPERATING SYSTEM</div><h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Role-aware workspaces for Nexus.</h2><p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">A typed dashboard operating system that defines layouts, widgets, KPIs, reports, notifications, quick actions, permissions, restrictions, and AI placement for every Nexus role.</p></div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">{views.map((item) => <button key={item.id} onClick={() => { soundEngine.playClick(); setView(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}>{item.label}</button>)}</div>

        {view === 'dashboards' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="grid max-h-[600px] content-start gap-2 overflow-auto sm:grid-cols-2 lg:col-span-4">{dashboardDefinitions.map((item) => <button key={item.role} onClick={() => { soundEngine.playClick(); setSelectedRole(item.role); }} className={`flex items-center gap-3 rounded-xl border p-3 text-left ${selectedRole === item.role ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 bg-black/35 hover:border-white/20'}`}><ShieldCheck className="h-4 w-4 text-[#D4AF37]" /><span className="text-sm font-semibold text-white">{item.role} Dashboard</span></button>)}</div><div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-8"><div className="mb-5 flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-[#2DD4BF]" /><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">DASHBOARD DEFINITION // {dashboard.role.toUpperCase()}</div><h3 className="mt-1 text-2xl font-bold text-white">{dashboard.overview}</h3></div></div><p className="text-sm text-neutral-300">{dashboard.primaryObjective}</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><List label="Layout" items={dashboard.layout} /><List label="Top widgets" items={dashboard.topWidgets.map((item) => item.label)} /><List label="KPIs" items={dashboard.kpis} /><List label="Quick actions" items={dashboard.quickActions} /><List label="AI assistants" items={dashboard.aiAssistants} /><List label="Reports and charts" items={[...dashboard.reports, ...dashboard.charts]} /><List label="Permissions" items={dashboard.permissions} /><List label="Restrictions" items={dashboard.restrictions} /></div></div></div>}

        {view === 'systems' && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{commonDashboardSystems.map((system) => <div key={system} className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="flex items-center gap-3"><Activity className="h-5 w-5 text-[#D4AF37]" /><h3 className="font-bold text-white">{system}</h3></div><p className="mt-3 text-sm leading-relaxed text-neutral-400">Shared role-aware service available through permission and notification policy.</p></div>)}</div>}

        {view === 'matrices' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-black/35 p-6"><div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Role dashboard matrix</h3></div><div className="space-y-2">{Object.entries(roleDashboardMatrix).map(([role, modules]) => <div key={role} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{role}</div><div className="mt-1 text-xs text-neutral-400">{modules.join(' / ')}</div></div>)}</div></div><div className="rounded-2xl border border-white/10 bg-black/35 p-6"><div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Notifications and permissions</h3></div><div className="space-y-2">{dashboardDefinitions.map((item) => <div key={item.role} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{item.role}</div><div className="mt-1 text-xs text-neutral-400">Notifications: {notificationMatrix[item.role].join(' / ')}</div><div className="mt-1 flex flex-wrap gap-2">{dashboardPermissionMatrix[item.role].map((permission) => <span key={permission} className="inline-flex items-center gap-1 text-[10px] font-mono text-[#2DD4BF]"><CheckCircle2 className="h-3 w-3" />{permission}</span>)}</div></div>)}</div></div></div>}
      </div>
    </section>
  );
};

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
