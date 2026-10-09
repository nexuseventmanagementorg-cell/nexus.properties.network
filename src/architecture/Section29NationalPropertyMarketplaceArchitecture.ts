export type MarketplaceLayer = 'Province' | 'Division' | 'District' | 'City' | 'Zone' | 'Society' | 'Block' | 'Street' | 'Property';

export interface MarketplaceRule {
  title: string;
  description: string;
}

export interface MarketplaceMetric {
  label: string;
  value: string;
}

export interface EscalationRule {
  level: number;
  owner: string;
  trigger: string;
  action: string;
}

export const marketplaceHierarchy: MarketplaceLayer[] = ['Province', 'Division', 'District', 'City', 'Zone', 'Society', 'Block', 'Street', 'Property'];

export const provinceLayer = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad Capital Territory', 'Gilgit Baltistan', 'Azad Kashmir'];
export const cityNetworkLayer = ['130+ Cities', 'Future Unlimited Expansion', 'City Profiles', 'Growth Statistics', 'Demand Statistics', 'Supply Statistics', 'Trust Statistics'];
export const areaNetworkLayer = ['Societies', 'Blocks', 'Sectors', 'Commercial Areas', 'Industrial Areas', 'Agricultural Areas', 'Investment Zones'];
export const propertyNetworkLayer = ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Corporate', 'Government', 'Special Economic Zones', 'Mixed Use'];
export const userNetworkLayer = ['Buyers', 'Sellers', 'Agents', 'Agencies', 'Developers', 'Investors', 'Industrial Users', 'Corporate Users', 'Government Users'];

export const agentNetworkArchitecture = ['Agent Profiles', 'Trust Scores', 'Coverage Areas', 'Performance Scores', 'Lead Performance', 'Deal Performance', 'Verification Status'];
export const agencyNetworkArchitecture = ['Agency Profiles', 'Branches', 'Teams', 'Coverage Areas', 'Revenue Performance', 'Trust Scores'];
export const developerNetworkArchitecture = ['Projects', 'Units', 'Cities', 'Inventories', 'Bookings', 'Trust Scores'];
export const investmentNetworkArchitecture = ['Investment Zones', 'ROI Statistics', 'Market Trends', 'Growth Indicators', 'Risk Indicators'];
export const industrialNetworkArchitecture = ['Factories', 'Warehouses', 'Industrial Parks', 'Logistics Hubs', 'SEZs'];
export const corporateNetworkArchitecture = ['Corporate Assets', 'Portfolios', 'Facilities', 'Branches', 'Enterprise Accounts'];
export const governmentNetworkArchitecture = ['Public Records', 'Verification Services', 'Planning Data', 'Compliance Data'];

export const cityIntelligenceSystem = ['Demand', 'Supply', 'Pricing', 'Growth', 'Investments', 'Trust', 'Risk'];
export const areaIntelligenceSystem = ['Area Demand', 'Area Supply', 'Area Pricing', 'Area Growth', 'Area Trends'];

export const propertyGraphIntegration = ['Users', 'Properties', 'Areas', 'Cities', 'Leads', 'Deals', 'Payments', 'AI Systems'];
export const marketplaceSearchSystem = ['Province', 'City', 'Area', 'Society', 'Property Type', 'Budget', 'Purpose', 'Developer', 'Agency', 'Agent'];

export const aiAssistantsInvolved = ['Property AI', 'Area Intelligence AI', 'City Intelligence AI', 'Market Trend AI', 'Investment AI', 'Property Recommendation AI', 'Property Matching AI', 'National Property Intelligence AI'];

export const expansionRoadmap = ['Lahore', 'Major Punjab Cities', 'National Coverage', 'Pakistan Marketplace', 'Regional Expansion'];

export const marketplacePerformanceMetrics: MarketplaceMetric[] = [
  { label: 'Total Cities', value: '130+' },
  { label: 'Total Areas', value: '5,000+' },
  { label: 'Total Properties', value: 'Dynamic Inventory' },
  { label: 'Total Users', value: 'Connected Network' },
  { label: 'Total Agencies', value: 'National Scale' },
  { label: 'Total Developers', value: 'Verified Projects' },
  { label: 'Total Leads', value: 'Protected Pipeline' },
  { label: 'Total Deals', value: 'Cross-City Flow' },
  { label: 'Marketplace Revenue', value: 'Multi-Layer Monetization' },
];

