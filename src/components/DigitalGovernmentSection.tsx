import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  Building2,
  ChevronRight,
  FileCheck2,
  FileKey,
  Fingerprint,
  Globe2,
  Landmark,
  Lock,
  Map,
  Network,
  Search,
  Shield,
  User,
  Users,
  Wallet,
} from 'lucide-react';
import { soundEngine } from '../utils/sound';

const lifecycle = [
  'Property Created',
  'Verified',
  'Listed',
  'Lead Generated',
  'Lead Locked',
  'Deal Started',
  'Deal Locked',
  'Transfer Complete',
  'Archived Forever',
];

const passports = [
  { label: 'Property Passport', icon: Building2, fields: 'Ownership, coordinates, documents, images, inspections' },
  { label: 'Agent Passport', icon: User, fields: 'Identity, license, agency, areas, reviews' },
  { label: 'Investor Passport', icon: Wallet, fields: 'Portfolio, preferences, income, transaction history' },
  { label: 'Developer Passport', icon: Landmark, fields: 'Projects, inventory, NOC, development status' },
  { label: 'Corporate Passport', icon: BriefcaseIcon, fields: 'Branches, assets, leases, portfolio access' },
  { label: 'Government Passport', icon: Globe2, fields: 'Projects, land records, schemes, infrastructure' },
];

const auditRows = [
  ['Current session', 'Identity request', 'AI Admin review', 'Human approval pending'],
  ['Property record', 'Verification workflow', 'Evidence required', 'Audit trail retained'],
  ['Lead record', 'Lead Lock activity', 'Policy checked', 'Action logged'],
];

const rules = [
  'No fake listings, agents, documents, deals, or statistics',
  'No hidden commissions or hidden ownership changes',
  'Every action leaves an auditable record',
  'AI cannot override human governance',
];

function BriefcaseIcon({ className }: { className?: string }) {
  return <Wallet className={className} />;
}

