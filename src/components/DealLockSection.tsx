// src/components/DealLockSection.tsx
import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, DollarSign, Scale, ArrowRight, Vault, Clock } from 'lucide-react';
import { DEAL_LOCK_STAGES } from '../data/nexusData';
import { soundEngine } from '../utils/sound';

export const DealLockSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // Default to "Token & Bayana Escrow"

  return (
    <section id="deal-lock" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-mono tracking-widest text-[#D4AF37] mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECTION 08 // DEAL LOCK™ TRANSACTION ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Zero Commission Disputes. Guaranteed Closings.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Eliminate the anxiety of bounced token cheques, hidden litigation, and unearned commission claims. 
            <span className="text-[#D4AF37] font-semibold"> Deal Lock™</span> seals the entire transaction room 
            with cryptographic milestone escrow, digital vaults, and automated statutory revenue splits.
          </p>
        </div>

        {/* 8-Stage Deal Pipeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-14">
          {DEAL_LOCK_STAGES.map((stg, sIdx) => {
            const isSelected = activeStepIndex === sIdx;
            return (
              <div
                key={stg.step}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveStepIndex(sIdx);
                }}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between min-h-[120px] ${
                  isSelected
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                    : 'bg-black/60 border-white/5 hover:border-white/20 hover:bg-[#111111]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-[#D4AF37]' : 'text-neutral-500'}`}>
                    {stg.step}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#D4AF37] animate-ping' : 'bg-neutral-600'}`} />
                </div>

                <div>
                  <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                    {stg.name}
                  </h4>
                </div>

                <div className={`w-full h-1 rounded-full ${isSelected ? 'bg-[#D4AF37]' : 'bg-white/10'}`} />
              </div>
            );
          })}
        </div>

        {/* Deep Dive Milestone Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Step Details */}
          <div className="lg:col-span-7 glass-card-luxury p-6 sm:p-8 rounded-3xl border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono text-[#D4AF37] font-bold block mb-1">
                  DEAL LOCK PROTOCOL PHASE 0{activeStepIndex + 1}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {DEAL_LOCK_STAGES[activeStepIndex].name}
                </h3>
              </div>

              <span className="px-3 py-1 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-xs font-bold border border-[#D4AF37]/30">
                DISPUTE IMMUNE
              </span>
            </div>

            <p className="text-base text-neutral-300 font-light leading-relaxed mb-6">
              {DEAL_LOCK_STAGES[activeStepIndex].desc}
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-start gap-3 text-xs text-neutral-300">
                <Vault className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Licensed Bank Escrow Integration</span>
                  Token deposits and Bayana held in regulatory compliant accounts until title transfer is stamped.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-start gap-3 text-xs text-neutral-300">
                <Scale className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Automated Commission Disbursement</span>
                  Commission split percentages are locked into the digital agreement and disbursed instantly upon deed handover.
                </div>
              </div>
            </div>
          </div>

          {/* Live Deal Escrow Tracker Simulation Card */}
          <div className="lg:col-span-5 glass-card-luxury p-6 sm:p-8 rounded-3xl border-[#2DD4BF]/30">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-mono text-[#2DD4BF] font-bold">LIVE TRANSACTION ROOM</span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                ESCROW SECURED
              </span>
            </div>

            <div className="space-y-3 mb-6 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex justify-between">
                <span className="text-neutral-400">PROPERTY:</span>
                <span className="text-white font-bold">1 Kanal DHA Phase 6 Lahore</span>
              </div>
              <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex justify-between">
                <span className="text-neutral-400">AGREED VALUE:</span>
                <span className="text-[#D4AF37] font-bold">Under review</span>
              </div>
              <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex justify-between">
                <span className="text-neutral-400">ESCROW DEPOSIT:</span>
                <span className="text-emerald-400 font-bold">Escrow status active</span>
              </div>
              <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex justify-between">
                <span className="text-neutral-400">COMMISSION SPLIT:</span>
                <span className="text-[#2DD4BF] font-bold">Pre-locked &amp; governed</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <div className="flex items-center gap-2 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Dispute Invariant Active</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Both buyer and seller have signed via biometric ETO 2002 tokens. Funds cannot be intercepted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
