// src/components/CoverageAreaSection.tsx
import React, { useState } from 'react';
import { Map, TrendingUp, ArrowRight } from 'lucide-react';
import { PAKISTAN_CITIES } from '../data/nexusData';
import { soundEngine } from '../utils/sound';
import { AppLink } from '../routing/AppLink';
import { APP_PATHS } from '../routing/appRoutes';

export const CoverageAreaSection: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('Punjab');
  const [selectedCityName, setSelectedCityName] = useState<string>('Lahore');
  const [selectedArea, setSelectedArea] = useState<string>('DHA Phase 6 & Prism');
  const [selectedSociety, setSelectedSociety] = useState<string>('Sector K Prime Commercial');

  const provinces = [
    { name: 'Punjab', cities: ['Lahore', 'Rawalpindi', 'Faisalabad', 'Multan', 'Sialkot'] },
    { name: 'Sindh', cities: ['Karachi', 'Hyderabad', 'Sukkur'] },
    { name: 'Islamabad Capital Territory', cities: ['Islamabad'] },
    { name: 'Khyber Pakhtunkhwa', cities: ['Peshawar', 'Mardan', 'Abbottabad'] },
    { name: 'Balochistan', cities: ['Gwadar', 'Quetta'] },
  ];

  return (
    <section id="coverage" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/3 w-[800px] h-[500px] bg-[#2DD4BF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-mono tracking-widest text-[#D4AF37] mb-4">
            <Map className="w-3.5 h-3.5" />
            <span>SECTION 06 // COVERAGE AREA EXPERIENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Explore Sample Locations
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            This interactive map uses sample location data. It does not provide authoritative coverage, cadastral mapping, legal clearance, NOC status, or live market intelligence.
          </p>
        </div>

        {/* 5-Step Cinematic Drill-Down Path */}
        <div className="glass-card-luxury p-6 rounded-3xl border-white/10 mb-12">
          <div className="text-xs font-mono text-neutral-400 uppercase mb-4 tracking-wider">
            SAMPLE LOCATION NAVIGATION:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* 1. Province View */}
            <div className="p-4 rounded-2xl bg-black/60 border border-[#D4AF37]/40 relative">
              <span className="text-[10px] font-mono text-[#D4AF37] font-bold block mb-1">01 // PROVINCE</span>
              <div className="text-sm font-bold text-white">{selectedProvince}</div>
              <span className="text-[10px] text-neutral-400 mt-1 block">Sample selection</span>
            </div>

            {/* 2. City View */}
            <div className="p-4 rounded-2xl bg-black/60 border border-[#2DD4BF]/40 relative">
              <span className="text-[10px] font-mono text-[#2DD4BF] font-bold block mb-1">02 // CITY</span>
              <div className="text-sm font-bold text-white">{selectedCityName}</div>
              <span className="text-[10px] text-neutral-400 mt-1 block">Sample location data</span>
            </div>

            {/* 3. Area View */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/20 relative">
              <span className="text-[10px] font-mono text-neutral-400 font-bold block mb-1">03 // AREA</span>
              <div className="text-sm font-bold text-white">{selectedArea}</div>
              <span className="text-[10px] text-neutral-400 mt-1 block">Masterplan data not connected</span>
            </div>

            {/* 4. Society View */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/20 relative">
              <span className="text-[10px] font-mono text-neutral-400 font-bold block mb-1">04 // SOCIETY</span>
              <div className="text-sm font-bold text-white">{selectedSociety}</div>
              <span className="text-[10px] text-neutral-400 mt-1 block">NOC data not connected</span>
            </div>

            {/* 5. Listings View */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#2DD4BF]/20 border border-[#D4AF37] relative flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold block mb-1">05 // SAMPLE LISTINGS</span>
                <div className="text-sm font-bold text-white">Verification not established</div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1 mt-2">
                Sample data
              </span>
            </div>
          </div>
        </div>

        {/* Sample-location controls and unconnected metrics preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step 1 & 2: Provinces and Cities Navigator */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                Select Federation Territory / Province:
              </div>
              <div className="flex flex-wrap gap-2">
                {provinces.map((prov) => (
                  <button
                    key={prov.name}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedProvince(prov.name);
                      setSelectedCityName(prov.cities[0]);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      selectedProvince === prov.name
                        ? 'bg-[#D4AF37] text-black font-bold shadow-lg'
                        : 'glass-panel text-neutral-300 hover:text-white'
                    }`}
                  >
                    {prov.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                Metropolitan Cities in {selectedProvince}:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(provinces.find(p => p.name === selectedProvince)?.cities || []).map((cityName) => (
                  <button
                    key={cityName}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedCityName(cityName);
                      const matched = PAKISTAN_CITIES.find(c => c.name === cityName);
                      if (matched && matched.topSocieties.length > 0) {
                        setSelectedArea(matched.topSocieties[0]);
                        setSelectedSociety(`${matched.topSocieties[0]} Core`);
                      }
                    }}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedCityName === cityName
                        ? 'bg-[#2DD4BF]/20 border-[#2DD4BF] text-white ring-1 ring-[#2DD4BF]'
                        : 'bg-black/60 border-white/5 text-neutral-300 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-bold">{cityName}</div>
                    <div className="text-[10px] font-mono text-[#2DD4BF] mt-0.5">Sample geospatial node</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Area Intelligence Radar Card */}
          <div className="lg:col-span-6 glass-card-luxury p-6 sm:p-8 rounded-3xl border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] tracking-wider uppercase block">
                  AREA INTELLIGENCE TELEMETRY
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                  {selectedCityName} :: {selectedArea}
                </h3>
              </div>

              <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                SAMPLE DATA — NOT VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                <div className="text-[10px] font-mono text-neutral-400 mb-1">ANNUAL APPRECIATION</div>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> Live market data not connected
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                <div className="text-[10px] font-mono text-neutral-400 mb-1">CIVIC NOC STATUS</div>
                <div className="text-sm font-bold text-[#2DD4BF] mt-1">NOC data not connected</div>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-white/5 col-span-2 sm:col-span-1">
                <div className="text-[10px] font-mono text-neutral-400 mb-1">SELLER INTEGRITY</div>
                <div className="text-sm font-bold text-[#D4AF37] mt-1">Verification not established</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
              This sample view is not monitored by live satellite, civic-authority, or utility integrations. No property-level legal or infrastructure status is asserted.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-neutral-400 block">WANT TO EXPLORE PARCELS IN THIS AREA?</span>
                <span className="text-sm font-bold text-white">Explore Sample Listings</span>
              </div>

              <AppLink
                to={APP_PATHS.marketplace}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#F3CF57] transition-colors"
              >
                <span>Discover</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </AppLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