export const DigitalGovernmentSection: React.FC = () => {
  const [activeView, setActiveView] = useState<'identity' | 'ledger' | 'war-room'>('identity');
  const [selectedPassport, setSelectedPassport] = useState(0);

  return (
    <section id="digital-government" className="relative overflow-hidden border-t border-white/10 bg-[#050505] py-28">
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[620px] w-[620px] rounded-full bg-[#2DD4BF]/5 blur-[180px]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel">
            <Landmark className="h-3.5 w-3.5" />
            <span>SECTION 10 // NEXUS DIGITAL GOVERNMENT</span>
          </div>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Pakistan&apos;s Property Network of Trust.
          </h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">
            A governed operating layer for identity, verification, ownership history, property lifecycle, and accountable human review across 130+ cities and 5,000+ areas.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 rounded-2xl border border-white/10 p-2 glass-panel">
          {[
            ['identity', 'Identity & Passports', Fingerprint],
            ['ledger', 'National Property Ledger', Network],
            ['war-room', 'AI Admin War Room', Shield],
          ].map(([value, label, Icon]) => (
            <button
              key={value as string}
              onClick={() => { soundEngine.playClick(); setActiveView(value as typeof activeView); }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold tracking-wide transition-all ${activeView === value ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label as string}
            </button>
          ))}
        </div>

        {activeView === 'identity' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="glass-card-luxury rounded-3xl border-white/10 p-6 sm:p-8 lg:col-span-5">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">NEXUS UNIVERSAL ID</span>
                  <h3 className="mt-1 text-2xl font-bold text-white">Identity control layer</h3>
                </div>
                <Fingerprint className="h-7 w-7 text-[#2DD4BF]" />
              </div>
              <div className="mb-5 rounded-2xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 p-4">
                <div className="text-[10px] font-mono text-neutral-400">REGISTRATION STATUS</div>
                <div className="mt-1 text-sm font-bold text-emerald-300">Verified identity workflow available</div>
              </div>
              <div className="space-y-2.5 text-xs font-mono">
                {['Unique identity', 'Role and permissions', 'Verification status', 'History and activity records', 'Trust score factors'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/50 p-3">
                    <span className="text-neutral-300">{item}</span>
                    <CheckCircle2 className="h-4 w-4 text-[#2DD4BF]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {['Buyer identity', 'Agent identity', 'Government identity'].map((label) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/50 p-4">
                    <div className="text-[10px] font-mono uppercase text-neutral-500">Nexus Universal ID</div>
                    <div className="mt-2 text-sm font-bold text-white">{label}</div>
                    <div className="mt-1 text-[10px] font-mono text-[#D4AF37]">Format assigned after registration</div>
                  </div>
                ))}
              </div>
              <div className="glass-card-luxury rounded-3xl border-white/10 p-6 sm:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#2DD4BF]">DIGITAL PASSPORTS</span>
                    <h3 className="mt-1 text-2xl font-bold text-white">One identity layer, many roles</h3>
                  </div>
                  <Lock className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {passports.map((passport, index) => {
                    const Icon = passport.icon;
                    return (
                      <button
                        key={passport.label}
                        onClick={() => { soundEngine.playClick(); setSelectedPassport(index); }}
                        className={`rounded-xl border p-3 text-left transition-all ${selectedPassport === index ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/5 bg-black/50 hover:border-white/20'}`}
                      >
                        <Icon className={`mb-2 h-4 w-4 ${selectedPassport === index ? 'text-[#D4AF37]' : 'text-[#2DD4BF]'}`} />
                        <div className="text-xs font-bold text-white">{passport.label}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[10px] font-mono uppercase text-neutral-500">PASSPORT SCOPE</div>
                  <div className="mt-1 text-sm font-semibold text-white">{passports[selectedPassport].fields}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'ledger' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="glass-card-luxury rounded-3xl border-white/10 p-6 sm:p-8 lg:col-span-7">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">NATIONAL PROPERTY LEDGER</span>
                  <h3 className="mt-1 text-2xl font-bold text-white">A permanent record of change</h3>
                </div>
                <FileCheck2 className="h-6 w-6 text-[#2DD4BF]" />
              </div>
              <div className="space-y-2.5">
                {auditRows.map(([subject, action, ai, human]) => (
                  <div key={subject} className="grid grid-cols-1 gap-2 rounded-xl border border-white/5 bg-black/50 p-4 sm:grid-cols-4 sm:items-center">
                    <span className="text-xs font-bold text-white">{subject}</span>
                    <span className="text-[10px] font-mono text-neutral-400">{action}</span>
                    <span className="text-[10px] font-mono text-[#2DD4BF]">{ai}</span>
                    <span className="text-[10px] font-mono text-[#D4AF37]">{human}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-mono text-neutral-400">
                {['Property', 'Deal', 'Lead', 'Verification', 'Ownership change'].map((item) => <span key={item} className="rounded-lg border border-white/10 px-2.5 py-1.5">{item} record</span>)}
              </div>
            </div>
            <div className="rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/15 to-[#2DD4BF]/10 p-6 sm:p-8 lg:col-span-5">
              <Map className="mb-5 h-7 w-7 text-[#D4AF37]" />
              <h3 className="text-2xl font-bold text-white">Property lifecycle engine</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">Every state change is governed, reviewable, and preserved as part of the property record.</p>
              <div className="mt-6 space-y-2">
                {lifecycle.map((stage, index) => (
                  <div key={stage} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#2DD4BF]/40 text-[10px] font-mono text-[#2DD4BF]">{index + 1}</span>
                    <span className="text-xs font-semibold text-white">{stage}</span>
                    {index < lifecycle.length - 1 && <ChevronRight className="ml-auto h-3.5 w-3.5 text-neutral-600" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'war-room' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="glass-card-luxury rounded-3xl border-white/10 p-6 sm:p-8 lg:col-span-7">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-red-300">RESTRICTED OPERATIONS VIEW</span>
                  <h3 className="mt-1 text-2xl font-bold text-white">AI Admin War Room</h3>
                </div>
                <Activity className="h-6 w-6 text-red-300" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {['Users', 'Leads', 'Deals', 'Payments', 'Fraud alerts', 'Verification queue', 'Dispute queue', 'AI health'].map((item) => (
                  <div key={item} className="rounded-xl border border-white/5 bg-black/50 p-3">
                    <div className="text-[10px] font-mono uppercase text-neutral-500">{item}</div>
                    <div className="mt-2 text-xs font-bold text-emerald-300">Monitoring active</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 p-6 sm:p-8 lg:col-span-5">
              <Search className="mb-5 h-7 w-7 text-[#2DD4BF]" />
              <h3 className="text-2xl font-bold text-white">Golden rules of Nexus</h3>
              <div className="mt-5 space-y-3">
                {rules.map((rule) => (
                  <div key={rule} className="flex items-start gap-3 text-sm text-neutral-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2DD4BF]" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 border-t border-white/10 pt-5 text-xs font-mono tracking-widest text-[#D4AF37]">TRUST BEFORE TRANSACTIONS</div>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6 text-xs font-mono text-neutral-400">
          <span className="text-[#D4AF37]">ONE NETWORK</span>
          <span>//</span>
          <span>ONE IDENTITY</span>
          <span>//</span>
          <span>ONE VERIFICATION LAYER</span>
          <span>//</span>
          <span>POWERED BY NEXUS OS</span>
        </div>
      </div>
    </section>
  );
};
