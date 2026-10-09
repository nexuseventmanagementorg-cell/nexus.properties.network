import React, { useState } from 'react';
import { CheckCircle2, Lock, ShieldCheck, Users } from 'lucide-react';
import { complianceRules, permissionActions, roleDefinitions, rolePermissionMatrix, roleDashboardMatrix, aiAccessMatrix, trustMatrix, type NexusRole } from '../architecture/Section19UserRoleConstitution';
import { soundEngine } from '../utils/sound';

type ConstitutionView = 'roles' | 'permissions' | 'trust';

const views: { id: ConstitutionView; label: string }[] = [
  { id: 'roles', label: 'Role Definitions' },
  { id: 'permissions', label: 'Permission Matrix' },
  { id: 'trust', label: 'Trust Matrix' },
];

export const Section19UserRoleConstitutionSection: React.FC = () => {
  const [view, setView] = useState<ConstitutionView>('roles');
  const [selectedRole, setSelectedRole] = useState<NexusRole>('Buyer');
  const definition = roleDefinitions.find((item) => item.role === selectedRole) ?? roleDefinitions[0];

  return (
    <section id="user-role-constitution" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#D4AF37]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><ShieldCheck className="h-3.5 w-3.5" />SECTION 19 // USER ROLE CONSTITUTION</div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Governed access for every role.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">A typed constitutional layer defining permissions, limitations, verification, trust, AI access, dashboards, escalation, compliance, fraud, and audit rules for the Nexus network.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">
          {views.map((item) => <button key={item.id} onClick={() => { soundEngine.playClick(); setView(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}>{item.label}</button>)}
        </div>

        {view === 'roles' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="grid max-h-[560px] content-start gap-2 overflow-auto sm:grid-cols-2 lg:col-span-4">{roleDefinitions.map((item) => <button key={item.role} onClick={() => { soundEngine.playClick(); setSelectedRole(item.role); }} className={`flex items-center gap-3 rounded-xl border p-3 text-left ${selectedRole === item.role ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 bg-black/35 hover:border-white/20'}`}><Users className="h-4 w-4 text-[#D4AF37]" /><span className="text-sm font-semibold text-white">{item.role}</span></button>)}</div><div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-8"><div className="mb-5"><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">ROLE CONSTITUTION // {definition.role.toUpperCase()}</div><h3 className="mt-1 text-2xl font-bold text-white">{definition.overview}</h3><p className="mt-2 text-sm text-neutral-300">{definition.purpose}</p></div><div className="grid gap-3 sm:grid-cols-2"><List label="Allowed actions" items={definition.allowedActions} /><List label="Restricted actions" items={definition.restrictedActions} /><List label="Verification" items={definition.requiredVerification} /><List label="Dashboard access" items={definition.dashboardAccess} /><List label="AI access" items={definition.aiAssistantAccess} /><List label="Lead and deal access" items={[...definition.leadAccess, ...definition.dealAccess]} /><List label="Property access" items={definition.propertyAccess} /><List label="Subscription and payments" items={[...definition.subscriptionAccess, ...definition.paymentAccess]} /><List label="Escalation" items={definition.escalationRules} /><List label="Compliance, fraud, audit" items={[...definition.complianceRules, ...definition.fraudRules, ...definition.auditRules]} /></div></div></div>}

        {view === 'permissions' && <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/35"><table className="min-w-[1100px] w-full text-left text-xs"><thead><tr className="border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-neutral-500"><th className="p-4">Role</th>{permissionActions.map((action) => <th key={action} className="p-4">{action}</th>)}</tr></thead><tbody>{roleDefinitions.map((item) => <tr key={item.role} className="border-b border-white/5"><td className="p-4 font-semibold text-white">{item.role}</td>{permissionActions.map((action) => <td key={action} className="p-4">{rolePermissionMatrix[item.role].includes(action) ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Lock className="h-3.5 w-3.5 text-neutral-700" />}</td>)}</tr>)}</tbody></table></div>}

        {view === 'trust' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-12"><div className="space-y-2 lg:col-span-5">{trustMatrix.map((item) => <div key={item.factor} className="rounded-xl border border-white/10 bg-black/35 p-4"><div className="flex items-center justify-between"><span className="font-semibold text-white">{item.factor}</span><span className="font-mono text-[#D4AF37]">{item.weight}%</span></div><div className="mt-2 text-xs text-emerald-300">Positive: {item.positiveSignal}</div><div className="mt-1 text-xs text-rose-300">Negative: {item.negativeSignal}</div></div>)}</div><div className="space-y-3 lg:col-span-7"><List label="Dashboard matrix // selected role" items={roleDashboardMatrix[selectedRole]} /><List label="AI access matrix // selected role" items={aiAccessMatrix[selectedRole]} /><List label="Universal compliance system" items={complianceRules} /><div className="rounded-xl border border-[#2DD4BF]/20 bg-[#2DD4BF]/5 p-5 text-sm leading-relaxed text-neutral-300">Trust scores are evidence-based signals, not final legal or human decisions. Every adjustment must reference verification, transaction, payment, dispute, fraud, document, or AI Admin review evidence.</div></div></div>}
      </div>
    </section>
  );
};

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
