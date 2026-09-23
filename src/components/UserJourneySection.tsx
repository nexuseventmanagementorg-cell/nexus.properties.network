import React, { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  DollarSign,
  Factory,
  Fingerprint,
  Globe2,
  Landmark,
  Lock,
  Network,
  ShieldCheck,
  User,
  Users,
  Wallet,
} from 'lucide-react';
import { soundEngine } from '../utils/sound';

type Journey = {
  role: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  access: string;
  dashboard: string[];
  aiTeam: string[];
  stages: string[];
  permissions: string[];
};

const journeys: Journey[] = [
  {
    role: 'Buyer', title: 'Buyer Journey', icon: User, access: 'Public registration with identity verification',
    dashboard: ['Recommended properties', 'Saved properties', 'Favorite areas', 'Recent searches', 'Trust score', 'AI assistant', 'Lead requests'],
    aiTeam: ['Buyer AI', 'Property Matching AI', 'Area Intelligence AI'],
    stages: ['Registration', 'Profile completion', 'AI assignment', 'Property search', 'Buyer intent lead', 'Lead routing', 'Lead Lock', 'Deal start', 'Transaction completion'],
    permissions: ['Search verified inventory', 'Save and compare properties', 'Create buyer intent leads', 'Request protected agent contact'],
  },
  {
    role: 'Seller', title: 'Seller Journey', icon: Wallet, access: 'Public registration with ownership verification',
    dashboard: ['My properties', 'Verification status', 'Listing performance', 'Lead activity', 'Property analytics', 'Seller AI'],
    aiTeam: ['Seller AI', 'Property AI', 'Verification AI'],
    stages: ['Registration', 'Property details', 'Image and document upload', 'Verification queue', 'Human review if needed', 'Listing approval', 'Live listing'],
    permissions: ['Create a listing draft', 'Upload ownership records', 'Review verification requests', 'Publish only after approval'],
  },
  {
    role: 'Agent', title: 'Agent Journey', icon: User, access: 'CNIC, phone, email, office, and operating-area verification',
    dashboard: ['Available leads', 'Locked leads', 'Active deals', 'Commission tracker', 'Trust score', 'Agent AI'],
    aiTeam: ['Agent AI', 'Lead Qualification AI', 'Lead Routing AI', 'Deal AI'],
    stages: ['Registration', 'Identity verification', 'Agent review', 'Lead access', 'Lead Lock', 'Agent contact', 'Deal workflow'],
    permissions: ['View qualified leads', 'Lock eligible leads', 'Manage assigned deals', 'Record compliant activity'],
  },
  {
    role: 'Agency', title: 'Agency Journey', icon: Building2, access: 'Verified organization with controlled team access',
    dashboard: ['Agency overview', 'Agents', 'Performance', 'Leads', 'Deals', 'Revenue', 'Trust score'],
    aiTeam: ['Agency Management AI', 'Team Performance AI', 'CRM AI'],
    stages: ['Organization registration', 'Agency verification', 'Create agents', 'Lead allocation', 'Performance review', 'Deal oversight'],
    permissions: ['Create and manage agents', 'Allocate leads', 'Review team performance', 'Access agency reports'],
  },
  {
    role: 'Developer', title: 'Developer Journey', icon: Building2, access: 'Business and project verification',
    dashboard: ['Projects', 'Inventory', 'Units', 'Sales', 'Construction updates'],
    aiTeam: ['Developer AI', 'Project Intelligence AI', 'Inventory AI', 'Escrow Compliance AI'],
    stages: ['Developer registration', 'Project verification', 'Project page', 'Inventory management', 'Sales tracking', 'Escrow monitoring'],
    permissions: ['Create project pages', 'Publish approved units', 'Upload progress updates', 'Manage media galleries'],
  },
  {
    role: 'Investor', title: 'Investor Journey', icon: DollarSign, access: 'Investor profile with preference and identity verification',
    dashboard: ['Portfolio', 'ROI reports', 'Rental reports', 'Market reports', 'Investment opportunities'],
    aiTeam: ['Investment AI', 'ROI Intelligence AI', 'Capital Advisory AI', 'Portfolio Intelligence AI'],
    stages: ['Registration', 'Investment profile', 'AI assignment', 'Opportunity discovery', 'Due diligence', 'Portfolio update'],
    permissions: ['Set investment preferences', 'Review verified opportunities', 'Request analysis', 'Track portfolio records'],
  },
  {
    role: 'Industrial', title: 'Industrial User Journey', icon: Factory, access: 'Business profile and industrial-use verification',
    dashboard: ['Warehouses', 'Factories', 'Industrial land', 'Logistics assets', 'Industrial reports'],
    aiTeam: ['Industrial Property AI', 'Land Intelligence AI', 'Industrial Corridor AI'],
    stages: ['Business registration', 'Asset requirements', 'Industrial search', 'Site intelligence', 'Due diligence', 'Deal workflow'],
    permissions: ['Search industrial assets', 'Compare logistics locations', 'Request industrial reports', 'Invite authorized teams'],
  },
  {
    role: 'Corporate', title: 'Corporate Journey', icon: Landmark, access: 'Organization verification with team permissions',
    dashboard: ['Corporate assets', 'Branches', 'Leases', 'Property portfolio', 'Reports'],
    aiTeam: ['Corporate Advisory AI', 'Portfolio AI', 'Enterprise AI'],
    stages: ['Corporate registration', 'Team setup', 'Asset mapping', 'Lease management', 'Portfolio review', 'Reporting'],
    permissions: ['Manage corporate assets', 'Assign team access', 'Review lease records', 'Generate portfolio reports'],
  },
  {
    role: 'Government', title: 'Government Journey', icon: Landmark, access: 'Authorized government accounts only',
    dashboard: ['Urban intelligence', 'Development analytics', 'Property analytics', 'Growth analytics', 'Housing intelligence'],
    aiTeam: ['Urban Intelligence AI', 'Development Analytics AI', 'Housing Intelligence AI'],
    stages: ['Official request', 'Authority verification', 'Scoped access', 'Analytics workspace', 'Human governance review'],
    permissions: ['Access approved intelligence', 'Review development records', 'Request official reports', 'No public self-registration'],
  },
];

