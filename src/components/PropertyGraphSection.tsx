// src/components/PropertyGraphSection.tsx
import React, { useState } from 'react';
import { Network, MapPin, ChevronRight, Activity, Globe2, Layers, Search, ShieldCheck } from 'lucide-react';
import { PAKISTAN_CITIES } from '../data/nexusData';
import { soundEngine } from '../utils/sound';

export const PropertyGraphSection: React.FC = () => {
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);
  const [selectedSociety, setSelectedSociety] = useState<string>(PAKISTAN_CITIES[0].topSocieties[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const city = PAKISTAN_CITIES[selectedCityIndex];

  const filteredCities = PAKISTAN_CITIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="property-graph" className="relative py-28 bg-[#070707] border-t border-white/10 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#2DD4BF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-mono tracking-widest text-[#D4AF37] mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>SECTION 03 // PAKISTAN PROPERTY GRAPH™</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            The Sovereign National Property Graph.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Every province, city, area, society, and plot connected in an interactive multi-dimensional topology. 
            130+ cities and 5,000+ mapped areas synchronized under a unified national parcel identifier.
          </p>
        </div>

        {/* 5-Tier Hierarchical Breadcrumb Visualization */}
        <div className="mb-10 glass-panel p-4 rounded-2xl border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-neutral-500 uppercase tracking-widest">GRAPH DRILL-DOWN:</span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 text-[#D4AF37] font-semibold">
            <span>Pakistan (Federation)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-600" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 text-white">
            <span>{city.province}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-600" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/30 font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{city.name}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-600" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 text-neutral-300">
            <span>{selectedSociety}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-600" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Title Node (Cadastral Cadence)</span>
          </div>
        </div>

        {/* Main Graph Grid (Cities List + Interactive Node Telemetry) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* City Nodes Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter Cities & Provinces..."
                className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {filteredCities.map((item, idx) => {
                const originalIdx = PAKISTAN_CITIES.findIndex(c => c.name === item.name);
                const isSelected = selectedCityIndex === originalIdx;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedCityIndex(originalIdx);
                      setSelectedSociety(item.topSocieties[0]);
                    }}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'glass-card-luxury border-[#D4AF37] ring-1 ring-[#D4AF37]/40 shadow-xl'
                        : 'bg-[#0B0B0B]/70 border-white/5 hover:border-white/20 hover:bg-[#111111]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-[#D4AF37] animate-ping' : 'bg-neutral-600'}`} />
                        <div>
                          <h4 className="text-sm font-bold text-white tracking-wide">{item.name}</h4>
                          <span className="text-[11px] text-neutral-400">{item.province}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-mono font-semibold text-[#2DD4BF]">
                          Inventory status active
                        </div>
                        <div className="text-[10px] font-mono text-neutral-500">
                          Cadastral mapping available
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Node Telemetry Dashboard */}
          <div className="lg:col-span-7 glass-card-luxury p-6 sm:p-8 rounded-2xl border-white/10 relative">
            {/* Top Node Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#D4AF37] block mb-1">
                  SOVEREIGN METROPOLITAN NODE // {city.name.toUpperCase()}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {city.name}, {city.province}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400">AI TRUST STATUS:</span>
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                  CONSENSUS ACTIVE
                </span>
              </div>
            </div>

            {/* Geographical Coordinates & Network Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/5">
                <div className="text-[10px] font-mono text-neutral-400 mb-1">GEODETIC LAT/LNG</div>
                <div className="text-xs font-mono font-semibold text-white">
                  {city.lat}° N, {city.lng}° E
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/5">
                <div className="text-[10px] font-mono text-neutral-400 mb-1">MAPPED AREAS</div>
                <div className="text-xs font-mono font-bold text-[#D4AF37]">
                  Mapping available
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 col-span-2 sm:col-span-1">
                <div className="text-[10px] font-mono text-neutral-400 mb-1">LIVE ASSET VOLUME</div>
                <div className="text-xs font-mono font-bold text-[#2DD4BF]">
                  Live inventory status
                </div>
              </div>
            </div>

            {/* Sub-Societies and Masterplans Drill-Down */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-neutral-300 tracking-wider uppercase flex items-center justify-between">
                <span>Select Society / Masterplanned Sector:</span>
                <span className="text-[#2DD4BF] text-[11px] font-semibold">Verified hubs available</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {city.topSocieties.map((soc, sIdx) => {
                  const isSelected = selectedSociety === soc;
                  return (
                    <button
                      key={sIdx}
                      onClick={() => {
                        soundEngine.playRadar();
                        setSelectedSociety(soc);
                      }}
                      className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#2DD4BF]/15 border-[#2DD4BF] text-white shadow-md shadow-[#2DD4BF]/10'
                          : 'bg-black/60 border-white/5 text-neutral-300 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold">{soc}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#2DD4BF]' : 'text-neutral-500'}`} />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">
                        Title cadastre record available for review
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Society Telemetry Box */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#D4AF37]/10 to-[#2DD4BF]/10 border border-[#D4AF37]/30 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-neutral-400">SELECTED SECTOR CADASTRE STATUS</div>
                <div className="text-sm font-bold text-white mt-0.5">{selectedSociety}</div>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 rounded bg-[#2DD4BF]/20 text-[#2DD4BF] text-[11px] font-mono font-bold">
                  CADASTRAL MAPPING ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
