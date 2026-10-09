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
import { EnterpriseArchitectureSection } from './components/EnterpriseArchitectureSection';
import { Section19UserRoleConstitutionSection } from './components/Section19UserRoleConstitutionSection';
import { Section20DashboardOperatingSystemSection } from './components/Section20DashboardOperatingSystemSection';
import { Section21PropertyVerificationOperatingSystemSection } from './components/Section21PropertyVerificationOperatingSystemSection';
import { Section22LeadLifecycleOperatingSystemSection } from './components/Section22LeadLifecycleOperatingSystemSection';
import { Section23DealLifecycleOperatingSystemSection } from './components/Section23DealLifecycleOperatingSystemSection';
import { Section24PaymentSubscriptionOperatingSystemSection } from './components/Section24PaymentSubscriptionOperatingSystemSection';
import { Section25AIAdminCommandCenterSection } from './components/Section25AIAdminCommandCenterSection';
import { Section26SuperAdminCommandCenterSection } from './components/Section26SuperAdminCommandCenterSection';
import { Section27WhatsAppFacebookAutomationOSSection } from './components/Section27WhatsAppFacebookAutomationOSSection';
import { Section28CRMFollowUpOperatingSystemSection } from './components/Section28CRMFollowUpOperatingSystemSection';
import { Section29NationalPropertyMarketplaceArchitectureSection } from './components/Section29NationalPropertyMarketplaceArchitectureSection';
import { Section30NexusOSMasterArchitectureSection } from './components/Section30NexusOSMasterArchitectureSection';
import { Section31GlobalExpansionArchitectureSection } from './components/Section31GlobalExpansionArchitectureSection';
import { Section32AIKnowledgeNetworkSection } from './components/Section32AIKnowledgeNetworkSection';
import { Section33VoiceAIOperatingSystemSection } from './components/Section33VoiceAIOperatingSystemSection';
import { Section34IdentityAuthenticationOperatingSystemSection } from './components/Section34IdentityAuthenticationOperatingSystemSection';
import { Section35PropertyGraphDatabaseArchitectureSection } from './components/Section35PropertyGraphDatabaseArchitectureSection';
import { Section36DataLakeAnalyticsEngineSection } from './components/Section36DataLakeAnalyticsEngineSection';
import { Section37AIFAQKnowledgeBaseEngineSection } from './components/Section37AIFAQKnowledgeBaseEngineSection';
import { Section38NexusAPIEcosystemSection } from './components/Section38NexusAPIEcosystemSection';
import { Section39MobileAppArchitectureSection } from './components/Section39MobileAppArchitectureSection';
import { AuthPage } from './components/AuthPage';
import { SiteDocumentPage } from './components/SiteDocumentPage';
import { FooterSection } from './components/FooterSection';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { RoleDashboardPage } from './components/RoleDashboardPage';
import { ProductExperiencePage } from './components/ProductExperiencePage';
import { ProductNotFoundPage } from './components/ProductExperiencePage';
import { PlatformRole } from './services/platformStore';
import { canAccessRole, getCurrentUser } from './services/authService';
import { LanguageMode, PropertyItem } from './types';
import { SAMPLE_CITIES } from './data/sampleCities';
import { createProperty } from './services/propertyService';
import { SamplePropertyType } from './data/sampleProperties';
import { soundEngine } from './utils/sound';
import { Shield, X, CheckCircle, Lock } from 'lucide-react';
import agentImage from './assets/agent.png';
import whatsappImage from './assets/whatsapp.png';
import { LuxuryRealEstateAnimation3D } from './components/LuxuryRealEstateAnimation3D';
import { Hero16x9CinematicAnimation } from './components/Hero16x9CinematicAnimation';
import { ShahiQilaExperience } from './components/ShahiQilaExperience';
import card1 from './assets/card1.png';
import card2 from './assets/card2.png';
import card3 from './assets/card3.png';
import card4 from './assets/card4.png';
import card5 from './assets/card5.png';
import card6 from './assets/card6.png';
import card7 from './assets/card7.png';
import card8 from './assets/car8.png';
import card9 from './assets/card9.png';
import card10 from './assets/card10.png';
import card11 from './assets/card11.png';
import card12 from './assets/card12.png';
import card13 from './assets/card13.png';
import card14 from './assets/card14.png';
import card15 from './assets/card15.png';
import card16 from './assets/card16.png';
import card17 from './assets/card17.png';
import card18 from './assets/card18.png';
import card19 from './assets/card19.png';
import card20 from './assets/card20.png';
import card21 from './assets/card21.png';
import { APP_PATHS, navigateApp, PRODUCT_ROUTES, propertyDetailPath, resolveApplicationRoute } from './routing/appRoutes';
import { AppLink } from './routing/AppLink';

