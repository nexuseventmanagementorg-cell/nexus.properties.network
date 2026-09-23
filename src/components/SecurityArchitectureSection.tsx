import React, { useState } from 'react';
import { Activity, AlertOctagon, CheckCircle2, ChevronDown, ChevronUp, FileKey, Fingerprint, Lock, ShieldAlert, ShieldCheck, Users } from 'lucide-react';
import { soundEngine } from '../utils/sound';

const riskLevels = [
  { level: 'LEVEL 1', title: 'Low Risk', color: 'text-emerald-300', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', examples: ['Incomplete Profile', 'Missing Documents', 'New Account'], action: 'Warning' },
  { level: 'LEVEL 2', title: 'Medium Risk', color: 'text-amber-300', border: 'border-amber-500/30', bg: 'bg-amber-500/10', examples: ['Duplicate Phone', 'Multiple Accounts', 'Unusual Lead Activity'], action: 'Manual Review' },
  { level: 'LEVEL 3', title: 'High Risk', color: 'text-orange-300', border: 'border-orange-500/30', bg: 'bg-orange-500/10', examples: ['Fake Documents', 'Fake Ownership Claims', 'Payment Mismatch'], action: 'Account Suspension' },
  { level: 'LEVEL 4', title: 'Critical Risk', color: 'text-red-300', border: 'border-red-500/30', bg: 'bg-red-500/10', examples: ['Fraud Network', 'Large Scale Abuse', 'System Manipulation'], action: 'AI Admin Escalation + Super Admin Review' },
];

const detectionEngines = [
  { id: 'fraud', name: 'Fraud Detection AI', ai: 'AI-51', icon: ShieldAlert, mission: 'Detect suspicious activity across users, properties, leads, deals, payments, and documents.', checks: ['Duplicate listings', 'Image and document fraud', 'Ownership mismatch', 'Fake payments', 'Account takeover'] },
  { id: 'trust', name: 'Trust Intelligence AI', ai: 'AI-52', icon: ShieldCheck, mission: 'Measure trust across users, agents, agencies, developers, and listings.', checks: ['Verified identity', 'Successful deals', 'Reviews and response time', 'Complaints and disputes', 'Fraud reports'] },
  { id: 'compliance', name: 'Compliance Intelligence AI', ai: 'AI-53', icon: FileKey, mission: 'Enforce listing, payment, verification, and user conduct policies.', checks: ['Policy compliance', 'Document status', 'Payment rules', 'User conduct', 'Legal escalation'] },
];

const hierarchy = ['Super Admin', 'AI Admin', 'Fraud Detection AI', 'Trust Intelligence AI', 'Compliance Intelligence AI', 'Verification AI', 'Platform Users'];
const auditEvents = ['User Login', 'Property Creation', 'Lead Lock', 'Deal Lock', 'Payment', 'Approval', 'Rejection'];
const finalPrinciples = ['No Fake Listings', 'No Fake Agents', 'No Fake Documents', 'No Fake Payments', 'No Hidden Ownership', 'No Hidden Commission Manipulation', 'No Untraceable Activity'];

export const SecurityArchitectureSection: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState('fraud');
  const [riskOpen, setRiskOpen] = useState<number | null>(2);
  const engine = detectionEngines.find((item) => item.id === activeEngine) ?? detectionEngines[0];
  const EngineIcon = engine.icon;

  return (
    <section id="security-architecture" className="relative overflow-hidden border-t border-white/10 bg-[#050505] py-28">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[520px] w-[760px] rounded-full bg-red-500/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-red-300 glass-panel">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>SECTION 16 // SECURITY ARCHITECTURE &amp; FRAUD PREVENTION</span>
          </div>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">The security layer behind trusted property.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">Nexus security creates trust, reduces fraud, maintains evidence, and ensures accountability across every property, identity, lead, deal, payment, and document.</p>
        </div>

        <div className="mb-10 grid gap-3 sm:grid-cols-4">
          {['Trust Create Karna', 'Fraud Reduce Karna', 'Evidence Maintain Karna', 'Accountability Ensure Karna'].map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]"><CheckCircle2 className="h-4 w-4" /></div>
              <div className="text-sm font-bold text-white">0{index + 1}</div>
              <div className="mt-1 text-xs text-neutral-400">{item}</div>
            </div>
          ))}
        </div>

        <div className="mb-10 rounded-3xl border border-white/10 bg-black/35 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3"><Fingerprint className="h-6 w-6 text-[#D4AF37]" /><div><span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">NEXUS SECURITY HIERARCHY</span><h3 className="mt-1 text-2xl font-bold text-white">Governance from platform to Super Admin</h3></div></div>
          <div className="grid gap-2 md:grid-cols-7">
            {hierarchy.map((item, index) => <React.Fragment key={item}><div className={`rounded-xl border p-3 text-center text-xs font-semibold ${index === 0 ? 'border-red-400/40 bg-red-500/10 text-red-200' : index === 1 ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 bg-white/[.03] text-neutral-300'}`}>{item}</div>{index < hierarchy.length - 1 && <div className="hidden items-center justify-center text-neutral-600 md:flex">↓</div>}</React.Fragment>)}
          </div>
        </div>

        <div className="mb-10 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3"><AlertOctagon className="h-5 w-5 text-red-300" /><h3 className="text-2xl font-bold text-white">Fraud risk levels</h3></div>
            <div className="space-y-2">
              {riskLevels.map((risk, index) => {
                const open = riskOpen === index;
                return <div key={risk.level} className={`overflow-hidden rounded-2xl border ${risk.border} ${risk.bg}`}>
                  <button type="button" onClick={() => { soundEngine.playClick(); setRiskOpen(open ? null : index); }} className="flex w-full items-center justify-between p-4 text-left"><span><span className={`text-[10px] font-mono tracking-widest ${risk.color}`}>{risk.level}</span><span className="ml-3 text-sm font-bold text-white">{risk.title}</span></span>{open ? <ChevronUp className="h-4 w-4 text-neutral-400" /> : <ChevronDown className="h-4 w-4 text-neutral-400" />}</button>
                  {open && <div className="border-t border-white/10 px-4 pb-4 pt-3"><div className="flex flex-wrap gap-2">{risk.examples.map((example) => <span key={example} className="rounded-lg border border-white/10 bg-black/25 px-2.5 py-1.5 text-xs text-neutral-300">{example}</span>)}</div><div className={`mt-3 text-xs font-mono ${risk.color}`}>ACTION: {risk.action}</div></div>}
                </div>;
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-3"><div><span className="text-[10px] font-mono tracking-widest text-[#2DD4BF]">SECURITY INTELLIGENCE CORE</span><h3 className="mt-1 text-2xl font-bold text-white">Detection engines</h3></div><Activity className="h-6 w-6 text-[#2DD4BF]" /></div>
            <div className="mb-5 flex flex-wrap gap-2">{detectionEngines.map((item) => <button key={item.id} type="button" onClick={() => { soundEngine.playClick(); setActiveEngine(item.id); }} className={`rounded-xl border px-3 py-2 text-xs font-bold ${activeEngine === item.id ? 'border-[#2DD4BF] bg-[#2DD4BF]/15 text-[#2DD4BF]' : 'border-white/10 text-neutral-400 hover:text-white'}`}>{item.ai}</button>)}</div>
            <div className="flex items-start gap-3"><EngineIcon className="mt-1 h-6 w-6 shrink-0 text-[#D4AF37]" /><div><h4 className="text-lg font-bold text-white">{engine.name}</h4><p className="mt-2 text-sm leading-relaxed text-neutral-300">{engine.mission}</p></div></div>
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">{engine.checks.map((check) => <div key={check} className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/25 p-3 text-xs text-neutral-300"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />{check}</div>)}</div>
          </div>
        </div>

        <div className="mb-10 grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-2 text-[#D4AF37]"><Users className="h-4 w-4" /><span className="text-xs font-mono tracking-widest">RISK SCORES</span></div><div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-white/[.03] p-4"><div className="text-3xl font-extrabold text-white">0-100</div><div className="mt-1 text-xs text-neutral-400">User risk score</div></div><div className="rounded-xl bg-white/[.03] p-4"><div className="text-3xl font-extrabold text-white">0-100</div><div className="mt-1 text-xs text-neutral-400">Property risk score</div></div></div><p className="mt-4 text-xs leading-relaxed text-neutral-400">Verification, document quality, complaints, disputes, fraud reports, duplicate images, location, ownership, pricing, and rejection history.</p></div>
          <div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-2 text-[#2DD4BF]"><Lock className="h-4 w-4" /><span className="text-xs font-mono tracking-widest">SECURITY DASHBOARD</span></div><div className="grid grid-cols-2 gap-2">{['Fraud Alerts', 'Risk Alerts', 'Verification Queue', 'Payment Queue', 'Lead Abuse Reports', 'Trust Score Changes', 'System Health'].map((item) => <div key={item} className="rounded-lg border border-white/10 bg-white/[.03] px-3 py-2 text-xs text-neutral-300">{item}</div>)}</div><div className="mt-4 text-xs text-neutral-500">Visible to AI Admin and Super Admin</div></div>
          <div className="rounded-2xl border border-white/10 bg-black/35 p-5"><div className="mb-4 flex items-center gap-2 text-[#D4AF37]"><FileKey className="h-4 w-4" /><span className="text-xs font-mono tracking-widest">SECURITY AUDIT LOG</span></div><div className="mb-4 grid grid-cols-5 gap-1 text-center text-[9px] font-mono text-neutral-500">{['WHO', 'WHAT', 'WHEN', 'WHERE', 'WHY'].map((item) => <span key={item} className="rounded bg-white/[.03] py-2">{item}</span>)}</div><div className="flex flex-wrap gap-2">{auditEvents.map((event) => <span key={event} className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-neutral-300">{event}</span>)}</div><div className="mt-4 text-xs font-mono text-emerald-300">RETENTION: FOREVER</div></div>
        </div>

        <div className="rounded-3xl border border-red-400/25 bg-red-500/[.04] p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-red-300" /><div><span className="text-[10px] font-mono tracking-widest text-red-300">SECTION 16 FINAL PRINCIPLE</span><h3 className="mt-1 text-2xl font-bold text-white">Trust is earned. Every action is recorded.</h3></div></div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{finalPrinciples.map((item) => <div key={item} className="flex items-center gap-2 text-sm text-neutral-200"><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />{item}</div>)}</div>
        </div>
      </div>
    </section>
  );
};
