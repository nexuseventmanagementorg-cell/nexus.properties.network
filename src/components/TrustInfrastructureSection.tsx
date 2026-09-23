// src/components/TrustInfrastructureSection.tsx
import React, { useState } from 'react';
import { Shield, Layers, CheckCircle2, Lock, Cpu, Eye, FileKey, Scale } from 'lucide-react';
import { TRUST_LAYERS } from '../data/nexusData';
import { soundEngine } from '../utils/sound';

export const TrustInfrastructureSection: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  const layerIcons = [FileKey, Layers, Eye, Lock, Cpu, Shield, Scale, CheckCircle2];

  return (
    <section id="trust" className="relative py-28 bg-[#070707] border-t border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-mono tracking-widest text-[#D4AF37] mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>SECTION 09 // 8-LAYER TRUST INFRASTRUCTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Trust is not a feature.
            <span className="block text-gold-gradient">Trust is infrastructure.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            In a high-stakes market like Pakistan, trust cannot rely on marketing slogans or handshakes. 
            NEXUS OS builds trust as an 8-layer cryptographic, biometric, and cadastral protocol stack.
          </p>
        </div>

        {/* 8-Layer Isometric Stack Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Vertical Interactive Layer Stack */}
          <div className="lg:col-span-6 space-y-2.5">
            {TRUST_LAYERS.map((layer, idx) => {
              const isSelected = selectedLayer === idx;
              const Icon = layerIcons[idx % layerIcons.length];

              return (
                <div
                  key={layer.layer}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedLayer(idx);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center justify-between group ${
                    isSelected
                      ? 'glass-card-luxury border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-xl shadow-[#D4AF37]/10 scale-[1.02]'
                      : 'bg-black/60 border-white/5 hover:border-white/20 hover:bg-[#111111]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#D4AF37] text-black font-bold' : 'bg-white/5 text-neutral-400 group-hover:text-white'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <span className={`text-[10px] font-mono tracking-wider font-semibold block ${
                        isSelected ? 'text-[#D4AF37]' : 'text-neutral-500'
                      }`}>
                        {layer.badge}
                      </span>
                      <h4 className={`text-sm font-bold tracking-tight ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                        {layer.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
                      {layer.protocols.length} Invariants
                    </span>
                    <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#2DD4BF] animate-ping' : 'bg-neutral-700'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep-Dive Protocol Specification Panel */}
          <div className="lg:col-span-6 glass-card-luxury p-6 sm:p-8 rounded-3xl border-white/10 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono text-[#D4AF37] font-bold block mb-1">
                  PROTOCOL SPECIFICATION // 0{selectedLayer + 1}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {TRUST_LAYERS[selectedLayer].name}
                </h3>
              </div>

              <span className="px-3 py-1 rounded-lg bg-[#2DD4BF]/10 text-[#2DD4BF] font-mono text-xs font-bold border border-[#2DD4BF]/30">
                ACTIVE CONSENSUS
              </span>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-6">
              {TRUST_LAYERS[selectedLayer].description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                Cryptographic Sub-Protocols & Gateways:
              </div>
              {TRUST_LAYERS[selectedLayer].protocols.map((proto, pIdx) => (
                <div key={pIdx} className="p-3.5 rounded-xl bg-black/60 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-semibold">{proto}</span>
                  <span className="text-emerald-400 font-bold">VERIFIED</span>
                </div>
              ))}
            </div>

            {/* Quote Block */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-[#2DD4BF]/10 border border-[#D4AF37]/30 text-xs text-neutral-300 leading-relaxed font-light italic">
              "Without this layer, real estate remains a realm of speculative disputes. 
              With this layer, property transactions achieve sovereign mathematical certainty."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
