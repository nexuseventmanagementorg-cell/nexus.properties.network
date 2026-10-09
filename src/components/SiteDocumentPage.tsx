import React from 'react';
import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import transparentLogo from '../assets/transparentlogo.png';
import { APP_PATHS, navigateApp } from '../routing/appRoutes';

const documents = {
  '/privacy': {
    label: 'PRIVACY PROTOCOL',
    title: 'Privacy by design.',
    body: 'Nexus does not sell personal user data. Identity, property, lead, document, and payment records are accessed only through role-based permissions and governed workflows.',
  },
  '/terms': {
    label: 'TERMS OF OPERATION',
    title: 'Governed platform use.',
    body: 'Nexus workflows are subject to verification, auditability, role permissions, and human review. Platform information is not a substitute for qualified legal, tax, or financial advice.',
  },
  '/api-docs': {
    label: 'API DOCUMENTATION',
    title: 'Connect the operating layer.',
    body: 'The API blueprint covers authentication, role-aware dashboards, properties, leads, deals, AI routing, payments, administration, and audit events. Production endpoints require backend deployment and authorization.',
  },
} as const;

type DocumentPath = keyof typeof documents;

export const SiteDocumentPage: React.FC<{ path: DocumentPath }> = ({ path }) => {
  const document = documents[path];
  const goHome = () => {
    navigateApp(APP_PATHS.home);
  };

  return (
    <main className="min-h-screen bg-[#06080D] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center">
        <div className="w-full rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl sm:p-10">
          <img src={transparentLogo} alt="Nexus Property Network" className="mb-12 w-[180px]" />
          <div className="mb-4 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#D4AF37]"><FileText className="h-4 w-4" />{document.label}</div>
          <h1 className="text-4xl font-extrabold tracking-tight">{document.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-neutral-300">{document.body}</p>
          <div className="mt-8 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-200"><ShieldCheck className="h-4 w-4" />Governed documentation surface</div>
          <button onClick={goHome} className="mt-8 flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-xs font-bold uppercase tracking-wider text-black"><ArrowRight className="h-4 w-4 rotate-180" />Back to Nexus Network</button>
        </div>
      </div>
    </main>
  );
};
