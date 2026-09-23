import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Database,
  FileKey,
  Fingerprint,
  Lock,
  Network,
  FileText,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react';
import { soundEngine } from '../utils/sound';

type TableGroup = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tables: { name: string; fields: string[] }[];
};

const tableGroups: TableGroup[] = [
  {
    label: 'Identity and Access', icon: Fingerprint,
    tables: [
      { name: 'users', fields: ['id', 'nexus_id', 'role', 'full_name', 'email', 'phone', 'city', 'verification_status', 'trust_score', 'subscription_status'] },
      { name: 'roles', fields: ['id', 'role_name', 'permissions'] },
      { name: 'user_ai_assignments', fields: ['id', 'user_id', 'ai_id', 'assigned_at', 'status'] },
      { name: 'user_sessions', fields: ['id', 'user_id', 'device', 'browser', 'login_time', 'logout_time'] },
      { name: 'user_documents', fields: ['id', 'user_id', 'document_type', 'document_url', 'verification_status'] },
      { name: 'trust_score_history', fields: ['id', 'user_id', 'previous_score', 'new_score', 'reason', 'created_at'] },
    ],
  },
  {
    label: 'Property and Verification', icon: Building2,
    tables: [
      { name: 'properties', fields: ['id', 'property_id', 'owner_id', 'city', 'area', 'society', 'price', 'property_type', 'trust_score', 'status'] },
      { name: 'property_images', fields: ['id', 'property_id', 'image_url', 'sort_order'] },
      { name: 'property_videos', fields: ['id', 'property_id', 'video_url', 'uploaded_at'] },
      { name: 'property_documents', fields: ['id', 'property_id', 'document_type', 'document_url', 'verification_status'] },
      { name: 'property_ownership_history', fields: ['id', 'property_id', 'owner_id', 'start_date', 'end_date', 'transfer_type'] },
      { name: 'property_verification', fields: ['id', 'property_id', 'verification_stage', 'reviewer', 'decision', 'notes'] },
      { name: 'property_trust_scores', fields: ['id', 'property_id', 'score', 'reason', 'created_at'] },
    ],
  },
  {
    label: 'Leads and Deals', icon: Network,
    tables: [
      { name: 'leads', fields: ['id', 'lead_id', 'buyer_id', 'property_id', 'lead_type', 'status'] },
      { name: 'lead_qualification', fields: ['id', 'lead_id', 'budget', 'timeline', 'intent', 'qualification_score'] },
      { name: 'lead_locks', fields: ['id', 'lead_id', 'agent_id', 'lock_start', 'lock_end', 'payment_id'] },
      { name: 'lead_history', fields: ['id', 'lead_id', 'action', 'performed_by', 'timestamp'] },
      { name: 'deals', fields: ['id', 'deal_id', 'lead_id', 'buyer_id', 'seller_id', 'agent_id', 'status'] },
      { name: 'deal_locks', fields: ['id', 'deal_id', 'lock_fee', 'lock_status', 'created_at'] },
      { name: 'deal_timeline', fields: ['id', 'deal_id', 'event', 'description', 'created_at'] },
    ],
  },
  {
    label: 'Organizations and Portfolios', icon: Users,
    tables: [
      { name: 'agents', fields: ['id', 'user_id', 'license_number', 'agency_id', 'areas', 'trust_score'] },
      { name: 'agencies', fields: ['id', 'agency_name', 'owner_id', 'verification_status', 'trust_score'] },
      { name: 'projects', fields: ['id', 'developer_id', 'project_name', 'city', 'location', 'status'] },
      { name: 'project_inventory', fields: ['id', 'project_id', 'unit_number', 'unit_type', 'price', 'availability'] },
      { name: 'investor_portfolios', fields: ['id', 'investor_id', 'portfolio_value', 'properties_count', 'roi'] },
      { name: 'corporate_assets', fields: ['id', 'corporate_id', 'property_id', 'asset_type', 'value'] },
    ],
  },
  {
    label: 'Payments and Billing', icon: Wallet,
    tables: [
      { name: 'payments', fields: ['id', 'payment_id', 'user_id', 'amount', 'currency', 'payment_method', 'status'] },
      { name: 'subscriptions', fields: ['id', 'user_id', 'plan_name', 'billing_cycle', 'amount', 'status'] },
      { name: 'invoices', fields: ['id', 'invoice_number', 'user_id', 'payment_id', 'amount', 'status'] },
    ],
  },
  {
    label: 'AI and Governance', icon: Bot,
    tables: [
      { name: 'ai_assistants', fields: ['id', 'assistant_number', 'assistant_name', 'department', 'status'] },
      { name: 'ai_conversations', fields: ['id', 'user_id', 'assistant_id', 'started_at', 'ended_at'] },
      { name: 'ai_messages', fields: ['id', 'conversation_id', 'sender', 'message', 'created_at'] },
      { name: 'ai_escalations', fields: ['id', 'conversation_id', 'from_ai', 'to_ai', 'reason'] },
      { name: 'ai_admin_reviews', fields: ['id', 'reference_type', 'reference_id', 'decision', 'notes'] },
      { name: 'fraud_cases', fields: ['id', 'case_number', 'user_id', 'risk_level', 'status', 'assigned_to'] },
      { name: 'disputes', fields: ['id', 'deal_id', 'complainant', 'respondent', 'status', 'resolution'] },
    ],
  },
  {
    label: 'Operations and Audit', icon: FileText,
    tables: [
      { name: 'audit_logs', fields: ['id', 'user_id', 'action', 'entity_type', 'entity_id', 'created_at'] },
      { name: 'notifications', fields: ['id', 'user_id', 'title', 'message', 'read_status'] },
      { name: 'support_tickets', fields: ['id', 'user_id', 'subject', 'description', 'status'] },
      { name: 'system_settings', fields: ['key', 'value', 'updated_at'] },
      { name: 'verification_queue', fields: ['id', 'reference_type', 'reference_id', 'status', 'assigned_to'] },
      { name: 'system_health', fields: ['id', 'service', 'status', 'last_checked'] },
      { name: 'ai_performance', fields: ['id', 'assistant_id', 'metric', 'recorded_at'] },
      { name: 'security_alerts', fields: ['id', 'severity', 'source', 'status', 'created_at'] },
    ],
  },
];

