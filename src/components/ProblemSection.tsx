// src/components/ProblemSection.tsx
import React, { useState } from 'react';
import { AlertOctagon, FileWarning, Users, DollarSign, Database, ShieldAlert, ArrowDown } from 'lucide-react';
import { soundEngine } from '../utils/sound';

export const ProblemSection: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<number>(0);

  const issues = [
    {
      id: 0,
      title: 'Fake & Ghost Listings',
      icon: FileWarning,
      tag: 'INVENTORY INTEGRITY CRISIS',
      metric: 'Online listings can be phantoms or outdated',
      lossEstimate: 'Est. PKR 42 Billion Lost in Delayed Capital Velocity',
      description: 'The same plot or home is listed simultaneously by a dozen unregistered brokers with conflicting prices and misleading pictures. When buyers call, they are told "that one is sold, but let me show you another." Buyers waste months chasing non-existent inventory.',
      symptoms: [
        'Ghost listings created exclusively to harvest buyer phone numbers',
        'Sold properties remain active for over 180 days to falsify platform volume',
        'Duplicate postings with inconsistent pricing',
        'Zero physical on-ground or legal title validation prior to publishing'
      ]
    },
    {
      id: 1,
      title: 'Lead Theft & Poaching',
      icon: Users,
      tag: 'CLIENT EXCLUSIVITY THEFT',
      metric: 'High-net-worth buyers can be harassed by multiple brokers',
      lossEstimate: 'Severe Loss of Client Trust & Confidentiality',
      description: 'Unscrupulous brokers intercept incoming buyer inquiries through insider leaks or shared WhatsApp groups. A client who trusted one broker suddenly receives calls from 10 strangers, destroying confidentiality and poisoning buyer confidence.',
      symptoms: [
        'Zero cryptographic protection for buyer/seller contact data',
        'Aggressive poaching of ongoing buyer negotiations by rogue intermediaries',
        'Sellers harassed with unauthorized listing broadcasts',
        'Inability of dedicated professional agents to protect their hard-earned clients'
      ]
    },
    {
      id: 2,
      title: 'Commission Disputes & Non-Payment',
      icon: DollarSign,
      tag: 'REVENUE ARBITRATION BREAKDOWN',
      metric: 'Collaborative deals can suffer commission conflicts',
      lossEstimate: 'PKR 18 Billion in Unpaid or Disputed Broker Earnings Annually',
      description: 'Without an immutable ledger of client introduction and negotiation history, multiple brokers claim the same commission. Sellers often bypass the introducing agent, and co-brokerage splits dissolve into bitter disputes on the day of society transfer.',
      symptoms: [
        'Zero legal audit trails proving who introduced the buyer',
        'Informal verbal promises dishonored upon token or final transfer',
        'Prolonged civil litigation that freezes deal completion',
        'Disproportionate suffering of honest, hard-working field agents'
      ]
    },
    {
      id: 3,
      title: 'Scattered, Unverified Data',
      icon: Database,
      tag: 'NATIONAL INFORMATION SILOS',
      metric: 'Cities Operating Without Standardized Parcel Identifiers',
      lossEstimate: 'Complete Inability to Deploy Scaled Institutional Capital',
      description: 'Property records in Pakistan remain trapped in offline patwari ledgers, fragmented municipal files, and disparate housing society registers. Investors have no transparent way to benchmark true historical prices, development timelines, or rental yields.',
      symptoms: [
        'No unified national cadastral registry connecting provinces',
        'Speculative pricing driven by manipulative WhatsApp hype groups',
        'Severe lack of verified historical transaction benchmarks',
        'Extreme barrier of entry for overseas diaspora and institutional funds'
      ]
    },
    {
      id: 4,
      title: 'Unverified Rogue Intermediaries',
      icon: ShieldAlert,
      tag: 'COUNTERPARTY RISK FAILURE',
      metric: 'Many market actors lack background or identity checks',
      lossEstimate: 'Critical Fraud Exposure on Token & Bayana Payments',
      description: 'Anyone with a mobile phone can label themselves a real estate agent. Without mandatory biometric verification, licensing records, or accountability, fraudulent transactions, forged allotment letters, and fake bank receipts continue unchecked.',
      symptoms: [
        'Zero verifiable background, transaction, or disciplinary records',
        'Impersonation of genuine property owners to pocket token money',
        'Absence of a national code of conduct or legal escrow requirements',
        'Erosion of the entire real estate industry’s sovereign reputation'
      ]
    }
  ];

  return (
    <section id="problems" className="relative py-28 bg-[#070707] border-t border-red-500/10 overflow-hidden">
      {/* Dark Chaotic Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-mono tracking-widest text-red-400 mb-4">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>SECTION 01 // THE BROKEN ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Pakistan’s Real Estate Market is Broken by Design.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light">
            Behind the shiny billboards and speculative hype lies a chaotic, unverified environment 
            crippled by ghost listings, lead theft, commission wars, and zero transaction accountability. 
            This is what every buyer, seller, and honest agent faces today.
          </p>
        </div>

        {/* Interactive Crisis Scanner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Issue Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {issues.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIssue === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedIssue(idx);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-red-950/20 border-red-500/60 shadow-lg shadow-red-500/10 scale-[1.01]'
                      : 'bg-[#0B0B0B]/80 border-white/5 hover:border-white/20 hover:bg-[#111111]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono tracking-wider text-red-400 font-semibold">
                      {item.tag}
                    </span>
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-red-400' : 'text-neutral-500'}`} />
                  </div>
                  <h3 className={`text-base font-bold tracking-tight ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                    {item.title}
                  </h3>
                  <div className="text-xs text-neutral-500 mt-1 line-clamp-1">
                    {item.metric}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep-Dive Diagnostics Console */}
          <div className="lg:col-span-7 glass-card-luxury p-6 sm:p-8 rounded-2xl border-red-500/20 relative overflow-hidden">
            {/* Holographic Diagnostic Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-neutral-400 block mb-1">
                  DIAGNOSTIC VECTOR: 0{selectedIssue + 1} // CRITICAL
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {issues[selectedIssue].title}
                </h3>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-semibold">
                SYSTEM HAZARD
              </div>
            </div>

            {/* Impact Metrics Banner */}
            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/60 border border-red-500/20">
                <div className="text-[11px] font-mono text-neutral-400 mb-1">MARKET IMPACT INDEX</div>
                <div className="text-lg font-bold text-red-400">{issues[selectedIssue].metric}</div>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-amber-500/20">
                <div className="text-[11px] font-mono text-neutral-400 mb-1">CAPITAL EROSION</div>
                <div className="text-sm font-bold text-amber-300">{issues[selectedIssue].lossEstimate}</div>
              </div>
            </div>

            {/* In-depth Narrative */}
            <p className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-6 font-light">
              {issues[selectedIssue].description}
            </p>

            {/* Micro Symptoms Checklist */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <div className="text-xs font-mono text-neutral-400 tracking-wider uppercase mb-2">
                Structural Failure Points:
              </div>
              {issues[selectedIssue].symptoms.map((symptom, sIdx) => (
                <div key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transition Teaser */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#2DD4BF] animate-bounce">
            <span>SCROLL TO INITIALIZE NEXUS OS</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
};
