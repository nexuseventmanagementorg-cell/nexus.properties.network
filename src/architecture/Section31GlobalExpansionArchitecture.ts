export interface ExpansionPhase {
  name: string;
  focus: string;
  cities: string[];
}

export interface BaseRule {
  title: string;
  description: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface EscalationRule {
  level: number;
  owner: string;
  trigger: string;
  action: string;
}

export const expansionVision = [
  'Lahore',
  'Punjab',
  'Pakistan',
  'GCC',
  'Middle East',
  'United Kingdom',
  'Europe',
  'North America',
  'Global Property Network',
];

export const expansionPhases: ExpansionPhase[] = [
  {
    name: 'Phase 1',
    focus: 'Lahore Launch',
    cities: ['Lahore'],
  },
  {
    name: 'Phase 2',
    focus: 'Punjab Expansion',
    cities: ['Lahore', 'Rawalpindi', 'Islamabad', 'Faisalabad', 'Multan', 'Gujranwala', 'Sialkot', 'Bahawalpur', 'Sargodha', 'And More'],
  },
  {
    name: 'Phase 3',
    focus: 'Pakistan Expansion',
    cities: ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad', 'Gilgit Baltistan', 'Azad Kashmir'],
  },
  {
    name: 'Phase 4',
    focus: 'Pakistan National Marketplace',
    cities: ['130+ Cities', 'Thousands Of Areas', 'Millions Of Properties', 'National Agent Network', 'National Developer Network'],
  },
  {
    name: 'Phase 5',
    focus: 'UAE Expansion',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
  },
  {
    name: 'Phase 6',
    focus: 'Saudi Arabia Expansion',
    cities: ['Riyadh', 'Jeddah', 'Makkah', 'Madinah', 'Dammam', 'NEOM'],
  },
  {
    name: 'Phase 7',
    focus: 'Qatar Expansion',
    cities: ['Doha', 'Lusail', 'Al Wakrah'],
  },
  {
    name: 'Phase 8',
    focus: 'Oman Expansion',
    cities: ['Muscat', 'Salalah', 'Sohar'],
  },
  {
    name: 'Phase 9',
    focus: 'Bahrain Expansion',
    cities: ['Manama', 'Muharraq', 'Riffa'],
  },
  {
    name: 'Phase 10',
    focus: 'United Kingdom Expansion',
    cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'],
  },
];

export const targetUserGroups = [
  'Overseas Pakistanis',
  'International Investors',
  'Property Developers',
  'Real Estate Agencies',
  'Corporate Buyers',
  'Institutional Investors',
  'Government Bodies',
];

export const globalPropertyCategories = [
  'Residential',
  'Commercial',
  'Industrial',
  'Agricultural',
  'Hospitality',
  'Corporate Assets',
  'Government Assets',
  'Mixed Use',
  'Luxury Properties',
];

export const globalAiWorkforceRules = [
  'FUTURE: implemented assistants may require multi-country support; the 54 registry entries do not establish production agents.',
  'AI workflow must support multi-currency operations and global pricing models.',
  'Regional and market-specific intelligence must support multilingual recommendations.',
  'Cross-border investment decisions must include risk, compliance, and trust evaluation.',
  'International compliance logic must adapt to country-specific property laws and market standards.',
];

export const multiLanguageSupport = ['English', 'Urdu', 'Roman Urdu', 'Arabic', 'Future Languages'];
export const multiCurrencySupport = ['PKR', 'AED', 'SAR', 'QAR', 'OMR', 'BHD', 'GBP', 'USD'];

export const globalTrustNetwork = [
  'Identity Verification',
  'Property Verification',
  'Developer Verification',
  'Agency Verification',
  'Corporate Verification',
  'Cross Border Trust Scoring',
];

export const globalComplianceLayer = [
  'Country Policies',
  'Property Laws',
  'Investment Regulations',
  'AML Compliance',
  'KYC Compliance',
  'Audit Standards',
];

export const globalMarketplaceHierarchy = [
  'Country',
  'City',
  'Area',
  'Project',
  'Property',
  'Lead',
  'Deal',
  'Investment',
];

export const globalInvestmentNetwork = [
  'Cross Border Investments',
  'International Listings',
  'Investment Opportunities',
  'ROI Analysis',
  'Market Intelligence',
  'Risk Analysis',
];

export const globalRevenueModel = [
  'Subscriptions',
  'Marketplace Services',
  'Verification Services',
  'Lead Lock Fees',
  'Deal Lock Fees',
  'Advertising',
  'Enterprise Services',
  'AI Services',
];

export const globalDashboardSystem = [
  'Country Dashboard',
  'Regional Dashboard',
  'Marketplace Dashboard',
  'Investment Dashboard',
  'Enterprise Dashboard',
  'Government Dashboard',
];

export const globalPerformanceMetrics: Metric[] = [
  { label: 'Countries', value: 'Multi-country network' },
  { label: 'Cities', value: 'Regional growth nodes' },
  { label: 'Properties', value: 'Verified inventory' },
  { label: 'Users', value: 'Connected network' },
  { label: 'Agencies', value: 'Regional expansion' },
  { label: 'Developers', value: 'Verified project pipeline' },
  { label: 'Investors', value: 'Cross-border capital flow' },
  { label: 'Leads', value: 'Protected pipeline' },
  { label: 'Deals', value: 'Regional execution' },
  { label: 'Revenue', value: 'Global monetization' },
  { label: 'Trust Index', value: 'Risk-aware reputation network' },
];

export const globalAuditSystem = [
  'Country Activity',
  'Marketplace Activity',
  'User Activity',
  'Investment Activity',
  'AI Activity',
  'Compliance Activity',
];

export const countryRules: BaseRule[] = [
  { title: 'Country-aware expansion', description: 'Each country operates as an independent compliance, pricing, and user policy domain while staying connected to a global marketplace graph.' },
  { title: 'Market readiness model', description: 'A country or region is activated when trust, verification, inventory quality, and operating procedures are ready.' },
  { title: 'Regional intelligence routing', description: 'Local intelligence remains regional while broader decisions are coordinated through a global rules engine.' },
];

export const marketplaceRules: BaseRule[] = [
  { title: 'Global property graph', description: 'Every country, city, area, project, and property remains linked through a global network map.' },
  { title: 'Cross-border discovery', description: 'Buyers can discover, compare, and evaluate international opportunities using shared trust, property, and market data.' },
  { title: 'Regionally aware search', description: 'Search and recommendation adapt to local market norms, currency, language, and compliance conditions.' },
];

export const investmentRules: BaseRule[] = [
  { title: 'Cross-border capital flow', description: 'Investment opportunities are evaluated through market intelligence, ROI analysis, and risk scoring.' },
  { title: 'Trusted global investor access', description: 'Investor access is governed by role, jurisdiction, verification score, and compliance readiness.' },
  { title: 'Portfolio visibility', description: 'Developers, agencies, and investors can manage opportunity pipelines across multiple regions from one control layer.' },
];

export const complianceRules: BaseRule[] = [
  { title: 'Jurisdictional compliance', description: 'Local regulations are enforced through a country-aware compliance engine before listing or transaction routing.' },
  { title: 'Risk-controlled onboarding', description: 'AML, KYC, identity, and corporate verification remain mandatory before full market access.' },
  { title: 'Audit-first operations', description: 'Every multi-country decision leaves a traceable evidence trail for AI, governance, and human review.' },
];

export const currencyRules: BaseRule[] = [
  { title: 'Multi-currency settlement', description: 'All key regions support local currency and conversion-aware transaction logic.' },
  { title: 'Pricing intelligence', description: 'Property prices are evaluated in local currency while staying visible in a global comparison model.' },
  { title: 'Cross-border financial routing', description: 'Payment systems align with country rules, pricing strategy, and investor expectations.' },
];

export const languageRules: BaseRule[] = [
  { title: 'Regional language layers', description: 'English, Urdu, Roman Urdu, and Arabic support local engagement and trust building.' },
  { title: 'Machine translation readiness', description: 'Global listings and investor flows can be localized for future languages without redesigning the core system.' },
  { title: 'Local trust communication', description: 'User communication remains language-aware while preserving a single global operating model.' },
];

export const revenueRules: BaseRule[] = [
  { title: 'Country-specific monetization', description: 'Revenue streams adapt to each market while using shared global operating logic.' },
  { title: 'Value-linked services', description: 'Subscriptions, listings, verification, lead lock, deal lock, advertising, AI services, and enterprise offerings remain connected to city, country, and regional demand.' },
  { title: 'Global platform economics', description: 'The platform monetizes trust, discovery, investment flow, and enterprise infrastructure across regions.' },
];

export const performanceRules: BaseRule[] = [
  { title: 'Country performance', description: 'Each country is measured for growth, trust, conversion, compliance, and market readiness.' },
  { title: 'Regional performance', description: 'Regional clusters are tracked for investment velocity, demand, supply, and lead quality.' },
  { title: 'Marketplace performance', description: 'Global network metrics track cities, users, agencies, developers, leads, deals, revenue, and trust.' },
];

export const auditRules: BaseRule[] = [
  { title: 'Regional monitoring', description: 'Country and regional activity is continuously tracked for compliance and operational quality.' },
  { title: 'AI governance evidence', description: 'AI actions remain traceable for review, escalation, and audit readiness.' },
  { title: 'Investment oversight', description: 'Investment transactions and approvals remain linked to trust, compliance, and governance evidence.' },
];

export const escalationRules: EscalationRule[] = [
  { level: 1, owner: 'Regional AI', trigger: 'Local market anomaly or country-level trust issue', action: 'Investigate and trigger localized intelligence review.' },
  { level: 2, owner: 'National AI', trigger: 'Cross-city or national anomaly', action: 'Validate the issue and route to broader intelligence review.' },
  { level: 3, owner: 'Global Intelligence AI', trigger: 'Multi-country risk, compliance, or market event', action: 'Coordinate regional analysis and escalate to executive oversight.' },
  { level: 4, owner: 'AI Admin', trigger: 'Automated governance and high-risk platform event', action: 'Take policy action and route for human review.' },
  { level: 5, owner: 'Super Admin', trigger: 'Multi-region governance disruption or critical issue', action: 'Final authority for intervention and strategic response.' },
];

export const globalExpansionArchitectureVersion = '31.0.0';