const universalFlow = ['User arrives', 'Authentication', 'Role selection', 'Profile completion', 'Verification', 'AI assignment', 'Dashboard creation', 'Platform access'];
const operatingLoop = ['User', 'AI Assistant', 'Verification Layer', 'Lead Layer', 'Deal Layer', 'Trust Layer', 'AI Admin', 'Growth Layer'];

export const UserJourneySection: React.FC = () => {
  const [activeJourney, setActiveJourney] = useState(0);
  const [showFlow, setShowFlow] = useState<'journey' | 'signup' | 'payments'>('journey');
  const journey = journeys[activeJourney];
  const JourneyIcon = journey.icon;

  return (
    <section id="user-journey" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-28">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[620px] w-[620px] rounded-full bg-[#2DD4BF]/5 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[460px] w-[460px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel">
            <Users className="h-3.5 w-3.5" />
            <span>SECTION 13 // COMPLETE USER JOURNEY ARCHITECTURE</span>
          </div>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">The right journey for every role.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">
            Role-aware onboarding, permissions, AI assignment, dashboards, verification, payments, leads, and deals form the product workflow blueprint. This is an architecture plan, not a claim that every backend workflow is live today.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 rounded-2xl border border-white/10 p-2 glass-panel">
          {[
            ['journey', 'Role Journeys', Users],
            ['signup', 'Universal Signup', Fingerprint],
            ['payments', 'Platform Flows', Lock],
          ].map(([value, label, Icon]) => (
            <button key={value as string} onClick={() => { soundEngine.playClick(); setShowFlow(value as typeof showFlow); }} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${showFlow === value ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}>
              <Icon className="h-3.5 w-3.5" />{label as string}
            </button>
          ))}
        </div>

        {showFlow === 'journey' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-2.5 lg:col-span-5">
              {journeys.map((item, index) => {
                const Icon = item.icon;
                return <button key={item.role} onClick={() => { soundEngine.playClick(); setActiveJourney(index); }} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${activeJourney === index ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/5 bg-black/50 hover:border-white/20'}`}><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${activeJourney === index ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-neutral-400'}`}><Icon className="h-4 w-4" /></div><div className="min-w-0 flex-1"><span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">ROLE {String(index + 1).padStart(2, '0')}</span><span className="block text-sm font-bold text-white">{item.title}</span></div><ArrowRight className="h-4 w-4 text-neutral-600" /></button>;
              })}
            </div>

            <div className="glass-card-luxury rounded-3xl border-white/10 p-6 sm:p-8 lg:col-span-7">
              <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-5"><div><span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">ROLE {String(activeJourney + 1).padStart(2, '0')} // {journey.access.toUpperCase()}</span><h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{journey.title}</h3></div><JourneyIcon className="h-7 w-7 text-[#2DD4BF]" /></div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/45 p-4"><div className="mb-3 text-[10px] font-mono uppercase text-neutral-500">Dashboard scope</div><div className="space-y-2">{journey.dashboard.map((item) => <div key={item} className="flex items-center gap-2 text-xs text-neutral-200"><CheckCircle2 className="h-3.5 w-3.5 text-[#2DD4BF]" />{item}</div>)}</div></div>
                <div className="rounded-2xl border border-white/10 bg-black/45 p-4"><div className="mb-3 text-[10px] font-mono uppercase text-neutral-500">Assigned AI team</div><div className="space-y-2">{journey.aiTeam.map((item) => <div key={item} className="flex items-center gap-2 text-xs text-neutral-200"><Bot className="h-3.5 w-3.5 text-[#D4AF37]" />{item}</div>)}</div></div>
              </div>
              <div className="mt-5 rounded-2xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 p-4"><div className="mb-3 text-[10px] font-mono uppercase tracking-wider text-[#2DD4BF]">Journey stages</div><div className="flex flex-wrap gap-2">{journey.stages.map((stage, index) => <React.Fragment key={stage}><span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 text-[10px] font-mono text-white">{stage}</span>{index < journey.stages.length - 1 && <ArrowRight className="mt-1.5 h-3 w-3 text-neutral-600" />}</React.Fragment>)}</div></div>
              <div className="mt-5 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-4"><div className="mb-3 text-[10px] font-mono uppercase tracking-wider text-[#D4AF37]">Permissions</div><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{journey.permissions.map((permission) => <div key={permission} className="text-xs text-neutral-200"><CheckCircle2 className="mr-2 inline h-3.5 w-3.5 text-emerald-300" />{permission}</div>)}</div></div>
            </div>
          </div>
        )}

        {showFlow === 'signup' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="glass-card-luxury rounded-3xl border-white/10 p-6 sm:p-8 lg:col-span-7"><div className="mb-6 flex items-center gap-3"><Fingerprint className="h-6 w-6 text-[#D4AF37]" /><div><span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">UNIVERSAL SIGNUP FLOW</span><h3 className="mt-1 text-2xl font-bold text-white">One controlled entry point</h3></div></div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{universalFlow.map((stage, index) => <div key={stage} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/45 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-xs font-mono text-[#D4AF37]">{index + 1}</span><span className="text-sm font-semibold text-white">{stage}</span></div>)}</div></div><div className="rounded-3xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 p-6 sm:p-8 lg:col-span-5"><ShieldCheck className="mb-5 h-7 w-7 text-[#2DD4BF]" /><h3 className="text-2xl font-bold text-white">Access follows verification</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">Role detection and verification determine which dashboard, AI team, records, and permissions a user can access.</p><div className="mt-6 space-y-3 text-xs font-mono text-neutral-300">{['Authentication required', 'Role permissions loaded', 'AI team assigned', 'User memory initialized'].map((item) => <div key={item} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />{item}</div>)}</div></div></div>
        )}

        {showFlow === 'payments' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12"><div className="glass-card-luxury rounded-3xl border-white/10 p-6 sm:p-8 lg:col-span-7"><div className="mb-6 flex items-center gap-3"><CircleDollarIcon /><div><span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">PAYMENT ENGINE FLOW</span><h3 className="mt-1 text-2xl font-bold text-white">Transparent payment states</h3></div></div><div className="flex flex-wrap items-center gap-2">{['Subscription', 'JazzCash / EasyPaisa / Bank / Card', 'Pending', 'AI Admin Review', 'Approved', 'Activated'].map((stage, index) => <React.Fragment key={stage}><span className="rounded-xl border border-white/10 bg-black/45 px-3 py-2 text-xs font-semibold text-white">{stage}</span>{index < 5 && <ArrowRight className="h-4 w-4 text-neutral-600" />}</React.Fragment>)}</div></div><div className="rounded-3xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-6 sm:p-8 lg:col-span-5"><Lock className="mb-5 h-7 w-7 text-[#D4AF37]" /><h3 className="text-2xl font-bold text-white">Every state is logged</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">Subscriptions, listing fees, Lead Lock, Deal Lock, verification, and enterprise services follow visible, auditable states.</p></div></div>
        )}

        <div className="mt-10 rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8"><div className="mb-5 flex items-center gap-3"><NetworkIcon /><div><span className="text-[10px] font-mono tracking-widest text-[#2DD4BF]">NEXUS OPERATING LOOP</span><h3 className="mt-1 text-2xl font-bold text-white">The governed journey</h3></div></div><div className="flex flex-wrap items-center gap-2">{operatingLoop.map((stage, index) => <React.Fragment key={stage}><span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">{stage}</span>{index < operatingLoop.length - 1 && <ArrowRight className="h-4 w-4 text-neutral-600" />}</React.Fragment>)}</div></div>
      </div>
    </section>
  );
};

function CircleDollarIcon() { return <DollarSign className="h-6 w-6 text-[#D4AF37]" />; }
function NetworkIcon() { return <Network className="h-6 w-6 text-[#2DD4BF]" />; }
