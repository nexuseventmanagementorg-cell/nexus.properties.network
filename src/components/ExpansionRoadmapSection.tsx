import React, { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Landmark,
  Map,
  Network,
  Sparkles,
  Activity,
  Users,
} from 'lucide-react';
import { soundEngine } from '../utils/sound';

type RoadmapYear = {
  year: string;
  title: string;
  focus: string;
  description: string;
  launches: string[];
  audience: string;
  icon: React.ComponentType<{ className?: string }>;
};

const roadmap: RoadmapYear[] = [
  { year: 'YEAR 1', title: 'Lahore Pilot', focus: 'Proof of concept', description: 'Establish a trust-based property ecosystem in Lahore with verified workflows and protected transactions.', launches: ['Lead Lock System', 'Deal Lock System', 'AI Workforce'], audience: 'Lahore market', icon: Map },
  { year: 'YEAR 2', title: 'Major City Expansion', focus: 'Replication', description: 'Extend the operating model to Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, and Peshawar.', launches: ['City operating playbooks', 'Regional partner model', 'Multi-city support'], audience: 'Major Pakistani cities', icon: Building2 },
  { year: 'YEAR 3', title: 'National Network', focus: 'Coverage', description: 'Scale the Property Graph toward national coverage across 130+ cities and connect the verified ecosystem.', launches: ['National Property Graph', 'National verification layer', 'Regional intelligence'], audience: 'Pakistan-wide network', icon: Globe2 },
  { year: 'YEAR 4', title: 'Investment Network', focus: 'Intelligence', description: 'Build investor intelligence, portfolio analysis, ROI workflows, and a dedicated Investment AI Suite.', launches: ['Investor Intelligence Layer', 'ROI Engine', 'Portfolio Dashboard'], audience: 'Pakistani and overseas investors', icon: Activity },
  { year: 'YEAR 5', title: 'Developer Ecosystem', focus: 'Project infrastructure', description: 'Give developers and housing societies tools for project intelligence, inventory, sales, and escrow monitoring.', launches: ['Developer Dashboards', 'Project Intelligence', 'Escrow Monitoring'], audience: 'Developers and builders', icon: Landmark },
  { year: 'YEAR 6', title: 'Corporate and Industrial Network', focus: 'Institutional operations', description: 'Extend property intelligence to warehouses, factories, corporate assets, banks, and logistics groups.', launches: ['Industrial Intelligence', 'Corporate Asset Management', 'Warehouse Network'], audience: 'Corporate and industrial groups', icon: Network },
  { year: 'YEAR 7', title: 'Government Integration', focus: 'Official partnerships', description: 'Explore urban, housing, development, and infrastructure intelligence only through official approvals and partnerships.', launches: ['Urban Intelligence', 'Housing Analytics', 'Infrastructure Mapping'], audience: 'Authorized government partners', icon: Landmark },
  { year: 'YEAR 8', title: 'Nexus Property Passport', focus: 'Property identity', description: 'Give every property a durable identity, ownership timeline, verification timeline, and transaction history.', launches: ['Digital Property Identity', 'Ownership Timeline', 'Transaction Timeline'], audience: 'Every verified property', icon: ShieldCheck },
  { year: 'YEAR 9', title: 'National Command Center', focus: 'Real-time intelligence', description: 'Visualize listings, leads, deals, transactions, cities, and development activity through the Property Graph.', launches: ['Command Center', 'Live intelligence views', 'Development monitoring'], audience: 'Nexus operations and partners', icon: Bot },
  { year: 'YEAR 10', title: 'Nexus OS', focus: 'Operating system vision', description: 'Evolve from property network to property intelligence, verification, lead, deal, and AI workforce infrastructure.', launches: ['Property Operating System', 'National governance layer', 'Human-supervised automation'], audience: 'The national ecosystem', icon: Sparkles },
];

const principles = [
  'Verification Before Visibility',
  'Trust Before Transactions',
  'Protection Before Profit',
  'Data Before Decisions',
  'Accountability Before Scale',
  'Human Oversight Before Automation',
];

