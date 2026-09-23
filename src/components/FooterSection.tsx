// src/components/FooterSection.tsx
import React from 'react';
import { Shield, ArrowRight, Globe, Lock, Cpu, CheckCircle } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import transparentLogo from '../assets/transparentlogo.png';

export const FooterSection: React.FC<{ onJoinNetwork: () => void }> = ({ onJoinNetwork }) => {
  return (
    <footer className="relative bg-[#040404] border-t border-white/10 pt-24 pb-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#D4AF37]/10 via-[#2DD4BF]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Executive CTA Banner */}
        <div className="glass-card-luxury p-8 sm:p-14 rounded-3xl border-[#D4AF37]/40 mb-20 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase mb-3 block">
              THE SOVEREIGN REAL ESTATE HORIZON
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
              Enter The Future of Pakistan’s Real Estate Industry.
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-8">
              "This is not another property website. This is the operating system that connects, 
              verifies, routes, protects, and completes transactions for the entire nation."
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  soundEngine.playActivate();
                  onJoinNetwork();
                }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#F3CF57] hover:to-[#D4AF37] text-black font-bold text-sm tracking-wider uppercase flex items-center gap-3 transition-all cursor-pointer shadow-xl shadow-[#D4AF37]/25 hover:scale-105"
              >
                <span>Join The Sovereign Network</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#property-discovery"
                className="px-8 py-4 rounded-xl glass-panel text-white font-semibold text-sm hover:border-[#2DD4BF] transition-all"
              >
                Explore Verified Inventory
              </a>
            </div>
          </div>
        </div>

        {/* Long Term Vision Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16 pb-16 border-b border-white/10 text-xs">
          <div>
            <img
              src={transparentLogo}
              alt="Nexus Property Network"
              className="w-[210px] h-auto object-contain mb-4"
            />
            <p className="text-neutral-400 leading-relaxed font-light mb-4">
              Pakistan's first sovereign AI-powered real estate operating system. 
              Connecting 130+ cities, 5,000+ areas, and specialized AI employees.
            </p>
            <div className="text-[10px] font-mono text-neutral-500">
              ARCHITECTURE: PRODUCTION
            </div>
          </div>

          <div>
            <div className="font-bold text-sm text-white uppercase tracking-wider mb-4 font-mono">
              Core Pillars
            </div>
            <ul className="space-y-2.5 text-neutral-400 font-light">
              <li className="hover:text-white transition-colors cursor-pointer">• Pakistan Property Graph</li>
              <li className="hover:text-white transition-colors cursor-pointer">• Lead Lock™ Exclusivity Vault</li>
              <li className="hover:text-white transition-colors cursor-pointer">• Deal Lock™ Escrow Engine</li>
              <li className="hover:text-white transition-colors cursor-pointer">• 8-Layer Trust Infrastructure</li>
              <li className="hover:text-white transition-colors cursor-pointer">• Autonomous AI Workforce</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-sm text-white uppercase tracking-wider mb-4 font-mono">
              Ecosystem Hubs
            </div>
            <ul className="space-y-2.5 text-neutral-400 font-light">
              <li className="hover:text-white transition-colors cursor-pointer">• Islamabad Capital Node</li>
              <li className="hover:text-white transition-colors cursor-pointer">• Lahore Metropolitan Cadastre</li>
              <li className="hover:text-white transition-colors cursor-pointer">• Karachi Coastal & Commercial</li>
              <li className="hover:text-white transition-colors cursor-pointer">• Gwadar SEZ Logistics Port</li>
              <li className="hover:text-white transition-colors cursor-pointer">• CPEC Intermodal Corridors</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-sm text-white uppercase tracking-wider mb-4 font-mono">
              Regulatory Standards
            </div>
            <ul className="space-y-2.5 text-neutral-400 font-light">
              <li>• Electronic Transactions Ordinance (2002)</li>
              <li>• NADRA Biometric Zero-Knowledge Gateway</li>
              <li>• FBR Section 7E Tax Valuation Alignment</li>
              <li>• Civic Masterplan NOC Synchronization</li>
              <li>• Licensed Partner Banking Escrow Protocol</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            © 2026 NEXUS PROPERTY NETWORK™ // POWERED BY NEXUS OS™. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-neutral-300 transition-colors">PRIVACY PROTOCOL</a>
            <a href="/terms" className="hover:text-neutral-300 transition-colors">TERMS OF OPERATION</a>
            <a href="/api-docs" className="hover:text-neutral-300 transition-colors">API DOCUMENTATION</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
