// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { TransformationSection } from './components/TransformationSection';
import { PropertyGraphSection } from './components/PropertyGraphSection';
import { AIWorkforceSection } from './components/AIWorkforceSection';
import { PropertyDiscoverySection } from './components/PropertyDiscoverySection';
import { CoverageAreaSection } from './components/CoverageAreaSection';
import { LeadLockSection } from './components/LeadLockSection';
import { DealLockSection } from './components/DealLockSection';
import { TrustInfrastructureSection } from './components/TrustInfrastructureSection';
import { ProblemsSolvedSection } from './components/ProblemsSolvedSection';
import { UserTypesSection } from './components/UserTypesSection';
import { DigitalGovernmentSection } from './components/DigitalGovernmentSection';
import { RevenueEngineSection } from './components/RevenueEngineSection';
import { ExpansionRoadmapSection } from './components/ExpansionRoadmapSection';
import { UserJourneySection } from './components/UserJourneySection';
import { DatabaseArchitectureSection } from './components/DatabaseArchitectureSection';
import { ApiArchitectureSection } from './components/ApiArchitectureSection';
import { SecurityArchitectureSection } from './components/SecurityArchitectureSection';
import { AIWorkforceConstitutionSection } from './components/AIWorkforceConstitutionSection';
import { AuthPage } from './components/AuthPage';
import { SiteDocumentPage } from './components/SiteDocumentPage';
import { FooterSection } from './components/FooterSection';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { LanguageMode, PropertyItem } from './types';
import { soundEngine } from './utils/sound';
import { Shield, X, CheckCircle, Lock, ArrowRight } from 'lucide-react';
import agentImage from './assets/agent.png';
import whatsappImage from './assets/whatsapp.png';

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [lang, setLang] = useState<LanguageMode>('roman_ur');
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [selectedAgentForChat, setSelectedAgentForChat] = useState('AI Admin Supervisory Core');


  // Modals for listing property & inquiry
  const [listModalOpen, setListModalOpen] = useState(false);
  const [inquireProperty, setInquireProperty] = useState<PropertyItem | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handlePathChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  // Monitor scroll progress for 3D camera interpolation
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }

      // Track active section for navbar
      const sectionIds = [
        'home',
        'problems',
        'transformation',
        'property-graph',
        'workforce',
        'property-discovery',
        'coverage',
        'lead-lock',
        'deal-lock',
        'trust',
        'digital-government',
        'revenue-engine',
        'expansion-roadmap',
        'user-journey',
        'database-architecture',
        'security-architecture',
        'ai-constitution',
        'problems-solved',
        'ecosystems'
      ];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname === '/auth/login' || pathname === '/auth/register') {
    return <AuthPage mode={pathname.endsWith('register') ? 'register' : 'login'} />;
  }
  if (pathname === '/privacy' || pathname === '/terms' || pathname === '/api-docs') {
    return <SiteDocumentPage path={pathname} />;
  }

  const handleStartSearch = () => {
    const el = document.getElementById('property-discovery');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleListProperty = () => {
    soundEngine.playActivate();
    setFormSubmitted(false);
    setListModalOpen(true);
  };

  const handleJoinNetwork = () => {
    const el = document.getElementById('ecosystems');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenAssistant = (agentName?: string) => {
    if (agentName) {
      setSelectedAgentForChat(agentName);
    }
    setAssistantOpen(true);
  };

  const handleProtectInquire = (property: PropertyItem) => {
    setFormSubmitted(false);
    setInquireProperty(property);
  };

  return (
    <div className="relative bg-[#06080D] text-white min-h-screen selection:bg-[#E5B842] selection:text-black">
      {/* Floating Glass Navigation Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
      />

      {/* Main Storytelling Sections Journey */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onStartSearch={handleStartSearch}
          onListProperty={handleListProperty}
          onJoinNetwork={handleJoinNetwork}
          onOpenAssistant={() => handleOpenAssistant('AI Admin Supervisory Core')}
          lang={lang}
        />

        {/* Section 01: The Problem (Current Chaotic Real Estate Ecosystem) */}
        <ProblemSection />

        {/* Section 02: Introducing Nexus OS (Chaos into Order Transformation) */}
        <TransformationSection />

        {/* Section 03: Pakistan Property Graph (5,000+ Areas) */}
        <PropertyGraphSection />

        {/* Section 04: The 54 AI Workforce & AI Admin Core */}
        <AIWorkforceSection
          onSelectAgentForChat={(agentName) => handleOpenAssistant(agentName)}
        />

        {/* Section 05: Floating Property Discovery (3D Glass Cards & Filters) */}
        <PropertyDiscoverySection
          onProtectInquire={handleProtectInquire}
        />

        {/* Section 06: Coverage Area Experience (Cinematic Drill-Down) */}
        <CoverageAreaSection />

        {/* Section 07: Lead Lock™ Operating System */}
        <LeadLockSection />

        {/* Section 08: Deal Lock™ Transaction Engine */}
        <DealLockSection />

        {/* Section 09: 8-Layer Trust Infrastructure */}
        <TrustInfrastructureSection />

        {/* Section 10: Nexus Digital Government */}
        <DigitalGovernmentSection />

        {/* Section 11: Nexus Revenue Engine & Economic Model */}
        <RevenueEngineSection />

        {/* Section 12: National Expansion Roadmap & 10 Year Vision */}
        <ExpansionRoadmapSection />

        {/* Section 13: Complete User Journey Architecture */}
        <UserJourneySection />

        {/* Section 14: Complete Database Architecture */}
        <DatabaseArchitectureSection />

        {/* Section 15: Complete API Architecture */}
        <ApiArchitectureSection />

        {/* Section 16: Security Architecture & Fraud Prevention */}
        <SecurityArchitectureSection />

        {/* Section 17: Complete AI Workforce Operating Constitution */}
        <AIWorkforceConstitutionSection />

        {/* Section 18: 10 Structural Problems Solved */}
        <ProblemsSolvedSection />

        {/* Section 17: 9 Dedicated User Ecosystems */}
        <UserTypesSection />

        {/* Footer & Long-Term Sovereign Vision */}
        <FooterSection
          onJoinNetwork={handleJoinNetwork}
        />
      </main>

      {/* Omnipresent Context-Aware Multilingual AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        lang={lang}
        setLang={setLang}
        initialAgentName={selectedAgentForChat}
      />

      {/* Persistent assistant and WhatsApp contact launchers */}
      <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        <button
          type="button"
          onClick={() => handleOpenAssistant('AI Admin Supervisory Core')}
          className="group relative h-16 w-16 rounded-full overflow-hidden border-2 border-[#D4AF37] bg-[#07110D] shadow-2xl shadow-[#2DD4BF]/30 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:ring-offset-2 focus:ring-offset-[#06080D] animate-float"
          title="Open NEXUS AI Assistant"
          aria-label="Open NEXUS AI Assistant"
        >
          <img src={agentImage} alt="NEXUS AI Assistant" className="w-full h-full object-cover" />
          <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#07110D]" />
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black/90 px-3 py-2 text-[11px] font-mono text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
            Ask the AI Assistant
          </span>
        </button>

        <a
          href="https://wa.me/923140073794"
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#25D366] bg-[#07110D] shadow-2xl shadow-[#25D366]/25 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#06080D] animate-float"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <img src={whatsappImage} alt="WhatsApp" className="h-full w-full object-cover" />
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black/90 px-3 py-2 text-[11px] font-mono text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
            WhatsApp support
          </span>
        </a>
      </div>

      {/* Modal: List Your Property (Verified Onboarding) */}
      {listModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-card-luxury max-w-lg w-full p-6 sm:p-8 rounded-3xl border-[#D4AF37]/50 relative shadow-2xl">
            <button
              onClick={() => setListModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl glass-pill text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#D4AF37] flex items-center justify-center">
                <Shield className="w-4 h-4 text-black" />
              </div>
              <span className="text-xs font-mono text-[#D4AF37] font-bold">NEXUS VERIFIED ONBOARDING</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              List Your Property with Single-Authority Lock
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Your property will undergo biometric and cadastral validation. Zero duplicate rogue listings allowed.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Title Verification Initialized</h4>
                <p className="text-xs text-neutral-300">
                  Listing Auditor AI is processing your plot coordinates. An encrypted cryptographic title certificate will be generated shortly.
                </p>
                <button
                  onClick={() => setListModalOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase"
                >
                  Return to Nexus OS
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  soundEngine.playLock();
                  setFormSubmitted(true);
                }}
                className="space-y-4 text-xs font-mono"
              >
                <div>
                  <label className="text-neutral-400 block mb-1">PROPERTY TITLE / IDENTIFIER</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 1 Kanal Plot #420, DHA Phase 6 Lahore"
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">CITY</label>
                    <select className="w-full bg-[#111111] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]">
                      <option>Lahore</option>
                      <option>Islamabad</option>
                      <option>Karachi</option>
                      <option>Rawalpindi</option>
                      <option>Gwadar</option>
                      <option>Peshawar</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">EXPECTED VALUE (PKR)</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 14.5 Crore"
                      className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">OWNER CNIC (FOR NADRA VERIFICATION GATE)</label>
                  <input
                    required
                    type="text"
                    placeholder="35202-XXXXXXX-X"
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA8010] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 mt-4 cursor-pointer"
                >
                  Generate Sovereign Digital Title Lock
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal: Lead Lock Inquire */}
      {inquireProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-card-luxury max-w-lg w-full p-6 sm:p-8 rounded-3xl border-emerald-500/50 relative shadow-2xl">
            <button
              onClick={() => setInquireProperty(null)}
              className="absolute top-5 right-5 p-2 rounded-xl glass-pill text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400 font-bold">LEAD LOCK™ PROTECTED INQUIRY</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight mb-1">
              {inquireProperty.title}
            </h3>
            <p className="text-xs font-mono text-[#D4AF37] mb-6">
              {inquireProperty.area}, {inquireProperty.city} // {inquireProperty.price}
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Lead Lock™ Activated</h4>
                <p className="text-xs text-neutral-300">
                  Your contact hash has been encrypted. You will be contacted strictly by the certified listing specialist for this property. Zero broker spam guaranteed.
                </p>
                <button
                  onClick={() => setInquireProperty(null)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs uppercase"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  soundEngine.playLock();
                  setFormSubmitted(true);
                }}
                className="space-y-4 text-xs font-mono"
              >
                <div>
                  <label className="text-neutral-400 block mb-1">YOUR FULL NAME</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Asad Khan"
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">MOBILE NUMBER (WHATSAPP PROTECTED)</label>
                  <input
                    required
                    type="tel"
                    placeholder="+92 300 XXXXXXX"
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">PURCHASE READINESS</label>
                  <select className="w-full bg-[#111111] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-400">
                    <option>Ready Buyer (Funds in Bank / Within 7 Days)</option>
                    <option>Serious Inquiry (Within 30 Days)</option>
                    <option>Overseas Investor / Roshan Digital Account</option>
                    <option>Institutional Fund Inquiry</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/20 text-[11px] text-neutral-300">
                  🛡️ <strong className="text-emerald-400">Lead Lock Protection Guarantee:</strong> Your information is never broadcast to multiple agents or public directories.
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  Lock Inquiry & Direct Connect
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
