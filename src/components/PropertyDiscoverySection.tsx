// src/components/PropertyDiscoverySection.tsx
import React, { useState } from 'react';
import { Compass, Filter, ShieldCheck, Lock, Sparkles, MapPin, Bed, Bath, ArrowUpRight, Check } from 'lucide-react';
import { SHOWCASE_PROPERTIES } from '../data/nexusData';
import { soundEngine } from '../utils/sound';
import { PropertyItem } from '../types';

interface PropertyDiscoveryProps {
  onProtectInquire: (property: PropertyItem) => void;
}

export const PropertyDiscoverySection: React.FC<PropertyDiscoveryProps> = ({ onProtectInquire }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const categories = ['All', 'Buy', 'Rent', 'Sell', 'Invest', 'Industrial', 'Corporate', 'Agriculture'];
  const cities = ['All', 'Lahore', 'Islamabad', 'Karachi', 'Gwadar', 'Faisalabad'];

  const filteredProperties = SHOWCASE_PROPERTIES.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesCity = selectedCity === 'All' || p.city === selectedCity;
    return matchesCat && matchesCity;
  });

  return (
    <section id="property-discovery" className="relative py-28 bg-[#070707] border-t border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#2DD4BF]/30 text-xs font-mono tracking-widest text-[#2DD4BF] mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>SECTION 05 // FLOATING PROPERTY DISCOVERY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Verified Sovereign Inventory.
            </h2>
            <p className="text-base text-neutral-300 font-light mt-2 max-w-2xl">
              Every parcel and luxury villa displayed here is cryptographically verified by our AI Employees.
              Zero duplicate ghost listings. Direct owner title certainty.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl glass-panel border border-white/10 text-xs font-mono">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedCity(city);
                }}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#2DD4BF] text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA8010] text-black font-bold shadow-lg shadow-[#D4AF37]/20 scale-105'
                  : 'glass-panel text-neutral-300 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* 3D Floating Glass Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="glass-card-luxury rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all duration-300"
            >
              {/* Image & Holographic Badges */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-black/40" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full glass-panel text-[11px] font-mono font-bold text-white border border-white/20">
                    {property.category.toUpperCase()}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{property.trustScore}% AI VERIFIED</span>
                  </span>
                </div>

                {/* Bottom Overlay Title & Status */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#2DD4BF] font-mono mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{property.area}, {property.city}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#D4AF37] transition-colors">
                    {property.title}
                  </h3>
                </div>
              </div>

              {/* Property Details Body */}
              <div className="p-6 space-y-4">
                {/* Size & Spec Badges */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-4 border-b border-white/10">
                  <span>{property.size}</span>
                  {property.bedrooms && (
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-neutral-300" />
                      {property.bedrooms} Beds
                    </span>
                  )}
                  {property.bathrooms && (
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-neutral-300" />
                      {property.bathrooms} Baths
                    </span>
                  )}
                </div>

                {/* Financial Metric & Price */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">VALUATION CONSENSUS</span>
                    <span className="text-2xl font-extrabold text-white tracking-tight">{property.price}</span>
                  </div>
                  {property.annualRoi && (
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase block">PROJECTED YIELD</span>
                      <span className="text-xs font-mono font-bold text-[#D4AF37]">{property.annualRoi}</span>
                    </div>
                  )}
                </div>

                {/* Cryptographic Title Hash & Status */}
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1.5 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>TITLE HASH:</span>
                    <span className="text-neutral-300 font-mono">{property.verifiedHash}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">LEAD PROTECTION:</span>
                    <span className={`font-bold flex items-center gap-1 ${
                      property.leadLockStatus === 'SECURED' ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      <Lock className="w-3 h-3" />
                      {property.leadLockStatus}
                    </span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => {
                    soundEngine.playLock();
                    onProtectInquire(property);
                  }}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer shadow-lg group-hover:scale-[1.01]"
                >
                  <span>Inquire with Lead Lock™</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