export const marketplaceRules: MarketplaceRule[] = [
  { title: 'National network model', description: 'Every property, area, city, and user is represented in a single governed national marketplace graph.' },
  { title: 'Evidence-first market creation', description: 'Cities and areas are only activated after verified data, trust evidence, and role authorization are in place.' },
  { title: 'Local intelligence + national routing', description: 'Area intelligence remains local while routing and decisioning can scale to national marketplace operations.' },
  { title: 'Unified buyer and seller identity', description: 'Users are tracked across province, city, area, and property interactions without duplication.' },
];

export const cityRules = ['Each city maintains a dedicated profile with growth, demand, supply, trust, and risk indicators.', 'City intelligence updates in real time as inquiries, pricing signals, listings, and investment patterns change.', 'A city can become a national growth node when trust, inventory quality, and conversion metrics align.', 'Market anomalies are flagged automatically to AI Admin for investigation.'];
export const areaRules = ['Each area stores societies, blocks, sectors, commercial zones, industrial zones, and investment hotspots.', 'Area demand and supply scoring remain local but are connected to national price and growth signals.', 'Area trust, pricing, and growth are reviewed before advanced recommendation or investment routing.', 'Government and planning layers remain linked to public record checks.'];
export const propertyRules = ['Each property remains connected to its city, area, society, block, street, and ownership context.', 'Residential, commercial, industrial, agricultural, corporate, and government assets share one marketplace property graph.', 'Property trust, location, title, and verification evidence remain immutable on publication.', 'Special Economic Zones and mixed-use assets are routed through sector-specific verification and governance layers.'];
export const networkRules = ['Buyers, sellers, agents, agencies, developers, investors, industrial users, corporate users, and government users each use role-aware access.', 'Every network relationship is tracked through trust, performance, compliance, and governing audits.', 'Cross-network recommendations are generated only from verified evidence, permissions, and market context.', 'Platform duplicates, ghost listings, and unauthorized lead sharing are blocked by design.'];
export const searchRules = ['Search by province, city, area, society, property type, budget, purpose, developer, agency, or agent.', 'Marketplace search prioritizes verified inventory and policy-compliant matches before broad recommendations.', 'Local preference and city graph context determine the most relevant result order.', 'Search and recommendation activity remain linked to user role, trust, and permission scope.'];
export const performanceRules = ['Market performance is measured by city coverage, area depth, property quality, trust signals, and conversion efficiency.', 'Each city and area is scored using demand, supply, pricing, growth, risk, and trust metrics.', 'Deal and lead performance remain traceable to city, area, agent, agency, and conversion path.', 'National metrics remain auditable and explainable for AI decisions and human oversight.'];
export const expansionRules = ['Phase 1: Lahore', 'Phase 2: Major Punjab Cities', 'Phase 3: National Coverage', 'Phase 4: Pakistan Marketplace', 'Phase 5: Regional Expansion'];
export const auditRules = ['Marketplace Changes', 'City Changes', 'Area Changes', 'Property Changes', 'Network Changes', 'AI Decisions'];

export const escalationRules: EscalationRule[] = [
  { level: 1, owner: 'Marketplace AI', trigger: 'Routine marketplace or search change', action: 'Create update and log market event.' },
  { level: 2, owner: 'Area Intelligence AI', trigger: 'Area pricing, demand, or growth anomaly', action: 'Review local signal and route to national intelligence.' },
  { level: 3, owner: 'National Property Intelligence AI', trigger: 'Cross-city, cross-area, or national anomaly', action: 'Validate and escalate with market evidence.' },
  { level: 4, owner: 'AI Admin', trigger: 'Trust, fraud, compliance, or network policy concern', action: 'Review, flag, recommend, and escalate; freeze/decision authority is DECISION REQUIRED.' },
  { level: 5, owner: 'Authorized human reviewer (role and authority DECISION REQUIRED)', trigger: 'Platform-wide governance or unresolved national issue', action: 'Final human decision within approved authority.' },
];

export const nationalPropertyMarketplaceArchitectureVersion = '29.0.0';
