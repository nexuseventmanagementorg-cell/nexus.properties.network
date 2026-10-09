import React, { useState } from 'react';
import { Activity, ArrowRight, Fingerprint, KeyRound, ShieldCheck, UserRound } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  accountCreationWorkflow,
  accountStatuses,
  accessScopes,
  aiAdminResponsibilities,
  aiResponsibilities,
  authenticationMethods,
  authenticationRules,
  auditEvents,
  auditRules,
  escalationRules,
  fraudRisks,
  fraudRules,
  identityAttributes,
  identityNotifications,
  identityPerformanceMetrics,
  identityRules,
  recoveryOptions,
  roleRules,
  securityControls,
  securityRules,
  sessionRules,
  superAdminResponsibilities,
  trustComponents,
  trustRules,
  userRoles,
  verificationLevels,
  verificationRules,
} from '../architecture/Section34IdentityAuthenticationOperatingSystem';

type IdentityView = 'overview' | 'lifecycle' | 'access' | 'governance';

const views: { id: IdentityView; label: string }[] = [
  { id: 'overview', label: 'Identity Overview' },
  { id: 'lifecycle', label: 'Account Lifecycle' },
  { id: 'access', label: 'Access and Security' },
  { id: 'governance', label: 'Trust and Governance' },
];

export const Section34IdentityAuthenticationOperatingSystemSection: React.FC = () => {
  const [view, setView] = useState<IdentityView>('overview');

  return (
    <section id="identity-authentication-operating-system" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#D4AF37]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel">
            <Fingerprint className="h-3.5 w-3.5" />
            SECTION 34 // IDENTITY & AUTHENTICATION OPERATING SYSTEM
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">One trusted identity for every Nexus relationship.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">The identity operating system connects authentication, verification, roles, permissions, trust, security, fraud protection, and account lifecycle governance across the entire property network.</p>
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
              <div className="mb-5 flex items-center gap-3"><UserRound className="h-6 w-6 text-[#2DD4BF]" /><div><div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">IDENTITY LAYER</div><h3 className="mt-1 text-2xl font-bold text-white">A durable identity with governed access</h3></div></div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {identityAttributes.map((item, index) => <div key={item} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-3"><div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500"><span>Identity {index + 1}</span><ArrowRight className="h-3 w-3 text-[#2DD4BF]" /></div><div className="text-sm font-semibold text-white">{item}</div></div>)}
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-2"><List label="Authentication methods" items={authenticationMethods} /><List label="Trust components" items={trustComponents} /></div>
            </div>
            <div className="space-y-3 lg:col-span-4"><List label="User roles" items={userRoles} /><RuleList label="Identity rules" rules={identityRules} /></div>
          </div>
        )}

        {view === 'lifecycle' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><UserRound className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Account creation workflow</h3></div><div className="space-y-2">{accountCreationWorkflow.map((step, index) => <div key={step} className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs font-mono text-[#D4AF37]">{String(index + 1).padStart(2, '0')}</span><span className="text-sm text-neutral-200">{step}</span></div>)}</div></div>
            <div className="space-y-3"><List label="Verification levels" items={verificationLevels} /><RuleList label="Verification rules" rules={verificationRules} /><RuleList label="Role assignment rules" rules={roleRules} /></div>
          </div>
        )}

        {view === 'access' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3"><List label="Account status" items={accountStatuses} /><List label="Access control" items={accessScopes} /><List label="Session management" items={sessionRules} /></div>
            <div className="space-y-3"><RuleList label="Authentication rules" rules={authenticationRules} /><RuleList label="Security rules" rules={securityRules} /><List label="Login security" items={securityControls} /><List label="Account recovery" items={recoveryOptions} /></div>
          </div>
        )}

        {view === 'governance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3"><RuleList label="Trust rules" rules={trustRules} /><RuleList label="Fraud rules" rules={fraudRules} /><List label="Fraud protection" items={fraudRisks} /></div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">AI and admin responsibilities</h3></div><div className="grid gap-3 sm:grid-cols-2"><List label="AI responsibilities" items={aiResponsibilities} /><List label="AI Admin responsibilities" items={aiAdminResponsibilities} /><List label="Super Admin responsibilities" items={superAdminResponsibilities} /></div></div>
              <List label="Notifications" items={identityNotifications} /><List label="Audit events" items={auditEvents} /><RuleList label="Audit rules" rules={auditRules} />
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Identity performance</h3></div><div className="space-y-2">{identityPerformanceMetrics.map((metric) => <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs text-neutral-400">{metric.label}</span><span className="text-sm font-semibold text-white">{metric.value}</span></div>)}</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-3"><KeyRound className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div><div className="space-y-2">{escalationRules.map((rule) => <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div><div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div></div>)}</div></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const RuleList: React.FC<{ label: string; rules: { title: string; description: string }[] }> = ({ label, rules }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-2">{rules.map((rule) => <div key={rule.title}><div className="text-xs font-semibold text-white">{rule.title}</div><div className="mt-1 text-xs leading-relaxed text-neutral-400">{rule.description}</div></div>)}</div></div>;

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => <div className="rounded-xl border border-white/10 bg-black/40 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div></div>;
