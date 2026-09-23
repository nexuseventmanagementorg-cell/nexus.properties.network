import React, { useState } from 'react';
import { Activity, ArrowRight, Bot, CheckCircle2, Code2, Database, DollarSign, FileKey, Globe, Lock, Network, Search, Shield, Users } from 'lucide-react';
import { soundEngine } from '../utils/sound';

type Endpoint = { method: string; path: string; purpose: string; access: string };
type ApiGroup = { name: string; icon: React.ComponentType<{ className?: string }>; endpoints: Endpoint[] };

const apiGroups: ApiGroup[] = [
  { name: 'Authentication', icon: Lock, endpoints: [
    { method: 'POST', path: '/api/auth/register', purpose: 'New user registration', access: 'Public' },
    { method: 'POST', path: '/api/auth/login', purpose: 'User login', access: 'Public' },
    { method: 'POST', path: '/api/auth/google', purpose: 'Google OAuth login', access: 'Public' },
    { method: 'POST', path: '/api/auth/logout', purpose: 'End current session', access: 'Authenticated' },
    { method: 'GET', path: '/api/auth/session', purpose: 'Return current session', access: 'Authenticated' },
  ] },
  { name: 'Users and Roles', icon: Users, endpoints: [
    { method: 'GET', path: '/api/users/profile', purpose: 'Read current profile', access: 'Authenticated' },
    { method: 'PUT', path: '/api/users/profile', purpose: 'Update profile', access: 'Authenticated' },
    { method: 'POST', path: '/api/users/upload-avatar', purpose: 'Upload profile image', access: 'Authenticated' },
    { method: 'GET', path: '/api/users/trust-score', purpose: 'Read trust score', access: 'Authenticated' },
    { method: 'GET', path: '/api/roles', purpose: 'Return available roles', access: 'Public' },
  ] },
  { name: 'Properties and Coverage', icon: Globe, endpoints: [
    { method: 'POST', path: '/api/properties/create', purpose: 'Create property draft', access: 'Seller / authorized role' },
    { method: 'GET', path: '/api/properties/details/{id}', purpose: 'Read property details', access: 'Role-based' },
    { method: 'GET', path: '/api/properties/search', purpose: 'Search verified inventory', access: 'Authenticated' },
    { method: 'POST', path: '/api/properties/upload-documents', purpose: 'Upload property records', access: 'Owner / authorized role' },
    { method: 'GET', path: '/api/coverage/areas/{city}', purpose: 'Return areas for a city', access: 'Authenticated' },
    { method: 'GET', path: '/api/coverage/properties/{area}', purpose: 'Return properties for an area', access: 'Authenticated' },
  ] },
  { name: 'Verification', icon: Shield, endpoints: [
    { method: 'POST', path: '/api/verification/request', purpose: 'Start verification workflow', access: 'Authenticated' },
    { method: 'GET', path: '/api/verification/status/{id}', purpose: 'Read verification status', access: 'Role-based' },
    { method: 'POST', path: '/api/verification/review', purpose: 'Review verification decision', access: 'AI Admin only' },
  ] },
  { name: 'Leads and Lead Lock', icon: Network, endpoints: [
    { method: 'POST', path: '/api/leads/create', purpose: 'Create buyer intent lead', access: 'Buyer / authenticated' },
    { method: 'POST', path: '/api/leads/qualify', purpose: 'Qualify lead intent', access: 'Lead AI' },
    { method: 'POST', path: '/api/leads/route', purpose: 'Route to specialist agent', access: 'Routing AI' },
    { method: 'POST', path: '/api/lead-lock/create', purpose: 'Create protected lead lock', access: 'Eligible agent' },
    { method: 'GET', path: '/api/lead-lock/status/{id}', purpose: 'Read lock status', access: 'Authorized parties' },
    { method: 'POST', path: '/api/lead-lock/release', purpose: 'Release lead lock', access: 'Authorized review' },
  ] },
  { name: 'Deals and Payments', icon: DollarSign, endpoints: [
    { method: 'POST', path: '/api/deals/create', purpose: 'Start deal workflow', access: 'Authorized parties' },
    { method: 'POST', path: '/api/deals/lock', purpose: 'Activate Deal Lock', access: 'Authorized parties' },
    { method: 'GET', path: '/api/deals/timeline', purpose: 'Read deal events', access: 'Role-based' },
    { method: 'POST', path: '/api/payments/create', purpose: 'Create payment request', access: 'Authenticated' },
    { method: 'POST', path: '/api/payments/verify', purpose: 'Verify payment', access: 'Payment / AI Admin' },
    { method: 'GET', path: '/api/payments/invoice/{id}', purpose: 'Read invoice', access: 'Payment owner' },
    { method: 'POST', path: '/api/subscriptions/activate', purpose: 'Activate subscription', access: 'Authenticated' },
  ] },
  { name: 'AI and Memory', icon: Bot, endpoints: [
    { method: 'POST', path: '/api/ai/chat', purpose: 'Main AI gateway and router', access: 'Authenticated' },
    { method: 'GET', path: '/api/ai/memory/{userId}', purpose: 'Read user AI memory', access: 'Authorized AI' },
    { method: 'POST', path: '/api/ai/memory/save', purpose: 'Save approved memory', access: 'Authorized AI' },
    { method: 'GET', path: '/api/ai/conversations', purpose: 'Read conversation history', access: 'User / AI Admin' },
    { method: 'POST', path: '/api/voice/text-to-speech', purpose: 'Generate Pakistani female advisor voice', access: 'Authenticated' },
    { method: 'POST', path: '/api/language/change', purpose: 'Change Roman Urdu, Urdu, or English', access: 'Authenticated' },
  ] },
  { name: 'Admin and Realtime', icon: Activity, endpoints: [
    { method: 'GET', path: '/api/admin/users', purpose: 'Admin user review', access: 'AI Admin' },
    { method: 'GET', path: '/api/admin/fraud', purpose: 'Fraud case review', access: 'AI Admin' },
    { method: 'GET', path: '/api/admin/system-health', purpose: 'System health status', access: 'AI Admin' },
    { method: 'GET', path: '/api/super-admin/dashboard', purpose: 'Governance dashboard', access: 'Super Admin' },
    { method: 'POST', path: '/api/super-admin/override', purpose: 'Emergency control', access: 'Super Admin only' },
    { method: 'WS', path: 'lead_created / deal_completed / ai_escalation', purpose: 'Realtime workflow events', access: 'Authorized subscribers' },
  ] },
];

