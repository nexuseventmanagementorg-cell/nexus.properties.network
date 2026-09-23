// src/components/TransformationSection.tsx
import React, { useState } from 'react';
import { Sparkles, Shield, Cpu, Lock, CheckCircle2, RefreshCw, Zap } from 'lucide-react';
import { soundEngine } from '../utils/sound';

export const TransformationSection: React.FC = () => {
  const [isActivated, setIsActivated] = useState<boolean>(true);

  const toggleActivation = () => {
    soundEngine.playActivate();
    setIsActivated(!isActivated);
  };

  const transformationSteps = [
    {
      title: 'Properties Connect',
      desc: 'Parcels synchronized across Pakistan into unified cadastral coordinates.',
      icon: RefreshCw,
      stat: '130+ Cities Connected'
    },
    {
      title: 'Users Connect',
      desc: 'Biometric identity layers bind genuine buyers, sellers, and certified agents.',
      icon: CheckCircle2,
      stat: 'Verified Identities'
    },
    {
      title: 'AI Employees Activate',
      desc: 'Specialized AI agents launch supervisory surveillance across all transactions.',
      icon: Cpu,
      stat: 'Autonomous Agents'
    },
    {
      title: 'Governance Activates',
      desc: 'Automated FBR tax computation, civic NOC validation, and stay-order court checks.',
      icon: Zap,
      stat: 'Legal Clearance Active'
    },
    {
      title: 'Trust Activates',
      desc: 'Lead Lock™ and Deal Lock™ seal the transaction pipeline with zero ambiguity.',
      icon: Shield,
      stat: 'Zero-Dispute Guarantee'
    }
  ];

  return (
    <section id="transformation" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Radiance */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isActivated ? 'opacity-100' : 'opacity-20'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-[#D4AF37]/15 via-[#2DD4BF]/15 to-transparent rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Pill & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#2DD4BF]/40 text-xs font-mono tracking-widest text-[#2DD4BF] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTION 02 // INTRODUCING NEXUS OS™</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Chaos Transforms Into Order.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Nexus OS reorganizes the entire national real estate landscape. Through algorithmic governance, 
            immutable property graphs, and autonomous AI squads, chaos gives way to mathematical certainty.
          </p>

          {/* Interactive State Toggle */}
          <div className="mt-8 inline-flex items-center gap-4 p-2 rounded-2xl glass-panel border border-white/10 shadow-2xl">
            <span className={`text-xs font-mono tracking-wider ${!isActivated ? 'text-red-400 font-bold' : 'text-neutral-500'}`}>
              PRE-NEXUS CHAOS
            </span>
            <button
              onClick={toggleActivation}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 cursor-pointer p-1 ${
                isActivated ? 'bg-gradient-to-r from-[#D4AF37] to-[#2DD4BF]' : 'bg-red-950 border border-red-500/50'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-black shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                  isActivated ? 'translate-x-8' : 'translate-x-0'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isActivated ? 'bg-[#2DD4BF]' : 'bg-red-400'}`} />
              </div>
            </button>
            <span className={`text-xs font-mono tracking-wider ${isActivated ? 'text-[#D4AF37] font-bold' : 'text-neutral-500'}`}>
              NEXUS OS™ ACTIVE
            </span>
          </div>
        </div>

        {/* State Comparison Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Legacy Realm */}
          <div className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 border ${
            !isActivated
              ? 'bg-red-950/20 border-red-500/50 shadow-2xl shadow-red-500/10'
              : 'bg-[#0B0B0B]/50 border-white/5 opacity-60'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-red-400 tracking-wider font-semibold">
                LEGACY PAKISTAN MARKET
              </span>
              <span className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 text-[10px] font-mono">
                DISORGANIZED ENTROPY
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/60 border border-red-500/20 text-neutral-300 text-sm">
                <span className="text-red-400 font-semibold block mb-1">✕ Fragmented Offline Ledgers</span>
                Every patwari and society maintains isolated, paper records prone to manual alteration.
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-red-500/20 text-neutral-300 text-sm">
                <span className="text-red-400 font-semibold block mb-1">✕ Rampant Client Poaching</span>
                Client phone numbers leaked to dozens of brokers, resulting in aggressive harassment.
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-red-500/20 text-neutral-300 text-sm">
                <span className="text-red-400 font-semibold block mb-1">✕ High-Risk Cash Tokens</span>
                Transactions handled via unverified cheques and informal promises without legal escrow.
              </div>
            </div>
          </div>

          {/* Nexus OS Realm */}
          <div className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 border ${
            isActivated
              ? 'glass-card-luxury border-[#D4AF37]/50 shadow-2xl shadow-[#D4AF37]/15 ring-1 ring-[#D4AF37]/20'
              : 'bg-[#0B0B0B]/50 border-white/5 opacity-60'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-[#D4AF37] tracking-wider font-semibold">
                NEXUS OS™ SOVEREIGN ARCHITECTURE
              </span>
              <span className="px-2.5 py-1 rounded bg-[#2DD4BF]/20 text-[#2DD4BF] text-[10px] font-mono font-bold animate-pulse">
                MATHEMATICAL CONSENSUS
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/70 border border-[#D4AF37]/30 text-neutral-200 text-sm">
                <span className="text-[#D4AF37] font-semibold block mb-1">✓ Pakistan Property Graph</span>
                130+ cities organized into standardized digital parcel schemas with GPS coordinates.
              </div>
              <div className="p-4 rounded-xl bg-black/70 border border-[#2DD4BF]/30 text-neutral-200 text-sm">
                <span className="text-[#2DD4BF] font-semibold block mb-1">✓ Lead Lock™ Cryptographic Enclave</span>
                Client inquiries locked with cryptographic exclusivity, guaranteeing zero poaching.
              </div>
              <div className="p-4 rounded-xl bg-black/70 border border-[#D4AF37]/30 text-neutral-200 text-sm">
                <span className="text-[#D4AF37] font-semibold block mb-1">✓ Deal Lock™ Digital Escrow</span>
                Milestone payments, digital documents, and statutory commissions settled automatically.
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Activation Sequence Flow */}
        <div className="pt-8 border-t border-white/10">
          <div className="text-xs font-mono text-neutral-400 tracking-wider uppercase text-center mb-8">
            NEXUS OS™ SYSTEM INITIALIZATION SEQUENCE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {transformationSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="glass-panel p-5 rounded-xl border-white/10 hover:border-[#D4AF37]/40 transition-all group">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-[11px] font-mono text-[#D4AF37]">PHASE 0{idx + 1}</span>
                    <Icon className="w-4 h-4 text-[#2DD4BF] group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light mb-3">{step.desc}</p>
                  <div className="text-[11px] font-mono text-[#2DD4BF] font-semibold pt-2 border-t border-white/5">
                    {step.stat}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
