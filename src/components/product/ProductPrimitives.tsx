import React from 'react';
import { AppLink } from '../../routing/AppLink';
import { APP_PATHS } from '../../routing/appRoutes';

export type Provenance =
  | 'VERIFIED'
  | 'USER SUBMITTED'
  | 'SYSTEM DERIVED'
  | 'AI SUGGESTION'
  | 'DEMO'
  | 'SAMPLE'
  | 'PENDING'
  | 'DRAFT'
  | 'NOT DEPLOYED'
  | 'NOT CONNECTED'
  | 'DOCUMENTED POLICY'
  | 'INFORMATION NOT AVAILABLE';

const provenanceStyles: Record<Provenance, string> = {
  VERIFIED: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  'USER SUBMITTED': 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  'SYSTEM DERIVED': 'border-violet-400/30 bg-violet-400/10 text-violet-300',
  'AI SUGGESTION': 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300',
  DEMO: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  SAMPLE: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  PENDING: 'border-orange-400/30 bg-orange-400/10 text-orange-300',
  DRAFT: 'border-neutral-400/30 bg-neutral-400/10 text-neutral-300',
  'NOT DEPLOYED': 'border-neutral-500/30 bg-neutral-500/10 text-neutral-300',
  'NOT CONNECTED': 'border-neutral-500/30 bg-neutral-500/10 text-neutral-300',
  'DOCUMENTED POLICY': 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  'INFORMATION NOT AVAILABLE': 'border-neutral-500/30 bg-neutral-500/10 text-neutral-300',
};

export const NexusProvenanceBadge: React.FC<{ value: Provenance }> = ({ value }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide ${provenanceStyles[value]}`}>
    {value}
  </span>
);

export const NexusStatusBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-neutral-300">
    {children}
  </span>
);

export const NexusPageShell: React.FC<{
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ eyebrow, title, description, children }) => (
  <main className="min-h-screen bg-[#06080D] px-4 pb-10 pt-28 text-white sm:px-8 sm:pb-14">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 max-w-4xl">
        <p className="mb-3 text-[10px] font-mono tracking-[0.25em] text-[#D4AF37]">{eyebrow}</p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-neutral-300 sm:text-base">{description}</p>
      </div>
      {children}
      <nav aria-label="Continue exploring NEXUS" className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
        <AppLink to={APP_PATHS.marketplace} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300 hover:border-[#D4AF37]/50 hover:text-white">Marketplace</AppLink>
        <AppLink to={APP_PATHS.agents} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300 hover:border-[#D4AF37]/50 hover:text-white">Find an agent</AppLink>
        <AppLink to={APP_PATHS.pricing} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300 hover:border-[#D4AF37]/50 hover:text-white">Pricing</AppLink>
        <AppLink to={APP_PATHS.home} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300 hover:border-[#D4AF37]/50 hover:text-white">Return home</AppLink>
      </nav>
    </div>
  </main>
);

export const NexusStatePanel: React.FC<{
  title: string;
  detail: string;
  state?: Provenance;
}> = ({ title, detail, state = 'NOT CONNECTED' }) => (
  <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7" aria-live="polite">
    <div className="mb-4"><NexusProvenanceBadge value={state} /></div>
    <h2 className="text-lg font-bold text-white">{title}</h2>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400">{detail}</p>
  </section>
);
