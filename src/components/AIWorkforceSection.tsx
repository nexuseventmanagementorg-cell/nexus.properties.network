// src/components/AIWorkforceSection.tsx
import React, { useState } from 'react';
import { Cpu, Shield, Bot, Search, Crown, CheckCircle, Activity, Sparkles, Filter, Lock } from 'lucide-react';
import { AI_EMPLOYEES } from '../data/nexusData';
import { soundEngine } from '../utils/sound';
import { AIEmployee } from '../types';
import agentImage from '../assets/agent.png';

interface AIWorkforceSectionProps {
  onSelectAgentForChat: (agentName: string) => void;
}

export const AIWorkforceSection: React.FC<AIWorkforceSectionProps> = ({ onSelectAgentForChat }) => {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [activeEmployee, setActiveEmployee] = useState<AIEmployee>(AI_EMPLOYEES[53]); // Default to AI Admin
  const [searchQuery, setSearchQuery] = useState<string>('');

  const departments = [
    'ALL',
    'Verification & Trust',
    'Lead & Deal Operations',
    'Valuation & Intelligence',
    'Automation & Communication',
    'Legal & Governance'
  ];

  const filteredEmployees = AI_EMPLOYEES.filter(emp => {
    const matchesDept = selectedDept === 'ALL' || emp.department === selectedDept;
    const matchesQuery = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  return (
    <section id="workforce" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Orbital Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#D4AF37]/10 via-[#2DD4BF]/10 to-transparent rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4AF37]/40 text-xs font-mono tracking-widest text-[#D4AF37] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>SECTION 04 // THE AI WORKFORCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            An Autonomous Digital Company.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            NEXUS OS™ is powered by specialized AI Employees working continuously in consensus.
            At the center stands <span className="text-[#D4AF37] font-semibold">AI Admin</span>, the supervisory intelligence 
            orchestrating listings, leads, deals, payments, verification, fraud detection, and trust.
          </p>
        </div>

        {/* Central AI Admin Supervisory Command Dashboard */}
        <div className="mb-14 glass-card-luxury p-6 sm:p-8 rounded-3xl border-[#D4AF37]/40 relative overflow-hidden ring-1 ring-[#D4AF37]/20 shadow-2xl">
          {/* Subtle Ambient Radar Lines */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* AI Admin Hologram Core */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl bg-black/60 border border-[#D4AF37]/30">
              <div className="relative mb-5">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#2DD4BF] to-[#D4AF37] p-1 animate-pulse-glow">
                  <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center">
                    <Crown className="w-10 h-10 text-[#D4AF37]" />
                  </div>
                </div>
                {/* Orbital Badge */}
                <div className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-black font-mono text-[9px] font-bold">
                  SUPERVISOR
                </div>
              </div>

              <h3 className="text-xl font-bold text-white tracking-wide">AI ADMIN SUPERVISORY CORE</h3>
              <p className="text-xs text-[#D4AF37] font-mono mt-0.5">SUPREME OPERATING SYSTEM INTELLIGENCE</p>
              
              <div className="mt-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-400">
                Supervising 53 Autonomous Agents
              </div>

              <button
                onClick={() => {
                  soundEngine.playActivate();
                  onSelectAgentForChat('AI Admin Supervisory Core');
                }}
                className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#F3CF57] hover:to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/20"
              >
                Launch AI Admin Console
              </button>
            </div>

            {/* AI Admin 7-Pillar Monitoring Scope */}
            <div className="lg:col-span-8">
              <div className="text-xs font-mono text-neutral-400 tracking-wider uppercase mb-4 flex items-center justify-between">
                <span>AI ADMIN CONTINUOUS SURVEILLANCE RADAR:</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  REAL-TIME CONSENSUS
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Listings', status: 'Live Audit Stream', color: '#2DD4BF', sub: 'Ghost Inventory Detection' },
                  { label: 'Leads', status: 'Locking Active', color: '#D4AF37', sub: 'Poach Protection' },
                  { label: 'Deals', status: 'Supervision Active', color: '#2DD4BF', sub: 'Milestone Execution' },
                  { label: 'Payments', status: 'Escrow Controls Active', color: '#D4AF37', sub: 'Dispute Prevention' },
                  { label: 'Verification', status: 'Cadastral + Nadra', color: '#2DD4BF', sub: 'Biometric Gate' },
                  { label: 'Fraud Radar', status: 'Threat Detection Active', color: '#EF4444', sub: 'Zero-Tolerance Sentry' },
                  { label: 'Trust Index', status: 'Consensus Active', color: '#D4AF37', sub: 'Consensus Ledger' },
                  { label: 'Latency', status: 'Responsive', color: '#2DD4BF', sub: 'Low-Latency Neural' },
                ].map((pillar, pIdx) => (
                  <div key={pIdx} className="p-3.5 rounded-xl bg-black/50 border border-white/10 hover:border-white/20 transition-all">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">{pillar.label}</div>
                    <div className="text-sm font-bold text-white mt-1" style={{ color: pillar.color }}>
                      {pillar.status}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5 font-mono">{pillar.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Squad Filter Navigation & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl glass-panel border border-white/10">
            {departments.map((dept) => {
              const isSelected = selectedDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedDept(dept);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {dept === 'ALL' ? 'All AI Employees' : dept}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by agent name, skill..."
              className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* AI Workforce Grid + Active Agent Dossier Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* AI Workforce Card Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[700px] overflow-y-auto pr-1">
            {filteredEmployees.map((emp) => {
              const isSelected = activeEmployee.id === emp.id;
              return (
                <div
                  key={emp.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveEmployee(emp);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'glass-card-luxury border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-lg'
                      : 'bg-[#0B0B0B]/80 border-white/5 hover:border-white/20 hover:bg-[#111111]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-mono text-[#D4AF37] font-semibold">{emp.id.toUpperCase()}</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">{emp.department}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <img src={agentImage} alt={`${emp.name} avatar`} className="w-9 h-9 rounded-full object-cover border border-[#2DD4BF]/50 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">{emp.name}</h4>
                      <p className="text-xs text-[#2DD4BF] font-mono mt-0.5 line-clamp-1">{emp.role}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono pt-2 border-t border-white/5 text-neutral-400">
                    <span>Live activity monitored</span>
                    <span className="text-emerald-400 font-bold">Operational</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Employee Deep-Dive Dossier */}
          <div className="lg:col-span-4 glass-card-luxury p-6 rounded-2xl border-white/10 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono text-[#D4AF37] font-bold">
                AGENT DOSSIER // {activeEmployee.id.toUpperCase()}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                ACTIVE DEPLOYMENT
              </span>
            </div>

            <div className="my-5">
              <div className="flex items-center gap-3">
                <img src={agentImage} alt={`${activeEmployee.name} avatar`} className="w-14 h-14 rounded-2xl object-cover border border-[#D4AF37]/60" />
                <h3 className="text-xl font-extrabold text-white tracking-tight">{activeEmployee.name}</h3>
              </div>
              <p className="text-xs font-mono text-[#2DD4BF] mt-1">{activeEmployee.role}</p>
              <div className="mt-2 inline-block px-2.5 py-1 rounded bg-white/5 text-neutral-300 text-[11px] font-mono">
                {activeEmployee.department}
              </div>
            </div>

            <div className="space-y-4 text-xs font-light text-neutral-300 leading-relaxed mb-6">
              <p>{activeEmployee.description}</p>

              <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 space-y-2">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">CORE ALGORITHMIC FOCUS:</span>
                  <span className="text-xs font-mono text-white font-semibold">{activeEmployee.specialization}</span>
                </div>
                <div className="pt-2 border-t border-white/5 flex justify-between">
                  <span className="text-[10px] font-mono text-neutral-400">PERFORMANCE STATUS:</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-mono text-neutral-400">HISTORICAL TASKS:</span>
                  <span className="text-xs font-mono text-[#D4AF37] font-bold">Live activity monitored</span>
                </div>
              </div>
            </div>

            {/* Direct Interaction Button */}
            <button
              onClick={() => {
                soundEngine.playActivate();
                onSelectAgentForChat(activeEmployee.name);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] hover:from-[#5EEAD4] hover:to-[#2DD4BF] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#2DD4BF]/20"
            >
              <Bot className="w-4 h-4" />
              <span>Consult {activeEmployee.name}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