export const ApiArchitectureSection: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const group = apiGroups[activeGroup];
  const endpoint = group.endpoints[activeEndpoint];

  return (
    <section id="api-architecture" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-28">
      <div className="pointer-events-none absolute left-1/3 top-0 h-[600px] w-[700px] rounded-full bg-[#2DD4BF]/5 blur-[180px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel"><Code2 className="h-3.5 w-3.5" /><span>SECTION 15 // COMPLETE API ARCHITECTURE</span></div>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">One governed API layer.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">A backend endpoint blueprint connecting clients to authentication, business services, AI routing, payments, administration, and the database. Every request is authenticated, logged, audited, and traceable.</p>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs font-mono text-neutral-400"><span className="text-[#D4AF37]">CLIENT</span><ArrowRight className="h-4 w-4" /><span>AUTH</span><ArrowRight className="h-4 w-4" /><span>BUSINESS</span><ArrowRight className="h-4 w-4" /><span>AI</span><ArrowRight className="h-4 w-4" /><span>PAYMENTS</span><ArrowRight className="h-4 w-4" /><span>ADMIN</span><ArrowRight className="h-4 w-4" /><span className="text-[#2DD4BF]">DATABASE</span></div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-2.5 lg:col-span-4">{apiGroups.map((item, index) => { const Icon = item.icon; return <button key={item.name} onClick={() => { soundEngine.playClick(); setActiveGroup(index); setActiveEndpoint(0); }} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${activeGroup === index ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/5 bg-black/50 hover:border-white/20'}`}><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${activeGroup === index ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-neutral-400'}`}><Icon className="h-4 w-4" /></div><div><div className="text-sm font-bold text-white">{item.name}</div><div className="mt-1 text-[10px] font-mono text-neutral-500">{item.endpoints.length} endpoints</div></div></button>; })}</div>

          <div className="glass-card-luxury rounded-3xl border-white/10 p-6 sm:p-8 lg:col-span-8"><div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-5"><div><span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">API DOMAIN // {group.name.toUpperCase()}</span><h3 className="mt-1 text-2xl font-bold text-white">{endpoint.path}</h3></div><FileKey className="h-6 w-6 text-[#2DD4BF]" /></div><div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">{group.endpoints.map((item, index) => <button key={`${item.method}-${item.path}`} onClick={() => { soundEngine.playClick(); setActiveEndpoint(index); }} className={`rounded-xl border p-3 text-left transition-all ${activeEndpoint === index ? 'border-[#2DD4BF] bg-[#2DD4BF]/10' : 'border-white/5 bg-black/45 hover:border-white/20'}`}><span className={`mr-2 text-[10px] font-bold ${item.method === 'GET' ? 'text-[#2DD4BF]' : item.method === 'WS' ? 'text-[#D4AF37]' : 'text-emerald-300'}`}>{item.method}</span><span className="font-mono text-xs text-white">{item.path}</span></button>)}</div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/10 bg-black/45 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">Purpose</div><div className="mt-2 text-sm font-semibold text-white">{endpoint.purpose}</div></div><div className="rounded-xl border border-white/10 bg-black/45 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">Access</div><div className="mt-2 text-sm font-semibold text-[#D4AF37]">{endpoint.access}</div></div></div></div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12"><div className="rounded-3xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 p-6 sm:p-8 lg:col-span-7"><Database className="mb-5 h-7 w-7 text-[#2DD4BF]" /><h3 className="text-2xl font-bold text-white">Nexus API principles</h3><div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">{['No direct database access', 'Everything through APIs', 'Everything logged', 'Everything audited', 'Everything traceable', 'Human governance preserved'].map((item) => <div key={item} className="flex items-center gap-2 text-sm text-neutral-200"><CheckCircle2 className="h-4 w-4 text-emerald-300" />{item}</div>)}</div></div><div className="rounded-3xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-6 sm:p-8 lg:col-span-5"><Search className="mb-5 h-7 w-7 text-[#D4AF37]" /><h3 className="text-2xl font-bold text-white">AI gateway</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">The AI gateway receives a message, detects intent, routes to the right specialist, records the decision, and escalates governance risk.</p><div className="mt-5 text-xs font-mono text-[#2DD4BF]">POST /api/ai/chat</div></div></div>
      </div>
    </section>
  );
};
