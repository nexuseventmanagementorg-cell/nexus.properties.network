// src/components/PropertyDiscoverySection.tsx
import React, { useEffect, useState } from 'react';
import { Compass, MapPin, Bed, Bath, ArrowUpRight } from 'lucide-react';
import { SAMPLE_AREAS } from '../data/sampleAreas';
import { SAMPLE_CITIES } from '../data/sampleCities';
import { SampleProperty, SamplePropertyType } from '../data/sampleProperties';
import { LiveProperty } from '../data/inventoryManager';
import { inventoryUpdatedEvent, searchProperties } from '../services/propertyService';
import { soundEngine } from '../utils/sound';
import { NexusProvenanceBadge } from './product/ProductPrimitives';

interface PropertyDiscoveryProps {
  onProtectInquire: (propertyId: string) => void;
}

export const PropertyDiscoverySection: React.FC<PropertyDiscoveryProps> = ({ onProtectInquire }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<SamplePropertyType | 'All'>('All');
  const [maxBudget, setMaxBudget] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [verificationOnly, setVerificationOnly] = useState(false);
  const [inventoryVersion, setInventoryVersion] = useState(0);
  const [filteredProperties, setFilteredProperties] = useState<Array<SampleProperty | LiveProperty>>([]);

  const categories = ['All', 'Residential', 'Commercial', 'Investment'];
  const cities = ['All', ...SAMPLE_CITIES.map((city) => city.city)];
  const areas = ['All', ...SAMPLE_AREAS.filter((area) => selectedCity === 'All' || area.city === selectedCity).map((area) => area.name)];
  const propertyTypes: Array<SamplePropertyType | 'All'> = ['All', 'Plot', 'House', 'Apartment', 'Farm House', 'Building', 'Shop', 'Office'];

  useEffect(() => {
    const refreshInventory = () => setInventoryVersion((version) => version + 1);
    window.addEventListener(inventoryUpdatedEvent, refreshInventory);
    return () => window.removeEventListener(inventoryUpdatedEvent, refreshInventory);
  }, []);

  useEffect(() => {
    let active = true;
    searchProperties({
      city: selectedCity === 'All' ? undefined : selectedCity,
      area: selectedArea === 'All' ? undefined : selectedArea,
      propertyType: selectedType === 'All' ? undefined : selectedType,
      maxPriceRaw: maxBudget ? Number(maxBudget) : undefined,
      minBedrooms: minBedrooms ? Number(minBedrooms) : undefined,
      purpose: selectedCategory === 'All' ? undefined : selectedCategory === 'Commercial' ? 'Commercial' : selectedCategory === 'Investment' ? 'Investment' : 'Residential',
      status: 'For Sale',
    }).then((results) => {
      if (active) setFilteredProperties(verificationOnly
        ? results.filter((property) => 'state' in property && property.verificationStatus.trim().toLowerCase() === 'verified')
        : results);
    }).catch(() => {
      if (active) setFilteredProperties([]);
    });
    return () => { active = false; };
  }, [inventoryVersion, maxBudget, minBedrooms, selectedArea, selectedCategory, selectedCity, selectedType, verificationOnly]);

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
              Property Discovery.
            </h2>
            <p className="text-base text-neutral-300 font-light mt-2 max-w-2xl">
              Explore sample listings and user-submitted records. Verification is not connected, and displayed prices are not verified.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex max-w-full flex-wrap items-center gap-1.5 p-1 rounded-2xl glass-panel border border-white/10 text-xs font-mono">
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

        <div className="mb-8 grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 sm:grid-cols-2 lg:grid-cols-5">
          <select value={selectedArea} onChange={(event) => setSelectedArea(event.target.value)} className="rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]">
            {areas.map((area, index) => <option key={`${area}-${index}`}>{area}</option>)}
          </select>
          <select value={selectedType} onChange={(event) => setSelectedType(event.target.value as SamplePropertyType | 'All')} className="rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]">
            {propertyTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
          <input value={maxBudget} onChange={(event) => setMaxBudget(event.target.value.replace(/[^0-9]/g, ''))} placeholder="Max budget (PKR lacs)" inputMode="numeric" className="rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]" />
          <input value={minBedrooms} onChange={(event) => setMinBedrooms(event.target.value.replace(/[^0-9]/g, ''))} placeholder="Minimum bedrooms" inputMode="numeric" className="rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]" />
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-xs text-neutral-300"><input type="checkbox" checked={verificationOnly} onChange={(event) => setVerificationOnly(event.target.checked)} className="accent-[#D4AF37]" /> Verified records only</label>
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
          {filteredProperties.slice(0, 18).map((property) => (
            <div
              key={property.propertyId}
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
                    {property.propertyType.toUpperCase()}
                  </span>

                  <NexusProvenanceBadge value={'state' in property && property.state === 'LIVE PROPERTY' ? 'USER SUBMITTED' : 'SAMPLE'} />
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
                  <span>{property.areaSize}</span>
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
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">{'state' in property && property.state === 'LIVE PROPERTY' ? 'USER PRICE — NOT VERIFIED' : 'SAMPLE PRICE — NOT VERIFIED'}</span>
                    <span className="text-2xl font-extrabold text-white tracking-tight">{property.price}</span>
                  </div>
                  {!('state' in property) && (
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase block">SAMPLE STATUS</span>
                      <span className="text-xs font-mono font-bold text-[#D4AF37]">DEMO LISTING</span>
                    </div>
                  )}
                </div>

                {/* Provenance and local record state */}
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1.5 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>RECORD ID:</span>
                    <span className="text-neutral-300 font-mono">{property.propertyId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">INVENTORY STATE:</span>
                    <span className={`font-bold flex items-center gap-1 ${
                      'text-neutral-300'
                    }`}>
                      {'state' in property && property.state === 'LIVE PROPERTY' ? 'LOCAL SUBMISSION — PENDING REVIEW' : 'SAMPLE RECORD'}
                    </span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => {
                    soundEngine.playLock();
                    onProtectInquire(property.propertyId);
                  }}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer shadow-lg group-hover:scale-[1.01]"
                >
                  <span>View property details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {!filteredProperties.length && <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-8 text-center text-sm text-neutral-300">{verificationOnly ? 'No verified property available.' : 'No sample properties match these filters. Adjust the city, area, type, budget, or bedroom requirement.'}</div>}
      </div>
    </section>
  );
};
