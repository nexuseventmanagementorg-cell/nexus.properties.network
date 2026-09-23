// src/components/ProblemsSolvedSection.tsx
import React, { useState } from 'react';
import { CheckCircle2, XCircle, ShieldCheck, ArrowRight, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { PROBLEMS_SOLVED } from '../data/nexusData';
import { soundEngine } from '../utils/sound';

export const ProblemsSolvedSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number>(1);

  const toggleExpand = (id: number) => {
    soundEngine.playClick();
    setExpandedId(expandedId === id ? 0 : id);
  };

  return (
    <section id="problems-solved" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#2DD4BF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#2DD4BF]/30 text-xs font-mono tracking-widest text-[#2DD4BF] mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECTION 10 // 10 STRUCTURAL PROBLEMS SOLVED</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Engineered Specifically to Fix Pakistan Real Estate.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Every feature of NEXUS OS was designed from the ground up to eliminate the 10 systemic failures 
            that have paralyzed Pakistan's property ecosystem for generations.
          </p>
        </div>

        {/* 10 Problems Accordion / Matrix */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {PROBLEMS_SOLVED.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isExpanded
                    ? 'glass-card-luxury border-[#D4AF37]/50 shadow-xl'
                    : 'bg-[#0B0B0B]/80 border-white/5 hover:border-white/20 hover:bg-[#111111]'
                }`}
              >
                {/* Collapsible Header */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center ${
                      isExpanded ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-neutral-400'
                    }`}>
                      0{item.id}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        Problem {item.id}: {item.title}
                      </h3>
                      <span className="text-xs text-[#2DD4BF] font-mono mt-0.5 block">
                        Impact: {item.impactMetric}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                      {isExpanded ? 'Collapse' : 'Inspect Solution'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#D4AF37]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-500" />
                    )}
                  </div>
                </div>

                {/* Collapsible Expanded Comparison */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                      {/* Left: Legacy Crisis */}
                      <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
                        <div className="text-xs font-mono text-red-400 font-bold uppercase mb-3 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4" />
                          <span>Current Pakistan Situation</span>
                        </div>
                        <ul className="space-y-2 text-xs text-neutral-300">
                          {item.crisisPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="text-red-400 font-bold shrink-0">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Nexus OS Sovereign Solution */}
                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                        <div className="text-xs font-mono text-emerald-400 font-bold uppercase mb-3 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Nexus OS™ Solution</span>
                        </div>
                        <ul className="space-y-2 text-xs text-neutral-200">
                          {item.nexusSolutions.map((sol, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold shrink-0">✓</span>
                              <span>{sol}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-400">MEASURABLE NETWORK OUTCOME:</span>
                      <span className="text-[#D4AF37] font-bold">{item.impactMetric}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
