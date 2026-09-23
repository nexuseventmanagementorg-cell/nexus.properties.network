// src/components/LeadLockSection.tsx
import React, { useState } from 'react';
import { Lock, ShieldCheck, UserCheck, GitFork, RotateCcw, History, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';
import { LEAD_LOCK_STAGES } from '../data/nexusData';
import { soundEngine } from '../utils/sound';

export const LeadLockSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(4); // Default to "Lead Lock Activated"
  const [simulatedLeadState, setSimulatedLeadState] = useState<'IDLE' | 'LOCKED' | 'POACH_ATTEMPT_BLOCKED'>('LOCKED');

  const triggerPoachSimulation = () => {
    soundEngine.playLock();
    setSimulatedLeadState('POACH_ATTEMPT_BLOCKED');
    setTimeout(() => {
      setSimulatedLeadState('LOCKED');
    }, 4000);
  };

  return (
    <section id="lead-lock" className="relative py-28 bg-[#070707] border-t border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/40 text-xs font-mono tracking-widest text-emerald-400 mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>SECTION 07 // LEAD LOCK™ OPERATING SYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Zero Lead Theft. Guaranteed Exclusivity.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            In Pakistan's conventional market, leads are poached within minutes. 
            <span className="text-emerald-400 font-semibold"> Lead Lock™</span> is our cryptographic exclusivity vault 
            that ties a client inquiry to a certified broker with millisecond timestamps, making lead theft mathematically impossible.
          </p>
        </div>

        {/* 8-Stage Operating System Lifecycle Timeline */}
        <div className="mb-14">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-6 flex items-center justify-between">
            <span>THE 8-STAGE LEAD LOCK™ ARCHITECTURE:</span>
            <span className="text-[#2DD4BF] font-mono">CLICK ANY STAGE TO INSPECT PROTOCOL</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {LEAD_LOCK_STAGES.map((stg, sIdx) => {
              const isSelected = activeStageIndex === sIdx;
              return (
                <div
                  key={stg.step}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveStageIndex(sIdx);
                  }}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between min-h-[120px] ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-400 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400'
                      : 'bg-black/60 border-white/5 hover:border-white/20 hover:bg-[#111111]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-emerald-400' : 'text-neutral-500'}`}>
                      {stg.step}
                    </span>
                    {sIdx === 4 && <Lock className="w-3 h-3 text-emerald-400" />}
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                      {stg.name}
                    </h4>
                  </div>

                  <div className={`w-full h-1 rounded-full ${isSelected ? 'bg-emerald-400' : 'bg-white/10'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage Deep Dive + Interactive Anti-Poach Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Stage Inspector */}
          <div className="lg:col-span-7 glass-card-luxury p-6 sm:p-8 rounded-3xl border-emerald-500/20">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">
                  STAGE 0{activeStageIndex + 1} PROTOCOL SPECIFICATION
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {LEAD_LOCK_STAGES[activeStageIndex].name}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">
                ENFORCED BY AI ADMIN
              </span>
            </div>

            <p className="text-base text-neutral-300 font-light leading-relaxed mb-6">
              {LEAD_LOCK_STAGES[activeStageIndex].desc}
            </p>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                Cryptographic Security Invariants:
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SHA-256 Hashing of Buyer CNIC and Phone Number in Zero-Knowledge Vault</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated SLA clock: Agent must log verified touchpoint within 4 hours</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-broker collision checks: Second broker attempt returns instant lockout</span>
              </div>
            </div>
          </div>

          {/* Interactive Anti-Poach Simulation Widget */}
          <div className="lg:col-span-5 glass-card-luxury p-6 sm:p-8 rounded-3xl border-[#D4AF37]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-mono text-[#D4AF37] font-bold">LIVE ANTI-POACH RADAR</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="p-4 rounded-2xl bg-black/70 border border-white/10 mb-6 space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-400">LEAD ID:</span>
                  <span className="text-white font-bold">Protected record</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-400">ASSIGNED BROKER:</span>
                  <span className="text-[#2DD4BF] font-semibold">Taimur Malik (Elite Partner)</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-400">LOCK STATUS:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> EXCLUSIVE LOCK
                  </span>
                </div>
              </div>

              {/* Poach Simulation Box */}
              {simulatedLeadState === 'POACH_ATTEMPT_BLOCKED' ? (
                <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500 text-red-300 text-xs font-mono space-y-2 animate-pulse">
                  <div className="flex items-center gap-2 font-bold text-red-400">
                    <ShieldAlert className="w-4 h-4" />
                    <span>ILLEGAL POACH ATTEMPT DETECTED & BLOCKED</span>
                  </div>
                  <p className="text-[11px] text-neutral-300">
                    Broker "Apex Capital" tried to claim Client Hash 0x9E4B... System denied authorization. 
                    Original Broker Taimur Malik remains exclusive owner.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>LEAD VAULT IS ENCRYPTED & IMMUTABLE</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    No competing broker can access or claim this contact.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={triggerPoachSimulation}
              className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600/30 to-amber-600/30 hover:from-red-600/50 hover:to-amber-600/50 border border-red-500/40 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              Simulate Competitor Poach Attack
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