export const ExpansionRoadmapSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(0);
  const active = roadmap[selectedYear];

  return (
    <section id="expansion-roadmap" className="relative overflow-hidden border-t border-white/10 bg-[#050505] py-28">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[560px] w-[700px] rounded-full bg-[#2DD4BF]/5 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/5 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel">
            <Globe2 className="h-3.5 w-3.5" />
            <span>SECTION 12 // NATIONAL EXPANSION ROADMAP</span>
          </div>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            From Lahore pilot to national infrastructure.
          </h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">
            Nexus is designed to organize Pakistan&apos;s real estate ecosystem through trust, verification, intelligence, and human-supervised growth. The timeline below is a strategic vision, not a claim about current operating scale.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-2.5 lg:col-span-5">
            {roadmap.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.year}
                  onClick={() => { soundEngine.playClick(); setSelectedYear(index); }}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${selectedYear === index ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/10' : 'border-white/5 bg-black/50 hover:border-white/20'}`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${selectedYear === index ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-neutral-400'}`}><Icon className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1"><span className="block text-[10px] font-mono tracking-widest text-[#D4AF37]">{item.year}</span><span className="block truncate text-sm font-bold text-white">{item.title}</span></div>
                  <ArrowRight className={`h-4 w-4 shrink-0 ${selectedYear === index ? 'text-[#2DD4BF]' : 'text-neutral-600'}`} />
                </button>
              );
            })}
          </div>

          <div className="glass-card-luxury rounded-3xl border-white/10 p-6 sm:p-8 lg:col-span-7">
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div><span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">{active.year} // {active.focus.toUpperCase()}</span><h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{active.title}</h3></div>
              <div className="rounded-xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 p-2.5"><CheckCircle2 className="h-5 w-5 text-[#2DD4BF]" /></div>
            </div>
            <p className="text-base leading-relaxed text-neutral-300">{active.description}</p>
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/45 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">Launch scope</div><div className="mt-3 space-y-2">{active.launches.map((item) => <div key={item} className="flex items-center gap-2 text-xs font-semibold text-white"><CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37]" />{item}</div>)}</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/45 p-4"><div className="text-[10px] font-mono uppercase text-neutral-500">Primary audience</div><div className="mt-3 text-sm font-bold text-[#2DD4BF]">{active.audience}</div><div className="mt-5 text-[10px] font-mono text-neutral-500">Vision checkpoint</div><div className="mt-1 text-xs text-neutral-300">Measured by trust, verification, and user value.</div></div>
            </div>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8 lg:col-span-7">
            <div className="mb-6 flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-[#D4AF37]" /><div><span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">COMPETITIVE ADVANTAGE</span><h3 className="mt-1 text-2xl font-bold text-white">Trust first, not listings first</h3></div></div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[['Traditional portals', 'Listings First'], ['Nexus', 'Trust First'], ['Traditional portals', 'Advertising Revenue'], ['Nexus', 'Protected Transactions'], ['Traditional portals', 'Lead Distribution'], ['Nexus', 'Lead Protection'], ['Traditional portals', 'Listing Platform'], ['Nexus', 'Operating System']].map(([label, value], index) => <div key={`${label}-${value}`} className={`rounded-xl border p-4 ${index % 2 ? 'border-[#2DD4BF]/30 bg-[#2DD4BF]/5' : 'border-white/5 bg-white/5'}`}><div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div><div className="mt-1 text-sm font-bold text-white">{value}</div></div>)}
            </div>
          </div>
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/12 to-[#2DD4BF]/5 p-6 sm:p-8 lg:col-span-5"><Users className="mb-5 h-7 w-7 text-[#D4AF37]" /><h3 className="text-2xl font-bold text-white">Founding principles</h3><div className="mt-5 space-y-3">{principles.map((principle) => <div key={principle} className="flex items-center gap-3 text-sm text-neutral-200"><ShieldCheck className="h-4 w-4 shrink-0 text-[#2DD4BF]" />{principle}</div>)}</div></div>
        </div>

        <div className="rounded-3xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 p-6 text-center sm:p-10">
          <Sparkles className="mx-auto mb-4 h-7 w-7 text-[#D4AF37]" />
          <h3 className="text-2xl font-bold text-white sm:text-3xl">Nexus mission</h3>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-neutral-300">Nexus Property Network ka maqsad Pakistan ki real estate industry ko transparent, accountable aur organized banana hai. Har expansion ka focus trust, verification aur user value par hoga.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-2 text-[10px] font-mono tracking-widest text-[#D4AF37]"><span>TRUST</span><span>//</span><span>VERIFICATION</span><span>//</span><span>PROTECTION</span><span>//</span><span>ACCOUNTABILITY</span></div>
        </div>
      </div>
    </section>
  );
};
