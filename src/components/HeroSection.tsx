// src/components/HeroSection.tsx
import React, { useState } from 'react';
import { Shield, Sparkles, ArrowRight, Search, CheckCircle2, User, Home, Building2, MapPin, Globe } from 'lucide-react';
import { HeroAnimationStage } from './HeroAnimationStage';
import { soundEngine } from '../utils/sound';
import { LanguageMode } from '../types';
import { getCopy } from '../i18n';

interface HeroSectionProps {
  onStartSearch: () => void;
  onListProperty: () => void;
  onJoinNetwork: () => void;
  onOpenAssistant: () => void;
  lang: LanguageMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartSearch,
  onListProperty,
  onJoinNetwork,
  onOpenAssistant,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'Buy' | 'Rent' | 'Invest'>('Buy');
  const [propertyType, setPropertyType] = useState('Residential Plot');
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [selectedArea, setSelectedArea] = useState('DHA Phase 6 & Prism');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playActivate();
    onStartSearch();
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 bg-[#06080D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2-Column Split: Clean Left Content (Zero Animation Behind It) + Right-Side Animation Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-16">
          
          {/* ========================================================
              LEFT COLUMN: HERO HEADLINE, SEARCH BAR & QUICK STATS
              (Clean, high-contrast, zero animation behind title text)
             ======================================================== */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Pill Badge matching reference */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#00E599]/40 text-xs font-mono tracking-wider shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#00E599] animate-ping" />
              <span className="text-[#00E599] font-bold">Pakistan's #1 AI Property Platform</span>
            </div>

            {/* Main Headline matching Reference Images */}
            <div>
              <span className="text-xs font-mono text-[#E5B842] uppercase tracking-widest block font-bold mb-1">
                {getCopy(lang, 'heroEyebrow')}
              </span>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                {getCopy(lang, 'heroTitle')}
                <span className="text-[#00E599] block mt-1">{getCopy(lang, 'smartProperty')}</span>
                <span className="text-[#E5B842] block">{getCopy(lang, 'leadNetwork')}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
              {getCopy(lang, 'heroBody')}
            </p>

            {/* Primary Action Buttons matching Reference */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  soundEngine.playActivate();
                  onListProperty();
                }}
                className="px-6 py-3.5 rounded-xl bg-[#00E599] hover:bg-[#25F5AD] text-black font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#00E599]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Home className="w-4 h-4 text-black" />
                <span>{getCopy(lang, 'listProperty')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onJoinNetwork();
                }}
                className="px-5 py-3.5 rounded-xl glass-panel text-white font-semibold text-xs tracking-wide flex items-center gap-2 border border-white/20 hover:border-[#E5B842] hover:text-[#E5B842] transition-all cursor-pointer"
              >
                <User className="w-4 h-4 text-[#E5B842]" />
                <span>{getCopy(lang, 'joinAgent')}</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onStartSearch();
                }}
                className="px-5 py-3.5 rounded-xl glass-panel text-neutral-300 font-medium text-xs tracking-wide flex items-center gap-2 hover:text-white hover:border-white/40 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-neutral-400" />
                <span>{getCopy(lang, 'browse')}</span>
              </button>
            </div>

            {/* Search Bar Box matching Reference Image 1 */}
            <div className="p-4 sm:p-5 rounded-2xl glass-card-luxury border border-[#E5B842]/30 bg-[#07090E]/95 shadow-2xl">
              {/* Buy / Rent / Invest Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 w-fit mb-4">
                {(['Buy', 'Rent', 'Invest'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveTab(tab);
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-[#E5B842] text-black shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Form Row */}
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-end">
                <div>
                  <label className="text-[10px] font-mono text-neutral-400 block mb-1">PROPERTY TYPE</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-[#111319] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5B842]"
                  >
                    <option>Residential Plot</option>
                    <option>Commercial Plot</option>
                    <option>Luxury Villa</option>
                    <option>Penthouse / Apartment</option>
                    <option>Industrial Warehouse</option>
                    <option>Agricultural Land</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 block mb-1">CITY</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-[#111319] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5B842]"
                  >
                    <option>Lahore</option>
                    <option>Islamabad</option>
                    <option>Karachi</option>
                    <option>Rawalpindi</option>
                    <option>Gwadar</option>
                    <option>Peshawar</option>
                    <option>Faisalabad</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 block mb-1">AREA / SOCIETY</label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full bg-[#111319] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5B842]"
                  >
                    <option>DHA Phase 6 & Prism</option>
                    <option>Gulberg I-V Core</option>
                    <option>Blue Area Commercial</option>
                    <option>Sector F-7 & F-8</option>
                    <option>Clifton Coastal Blocks</option>
                    <option>Bahria Town Enclave</option>
                    <option>Gwadar Free Zone North</option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E5B842] to-[#CAA034] hover:from-[#F5C852] hover:to-[#E5B842] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#E5B842]/20 transition-all cursor-pointer h-[38px]"
                  >
                    <Search className="w-3.5 h-3.5 text-black" />
                    <span>Search</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Stats Counter Strip matching Reference Image 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex items-center gap-3">
                <Home className="w-4 h-4 text-[#00E599]" />
                <div>
                  <div className="text-base font-extrabold text-white">Live</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Properties Listed</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex items-center gap-3">
                <User className="w-4 h-4 text-[#E5B842]" />
                <div>
                  <div className="text-base font-extrabold text-white">Verified</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Verified Agents</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#2DD4BF]" />
                <div>
                  <div className="text-base font-extrabold text-white">5,000+</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Coverage Areas</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-base font-extrabold text-emerald-400">Sample</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Demo Lead State</div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: DEDICATED 3D ANIMATION & MAP STAGE
              (Overlaps nothing and nothing overlaps it!)
             ======================================================== */}
          <div className="lg:col-span-6 w-full">
            <HeroAnimationStage />
          </div>
        </div>

        {/* 5 Value Proposition Badges matching Reference Image 1 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#E5B842] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Sample Listings</div>
              <div className="text-[10px] text-neutral-400 font-mono">No verification asserted</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-center gap-3">
            <User className="w-5 h-5 text-[#00E599] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Verified Agents</div>
              <div className="text-[10px] text-neutral-400 font-mono">Trusted & Professional</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#E5B842] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Deal Workflow Blueprint</div>
              <div className="text-[10px] text-neutral-400 font-mono">No live escrow integration</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#00E599] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">AI Assistance</div>
              <div className="text-[10px] text-neutral-400 font-mono">Scripted preview; not a live service</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-center gap-3 col-span-2 md:col-span-1">
            <Globe className="w-5 h-5 text-[#E5B842] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Coverage Catalog</div>
              <div className="text-[10px] text-neutral-400 font-mono">Sample locations; live coverage not established</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