const principles = ['No fake data', 'No duplicate users or listings', 'Full audit trail', 'Role-based access', 'AI governed', 'Human supervised'];
const relationships = [
  ['Users', 'Properties', 'owner_id'],
  ['Properties', 'Images, videos, documents, verification', 'property_id'],
  ['Users', 'Leads, payments, conversations, trust history', 'user_id'],
  ['Leads', 'Locks and deals', 'lead_id'],
  ['Deals', 'Locks, timeline, disputes', 'deal_id'],
  ['Every entity', 'Audit logs', 'entity_id'],
];

export const DatabaseArchitectureSection: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeTable, setActiveTable] = useState(0);
  const group = tableGroups[activeGroup];
  const table = group.tables[activeTable];

  const selectGroup = (index: number) => {
    soundEngine.playClick();
    setActiveGroup(index);
    setActiveTable(0);
  };

  return (
    <section id="database-architecture" className="relative overflow-hidden border-t border-white/10 bg-[#050505] py-28">
      <div className="pointer-events-none absolute left-1/3 top-0 h-[600px] w-[700px] rounded-full bg-[#D4AF37]/5 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/5 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel">
            <Database className="h-3.5 w-3.5" />
            <span>SECTION 14 // COMPLETE DATABASE ARCHITECTURE</span>
          </div>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">The traceable foundation of Nexus OS.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">A backend blueprint for identities, properties, leads, deals, payments, AI conversations, governance, and audit history. This is a schema specification, not a claim that a production database is connected.</p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {principles.map((principle, index) => <div key={principle} className="rounded-2xl border border-white/10 bg-black/45 p-4"><CheckCircle2 className="mb-3 h-4 w-4 text-[#2DD4BF]" /><div className="text-xs font-bold leading-relaxed text-white">{principle}</div></div>)}
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-2.5 lg:col-span-4">
            {tableGroups.map((item, index) => {
              const Icon = item.icon;
              return <button key={item.label} onClick={() => selectGroup(index)} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${activeGroup === index ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/5 bg-black/50 hover:border-white/20'}`}><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${activeGroup === index ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-neutral-400'}`}><Icon className="h-4 w-4" /></div><div><div className="text-sm font-bold text-white">{item.label}</div><div className="mt-1 text-[10px] font-mono text-neutral-500">{item.tables.length} schema objects</div></div></button>;
            })}
          </div>

          <div className="glass-card-luxury rounded-3xl border-white/10 p-6 sm:p-8 lg:col-span-8">
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-5"><div><span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">SCHEMA DOMAIN // {group.label.toUpperCase()}</span><h3 className="mt-1 text-2xl font-bold text-white">{table.name}</h3></div><FileKey className="h-6 w-6 text-[#2DD4BF]" /></div>
            <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">{group.tables.map((item, index) => <button key={item.name} onClick={() => { soundEngine.playClick(); setActiveTable(index); }} className={`rounded-xl border p-3 text-left font-mono text-xs transition-all ${activeTable === index ? 'border-[#2DD4BF] bg-[#2DD4BF]/10 text-white' : 'border-white/5 bg-black/45 text-neutral-400 hover:border-white/20'}`}>{item.name}</button>)}</div>
            <div className="rounded-2xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 p-5"><div className="mb-3 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#2DD4BF]"><Lock className="h-3.5 w-3.5" />FIELD SPECIFICATION</div><div className="flex flex-wrap gap-2">{table.fields.map((field) => <span key={field} className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 text-[10px] font-mono text-white">{field}</span>)}</div></div>
            <div className="mt-5 flex items-center gap-2 text-xs font-mono text-neutral-400"><ShieldCheck className="h-4 w-4 text-emerald-300" />Role-based access and human-supervised review required.</div>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8 lg:col-span-7"><div className="mb-6 flex items-center gap-3"><Network className="h-6 w-6 text-[#D4AF37]" /><div><span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">CORE RELATIONSHIPS</span><h3 className="mt-1 text-2xl font-bold text-white">Traceability map</h3></div></div><div className="space-y-2.5">{relationships.map(([from, to, key]) => <div key={`${from}-${to}`} className="grid grid-cols-1 gap-2 rounded-xl border border-white/5 bg-white/5 p-3 sm:grid-cols-[1fr_auto_2fr_auto]"><span className="text-xs font-bold text-white">{from}</span><ArrowRight className="hidden h-4 w-4 text-[#2DD4BF] sm:block" /><span className="text-xs text-neutral-300">{to}</span><span className="text-[10px] font-mono text-[#D4AF37]">via {key}</span></div>)}</div></div>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-[#2DD4BF]/5 p-6 sm:p-8 lg:col-span-5"><Database className="mb-5 h-7 w-7 text-[#D4AF37]" /><h3 className="text-2xl font-bold text-white">Nexus OS database law</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">Every user, property, lead, deal, payment, verification, and AI conversation must remain traceable through audit logs.</p><div className="mt-6 space-y-2.5 text-xs font-mono text-neutral-300">{['Identity and role access', 'Immutable action history', 'AI escalation records', 'Human approval trail'].map((item) => <div key={item} className="flex items-center gap-2"><Activity className="h-3.5 w-3.5 text-[#2DD4BF]" />{item}</div>)}</div></div>
        </div>

        <div className="rounded-3xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 p-6 text-center sm:p-8"><FileText className="mx-auto mb-4 h-7 w-7 text-[#D4AF37]" /><h3 className="text-2xl font-bold text-white">Admin-only governance tables</h3><p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-neutral-300">AI Admin and Super Admin access is reserved for reviews, fraud cases, audit logs, verification queues, system health, AI performance, and security alerts.</p><div className="mt-5 flex flex-wrap justify-center gap-2 text-[10px] font-mono text-[#2DD4BF]">{['ai_admin_reviews', 'fraud_cases', 'audit_logs', 'verification_queue', 'system_health', 'ai_performance', 'security_alerts'].map((item) => <span key={item} className="rounded-lg border border-[#2DD4BF]/30 bg-black/30 px-2.5 py-1.5">{item}</span>)}</div></div>
      </div>
    </section>
  );
};