type BrandCardFeatureProps = {
  image: string;
  title: string;
  supportingText?: string;
};

function BrandCardFeature({ image, title, supportingText }: BrandCardFeatureProps) {
  return (
    <section className="relative py-[60px] sm:py-[80px] lg:py-[120px]">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.35em] text-[#D4AF37] sm:text-[11px]">
            NEXUS PROPERTY NETWORK™
          </span>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <img
            src={image}
            alt={title}
            className="block h-auto w-full object-contain"
          />
        </div>

        {supportingText && (
          <div className="mt-4 text-center text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-300">
            {supportingText}
          </div>
        )}
      </div>
    </section>
  );
}

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [lang, setLang] = useState<LanguageMode>('roman_ur');
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [selectedAgentForChat, setSelectedAgentForChat] = useState('AI Admin Supervisory Core');
  const [listModalOpen, setListModalOpen] = useState(false);
  const [inquireProperty, setInquireProperty] = useState<PropertyItem | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [animation3DOpen, setAnimation3DOpen] = useState(() => pathname === APP_PATHS.animation3d);
  const [hero16x9Open, setHero16x9Open] = useState(() => pathname === APP_PATHS.heroAnimation);
  const route = resolveApplicationRoute(pathname);

  useEffect(() => {
    const handlePathChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  if (route.kind === 'animation3d') {
    return <LuxuryRealEstateAnimation3D onClose={() => {
      navigateApp(APP_PATHS.home);
      setAnimation3DOpen(false);
    }} />;
  }
  if (route.kind === 'heroAnimation') {
    return <Hero16x9CinematicAnimation standalone onClose={() => {
      navigateApp(APP_PATHS.home);
      setHero16x9Open(false);
    }} />;
  }
  if (route.kind === 'dashboard') return <ProtectedDashboardRoute role={route.role} />;
  if (route.kind === 'auth') return <AuthPage mode={route.mode} />;
  if (route.kind === 'document') return <SiteDocumentPage path={route.path} />;
  if (route.kind === 'product') return (
    <>
      <Navbar lang={lang} setLang={setLang} currentPath={route.path} />
      <ProductExperiencePage pathname={route.path} onOpenAssistant={() => setAssistantOpen(true)} />
      {route.path === APP_PATHS.ai && <AIAssistantDrawer
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        lang={lang}
        setLang={setLang}
        initialAgentName={selectedAgentForChat}
      />}
    </>
  );
  if (route.kind === 'notFound') return (
    <>
      <Navbar lang={lang} setLang={setLang} currentPath={pathname} />
      <ProductNotFoundPage />
    </>
  );

  const handleStartSearch = () => navigateApp(APP_PATHS.marketplace);

  const handleListProperty = () => {
    soundEngine.playActivate();
    navigateApp(APP_PATHS.listProperty);
  };

  const handleFindAgent = () => navigateApp(APP_PATHS.agents);
  const handleViewProperty = (propertyId: string) => navigateApp(propertyDetailPath(propertyId));

  const handleOpenAssistant = (agentName?: string) => {
    if (agentName) {
      setSelectedAgentForChat(agentName);
    }
    setAssistantOpen(true);
  };

  return (
    <div className="relative bg-[#06080D] text-white min-h-screen selection:bg-[#E5B842] selection:text-black">
      {/* Floating Glass Navigation Header */}
      <Navbar lang={lang} setLang={setLang} currentPath={pathname} />

      {/* Main Storytelling Sections Journey */}
      <main className="relative z-10">
        {/* Existing Home Hero Section (Untouched) */}
        <HeroSection
          onStartSearch={handleStartSearch}
          onListProperty={handleListProperty}
          onJoinNetwork={handleFindAgent}
          onOpenAssistant={() => handleOpenAssistant('AI Admin Supervisory Core')}
          lang={lang}
        />

        <section className="border-y border-white/10 bg-black/40 px-5 py-8" aria-label="Product routes and provenance">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm text-neutral-300">
              Interface preview: sample listings are not verified or live inventory. Verification, agent credentials, lead/deal locks, messaging, billing, and AI services are not connected.
            </p>
            <nav className="flex flex-wrap gap-3" aria-label="NEXUS product pages">
              {PRODUCT_ROUTES.map(({ id, label }) => (
                <AppLink key={id} to={APP_PATHS[id]} className="rounded-lg border border-white/10 px-3 py-2 text-xs text-neutral-300 transition hover:border-[#D4AF37]/60 hover:text-white">
                  {label}
                </AppLink>
              ))}
            </nav>
          </div>
        </section>

        {/* ========================================================
            NEW SHAHI QILA / LAHORE FORT ARCHITECTURAL EXPERIENCE
            (Directly Below Existing Hero Section, Full-Width)
           ======================================================== */}
        <ShahiQilaExperience />

        {/* Section 01: The Problem (Current Chaotic Real Estate Ecosystem) */}
        <ProblemSection />

        <BrandCardFeature
          image={card1}
          title="Why Pakistan needs NEXUS"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 02: Introducing Nexus OS (Chaos into Order Transformation) */}
        <TransformationSection />

        <BrandCardFeature
          image={card8}
          title="Pakistan Property Intelligence Map"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 03: Pakistan Property Graph (5,000+ Areas) */}
        <PropertyGraphSection />

        <BrandCardFeature
          image={card16}
          title="One Platform. Every Stakeholder."
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 04: The 54 AI Workforce & AI Admin Core */}
        <AIWorkforceSection
          onSelectAgentForChat={(agentName) => handleOpenAssistant(agentName)}
        />

        <BrandCardFeature
          image={card10}
          title="Agency Growth & Network Performance"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 05: Floating Property Discovery (3D Glass Cards & Filters) */}
        <PropertyDiscoverySection
          onProtectInquire={handleViewProperty}
        />

        <BrandCardFeature
          image={card11}
          title="Nexus Property Assistant Preview"
          supportingText="Powered by NEXUS OS™"
        />

        <BrandCardFeature
          image={card19}
          title="Pakistan Ka Pehla AI Property Assistant"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 06: Coverage Area Experience (Cinematic Drill-Down) */}
        <CoverageAreaSection />

        <BrandCardFeature
          image={card17}
          title="Find Your Perfect Property With Confidence"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 07: Lead Lock™ Operating System */}
        <LeadLockSection />

        <BrandCardFeature
          image={card9}
          title="Lead Chori Aur Commission Loss Ka Khatma"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 08: Deal Lock™ Transaction Engine */}
        <DealLockSection />

        <BrandCardFeature
          image={card20}
          title="Trust Built By AI Verification"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 09: 8-Layer Trust Infrastructure */}
        <TrustInfrastructureSection />

        <BrandCardFeature
          image={card2}
          title="Seller Verification & Trust Layer"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 10: Nexus Digital Government */}
        <DigitalGovernmentSection />

        <BrandCardFeature
          image={card7}
          title="Pakistan's Trusted Property Intelligence Network"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 11: Nexus Revenue Engine & Economic Model */}
        <RevenueEngineSection />

        <BrandCardFeature
          image={card6}
          title="Investment Decisions Without Guesswork"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 12: National Expansion Roadmap & 10 Year Vision */}
        <ExpansionRoadmapSection />

        <BrandCardFeature
          image={card5}
          title="Launch Projects Nationwide"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 13: Complete User Journey Architecture */}
        <UserJourneySection />

        <BrandCardFeature
          image={card21}
          title="Invest In Pakistan From Anywhere"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 14: Complete Database Architecture */}
        <DatabaseArchitectureSection />

        <BrandCardFeature
          image={card12}
          title="Developer Acceleration & Project Visibility"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 15: Complete API Architecture */}
        <ApiArchitectureSection />

        {/* Section 16: Security Architecture & Fraud Prevention */}
        <SecurityArchitectureSection />

        <BrandCardFeature
          image={card14}
          title="Industrial & Commercial Opportunity Network"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 17: Complete AI Workforce Operating Constitution */}
        <AIWorkforceConstitutionSection />

        <BrandCardFeature
          image={card4}
          title="Agency CRM, Leads & Network in One Place"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Phase 18: Additive enterprise implementation architecture */}
        <EnterpriseArchitectureSection />

        <BrandCardFeature
          image={card15}
          title="Transparent Property Ecosystem"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 19: Additive user role constitution */}
        <Section19UserRoleConstitutionSection />

        <BrandCardFeature
          image={card18}
          title="Real Agents. Real Properties. Real Opportunities."
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 20: Additive dashboard operating system */}
        <Section20DashboardOperatingSystemSection />

        {/* Section 21: Additive property verification operating system */}
        <Section21PropertyVerificationOperatingSystemSection />

        <BrandCardFeature
          image={card3}
          title="Fake Seller Khatam. Sirf Asli Maalik."
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 22: Additive lead lifecycle operating system */}
        <Section22LeadLifecycleOperatingSystemSection />

        {/* Section 23: Additive deal lifecycle operating system */}
        <Section23DealLifecycleOperatingSystemSection />

        {/* Section 24: Additive payment and subscription operating system */}
        <Section24PaymentSubscriptionOperatingSystemSection />

        <BrandCardFeature
          image={card13}
          title="Invest With Data, Not Guesswork"
          supportingText="Powered by NEXUS OS™"
        />

        {/* Section 25: Additive AI Admin command center */}
        <Section25AIAdminCommandCenterSection />

        {/* Section 26: Additive Super Admin command center */}
        <Section26SuperAdminCommandCenterSection />

        {/* Section 27: Additive WhatsApp and Facebook automation OS */}
        <Section27WhatsAppFacebookAutomationOSSection />

        {/* Section 28: Additive CRM and follow-up operating system */}
        <Section28CRMFollowUpOperatingSystemSection />

        {/* Section 29: Additive national property marketplace architecture */}
        <Section29NationalPropertyMarketplaceArchitectureSection />

        {/* Section 30: Additive Nexus OS master architecture */}
        <Section30NexusOSMasterArchitectureSection />

        {/* Section 31: Additive global expansion architecture */}
        <Section31GlobalExpansionArchitectureSection />

        {/* Section 32: Additive AI knowledge network architecture */}
        <Section32AIKnowledgeNetworkSection />

        {/* Section 33: Additive Voice AI operating system */}
        <Section33VoiceAIOperatingSystemSection />

        {/* Section 34: Additive identity and authentication operating system */}
        <Section34IdentityAuthenticationOperatingSystemSection />

        {/* Section 35: Additive property graph database architecture */}
        <Section35PropertyGraphDatabaseArchitectureSection />

        {/* Section 36: Additive data lake and analytics engine */}
        <Section36DataLakeAnalyticsEngineSection />

        {/* Section 37: Additive AI FAQ and knowledge base engine */}
        <Section37AIFAQKnowledgeBaseEngineSection />

        {/* Section 38: Additive Nexus API ecosystem */}
        <Section38NexusAPIEcosystemSection />

        {/* Section 39: Additive mobile app architecture */}
        <Section39MobileAppArchitectureSection />

        {/* Section 18: 10 Structural Problems Solved */}
        <ProblemsSolvedSection />

        {/* Section 17: 9 Dedicated User Ecosystems */}
        <UserTypesSection />

        {/* Footer & Long-Term Sovereign Vision */}
        <FooterSection
          onJoinNetwork={() => navigateApp(APP_PATHS.register)}
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  soundEngine.playLock();
                  const formData = new FormData(e.currentTarget);
                  const city = String(formData.get('city') || 'Lahore');
                  const area = String(formData.get('area') || 'Central');
                  const propertyType = String(formData.get('propertyType') || 'Plot') as SamplePropertyType;
                  const size = String(formData.get('size') || '1 Kanal');
                  const title = String(formData.get('title') || 'Live Nexus Property');
                  const price = String(formData.get('price') || '0');
                  await createProperty({
                    title,
                    propertyType,
                    city,
                    area,
                    phase: String(formData.get('phase') || area),
                    price,
                    priceRaw: Number(price.replace(/[^0-9.]/g, '')) || 0,
                    areaSize: size,
                    purpose: propertyType === 'Shop' || propertyType === 'Office' || propertyType === 'Building' || propertyType === 'Commercial' ? 'Commercial' : 'Residential',
                    description: 'Live seller listing submitted through Nexus inventory management.',
                    image: '/images/media_1790111327854.png',
                    agent: 'Nexus Seller Submission',
                    galleryImages: [],
                  });
                  setFormSubmitted(true);
                }}
                className="space-y-4 text-xs font-mono"
              >
                <div>
                  <label className="text-neutral-400 block mb-1">PROPERTY TITLE / IDENTIFIER</label>
                  <input
                    required
                    type="text"
                    name="title"
                    placeholder="e.g. 1 Kanal Plot #420, DHA Phase 6 Lahore"
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">CITY</label>
                    <select name="city" className="w-full bg-[#111111] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]">
                      {SAMPLE_CITIES.map((city) => <option key={city.city}>{city.city}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">EXPECTED VALUE (PKR)</label>
                    <input
                      required
                      name="price"
                      type="text"
                      placeholder="e.g. 14.5 Crore"
                      className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">AREA</label>
                    <input name="area" required type="text" placeholder="e.g. Model Town" className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">PHASE</label>
                    <input name="phase" required type="text" placeholder="e.g. Phase 1" className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">PROPERTY TYPE</label>
                    <select name="propertyType" className="w-full bg-[#111111] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"><option>Plot</option><option>House</option><option>Apartment</option><option>Farm House</option><option>Building</option><option>Shop</option><option>Office</option><option>Commercial</option></select>
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">SIZE</label>
                    <input name="size" required type="text" placeholder="e.g. 1 Kanal" className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]" />
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

      {/* 3D Real-Estate Animation Cinema Showcase Modal (Vertical 9:16) */}
      {animation3DOpen && (
        <LuxuryRealEstateAnimation3D onClose={() => setAnimation3DOpen(false)} />
      )}

      {/* 16:9 Website Hero Animation Cinema Showcase Modal (Desktop 16:9) */}
      {hero16x9Open && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <Hero16x9CinematicAnimation onClose={() => setHero16x9Open(false)} />
        </div>
      )}
    </div>
  );
}

const ProtectedDashboardRoute: React.FC<{ role: PlatformRole }> = ({ role }) => {
  const user = getCurrentUser();
  useEffect(() => {
    if (!canAccessRole(user, role)) {
      navigateApp(APP_PATHS.login, true);
    }
  }, [role, user?.id, user?.role]);

  if (!user || !canAccessRole(user, role)) return <AuthPage mode="login" />;
  return <RoleDashboardPage role={role} />;
};
