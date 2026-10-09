import React, { useState } from 'react';
import { Activity, Bot, CalendarCheck, Database, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { aiMemoryRules, appointmentRules, auditRules, clientPipelineRules, conversationChannels, crmAiResponsibilities, crmCoreEntities, crmDashboardModules, crmWorkflows, escalationRules, followUpRules, followUpSchedules, followUpWorkflows, involvedAiAssistants, leadPipelineRules, notificationRules, performanceRules, retentionRules } from '../architecture/Section28CRMFollowUpOperatingSystem';

type CRMView = 'lifecycle' | 'followup' | 'workspace' | 'governance';

const views: { id: CRMView; label: string }[] = [
  { id: 'lifecycle', label: 'CRM Lifecycle' },
  { id: 'followup', label: 'Follow-up Engine' },
  { id: 'workspace', label: 'CRM Workspace' },
  { id: 'governance', label: 'Memory and Audit' },
];

export const Section28CRMFollowUpOperatingSystemSection: React.FC = () => {
  const [view, setView] = useState<CRMView>('lifecycle');

  return (
    <section id="crm-follow-up-operating-system" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#2DD4BF]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><Bot className="h-3.5 w-3.5" />SECTION 28 // CRM &amp; FOLLOW-UP OPERATING SYSTEM</div><h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Relationships with accountable memory.</h2><p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">A relationship management architecture for contacts, leads, clients, conversations, follow-ups, tasks, appointments, deal pipelines, retention, AI memory, and auditability.</p></div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">{views.map((item) => <button key={item.id} onClick={() => { soundEngine.playClick(); setView(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}>{item.label}</button>)}</div>

        {view === 'lifecycle' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="space-y-2 lg:col-span-5">{crmWorkflows.map((step) => <div key={step.order} className="flex gap-3 rounded-xl border border-white/10 bg-black/35 p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-xs font-bold text-[#D4AF37]">{step.order}</span><div><div className="text-sm font-semibold text-white">{step.state}</div><div className="mt-1 text-xs text-neutral-400">Owner: {step.owner}</div><div className="mt-2 text-xs text-[#2DD4BF]">Output: {step.output}</div></div></div>)}</div><div className="space-y-3 rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-7"><div className="mb-3 flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-[#2DD4BF]" /><h3 className="text-2xl font-bold text-white">CRM pipeline control</h3></div><List label="Core entities" items={crmCoreEntities} /><List label="Lead pipeline" items={leadPipelineRules} /><List label="Client pipeline" items={clientPipelineRules} /><List label="Contact fields" items={['Name', 'Phone', 'Email', 'Role', 'City', 'Area', 'Language', 'Trust Score', 'Lead Score', 'Source', 'Status']} /></div></div>}

        {view === 'followup' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><div className="flex items-center gap-3"><Activity className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Follow-up workflows</h3></div><List label="Workflows" items={followUpWorkflows} /><List label="Schedules" items={followUpSchedules} />{followUpRules.map((rule) => <div key={rule.name} className="rounded-xl border border-white/10 bg-black/35 p-4"><div className="flex items-center justify-between"><span className="font-semibold text-white">{rule.name}</span><span className="text-xs font-mono text-[#2DD4BF]">{rule.mode}</span></div><div className="mt-2 text-xs text-neutral-400">Trigger: {rule.trigger}</div><div className="mt-1 text-xs text-neutral-300">Action: {rule.action}</div><div className="mt-1 text-xs text-neutral-500">Stop: {rule.stopCondition}</div></div>)}</div><div className="space-y-3"><List label="Task management" items={['Create', 'Assign', 'Track', 'Complete', 'Escalate', 'Archive']} /><div className="flex items-center gap-3"><CalendarCheck className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Appointments</h3></div>{appointmentRules.map((rule) => <div key={rule.type} className="rounded-xl border border-white/10 bg-black/35 p-4"><div className="font-semibold text-white">{rule.type}</div><div className="mt-2 text-xs text-neutral-400">Fields: {rule.requiredFields.join(' / ')}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.reminderPolicy}</div></div>)}</div></div>}

        {view === 'workspace' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="CRM dashboard modules" items={crmDashboardModules} /><List label="Conversation channels" items={conversationChannels} /><List label="AI responsibilities" items={crmAiResponsibilities} /></div><div className="space-y-3"><List label="Retention system" items={retentionRules} /><List label="Performance metrics" items={performanceRules} /><List label="Notifications" items={notificationRules} /><List label="AI assistants involved" items={involvedAiAssistants} /></div></div>}

        {view === 'governance' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><div className="space-y-3"><List label="AI memory rules" items={aiMemoryRules} /><List label="Notifications" items={notificationRules} /></div><div className="space-y-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div><div className="space-y-2">{escalationRules.map((rule) => <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div><div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div></div>)}</div></div><List label="Audit rules" items={auditRules.map((rule) => `${rule.event} // ${rule.requiredFields.join(', ')}`)} /></div></div>}
      </div>
    </section>
  );
};

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
