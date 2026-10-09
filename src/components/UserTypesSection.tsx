// src/components/UserTypesSection.tsx
import React, { useState } from 'react';
import { Users, User, Building2, Briefcase, Landmark, Shield, Factory, TrendingUp, CheckCircle } from 'lucide-react';
import { USER_ECOSYSTEMS } from '../data/nexusData';
import { soundEngine } from '../utils/sound';
import { getCurrentUser } from '../services/authService';
import { APP_PATHS, navigateApp, routeForRole } from '../routing/appRoutes';
import type { PlatformRole } from '../services/platformStore';

export const UserTypesSection: React.FC = () => {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(2); // Default to "Agents"

  const userRoleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    buyers: User,
    sellers: Shield,
    agents: Users,
    agencies: Building2,
    developers: Building2,
    investors: TrendingUp,
    industrial: Factory,
    corporate: Briefcase,
    government: Landmark
  };

  const activeEcosystem = USER_ECOSYSTEMS[selectedUserIndex];
  const IconComponent = userRoleIcons[activeEcosystem.id] || Users;

  const accessWorkspace = (ecosystemId: string) => {
    soundEngine.playActivate();
    const roleByEcosystem: Record<string, PlatformRole> = {
      buyers: 'Buyer',
      sellers: 'Seller',
      agents: 'Agent',
      agencies: 'Agency',
      developers: 'Developer',
      investors: 'Investor',
      industrial: 'Industrial',
      corporate: 'Corporate',
      government: 'Government',
    };
    const role = roleByEcosystem[ecosystemId];
    if (!role) return;

    const destination = getCurrentUser()
      ? routeForRole(role)
      : APP_PATHS.login;
    navigateApp(destination);
  };

  return (
    <section id="ecosystems" className="relative py-28 bg-[#070707] border-t border-white/10 overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-mono tracking-widest text-[#D4AF37] mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>SECTION 11 // 9 DEDICATED ECOSYSTEMS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Bespoke Operating Environments for Every Stakeholder.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Whether you are an individual homebuyer, an elite certified broker, an institutional developer, 
            or a municipal revenue authority, NEXUS OS provides a specialized interface engineered for your operations.
          </p>
        </div>

        {/* 9 Role Selector Horizontal Scroll/Grid */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {USER_ECOSYSTEMS.map((eco, idx) => {
            const isSelected = selectedUserIndex === idx;
            const RoleIcon = userRoleIcons[eco.id] || Users;

            return (
              <button
                key={eco.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedUserIndex(idx);
                }}
                className={`px-5 py-3 rounded-2xl text-xs font-bold tracking-wider flex items-center gap-2.5 whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA8010] text-black shadow-lg shadow-[#D4AF37]/25 scale-105'
                    : 'glass-panel text-neutral-300 hover:text-white hover:border-white/20'
                }`}
              >
                <RoleIcon className="w-4 h-4" />
                <span>{eco.title.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Persona Workspace Showcase */}
        <div className="glass-card-luxury p-6 sm:p-10 rounded-3xl border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#D4AF37] font-semibold">
              {activeEcosystem.badge}
            </div>

            <div>
              <span className="text-xs font-mono text-[#2DD4BF] block mb-1">
                FOR {activeEcosystem.role.toUpperCase()}
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {activeEcosystem.headline}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {activeEcosystem.description}
            </p>

            {/* Persona Feature Capabilities */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Ecosystem Capabilities:
              </div>
              {activeEcosystem.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Persona-specific capability and status indicators */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 max-w-md">
              {activeEcosystem.metrics.map((metric, mIdx) => (
                <div key={mIdx} className="p-3.5 rounded-xl bg-black/60 border border-white/5">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">{metric.label}</div>
                  <div className="text-xl font-bold text-white mt-0.5">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Role Dashboard Hologram Mockup */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/70 border border-[#D4AF37]/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2 text-white font-bold">
                <IconComponent className="w-4 h-4 text-[#D4AF37]" />
                <span>NEXUS OS // {activeEcosystem.title.toUpperCase()} TERMINAL</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between">
                <span className="text-neutral-400">AUTHORIZATION:</span>
                <span className="text-emerald-400 font-bold">BIOMETRIC VERIFIED</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between">
                <span className="text-neutral-400">AI AGENT LIAISON:</span>
                <span className="text-[#2DD4BF] font-semibold">Lead Lock™ Guardian</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between">
                <span className="text-neutral-400">REGIONAL NETWORK:</span>
                <span className="text-[#D4AF37]">Sample locations; coverage not established</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-[#D4AF37]/15 to-[#2DD4BF]/15 border border-[#D4AF37]/30 text-xs font-mono text-neutral-200">
              <div className="text-[10px] text-neutral-400 uppercase mb-1">SOVEREIGN GOVERNANCE</div>
              This ecosystem adheres to Electronic Transactions Ordinance 2002 and NADRA identity protocols.
            </div>

            <button
              onClick={() => accessWorkspace(activeEcosystem.id)}
              className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#F3CF57] text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              Access {activeEcosystem.title} Workspace
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
