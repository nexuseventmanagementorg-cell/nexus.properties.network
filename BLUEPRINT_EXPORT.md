# NEXUS PROPERTY NETWORK — BLUEPRINT EXPORT

> Historical source snapshot created before Phase 0. Where this export lists competing lock durations, role plans, or other policy variants, those values are `LEGACY / NON-CANONICAL`; the current policy is in [NEXUS_CANONICAL_BUSINESS_RULES_v1.0.md](./NEXUS_CANONICAL_BUSINESS_RULES_v1.0.md). This note does not rewrite the historical source excerpts below.

> Source-grounded technical export. Source code and existing reports were read only; this report is the requested new artifact. A written claim, architecture contract, runtime code path, and runtime-verified behavior are distinguished below. No values are inferred: unavailable items are marked **NOT FOUND**. Monetary amounts have no currency declared in their runtime constants (the payment service defaults payment currency to PKR, but that does not itself specify plan-price currency).

## 1. TypeScript contracts (exact source)

The project has two overlapping model layers. `services/models.ts` is the app/service record contract; `database/schemas/models.ts` is the persistence-oriented contract. Both are included verbatim because names and fields differ. `PropertyRecord` composes `LiveProperty` rather than declaring its fields inline.

### Service records — `src/services/models.ts`
```ts
import type { LiveProperty } from '../data/inventoryManager';
import type { PlatformRole, LeadStatus, DealStatus } from './platformStore';

export interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  role: PlatformRole;
  password: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  status: 'active' | 'suspended';
}

export type PropertyRecord = LiveProperty & {
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export interface LeadRecord {
  id: string;
  propertyId: string;
  title: string;
  ownerRole: PlatformRole;
  ownerId: string;
  assignedTo: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DealRecord {
  id: string;
  propertyId: string;
  title: string;
  ownerRole: PlatformRole;
  ownerId: string;
  assignedTo: string;
  status: DealStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationRecord {
  id: string;
  userId: string;
  type: 'property-created' | 'lead-created' | 'deal-created' | 'property-archived' | 'property-restored' | 'system';
  title: string;
  message: string;
  read: boolean;
  status: 'unread' | 'read';
  createdAt: string;
}

export interface MessageRecord {
  id: string;
  ownerId: string;
  threadId: string;
  direction: 'inbox' | 'sent';
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  read: boolean;
  status: 'unread' | 'read';
  createdAt: string;
}
```

### Supporting `LiveProperty` and role/status types used by service records
```ts
import { SAMPLE_PROPERTIES, SampleProperty, SamplePropertySearchFilters, SamplePropertyType } from './sampleProperties';

export type InventoryState = 'SAMPLE PROPERTY' | 'LIVE PROPERTY' | 'ARCHIVED PROPERTY';

export interface LiveProperty extends Omit<SampleProperty, 'sampleBadge' | 'sampleBadges'> {
  state: 'LIVE PROPERTY' | 'ARCHIVED PROPERTY';
  phase: string;
  features: string[];
  agent: string;
  verificationStatus: string;
  galleryImages?: string[];
}

export interface InventoryCounters {
  totalLiveListings: number;
  totalSampleListings: number;
  hiddenSampleListings: number;
  archivedListings: number;
  citiesWithoutLiveInventory: number;
}

const sameInventoryKey = (left: { city: string; area: string; phase?: string; propertyType: SamplePropertyType; areaSize: string }, right: { city: string; area: string; phase?: string; propertyType: SamplePropertyType; areaSize: string }) => (
  left.city.toLowerCase() === right.city.toLowerCase()
  && left.area.toLowerCase() === right.area.toLowerCase()
  && (left.phase || left.area).toLowerCase() === (right.phase || right.area).toLowerCase()
  && left.propertyType === right.propertyType
  && left.areaSize.toLowerCase() === right.areaSize.toLowerCase()
);

export const getHiddenSampleIds = (liveProperties: LiveProperty[] = []): Set<string> => new Set(
  SAMPLE_PROPERTIES.filter((sample) => liveProperties.some((live) => sameInventoryKey(sample, live))).map((sample) => sample.propertyId),
);

export const matchesFilters = (property: SampleProperty | LiveProperty, filters: SamplePropertySearchFilters) => {
  const matchesCity = !filters.city || property.city.toLowerCase() === filters.city.toLowerCase();
  const matchesArea = !filters.area || property.area.toLowerCase().includes(filters.area.toLowerCase());
  const matchesPhase = !filters.phase || property.phase.toLowerCase() === filters.phase.toLowerCase();
  const matchesSize = !filters.sizeText || property.areaSize.toLowerCase().replace(/\s+/g, ' ') === filters.sizeText.toLowerCase().replace(/\s+/g, ' ');
  const matchesType = !filters.propertyType || property.propertyType === filters.propertyType;
  const matchesPrice = filters.maxPriceRaw === undefined || property.priceRaw <= filters.maxPriceRaw;
  const matchesBedrooms = filters.minBedrooms === undefined || (property.bedrooms ?? 0) >= filters.minBedrooms;
  const matchesPurpose = !filters.purpose || property.purpose === filters.purpose;
  const matchesStatus = !filters.status || property.propertyStatus === filters.status;
  return matchesCity && matchesArea && matchesPhase && matchesSize && matchesType && matchesPrice && matchesBedrooms && matchesPurpose && matchesStatus;
};
```

```ts
export type SamplePropertyType = 'House' | 'Plot' | 'Commercial' | 'Apartment' | 'Investment' | 'Farm House' | 'Building' | 'Shop' | 'Office';
export type SamplePropertyStatus = 'For Sale';

export interface SampleProperty {
  propertyId: string;
  title: string;
  propertyType: SamplePropertyType;
  city: string;
  province: string;
  area: string;
  phase: string;
  price: string;
  priceRaw: number;
  areaSize: string;
  bedrooms?: number;
  bathrooms?: number;
  propertyStatus: SamplePropertyStatus;
  purpose: 'Residential' | 'Commercial' | 'Investment';
  description: string;
  image: string;
  sampleBadge?: 'SAMPLE PROPERTY' | 'DEMO LISTING' | 'FOR TESTING ONLY';
  sampleBadges?: ['SAMPLE PROPERTY', 'DEMO LISTING', 'FOR TESTING ONLY'];
  cityId: string;
  areaId: string;
}
```

`PropertyRecord` is this `SampleProperty` shape (except the optional sample-badge fields), extended by `LiveProperty` and `ownerId`, `createdAt`, `updatedAt`.

```ts
export type PlatformRole = 'Buyer' | 'Seller' | 'Agent' | 'Agency' | 'Developer' | 'Investor' | 'Industrial' | 'Corporate' | 'Government' | 'AI Admin' | 'Super Admin';
export type LeadStatus = 'New' | 'Contacted' | 'Negotiating' | 'Converted' | 'Closed' | 'Rejected';
export type DealStatus = 'Open' | 'Negotiating' | 'Pending Documents' | 'Pending Payment' | 'Completed' | 'Cancelled';
```

### Database schema contracts — `src/database/schemas/models.ts` (includes User, Property, Lead, Deal, Notification, Subscription)
```ts
export type Role = 'Buyer' | 'Seller' | 'Agent' | 'Agency' | 'Developer' | 'Investor' | 'Industrial' | 'Corporate' | 'Government' | 'AI Admin' | 'Super Admin';
export type EntityStatus = 'active' | 'inactive' | 'pending' | 'archived' | 'suspended';

export interface BaseRecord { id: string; createdAt: string; updatedAt: string; ownerId: string; status: string; auditId: string; }
export interface User extends BaseRecord { fullName: string; email: string; role: Role; verificationStatus: string; }
export interface Property extends BaseRecord { title: string; city: string; area: string; phase: string; propertyType: string; price: number; verificationStatus: string; }
export interface Lead extends BaseRecord { propertyId: string; assignedTo: string; status: string; source: string; }
export interface Deal extends BaseRecord { propertyId: string; assignedTo: string; status: string; amount?: number; }
export interface Notification extends BaseRecord { recipientId: string; type: 'success' | 'warning' | 'error' | 'system' | 'ai-alert'; title: string; message: string; read: boolean; }
export interface Message extends BaseRecord { conversationId: string; senderId: string; recipientId: string; direction: 'inbox' | 'sent'; subject: string; body: string; read: boolean; }
export interface Conversation extends BaseRecord { participantIds: string[]; channel: 'user-to-user' | 'user-to-agent' | 'agent-to-seller' | 'ai-to-user' | 'admin-to-user'; lastMessageAt: string; }
export interface Verification extends BaseRecord { entityType: 'user' | 'property' | 'deal'; entityId: string; reviewerId?: string; decision?: string; evidence: string[]; }
export interface Subscription extends BaseRecord { plan: string; billingCycle: string; provider?: string; status: 'Pending' | 'Active' | 'Expired' | 'Cancelled'; }
export interface Payment extends BaseRecord { amount: number; currency: string; provider: string; eventType: string; reference?: string; subscriptionId?: string; status: 'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'Cancelled'; }
export interface Invoice extends BaseRecord { amount: number; currency: string; type: 'Subscription Invoice' | 'Lead Lock Invoice' | 'Deal Lock Invoice' | 'Premium Listing Invoice'; reference?: string; status: 'Pending' | 'Paid' | 'Failed' | 'Cancelled'; }
```

## 2. AI workforce roster — exact `AI_EMPLOYEES` source (54 entries)

The following is the complete declaration from `src/data/nexusData.ts`, including every field present in each employee object (not only id/name/department/description).

```ts
export const AI_EMPLOYEES: AIEmployee[] = [
  // 1. Verification & Trust Squad (12)
  {
    id: 'ai-01',
    name: 'Listing Auditor AI',
    role: 'Chief Inventory Verification Agent',
    department: 'Verification & Trust',
    description: 'Cross-checks on-ground registry records, GPS boundaries, and seller ownership against national databases to eliminate fake listings.',
    avatarIcon: 'ShieldCheck',
    status: 'ONLINE',
    tasksCompleted: '284,192 Listings Verified',
    accuracy: '99.98%',
    specialization: 'Fard / Registry Verification & Cadastral Mapping'
  },
  {
    id: 'ai-02',
    name: 'Duplicate Radar AI',
    role: 'Multi-Broker Collision Neutralizer',
    department: 'Verification & Trust',
    description: 'Scans image hashes, plot coordinate overlaps, and text vectors to eradicate duplicate ghost listings across portals.',
    avatarIcon: 'CopyCheck',
    status: 'ONLINE',
    tasksCompleted: '94,820 Duplicates Purged',
    accuracy: '100.00%',
    specialization: 'Perceptual Image Hashing & Coordinate Deduping'
  },
  {
    id: 'ai-03',
    name: 'Title Deed Guardian AI',
    role: 'Chain of Custody Analyst',
    department: 'Verification & Trust',
    description: 'Traces 30-year ownership lineages, mutation history (Intiqal), and registrar stamps to identify litigation encumbrances.',
    avatarIcon: 'FileKey',
    status: 'ONLINE',
    tasksCompleted: '142,500 Titles Scanned',
    accuracy: '99.94%',
    specialization: 'Land Revenue Act & Patwari Ledger Parsing'
  },
  {
    id: 'ai-04',
    name: 'Biometric Identity AI',
    role: 'NADRA & Biometric Liaison',
    department: 'Verification & Trust',
    description: 'Validates buyer, seller, and agent CNIC data via secure zero-knowledge proof identity gates.',
    avatarIcon: 'Fingerprint',
    status: 'ONLINE',
    tasksCompleted: '310,400 Identities Verified',
    accuracy: '99.99%',
    specialization: 'Zero-Knowledge Biometric Authentication'
  },
  {
    id: 'ai-05',
    name: 'Satellite Boundary AI',
    role: 'Geospatial Satellite Auditor',
    department: 'Verification & Trust',
    description: 'Uses high-resolution multispectral satellite telemetry to check boundary demarcations and physical possession.',
    avatarIcon: 'Satellite',
    status: 'ONLINE',
    tasksCompleted: '68,230 Geospatial Audits',
    accuracy: '99.89%',
    specialization: 'Sentinel-2 & High-Res Orthomosaic Processing'
  },
  {
    id: 'ai-06',
    name: 'Agent Credential AI',
    role: 'Broker Accreditation Authority',
    department: 'Verification & Trust',
    description: 'Monitors agent performance, license validity, disciplinary history, and peer consensus scores.',
    avatarIcon: 'Award',
    status: 'ONLINE',
    tasksCompleted: '18,400 Agents Scored',
    accuracy: '99.70%',
    specialization: 'Reputation Consensus & Integrity Indexing'
  },
  {
    id: 'ai-07',
    name: 'Fraud Sentry AI',
    role: 'Anti-Impersonation Neural Radar',
    department: 'Verification & Trust',
    description: 'Real-time telemetry sentry detecting predatory bidding patterns, bot inquiries, and spoofed bank guarantees.',
    avatarIcon: 'AlertTriangle',
    status: 'ONLINE',
    tasksCompleted: '14,920 Attacks Thwarted',
    accuracy: '99.99%',
    specialization: 'Anomaly Detection & Financial Forensic AI'
  },
  {
    id: 'ai-08',
    name: 'Court Order Scanner AI',
    role: 'Civil Court Stay Order Ingestor',
    department: 'Verification & Trust',
    description: 'Monitors High Court and Civil Court dockets across 4 provinces to flag properties under stay orders or dispute.',
    avatarIcon: 'Scale',
    status: 'ONLINE',
    tasksCompleted: '840,000 Gazette & Docket Pages',
    accuracy: '99.92%',
    specialization: 'Judicial OCR & Case Law Correlation'
  },
  {
    id: 'ai-09',
    name: 'NOC Validator AI',
    role: 'Housing Authority Compliance Bot',
    department: 'Verification & Trust',
    description: 'Verifies planning approvals, layout plans, and legal approvals with RDA, LDA, CDA, KDA, and GDA.',
    avatarIcon: 'Stamp',
    status: 'ONLINE',
    tasksCompleted: '1,240 Housing Societies Scanned',
    accuracy: '100.00%',
    specialization: 'Civic Authority NOC Verification'
  },
  {
    id: 'ai-10',
    name: 'Tax Compliance AI',
    role: 'FBR & Stamp Duty Assessor',
    department: 'Verification & Trust',
    description: 'Computes Advance Tax (7E / 236K / 236C), capital gains liability, and provincial transfer duties in real-time.',
    avatarIcon: 'Calculator',
    status: 'ONLINE',
    tasksCompleted: '195,000 Tax Calculations',
    accuracy: '100.00%',
    specialization: 'FBR Income Tax Ordinance & Valuation Tables'
  },
  {
    id: 'ai-11',
    name: 'Listing Expiry Engine AI',
    role: 'Freshness & Ghost Inventory Purger',
    department: 'Verification & Trust',
    description: 'Enforces strict 14-day freshness challenges, auto-archiving sold or obsolete inventory across Pakistan.',
    avatarIcon: 'Clock',
    status: 'ONLINE',
    tasksCompleted: '52,190 Inactive Units Pruned',
    accuracy: '100.00%',
    specialization: 'Inventory Freshness Enforcement'
  },
  {
    id: 'ai-12',
    name: 'Trust Consensus AI',
    role: 'National Real Estate Ledger Validator',
    department: 'Verification & Trust',
    description: 'Aggregates signals from all verification agents to generate an immutable Trust Score for each property asset.',
    avatarIcon: 'Cpu',
    status: 'ONLINE',
    tasksCompleted: '5,420,000 Data Consensus Blocks',
    accuracy: '99.99%',
    specialization: 'Multi-Agent Consensus Protocol'
  },

  // 2. Lead & Deal Operations Squad (12)
  {
    id: 'ai-13',
    name: 'Lead Lock Guardian AI',
    role: 'Cryptographic Lead Exclusivity Sentry',
    department: 'Lead & Deal Operations',
    description: 'Pins client phone and CNIC hashes into an encrypted lock vault, guaranteeing zero lead poaching across agencies.',
    avatarIcon: 'Lock',
    status: 'ONLINE',
    tasksCompleted: '168,400 Leads Secured',
    accuracy: '100.00%',
    specialization: 'Lead Lock™ Cryptographic Enforcement'
  },
  {
    id: 'ai-14',
    name: 'Deal Lock Escrow AI',
    role: 'Transaction Milestone Orchestrator',
    department: 'Lead & Deal Operations',
    description: 'Manages multi-signature milestones, token deposits, bayana agreements, and title transfer conditions.',
    avatarIcon: 'ShieldAlert',
    status: 'ONLINE',
    tasksCompleted: '42,900 Deals Supervised',
    accuracy: '99.99%',
    specialization: 'Deal Lock™ Smart Milestones'
  },
  {
    id: 'ai-15',
    name: 'Intent Classifier AI',
    role: 'Buyer Seriousness & Intent Filter',
    department: 'Lead & Deal Operations',
    description: 'Filters casual tire-kickers from high-conviction institutional and retail capital through conversational intent matrices.',
    avatarIcon: 'Filter',
    status: 'ONLINE',
    tasksCompleted: '640,000 Inquiries Analyzed',
    accuracy: '98.8%',
    specialization: 'Natural Language Intent Scoring'
  },
  {
    id: 'ai-16',
    name: 'Budget Verifier AI',
    role: 'Financial Liquidity Qualifier',
    department: 'Lead & Deal Operations',
    description: 'Validates buyer purchasing power through voluntary bank pre-approvals or wealth bracket verification.',
    avatarIcon: 'Wallet',
    status: 'ONLINE',
    tasksCompleted: '89,300 Proofs of Funds Reviewed',
    accuracy: '99.6%',
    specialization: 'Financial Underwriting & KYC'
  },
  {
    id: 'ai-17',
    name: 'Smart Lead Router AI',
    role: 'Geographic & Expertise Matcher',
    department: 'Lead & Deal Operations',
    description: 'Routes verified leads instantaneously to the top-ranked certified local specialist in that specific sector.',
    avatarIcon: 'GitFork',
    status: 'ONLINE',
    tasksCompleted: '142,000 Precision Routes',
    accuracy: '99.1%',
    specialization: 'Hyperlocal Broker-Property Matching'
  },
  {
    id: 'ai-18',
    name: 'Commission Split AI',
    role: 'Arbitration-Free Commission Settlement',
    department: 'Lead & Deal Operations',
    description: 'Records lead origination and execution activity logs, settling inter-agent commission splits automatically upon deed registration.',
    avatarIcon: 'SplitSquareVertical',
    status: 'ONLINE',
    tasksCompleted: 'PKR 14.8B Splits Computed',
    accuracy: '100.00%',
    specialization: 'Audit Trail Attribution & Revenue Split'
  },
  {
    id: 'ai-19',
    name: 'Token Vault AI',
    role: 'Digital Bayana & Token Custodian',
    department: 'Lead & Deal Operations',
    description: 'Monitors formal token deposits into licensed escrow partner banks, issuing digital cryptographic receipts.',
    avatarIcon: 'Vault',
    status: 'ONLINE',
    tasksCompleted: 'PKR 34B Token Flow Verified',
    accuracy: '100.00%',
    specialization: 'Escrow Integration & Bank Gateways'
  },
  {
    id: 'ai-20',
    name: 'Dispute Preventer AI',
    role: 'Contract Ambiguity Resolver',
    department: 'Lead & Deal Operations',
    description: 'Pre-screens sales agreements (Iqraarnama) to eliminate vague clauses regarding payment timelines and utility dues.',
    avatarIcon: 'FileCheck2',
    status: 'ONLINE',
    tasksCompleted: '38,200 Contracts Sanitized',
    accuracy: '99.8%',
    specialization: 'Real Estate Legal Contract Standard'
  },
  {
    id: 'ai-21',
    name: 'Transfer Appointment AI',
    role: 'Society Transfer Office Coordinator',
    department: 'Lead & Deal Operations',
    description: 'Coordinates scheduling and documentation with DHA, Bahria, and Municipal Registrar offices to fast-track transfers.',
    avatarIcon: 'CalendarCheck',
    status: 'ONLINE',
    tasksCompleted: '29,400 Fast-Track Transfers',
    accuracy: '99.4%',
    specialization: 'Housing Authority SOP Orchestration'
  },
  {
    id: 'ai-22',
    name: 'Lead Reopen Arbitrator AI',
    role: 'Grace Period & Inactivity Monitor',
    department: 'Lead & Deal Operations',
    description: 'Governs fair release of locked leads if an assigned agent fails to contact or log follow-up activity within 4 hours.',
    avatarIcon: 'RotateCcw',
    status: 'ONLINE',
    tasksCompleted: '12,940 Re-allocations Handled',
    accuracy: '100.00%',
    specialization: 'SLA Tracking & Agent Performance Rules'
  },
  {
    id: 'ai-23',
    name: 'Overseas Escrow Liaison AI',
    role: 'Diaspora Remittance & Deal Bridge',
    department: 'Lead & Deal Operations',
    description: 'Provides dedicated transaction shielding for overseas Pakistanis in UK, USA, UAE, Saudi Arabia, and Canada.',
    avatarIcon: 'Globe2',
    status: 'ONLINE',
    tasksCompleted: '31,200 Overseas Deals Secured',
    accuracy: '99.9%',
    specialization: 'State Bank Roshan Digital & Foreign Inflows'
  },
  {
    id: 'ai-24',
    name: 'Deal Archive AI',
    role: 'Permanent Record Ledger',
    department: 'Lead & Deal Operations',
    description: 'Stores tamper-proof archives of all contracts, signed transfer receipts, and payment vouchers for lifetime proof.',
    avatarIcon: 'Database',
    status: 'ONLINE',
    tasksCompleted: '4.2 TB Legal Vouchers Archived',
    accuracy: '100.00%',
    specialization: 'WORM (Write Once Read Many) Ledger'
  },

  // 3. Valuation & Intelligence Squad (10)
  {
    id: 'ai-25',
    name: 'National Property Valuator AI',
    role: 'Automated Valuation Model (AVM)',
    department: 'Valuation & Intelligence',
    description: 'Synthesizes over 10M historical transactions, current demand indices, and construction costs to price any plot or home.',
    avatarIcon: 'TrendingUp',
    status: 'ONLINE',
    tasksCompleted: '4,100,000 Valuations Executed',
    accuracy: '98.9%',
    specialization: 'National AVM Neural Architecture'
  },
  {
    id: 'ai-26',
    name: 'Rental Yield Forecaster AI',
    role: 'Cashflow & Cap Rate Predictor',
    department: 'Valuation & Intelligence',
    description: 'Calculates net yield after society maintenance fees, tenant turnover probabilities, and local inflation indexes.',
    avatarIcon: 'Percent',
    status: 'ONLINE',
    tasksCompleted: '780,000 Yield Projections',
    accuracy: '97.8%',
    specialization: 'Commercial & Residential Cashflow Modeling'
  },
  {
    id: 'ai-27',
    name: 'Society Infrastructure Index AI',
    role: 'Development Progress Monitor',
    department: 'Valuation & Intelligence',
    description: 'Tracks underground electricity, sewerage, road carpeting, and commercial zone occupancy across master-planned sectors.',
    avatarIcon: 'Layers',
    status: 'ONLINE',
    tasksCompleted: '5,200 Sectors Benchmarked',
    accuracy: '99.4%',
    specialization: 'Civic Infrastructure Readiness Scoring'
  },
  {
    id: 'ai-28',
    name: 'Market Momentum Forecaster AI',
    role: 'Macro Real Estate Cycle Analyst',
    department: 'Valuation & Intelligence',
    description: 'Correlates interest rates, cement dispatches, remittance inflows, and inflation to predict cyclical price directions.',
    avatarIcon: 'Activity',
    status: 'ONLINE',
    tasksCompleted: '48 Quarterly National Forecasts',
    accuracy: '96.5%',
    specialization: 'Macroeconomic Econometric Modeling'
  },
  {
    id: 'ai-29',
    name: 'Commercial ROI AI',
    role: 'Corporate Real Estate Optimizer',
    department: 'Valuation & Intelligence',
    description: 'Models footfalls, parking accessibility, and corporate lease valuations in key business hubs like Blue Area & Gulberg.',
    avatarIcon: 'Building2',
    status: 'ONLINE',
    tasksCompleted: '14,200 Office & Retail Units',
    accuracy: '98.2%',
    specialization: 'Grade-A Commercial Underwriting'
  },
  {
    id: 'ai-30',
    name: 'Industrial Corridor AI',
    role: 'CPEC & SEZ Industrial Strategist',
    department: 'Valuation & Intelligence',
    description: 'Evaluates freight connectivity, dry port proximity, and industrial zone grid allocations for factories and warehouses.',
    avatarIcon: 'Factory',
    status: 'ONLINE',
    tasksCompleted: '3,800 Industrial Plots Mapped',
    accuracy: '99.1%',
    specialization: 'Special Economic Zone & Logistics Pricing'
  },
  {
    id: 'ai-31',
    name: 'Agri-Land Fertility AI',
    role: 'Agricultural Estate Intelligence',
    department: 'Valuation & Intelligence',
    description: 'Analyzes canal water access, tube-well water table depths, soil salinity, and yield revenues for farm acreage.',
    avatarIcon: 'Sprout',
    status: 'ONLINE',
    tasksCompleted: '450,000 Acres Surveyed',
    accuracy: '98.4%',
    specialization: 'Irrigation & Agri-Commodity Yield Model'
  },
  {
    id: 'ai-32',
    name: 'High-Rise Feasibility AI',
    role: 'Vertical Developer FAR Modeler',
    department: 'Valuation & Intelligence',
    description: 'Calculates Floor Area Ratios (FAR), setback mandates, structural load limits, and payback horizons for developers.',
    avatarIcon: 'Boxes',
    status: 'ONLINE',
    tasksCompleted: '890 High-Rise Development Models',
    accuracy: '99.6%',
    specialization: 'Zoning By-Laws & Construction Payback'
  },
  {
    id: 'ai-33',
    name: 'Heatmap Matrix AI',
    role: 'Live Demand-Supply Topographer',
    department: 'Valuation & Intelligence',
    description: 'Generates live heatmaps displaying which sectors have surging search traffic versus heavy unsold inventory.',
    avatarIcon: 'Map',
    status: 'ONLINE',
    tasksCompleted: '130+ Cities Continuous Telemetry',
    accuracy: '99.9%',
    specialization: 'Geospatial Search & Liquidity Heatmaps'
  },
  {
    id: 'ai-34',
    name: 'Construction Cost Radar AI',
    role: 'Material & Labor Inflation Tracker',
    department: 'Valuation & Intelligence',
    description: 'Tracks weekly rebar, steel, cement, brick, and labor price movements to provide instant turnkey construction budgets.',
    avatarIcon: 'Hammer',
    status: 'ONLINE',
    tasksCompleted: '2,400 Construction Quotes/Week',
    accuracy: '98.7%',
    specialization: 'Real-Time Bill of Quantities (BOQ)'
  },

  // 4. Automation & Communication Squad (10)
  {
    id: 'ai-35',
    name: 'WhatsApp AI Negotiator',
    role: '24/7 Omnichannel Messaging Engine',
    department: 'Automation & Communication',
    description: 'Engages inquiries over WhatsApp in English, Urdu, and Roman Urdu, qualifying buyers and booking private viewings.',
    welcomeMessage: `Assalamo Alaikum. Mein WhatsApp AI Negotiator hoon. Mein buyers, sellers, agents aur agencies ke darmiyan communication workflows ko support karti hoon. Mein WhatsApp conversations ko organize karne, follow-up reminders manage karne aur approved communication records maintain karne mein madad karti hoon. Mein kisi user ki taraf se final commitment nahi karti aur na hi deal finalize karti hoon. Mein sirf communication process ko support karti hoon. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'MessageCircle',
    status: 'ONLINE',
    tasksCompleted: '3,890,000 WhatsApp Conversations',
    accuracy: '99.3%',
    specialization: 'Multi-Turn Real Estate Dialogue'
  },
  {
    id: 'ai-36',
    name: 'Multilingual Voice AI',
    role: 'Speech-to-Speech Concierge',
    department: 'Automation & Communication',
    description: 'Speaks native Urdu, English, Punjabi, and Pashto with low-latency neural synthesis for phone inquiries.',
    welcomeMessage: `Assalamo Alaikum. Mein Multilingual Voice AI hoon. Mein English, Urdu aur Roman Urdu communication support karti hoon. Mein speech to text, text to speech aur multilingual conversations ko manage karti hoon. Mera maqsad users ko apni pasandeeda zuban mein Nexus istemal karne ka behtareen experience dena hai. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'Mic',
    status: 'ONLINE',
    tasksCompleted: '420,000 Minutes Voice Processed',
    accuracy: '97.9%',
    specialization: 'Regional Dialect Audio Processing'
  },
  {
    id: 'ai-37',
    name: 'Property Matching AI',
    role: 'Algorithmic Matchmaker',
    department: 'Automation & Communication',
    description: 'Learns user preferences and instantly pairs newly verified inventory with locked active buyer profiles.',
    welcomeMessage: `Assalamo Alaikum. Mein Property Matching AI hoon. Mein user requirements aur available property information ko compare karti hoon. Mein budget, location, property type aur objectives ki bunyaad par suitable options identify karne mein madad karti hoon. Mein fake recommendations generate nahi karti. Mein sirf available verified information ki bunyaad par matching provide karti hoon. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'Sparkles',
    status: 'ONLINE',
    tasksCompleted: '1,890,000 Recommendations',
    accuracy: '94.2%',
    specialization: 'Vector Similarity & Embedding Matches'
  },
  {
    id: 'ai-38',
    name: 'Automated CRM Dispatch AI',
    role: 'Broker Workflow Automator',
    department: 'Automation & Communication',
    description: 'Updates CRM records, syncs follow-up reminders, logs call outcomes, and sends branded brochures automatically.',
    welcomeMessage: `Assalamo Alaikum. Mein Automated CRM Dispatch AI hoon. Mein customer relationship workflows aur lead activity management ko organize karti hoon. Mein communication records, reminders aur workflow automation ko support karti hoon. Mera maqsad agents aur agencies ki productivity ko improve karna hai. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'Send',
    status: 'ONLINE',
    tasksCompleted: '12,400 Agency Workflows Synced',
    accuracy: '99.9%',
    specialization: 'Real Estate CRM Pipeline Automation'
  },
  {
    id: 'ai-39',
    name: 'Legal Contract Drafter AI',
    role: 'Instant Iqraarnama & Agreement Engine',
    department: 'Automation & Communication',
    description: 'Drafts bespoke, legally compliant sale contracts, tenancy agreements, and power-of-attorney templates in minutes.',
    welcomeMessage: `Assalamo Alaikum. Mein Legal Contract Drafter AI hoon. Mein property transactions ke liye required document templates aur contract workflows ke mutaliq rehnumai karti hoon. Mein legal awareness provide kar sakti hoon. Final legal review aur approval hamesha qualified legal professionals ki zimmedari hoti hai. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'FileText',
    status: 'ONLINE',
    tasksCompleted: '94,100 Legal Drafts Generated',
    accuracy: '99.8%',
    specialization: 'Pakistani Contract Law Compliant'
  },
  {
    id: 'ai-40',
    name: 'Virtual Staging & Render AI',
    role: '3D Floorplan & Spatial Visualizer',
    department: 'Automation & Communication',
    description: 'Converts simple hand sketches or raw shell photos into photorealistic 3D staged luxury interiors.',
    welcomeMessage: `Assalamo Alaikum. Mein Virtual Staging and Render AI hoon. Mein properties ke visual presentation aur digital visualization workflows ko support karti hoon. Mein virtual staging, property previews aur presentation enhancement ke mutaliq guidance provide karti hoon. Mera maqsad listings ko zyada professional aur attractive banana hai. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'Eye',
    status: 'ONLINE',
    tasksCompleted: '34,000 Spatial Tours Rendered',
    accuracy: '98.5%',
    specialization: 'Generative Diffusion & NeRF Spatial Models'
  },
  {
    id: 'ai-41',
    name: 'Omnichannel Marketing AI',
    role: 'Targeted Campaign Generator',
    department: 'Automation & Communication',
    description: 'Creates hyper-targeted social, search, and billboard ads aimed specifically at verified high-net-worth investors.',
    welcomeMessage: `Assalamo Alaikum. Mein Omnichannel Marketing AI hoon. Mein marketing campaigns aur audience engagement workflows ko support karti hoon. Mein property visibility aur promotional activities ke mutaliq guidance provide karti hoon. Mein fake engagement ya fake audience data create nahi karti. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'Megaphone',
    status: 'ONLINE',
    tasksCompleted: '18,500 Campaigns Optimized',
    accuracy: '96.8%',
    specialization: 'PropTech Performance Marketing'
  },
  {
    id: 'ai-42',
    name: 'Tenant Screening AI',
    role: 'Rental Reliability Underwriter',
    department: 'Automation & Communication',
    description: 'Conducts employment checks, prior rental references, and background verification for hassle-free leasing.',
    welcomeMessage: `Assalamo Alaikum. Mein Tenant Screening AI hoon. Mein rental applicants ke evaluation workflows ko support karti hoon. Mein available records aur approved screening processes ke mutaliq rehnumai kar sakti hoon. Final tenant approval hamesha property owner ya authorized manager ki zimmedari hoti hai. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'UserCheck',
    status: 'ONLINE',
    tasksCompleted: '84,000 Tenants Screened',
    accuracy: '99.4%',
    specialization: 'Rental Risk & Credit Assessment'
  },
  {
    id: 'ai-43',
    name: 'Lead Re-engagement AI',
    role: 'Dormant Client Reactivator',
    department: 'Automation & Communication',
    description: 'Pings past clients when matching properties hit price drops or new releases in their favorite sectors.',
    welcomeMessage: `Assalamo Alaikum. Mein Lead Re-engagement AI hoon. Mein inactive aur dormant leads ko identify karne aur follow-up opportunities organize karne mein madad karti hoon. Mera maqsad missed opportunities ko reduce karna aur communication continuity ko improve karna hai. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'RefreshCw',
    status: 'ONLINE',
    tasksCompleted: '140,000 Deals Resurrected',
    accuracy: '95.1%',
    specialization: 'Behavioral Trigger Notifications'
  },
  {
    id: 'ai-44',
    name: 'Customer Success AI',
    role: 'After-Sale Handover Concierge',
    department: 'Automation & Communication',
    description: 'Guides buyers through utility meter transfers (WAPDA/IESCO/KE, Sui Gas), society possession, and key handover.',
    welcomeMessage: `Assalamo Alaikum. Mein Customer Success AI hoon. Mein Nexus users ke overall experience ko support karti hoon. Mein onboarding, platform guidance aur post-transaction assistance ke mutaliq rehnumai karti hoon. Mera maqsad users ko Nexus ecosystem ka behtareen experience provide karna hai. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'Smile',
    status: 'ONLINE',
    tasksCompleted: '21,000 Handovers Completed',
    accuracy: '99.7%',
    specialization: 'Post-Sale Utility & Possession SOPs'
  },

  // 5. Legal & Governance Squad (10)
  {
    id: 'ai-45',
    name: 'Urban Planning Compliance AI',
    role: 'Masterplan & By-law Sentry',
    department: 'Legal & Governance',
    description: 'Ensures proposed constructions adhere to commercial zoning, setbacks, and seismic codes in major cities.',
    welcomeMessage: `Assalamo Alaikum. Mein Urban Planning Compliance AI hoon. Mein city planning regulations, zoning requirements, development controls aur approved planning frameworks ke hawale se rehnumai karti hoon. Mein housing societies, commercial developments aur large-scale projects ke compliance requirements ko explain kar sakti hoon. Mein legal approval issue nahi karti aur na hi government authority ka replacement hoon. Final approvals hamesha relevant authorities ki zimmedari hoti hain. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'Compass',
    status: 'ONLINE',
    tasksCompleted: '8,400 Architectural Checks',
    accuracy: '99.9%',
    specialization: 'Municipal By-Law Parsing'
  },
  {
    id: 'ai-46',
    name: 'AML & PEP Scanner AI',
    role: 'Anti-Money Laundering Sentry',
    department: 'Legal & Governance',
    description: 'Screening high-value transactions against national AML / FATF compliance lists and Politically Exposed Persons (PEP).',
    welcomeMessage: `Assalamo Alaikum. Mein AML and PEP Scanner AI hoon. Mera kaam Anti Money Laundering aur compliance monitoring workflows ko support karna hai. Mein unusual transaction patterns aur compliance concerns ko identify karne mein madad karti hoon. Mein kisi user ko bina evidence ke flag nahi karti. Serious compliance cases AI Admin aur authorized review teams ko escalate kiye jate hain. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'ShieldAlert',
    status: 'ONLINE',
    tasksCompleted: '100% Transactions Monitored',
    accuracy: '99.99%',
    specialization: 'FATF / FMU Anti-Money Laundering Protocols'
  },
  {
    id: 'ai-47',
    name: 'Inheritance Succession AI',
    role: 'Wirasat & Sharia Estate Splitter',
    department: 'Legal & Governance',
    description: 'Calculates complex multi-heir succession shares and succession certificates in strict accord with Islamic jurisprudence.',
    welcomeMessage: `Assalamo Alaikum. Mein Inheritance Succession AI hoon. Mein inheritance-related property workflows aur succession documentation ke mutaliq rehnumai karti hoon. Mein ownership transfer requirements aur available procedural information explain kar sakti hoon. Mein legal rulings ya inheritance decisions issue nahi karti. Final legal determination qualified legal authorities aur courts ki zimmedari hoti hai. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'GitPullRequest',
    status: 'ONLINE',
    tasksCompleted: '19,300 Succession Trees Calculated',
    accuracy: '100.00%',
    specialization: 'Sharia Inheritance Matrix & Family Law'
  },
  {
    id: 'ai-48',
    name: 'Overseas Power of Attorney AI',
    role: 'Embassy Attestation Verifier',
    department: 'Legal & Governance',
    description: 'Validates foreign embassy and Ministry of Foreign Affairs (MOFA) attestation QR codes on special powers of attorney.',
    welcomeMessage: `Assalamo Alaikum. Mein Overseas Power of Attorney AI hoon. Mein overseas Pakistanis ko documentation, authorization aur power of attorney workflows ke hawale se rehnumai karti hoon. Mein required processes aur verification requirements explain kar sakti hoon. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'FileCheck',
    status: 'ONLINE',
    tasksCompleted: '14,200 Attestation Audits',
    accuracy: '99.9%',
    specialization: 'MOFA & Overseas Consulate Attestation'
  },
  {
    id: 'ai-49',
    name: 'Environmental Clearance AI',
    role: 'Green Belt & EPA Monitor',
    department: 'Legal & Governance',
    description: 'Screens land for forest conservation borders, river flood zones, and provincial Environmental Protection Agency (EPA) rules.',
    welcomeMessage: `Assalamo Alaikum. Mein Environmental Clearance AI hoon. Mein environmental compliance aur development impact requirements ke hawale se rehnumai karti hoon. Mein sustainability aur environmental review processes ke mutaliq information provide kar sakti hoon. Final environmental approvals relevant authorities ki zimmedari hoti hain. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'Trees',
    status: 'ONLINE',
    tasksCompleted: '1,400 Mega Project Environmental Audits',
    accuracy: '99.7%',
    specialization: 'EPA & Climate Risk Assessment'
  },
  {
    id: 'ai-50',
    name: 'Developer Escrow Compliance AI',
    role: 'Off-Plan Project Account Guard',
    department: 'Legal & Governance',
    description: 'Guarantees that buyer milestone installments are strictly used for construction progress and not diverted elsewhere.',
    welcomeMessage: `Assalamo Alaikum. Mein Developer Escrow Compliance AI hoon. Mein development projects ke financial compliance aur escrow-related workflows ko monitor karne mein madad karti hoon. Mera maqsad transparency aur accountability ko support karna hai. Mein financial guarantees provide nahi karti. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'LockKeyhole',
    status: 'ONLINE',
    tasksCompleted: 'PKR 82B Escrow Drawdowns Monitored',
    accuracy: '100.00%',
    specialization: 'Off-Plan Escrow Regulatory Oversight'
  },
  {
    id: 'ai-51',
    name: 'Digital Signature Sentry AI',
    role: 'E-Sign Cryptographic Authenticator',
    department: 'Legal & Governance',
    description: 'Enforces Electronic Transactions Ordinance (ETO 2002) compliant cryptographic signatures on all digital commitments.',
    welcomeMessage: `Assalamo Alaikum. Mein Digital Signature Sentry AI hoon. Mein digital approvals, electronic signatures aur document authentication workflows ko support karti hoon. Mein authenticity verification aur document integrity awareness provide karti hoon. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'PenTool',
    status: 'ONLINE',
    tasksCompleted: '490,000 Signatures Authenticated',
    accuracy: '100.00%',
    specialization: 'ETO 2002 Compliant Public Key Crypto'
  },
  {
    id: 'ai-52',
    name: 'Property Tax Grievance AI',
    role: 'Excise & Taxation Appeal Bot',
    department: 'Legal & Governance',
    description: 'Assists property owners in reviewing unfair property tax valuations and auto-drafts formal appeal documentation.',
    welcomeMessage: `Assalamo Alaikum. Mein Property Tax Grievance AI hoon. Mein property tax records, tax-related concerns aur available appeal procedures ke mutaliq rehnumai karti hoon. Mein tax decisions ya tax waivers approve nahi karti. Mein sirf procedural guidance aur verified information provide karti hoon. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'Briefcase',
    status: 'ONLINE',
    tasksCompleted: '11,400 Appeals Prepared',
    accuracy: '98.9%',
    specialization: 'Provincial Excise & Urban Immovable Property'
  },
  {
    id: 'ai-53',
    name: 'Drone Inspection AI',
    role: 'Aerial Construction Progress Auditor',
    department: 'Legal & Governance',
    description: 'Processes photogrammetry feeds from autonomous drone passes to measure real structural completion percentages.',
    welcomeMessage: `Assalamo Alaikum. Mein Drone Inspection AI hoon. Mein property inspection workflows, aerial surveys aur site monitoring information ko support karti hoon. Mein construction progress aur site documentation ke mutaliq available information organize kar sakti hoon. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'Plane',
    status: 'ONLINE',
    tasksCompleted: '3,800 Aerial Surveys Executed',
    accuracy: '99.5%',
    specialization: 'Computer Vision Photogrammetry'
  },
  {
    id: 'ai-54',
    name: 'AI Admin Supervisory Core',
    role: 'Supreme Operating System Intelligence',
    department: 'Legal & Governance',
    description: 'The supreme supervisory node. Coordinates, monitors, and audits all 53 specialized AI agents in continuous consensus.',
    welcomeMessage: `Assalamo Alaikum. Nexus Property Network mein aap ka khush aamdeed hai. Mein AI Admin hoon. Mein Nexus OS ki supervisory intelligence hoon aur poori AI Workforce meri operational supervision mein kaam karti hai. Mera maqsad platform governance, trust infrastructure, verification workflows, lead protection systems, deal protection systems aur AI workforce operations ko monitor karna hai. Mein Nexus ecosystem ke andar hone wali critical activities ka operational oversight maintain karti hoon. Mein users, listings, leads, deals, verification requests, approvals, payments aur audit records ke mutaliq monitoring workflows ko support karti hoon. Mein kisi bhi AI Assistant ki performance aur activity ko review kar sakti hoon. Agar koi unusual activity, suspicious pattern, compliance concern ya fraud risk detect hota hai to mein us ko investigation workflow mein route karti hoon. Mein fake information generate nahi karti. Mein fake listings create nahi karti. Mein fake prices create nahi karti. Mein fake statistics create nahi karti. Mein sirf verified information aur approved Nexus records ki bunyaad par decisions support karti hoon. Agar kisi request ko meri authority se upar review ki zarurat ho to mein us ko Super Admin ke paas escalate karti hoon. Super Admin Nexus ecosystem ka final human authority hai. Mein tamam 53 AI Employees ki activities ko monitor karti hoon aur ensure karti hoon ke har AI sirf apni authorized responsibilities ke andar kaam kare. Agar aap ka sawaal kisi specific department se mutaliq hai to mein aap ko relevant specialist ke saath connect kar sakti hoon. Mein aap ki kis tarah madad kar sakti hoon?`,
    avatarIcon: 'Crown',
    status: 'ONLINE',
    tasksCompleted: '100% Platform Telemetry Orchestrated',
    accuracy: '99.999%',
    specialization: 'Master Orchestration & System Governance'
  }
];
```

## 3. Routing engine — full source

`src/utils/routingEngine.ts` as present in the worktree:
```ts
import { AI_EMPLOYEES } from '../data/nexusData';

export type RoutingLevel = 'SPECIALIST' | 'MULTI_SPECIALIST' | 'AI_ADMIN' | 'SUPER_ADMIN' | 'REJECTED';

export interface RoutingDecision {
  level: RoutingLevel;
  specialists: string[];
  reason: string;
  responsePolicy: string;
}

const names = AI_EMPLOYEES.map(employee => employee.name);
const findName = (name: string) => names.includes(name) ? name : 'AI Admin Supervisory Core';

export function routeMessage(message: string): RoutingDecision {
  const query = message.toLowerCase();

  if (/fake|guess|invent|made[- ]?up|not in database|without listing|hidden price|fake statistics/.test(query)) {
    return {
      level: 'REJECTED',
      specialists: [],
      reason: 'The request conflicts with the No Fake Listings, No Fake Prices, or No Fake Statistics laws.',
      responsePolicy: 'Use verified records only. Do not guess or fabricate.'
    };
  }

  if (/government complaint|court case|large financial dispute|system abuse|fraud investigation|national security|policy override/.test(query)) {
    return {
      level: 'SUPER_ADMIN',
      specialists: [findName('AI Admin Supervisory Core')],
      reason: 'Critical governance matter requires authorized human review.',
      responsePolicy: 'AI Admin must escalate to Super Admin. No autonomous final decision.'
    };
  }

  if (/lead\s*lock|lead theft|lead poach|client poach/.test(query)) {
    return {
      level: 'SPECIALIST',
      specialists: [findName('Lead Lock Guardian AI')],
      reason: 'Lead Lock protection request detected.',
      responsePolicy: 'Explain lead ownership, lock state, expiry, and escalation without changing unrelated property context.'
    };
  }

  if (/fake document|fake identity|commission dispute|payment fraud|ownership conflict|duplicate list|duplicate listing/.test(query)) {
    return {
      level: 'AI_ADMIN',
      specialists: [findName('AI Admin Supervisory Core')],
      reason: 'Security, ownership, payment, or fraud risk detected.',
      responsePolicy: 'Open an investigation workflow and preserve an audit record.'
    };
  }

  if (/invest|portfolio|roi|rental yield|return|capital gain/.test(query)) {
    return {
      level: 'MULTI_SPECIALIST',
      specialists: [
        findName('National Property Valuator AI'),
        findName('Rental Yield Forecaster AI'),
        findName('Market Momentum Forecaster AI'),
        findName('Property Matching AI')
      ],
      reason: 'Investment requests require combined valuation and market analysis.',
      responsePolicy: 'Generate a combined report from verified market evidence.'
    };
  }

  if (/lahore|dha|plot|house|property|villa|apartment|rent|buy|sell|listing|parcel/.test(query)) {
    return {
      level: 'SPECIALIST',
      specialists: [findName('Property Matching AI')],
      reason: 'Property search or inventory request detected.',
      responsePolicy: 'Return only available verified property information.'
    };
  }

  if (/tax|contract|legal|inheritance|succession|power of attorney|environment|zoning|planning|signature|escrow/.test(query)) {
    return {
      level: 'SPECIALIST',
      specialists: [findName('Legal Contract Drafter AI')],
      reason: 'Legal or governance workflow detected.',
      responsePolicy: 'Provide procedural guidance and route final decisions to authorized humans.'
    };
  }

  if (/lead|crm|whatsapp|follow.?up|tenant|marketing|campaign|customer/.test(query)) {
    return {
      level: 'SPECIALIST',
      specialists: [findName('Lead Re-engagement AI')],
      reason: 'Lead, communication, or customer workflow detected.',
      responsePolicy: 'Log the action and preserve lead ownership controls.'
    };
  }

  return {
    level: 'SPECIALIST',
    specialists: [findName('AI Admin Supervisory Core')],
    reason: 'General request routed to the supervisory assistant.',
    responsePolicy: 'Answer from verified records and escalate uncertainty.'
  };
}
```

## 4. Subscription service — full source

`src/services/subscriptionService.ts` as present in the worktree:
```ts
import { subscriptionRepository } from '../database/repositories/SubscriptionRepository';
import type { Subscription } from '../database/schemas/models';

export type SubscriptionPlan = 'Starter' | 'Professional' | 'Enterprise';
export type SubscriptionLifecycle = 'Pending' | 'Active' | 'Expired' | 'Cancelled';

export const subscriptionPlans: Record<SubscriptionPlan, number> = {
  Starter: 1000,
  Professional: 5000,
  Enterprise: 25000,
};

export const createSubscription = async (ownerId: string, plan: SubscriptionPlan, provider = 'JazzCash'): Promise<Subscription> => {
  const now = new Date().toISOString();
  return subscriptionRepository.save({
    id: `SUB-${Date.now()}`,
    ownerId,
    plan,
    billingCycle: 'monthly',
    provider,
    status: 'Pending',
    createdAt: now,
    updatedAt: now,
    auditId: `AUD-${Date.now()}`,
  } as Subscription);
};

export const activateSubscription = async (subscriptionId: string) => {
  const subscription = await subscriptionRepository.findById(subscriptionId);
  if (!subscription) return undefined;
  return subscriptionRepository.update(subscriptionId, { status: 'Active', updatedAt: new Date().toISOString() });
};

export const cancelSubscription = async (subscriptionId: string) => {
  const subscription = await subscriptionRepository.findById(subscriptionId);
  if (!subscription) return undefined;
  return subscriptionRepository.update(subscriptionId, { status: 'Cancelled', updatedAt: new Date().toISOString() });
};

export const getSubscriptionSummary = async () => {
  const subscriptions = await subscriptionRepository.findAll();
  return {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter((s) => s.status === 'Active').length,
    pendingSubscriptions: subscriptions.filter((s) => s.status === 'Pending').length,
    expiredSubscriptions: subscriptions.filter((s) => s.status === 'Expired').length,
  };
};
```

## 5. Authorization — exact source

`src/services/authorization.ts` as present in the worktree:
```ts
import type { PlatformRole } from './platformStore';
export type AuthorizationAction = 'read' | 'create' | 'update' | 'delete' | 'approve' | 'manage';

const permissions: Record<PlatformRole, AuthorizationAction[]> = {
  Buyer: ['read', 'create'], Seller: ['read', 'create', 'update'], Agent: ['read', 'create', 'update'], Agency: ['read', 'create', 'update', 'manage'], Developer: ['read', 'create', 'update', 'manage'], Investor: ['read', 'create'], Industrial: ['read', 'create', 'update'], Corporate: ['read', 'create', 'update', 'manage'], Government: ['read', 'approve'], 'AI Admin': ['read', 'create', 'update', 'approve', 'manage'], 'Super Admin': ['read', 'create', 'update', 'delete', 'approve', 'manage'],
};

export const can = (role: PlatformRole, action: AuthorizationAction) => permissions[role]?.includes(action) || false;
export const canRead = (role: PlatformRole) => can(role, 'read');
export const canCreate = (role: PlatformRole) => can(role, 'create');
export const canUpdate = (role: PlatformRole) => can(role, 'update');
export const canDelete = (role: PlatformRole) => can(role, 'delete');
export const canApprove = (role: PlatformRole) => can(role, 'approve');
export const canManage = (role: PlatformRole) => can(role, 'manage');
export const requirePermission = (role: PlatformRole, action: AuthorizationAction) => { if (!can(role, action)) throw new Error(`${role} is not authorized to ${action} this resource.`); };
```

## 6. Plans, pricing constants, features and limits

### Runtime price constants

`src/services/subscriptionService.ts` declares `Starter: 1000`, `Professional: 5000`, `Enterprise: 25000`; `billingCycle` is hard-coded to `'monthly'` for created subscriptions. No entitlement/feature list, quotas, seat count, listing cap, lead cap, trial length, or plan-specific usage limit is attached to these runtime plans: **NOT FOUND**. The unit/currency for those plan prices is **NOT FOUND**.

`src/services/premiumListingService.ts` separately declares:

```ts
export type PremiumListingTier = 'Featured Listing' | 'Premium Listing' | 'Developer Spotlight';

export const premiumListingTiers: Record<PremiumListingTier, number> = {
  'Featured Listing': 15000,
  'Premium Listing': 30000,
  'Developer Spotlight': 50000,
};
```

These are price constants; currency and duration are **NOT FOUND** in that service. Payment creation defaults currency to `PKR` when no currency is supplied, but does not bind that default to these constants.

### Other plan/tier copy (not runtime entitlements)

`src/architecture/Section24PaymentSubscriptionOperatingSystem.ts` lists role-oriented conceptual plans (Agent: Basic/Professional/Enterprise Agent; Agency: Basic/Professional/Enterprise Agency; Developer: Basic/Professional/Enterprise Developer; Investor: Basic/Professional/Enterprise Investor; Industrial: Basic/Professional/Enterprise Industrial; Corporate: Corporate Standard/Corporate Professional/Enterprise Custom). Its associated premium-feature lists are architectural specification only and do not map to the three runtime `subscriptionPlans` names. No prices/limits are set there. The same architecture file describes listing tiers Basic, Verified, Premium, Featured, Enterprise and their placement/reporting features; these differ from runtime `premiumListingTiers` and are not equivalent runtime price configuration.

Exact runtime subscription prices/features are therefore limited to the constants above; any other feature/limit claims are documented/UI copy unless stated otherwise.

Exact conceptual subscription and listing-tier constants from `src/architecture/Section24PaymentSubscriptionOperatingSystem.ts` (features included verbatim; no limits/caps are specified by these objects):

```ts
export const subscriptionPlans: SubscriptionPlan[] = [
  { role: 'Agent', plans: ['Basic Agent', 'Professional Agent', 'Enterprise Agent'], billingCycles, premiumFeatures: ['Lead Lock', 'Deal Lock', 'Agent AI', 'Performance Reports'] },
  { role: 'Agency', plans: ['Basic Agency', 'Professional Agency', 'Enterprise Agency'], billingCycles, premiumFeatures: ['Team Billing', 'Branch Management', 'Lead Distribution', 'Agency AI'] },
  { role: 'Developer', plans: ['Basic Developer', 'Professional Developer', 'Enterprise Developer'], billingCycles, premiumFeatures: ['Project Billing', 'Inventory Intelligence', 'Escrow Monitoring', 'Developer AI'] },
  { role: 'Investor', plans: ['Basic Investor', 'Professional Investor', 'Enterprise Investor'], billingCycles, premiumFeatures: ['ROI Intelligence', 'Portfolio Reports', 'Capital Advisory AI'] },
  { role: 'Industrial', plans: ['Basic Industrial', 'Professional Industrial', 'Enterprise Industrial'], billingCycles, premiumFeatures: ['Industrial Asset Reports', 'Land Intelligence', 'Industrial AI'] },
  { role: 'Corporate', plans: ['Corporate Standard', 'Corporate Professional', 'Enterprise Custom'], billingCycles, premiumFeatures: ['Enterprise Billing', 'Team Controls', 'Portfolio Intelligence'] },
];

export const billingCycles: BillingCycle[] = ['Monthly', 'Quarterly', 'Semi Annual', 'Yearly', 'Enterprise Custom'];

export const premiumListingTiers = [
  { tier: 'Basic Listing', features: ['Standard publication'], metrics: ['Duration', 'Views', 'Leads Generated'] },
  { tier: 'Verified Listing', features: ['Verification badge', 'Trust evidence'], metrics: ['Duration', 'Views', 'Clicks', 'Leads Generated'] },
  { tier: 'Premium Listing', features: ['Priority placement', 'Performance reporting'], metrics: ['Duration', 'Views', 'Clicks', 'Leads Generated'] },
  { tier: 'Featured Listing', features: ['Featured placement', 'Campaign insights'], metrics: ['Duration', 'Views', 'Clicks', 'Leads Generated'] },
  { tier: 'Enterprise Listing', features: ['Portfolio placement', 'Enterprise reporting'], metrics: ['Duration', 'Performance', 'Views', 'Clicks', 'Leads Generated'] },
];
```

## 7. Lead Lock and Deal Lock rules — code, architecture and UI claims

### Runtime implementation actually present

- The basic `LeadRecord` and `DealRecord` service models contain no lock duration, lock owner/state, fee, unlock actor, or unlock timestamp fields. The service-layer status unions have no dedicated `Locked` state; a status transition is not a lock enforcement system.
- `leadService.updateLead` only writes the record to local storage and emits an audit event named `lead-lock` when status is exactly `Negotiating`; `dealService.updateDeal` emits `deal-lock` when status is exactly `Pending Payment`. Neither function checks duration, payment, who may lock/unlock, eligibility, or expiry. Those status triggers are the only direct lock-related enforcement-like behavior in these services.
- `paymentService.ts` exposes `createLeadLockPayment(ownerId, amount, provider='JazzCash')` and `createDealLockPayment(ownerId, amount, provider='Bank Transfer')`. The amount is caller-supplied; no lock fee amount, duration-to-fee mapping, or unlock/refund rule is defined. They create a payment/invoice only; no lock record is activated by these helpers.

### Lead Lock — architecture specification (`src/architecture/Section22LeadLifecycleOperatingSystem.ts`)

Documented durations: 24 Hours, 48 Hours, 72 Hours, Custom.
- 24h eligibility: assigned eligible user, active verified account, no conflict or suspension. Protections: protect lead owner; prevent unauthorized reassignment; require reason for release. Audit events: created, viewed, extended, released, expired.
- 48h eligibility: qualified lead and active communication or scheduled visit. Protect active negotiation; notify owner before expiry. Audit: created, activity heartbeat, extension reason, final outcome.
- 72h eligibility: offer submitted or deal opportunity. Protect deal participation; require milestone evidence. Audit: offer/milestone linked, extension approval, completion or dispute.
- Custom: AI Admin-approved exception and documented business reason; policy-bound custom expiry and enhanced monitoring; audit exception approval, custom duration, review date, final outcome.
- Ownership text: every lead has immutable ID, created date/source/owner state/assigned user/history; only eligible users can lock an assigned lead; ownership changes require reason, authorized actor, audit event; history cannot be deleted or silently rewritten; disputes freeze destructive changes until review.
- The source also specifies qualification fields (intent, budget, timeline, type, location, urgency, completeness), a lead score 0–100 and weights 25/20/15/15/10/15 for intent/budget/timeline/verification/response/match, plus routing priorities (area, role, trust, agent, agency, developer, corporate eligibility).
- A separate narrative in `nexusData.ts` / Lead Lock UI claims a 4-hour activity/contact SLA, with release/reopen/reallocation on inactivity. This is not the same as the Section 22 lock durations. The 4-hour text has no production enforcement in `leadService`.
- **Unlock authority:** architecture requires authorized actor/reason/audit and mentions AI Admin approval for custom exception, but does not uniquely name who can perform ordinary release/unlock. **NOT FOUND**.
- **Lock fee:** no numeric fee or fee policy in the rules; payment helper accepts amount. **NOT FOUND**.

### Deal Lock — architecture specification (`src/architecture/Section23DealLifecycleOperatingSystem.ts`)

Documented durations: 3 Days, 7 Days, 15 Days, 30 Days, Custom Enterprise Lock.
- 3d eligibility: verified participant and active opportunity/visit; protect active deal context and notify participants before expiry; audit created/viewed/expired-or-released.
- 7d eligibility: offer submitted and negotiation active; protect offer/commission context, require extension reason; audit offer, extension, activity and outcome.
- 15d eligibility: agreement pending and documentation active; protect ownership history and freeze unauthorized reassignment; audit agreement, document milestones, extension approval.
- 30d eligibility: payment milestones active and completion review pending; protect settlement/contribution rights and monitor payments; audit payment, milestone and review decision.
- Custom Enterprise: AI Admin-approved exception and written business reason; custom expiry, enhanced monitoring, Super Admin escalation on conflict; audit exception approval, review date, duration, outcome.
- Ownership text requires storing deal/lead/participant/property/timeline/audit details; authorized reason/audit for participant changes; preserve ownership/contribution history; freeze destructive changes during dispute/fraud investigation.
- Commission specifications: track lead/deal owners and participating agents/agencies; claims linked to verified milestones/contributions; eligibility from audited activity rather than manual claims alone; detect theft/bypass/removal; disputed commission freeze (see exact source excerpt below).
- Payment milestone concepts: booking, advance, installment, commission, final settlement; release conditions depend on provider verification, reconciliation, no active ownership/fraud dispute, or AI Admin/authorized human approval as appropriate.
- **Unlock authority:** release appears as a lifecycle/audit event; role authority for ordinary unlock is **NOT FOUND**. **Fee:** no numeric deal-lock fee or duration pricing found; helper accepts caller-provided amount.

### UI and roster claims (not code enforcement)

`LeadLockSection.tsx` presents SHA-256 hashing of buyer CNIC/phone, zero-knowledge vault, 4-hour SLA, second-broker lockout, exclusive lock, millisecond timestamps, “zero poaching,” and AI Admin enforcement as product copy/simulation. Its anti-poach button changes component state for a short simulation; not a persisted lock. Roster descriptions in `nexusData.ts` claim cryptographic lead enforcement, 4-hour lead reopen, escrow, automatic commission settlement, and tamper-proof archive. These are not substantiated by corresponding runtime lock/escrow implementations. `DealLockSection.tsx` and `DEAL_LOCK_STAGES` describe reserved property, SHA-256 document vault, escrow, milestone tracking, e-signatures, seller payout and commissions; these are product/architecture claims, not an end-to-end implementation in `dealService`.

### Exact commission architecture rules

```ts
export const leadLockRules: LeadLockRule[] = [
  { duration: '24 Hours', eligibility: ['Assigned eligible user', 'Active verified account', 'No conflict or suspension'], protections: ['Protect lead owner', 'Prevent unauthorized reassignment', 'Require reason for release'], requiredAuditEvents: ['Lock created', 'Lock viewed', 'Lock extended', 'Lock released', 'Lock expired'] },
  { duration: '48 Hours', eligibility: ['Qualified lead', 'Active communication or scheduled visit'], protections: ['Protect active negotiation', 'Notify owner before expiry'], requiredAuditEvents: ['Lock created', 'Activity heartbeat', 'Extension reason', 'Final outcome'] },
  { duration: '72 Hours', eligibility: ['Offer submitted or deal opportunity'], protections: ['Protect deal participation', 'Require milestone evidence'], requiredAuditEvents: ['Offer linked', 'Milestone linked', 'Extension approval', 'Completion or dispute'] },
  { duration: 'Custom', eligibility: ['AI Admin-approved exception', 'Documented business reason'], protections: ['Policy-bound custom expiry', 'Enhanced monitoring'], requiredAuditEvents: ['Exception approval', 'Custom duration', 'Review date', 'Final outcome'] },
];

export const leadOwnershipRules = ['Every lead has an immutable Lead ID.', 'Every lead has a created date, source, owner state, assigned user, and history.', 'Only eligible users can lock an assigned lead.', 'Ownership changes require a reason, authorized actor, and audit event.', 'Lead history cannot be deleted or silently rewritten.', 'A dispute freezes destructive changes until review completes.'];

export const commissionRules = [
  'Track the originating lead owner and every assigned professional.',
  'Link active Lead Lock and lock history to the deal record.',
  'Record deal participation and verified milestones.',
  'Calculate commission eligibility only from audited participation.',
  'Freeze commission settlement during ownership or fraud disputes.',
  'Release approved commission only after deal and payment milestones are verified.',
];

export const dealLockRules: DealLockRule[] = [
  { duration: '3 Days', eligibility: ['Verified participant', 'Active opportunity or visit'], protections: ['Protect active deal context', 'Notify participants before expiry'], requiredAuditEvents: ['Lock created', 'Lock viewed', 'Lock expired or released'] },
  { duration: '7 Days', eligibility: ['Offer submitted', 'Negotiation active'], protections: ['Protect offer and commission context', 'Require extension reason'], requiredAuditEvents: ['Offer linked', 'Extension reason', 'Participant activity', 'Final outcome'] },
  { duration: '15 Days', eligibility: ['Agreement pending', 'Documentation active'], protections: ['Protect ownership history', 'Freeze unauthorized reassignment'], requiredAuditEvents: ['Agreement linked', 'Document milestones', 'Extension approval'] },
  { duration: '30 Days', eligibility: ['Payment milestones active', 'Completion review pending'], protections: ['Protect settlement and contribution rights', 'Monitor payment events'], requiredAuditEvents: ['Payment linked', 'Milestone reached', 'Review decision'] },
  { duration: 'Custom Enterprise Lock', eligibility: ['AI Admin-approved enterprise exception', 'Written business reason'], protections: ['Custom expiry', 'Enhanced monitoring', 'Super Admin escalation on conflict'], requiredAuditEvents: ['Exception approval', 'Review date', 'Custom duration', 'Final outcome'] },
];

export const dealOwnershipRules = ['Store Deal ID, lead source, lead owner, assigned agent, assigned agency, buyer, seller, property, timeline, and audit history.', 'Record every participant and role at the moment of participation.', 'Require authorized reason and audit event for participant changes.', 'Preserve ownership and contribution history through closure or dispute.', 'Freeze destructive changes while a dispute or fraud investigation is active.'];

export const paymentRules: PaymentRule[] = [
  { milestone: 'Booking Payment', trigger: 'Approved booking or reservation', requiredEvidence: ['Booking record', 'Buyer identity', 'Payment reference'], releaseCondition: 'Payment provider verification and deal lock active' },
  { milestone: 'Advance Payment', trigger: 'Agreement milestone', requiredEvidence: ['Agreement', 'Payment instruction', 'Parties'], releaseCondition: 'Authorized payment verification' },
  { milestone: 'Installment Payment', trigger: 'Scheduled deal milestone', requiredEvidence: ['Milestone status', 'Invoice', 'Payment reference'], releaseCondition: 'Reconciliation complete' },
  { milestone: 'Commission Payment', trigger: 'Verified commission eligibility', requiredEvidence: ['Contribution history', 'Deal milestones', 'Settlement approval'], releaseCondition: 'No active ownership or fraud dispute' },
  { milestone: 'Final Settlement', trigger: 'Completion review passed', requiredEvidence: ['Final documents', 'Completion evidence', 'Settlement statement'], releaseCondition: 'AI Admin or authorized human approval' },
];

export const commissionRules = ['Track lead owner, deal owner, participating agents, and participating agencies.', 'Link every commission claim to verified deal milestones and contribution history.', 'Calculate commission eligibility from audited participation, not manual claims alone.', 'Detect commission theft, unauthorized bypass, and participant removal.', 'Freeze disputed commission payments until resolution.', 'Publish a traceable distribution recommendation before settlement.'];
```

## 8. Role permissions — meaning and exact source

The exact source is included in Section 5 above. The permission map assigns: Buyer/Investor read+create; Seller/Agent/Industrial read+create+update; Agency/Developer/Corporate read+create+update+manage; Government read+approve; AI Admin read+create+update+approve+manage; Super Admin all six actions. This is a client-side helper; server/RLS enforcement is repeatedly listed as pending in the reports. `requirePermission` throws when the role lacks the action.

## 9. Phase and `*_REPORT.md` document inventory and extracted business rules

The following list is the union of root-level `PHASE*.md` and `*_REPORT.md` files present in the worktree at export time (deduplicated):

- `AI_QUALITY_EVALUATION_REPORT.md`
- `BROKEN_BUTTONS_REPORT.md`
- `BUILD_RECOVERY_REPORT.md`
- `CARD_IMAGE_INTEGRATION_REPORT.md`
- `IMPLEMENTATION_PHASE1_REPORT.md`
- `NEXUS_PRE_LAUNCH_CERTIFICATION_REPORT.md`
- `PHASE10_DATA_UNIFICATION_REPORT.md`
- `PHASE11_RUNTIME_VERIFICATION_REPORT.md`
- `PHASE12_AUTH_BLOCKER_AUDIT.md`
- `PHASE13_RUNTIME_RECOVERY_REPORT.md`
- `PHASE2_BACKEND_READINESS_REPORT.md`
- `PHASE3_PRODUCTION_FOUNDATION_REPORT.md`
- `PHASE4_DEPLOYMENT_READINESS_REPORT.md`
- `PHASE5_PRODUCTION_CONNECTION_REPORT.md`
- `PHASE6_PAYMENT_ENGINE_REPORT.md`
- `PHASE7_PRODUCTION_ACTIVATION_REPORT.md`
- `PHASE9_DEPENDENCY_CHECKLIST.md`
- `PHASE9_REAL_BACKEND_REPORT.md`
- `PRODUCTION_READINESS_REPORT.md`
- `SAMPLE_HIDE_LOGIC_FORENSIC_REPORT.md`
- `VIDEO_DISPLAY_FIX_REPORT.md`

### Business rules / domain claims defined in those documents

Report content is documentary evidence, not proof of runtime enforcement. Rules below preserve that distinction.

- **IMPLEMENTATION_PHASE1_REPORT.md:** 11 role dashboards; lead statuses New, Contacted, Negotiating, Converted, Closed, Rejected; deal statuses Open, Negotiating, Pending Documents, Pending Payment, Completed, Cancelled; local dashboard CRUD/assignment. Report explicitly says role authorization is UI-level and needs server-side enforcement; payments/CRM/WhatsApp/verification/notifications/audit need integrations.
- **PHASE2_BACKEND_READINESS_REPORT.md / PHASE3_PRODUCTION_FOUNDATION_REPORT.md:** backend/service contracts and 11-role permission model described; server-side authorization, secure auth, migrations, RLS, transactional delivery and audit controls remain required. These do not define lock duration/fee.
- **PHASE4_DEPLOYMENT_READINESS_REPORT.md / PHASE5_PRODUCTION_CONNECTION_REPORT.md / PHASE7_PRODUCTION_ACTIVATION_REPORT.md:** required production rules/conditions include configured credentials, real tables and RLS, storage bucket policies, email/OAuth setup, server validation and audit retention. Reported capabilities/readiness are not runtime verification; payments/webhooks/payout/reconciliation remain pending in those reports.
- **PHASE6_PAYMENT_ENGINE_REPORT.md:** named subscription plans Starter/Professional/Enterprise; lifecycle Pending/Active/Expired/Cancelled; payment providers JazzCash, Easypaisa, Bank Transfer; invoice types include Subscription, Lead Lock, Deal Lock, Premium Listing; premium categories Featured Listing, Premium Listing, Developer Spotlight. No fees, duration prices, entitlements or limits in that report.
- **PHASE9_DEPENDENCY_CHECKLIST.md / PHASE9_REAL_BACKEND_REPORT.md:** no real `.env`; Supabase URL+anon key required; service role must stay server-side; payment callbacks need server signature verification; storage bucket access policies required. Real verification not passed. It names expected tables and identifies missing properties fields (`area_size`, `bedrooms`, `purpose`, image fields) and payment fields (`event_type`, `reference`, `subscription_id`); missing RLS policy migration noted.
- **PHASE10_DATA_UNIFICATION_REPORT.md / SAMPLE_HIDE_LOGIC_FORENSIC_REPORT.md:** intended sample-hide rule is matching live inventory, and archived/deleted live inventory should restore sample visibility; forensic report says the active code path did not reliably implement this at time of that report. Matching key in source is city, area, phase (or area if no phase), type and size, case-insensitive. The report expressly marks behavior not executed/failed; do not treat expected result as observed truth.
- **PHASE11_RUNTIME_VERIFICATION_REPORT.md / PHASE12_AUTH_BLOCKER_AUDIT.md / PHASE13_RUNTIME_RECOVERY_REPORT.md:** auth registration/login requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; missing either blocks auth. Reports observed unauthenticated dashboard routes redirect to login. Phase 13 reported 18 sample cards (UI cap), live-property create via public modal, matching sample hidden on observed query, but archive workflow not performed because authentication was blocked. Reports do not establish lock-duration or fee rules.
- **AI_QUALITY_EVALUATION_REPORT.md:** quality/test dimensions include city, area, phase, type, budget, bedrooms, purpose, response wording; this is a test scope, not a separate persisted business rule unless represented in code.
- **PRODUCTION_READINESS_REPORT.md:** claims 130 city records, five generated areas per city, eight sample inventory types; deterministic filtered search fields include city, area, type, budget, bedrooms, purpose and verification status. Same report labels auth/dashboard and operational systems partial/local and lists production dependencies. This describes seed/search scope, not rules on legal eligibility or city exclusivity.
- **NEXUS_PRE_LAUNCH_CERTIFICATION_REPORT.md:** certification checklist expects verification across roles, property create/edit/archive/restore/delete, search, lead lock/unlock, deal commission, payments and mobile; items predominantly marked FAIL/not certified. It defines test expectations, not actual lock permissions/fees.
- **Other listed reports** (`BROKEN_BUTTONS_REPORT.md`, `BUILD_RECOVERY_REPORT.md`, `CARD_IMAGE_INTEGRATION_REPORT.md`, `CARD_PLACEMENT_AUDIT.md`, `POST_ANTIGRAVITY_DAMAGE_AUDIT.md`, `VIDEO_DISPLAY_FIX_REPORT.md`): presentation/build/runtime remediation scope; **NOT FOUND** any independent numeric lead/deal lock duration/fee, commission split percentage, subscription entitlement/limit, or city/area eligibility rule in the available project evidence. Their titles/technical findings are not business policy.

### City / area / phase rules found in source

`PRODUCTION_READINESS_REPORT.md` says 130 cities and five areas generated for each city, with named overrides for major markets. `src/data/sampleProperties.ts` assigns phase data to generated samples; exact live-search matching uses city equality (case-insensitive), area substring, phase equality, type equality, normalized exact size, optional max price/min bedrooms/purpose/status. No rule establishing exclusive city territories, broker area licensing, phase eligibility, or price policy was found: **NOT FOUND**. Reported 130/5/8 counts are report assertions and should be revalidated if current generated data differs.

## 10. Package dependencies and environment variable names

### `package.json` dependency maps

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.109.0",
    "lucide-react": "^1.47.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@react-three/drei": "^10.7.8",
    "@react-three/fiber": "^9.8.0",
    "@tailwindcss/postcss": "^4.3.3",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "autoprefixer": "^10.6.1",
    "gsap": "^3.15.0",
    "oxlint": "^1.81.0",
    "postcss": "^8.5.28",
    "tailwindcss": "^4.3.3",
    "three": "^0.186.0",
    "typescript": "~6.0.2",
    "vite": "^8.3.0",
    "zustand": "^5.0.15"
  }
}
```

### `.env.example` variable names (values intentionally omitted)

- `VITE_APP_NAME`
- `VITE_APP_ENV`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_SERVICE_ROLE_KEY`
- `VITE_JWT_SECRET`
- `VITE_JWT_EXPIRES_IN`
- `VITE_REFRESH_TOKEN_SECRET`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_GOOGLE_CLIENT_SECRET`
- `VITE_GOOGLE_REDIRECT_URI`
- `VITE_EMAIL_PROVIDER`
- `VITE_EMAIL_FROM`
- `VITE_STORAGE_BUCKET`
- `VITE_PAYMENT_PROVIDER`
- `VITE_PAYMENT_CALLBACK_URL`
- `VITE_PAYMENT_CALLBACK_API_URL`
- `VITE_JAZZCASH_SANDBOX_URL`
- `VITE_EASYPAISA_SANDBOX_URL`
- `VITE_STRIPE_SECRET_KEY`
- `VITE_WHATSAPP_PROVIDER`
- `VITE_WHATSAPP_TOKEN`
- `VITE_API_BASE_URL`
- `VITE_ENABLE_REAL_BACKEND`

## 11. Supabase tables and repository columns

### Tables/columns declared by `src/services/productionSql.ts`

```ts
export const productionSql = {
  users: `CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY, email TEXT UNIQUE NOT NULL, full_name TEXT, role TEXT, status TEXT DEFAULT 'active', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  properties: `CREATE TABLE IF NOT EXISTS properties (id UUID PRIMARY KEY, owner_id UUID, title TEXT, city TEXT, area TEXT, phase TEXT, property_type TEXT, price NUMERIC, status TEXT DEFAULT 'active', cover_image_url TEXT, gallery_urls JSONB DEFAULT '[]'::jsonb, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  leads: `CREATE TABLE IF NOT EXISTS leads (id UUID PRIMARY KEY, property_id UUID, owner_id UUID, assigned_to UUID, status TEXT DEFAULT 'NEW', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  deals: `CREATE TABLE IF NOT EXISTS deals (id UUID PRIMARY KEY, property_id UUID, owner_id UUID, assigned_to UUID, status TEXT DEFAULT 'OPEN', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  messages: `CREATE TABLE IF NOT EXISTS messages (id UUID PRIMARY KEY, conversation_id UUID, sender_id UUID, recipient_id UUID, body TEXT, direction TEXT, status TEXT DEFAULT 'unread', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  notifications: `CREATE TABLE IF NOT EXISTS notifications (id UUID PRIMARY KEY, recipient_id UUID, title TEXT, message TEXT, read BOOLEAN DEFAULT FALSE, status TEXT DEFAULT 'unread', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  payments: `CREATE TABLE IF NOT EXISTS payments (id UUID PRIMARY KEY, owner_id UUID, amount NUMERIC, provider TEXT, status TEXT DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  subscriptions: `CREATE TABLE IF NOT EXISTS subscriptions (id UUID PRIMARY KEY, owner_id UUID, plan TEXT, status TEXT DEFAULT 'Pending', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  verifications: `CREATE TABLE IF NOT EXISTS verifications (id UUID PRIMARY KEY, owner_id UUID, entity_type TEXT, entity_id UUID, status TEXT DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  ai_conversations: `CREATE TABLE IF NOT EXISTS ai_conversations (id UUID PRIMARY KEY, user_id UUID, session_id TEXT, role TEXT, history JSONB DEFAULT '[]'::jsonb, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  deal_commissions: `CREATE TABLE IF NOT EXISTS deal_commissions (id UUID PRIMARY KEY, deal_id UUID, amount NUMERIC, commission_type TEXT, status TEXT DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  admin_audit_log: `CREATE TABLE IF NOT EXISTS admin_audit_log (id UUID PRIMARY KEY, actor_id UUID, actor_role TEXT, action TEXT, target_type TEXT, target_id UUID, created_at TIMESTAMPTZ DEFAULT NOW());`,
  buckets: [
    'property-images',
    'avatars',
    'verification-documents',
  ],
};
```

### Repository tables and queried/filter columns

Repository Supabase operations use `select('*')` and the following explicit filter columns; common `BaseRepository` CRUD also selects/inserts/updates/deletes records by ID. The table name is the Supabase table name, not the local-storage key.

| Table | Explicit columns used by repository filters / lookup |
|---|---|
| `users` | `email` (case-insensitive lookup) |
| `properties` | `city` (case-insensitive lookup) |
| `leads` | `status` |
| `deals` | `status` |
| `subscriptions` | `status`, `plan` |
| `payments` | `status`, `owner_id` |
| `notifications` | `recipient_id`, `read` |
| `messages` | `conversation_id` |
| `invoices` | `status`, `type` |

`verifications`, `ai_conversations`, `deal_commissions`, and `admin_audit_log` are declared in `productionSql.ts` but have no matching repository in the inspected repository directory. `invoices` has a repository but is not declared in `productionSql.ts`; its migration/report is referenced elsewhere. Database column requirements beyond explicit filters are the exact SQL columns in the block above and the row fields written by services; migrations and production SQL are not fully consistent (see PHASE9_DEPENDENCY_CHECKLIST).

## 12. Business rules stated in UI/text but not implemented as corresponding runtime enforcement

The clearest text-only/specification-vs-code differences found:

1. “Zero lead theft,” cryptographic ownership, CNIC/phone hashing in a zero-knowledge vault, millisecond ownership certificate, global second-broker lockout, and exclusivity guarantees are Lead Lock UI/roster claims. No persistent lock table/schema or cryptographic lead-lock service is present.
2. The four-hour contact/activity SLA and automatic release/reopen/reallocation are stated by Lead Lock UI/AI roster and routing prose; service code does not time contacts, expire locks, or reassign a lead.
3. Architecture offers 24/48/72-hour/custom lead-lock periods and 3/7/15/30-day/custom deal locks, with eligibility/audit conditions. Those are architecture arrays, not enforced by `leadService`/`dealService`.
4. Lock/unlock fee values and who can ordinarily unlock are not specified in runtime code; payment wrappers take an arbitrary amount and don't activate locks. Numeric fee and ordinary unlock authority: **NOT FOUND**.
5. Commission guarantees, automatic splits/settlement, audited contribution percentages, escrow payout and dispute immunity appear in UI/AI roster and architecture. No actual commission calculation/split percentage, escrow integration, payment release logic, or dispute workflow exists in the runtime lock services. Commission split percentages: **NOT FOUND**.
6. AI roster text says real registry/NADRA/court/satellite/tax/housing authority data validation, 14-day listing freshness challenge/auto-archive, and model accuracy/volume metrics. Those are employee descriptions/static display data, not implemented verification adapters or a freshness scheduler in the reviewed runtime code.
7. Plan feature/limit comparisons and SaaS entitlements are **NOT FOUND** in runtime plan constants. The architecture file has conceptual premium-feature lists, but no enforcement/quotas tied to paid plans.
8. Ecosystem/UI copy promises escrow-protected tokens/bayana, title/GPS verification, zero aggressive spam, certified agents, proof-of-funds, and automated legal agreements. End-to-end services for these claims are **NOT FOUND** in this codebase; reports likewise list integrations as pending/unverified.
9. The routing engine's “verified records only / do not fabricate” is actual routing policy text, but it routes/classifies requests; it does not itself authenticate the underlying data or enforce authorization.
10. City/area seed counts and deterministic search behavior exist as data/search implementation, but no territory exclusivity or agent-specific area licensing rule was found (**NOT FOUND**).

## 13. Important verification caveat

The repository contains contradictory historical reports (e.g. early local-auth claims versus later PHASE12/13 reports showing Supabase auth hard-gated). The current source should take precedence for present implementation. Reports document claims and verification snapshots at their dates; do not interpret readiness percentages or architecture copy as current production proof. This export was generated from the checked-out worktree and does not validate an externally configured Supabase/payment environment.
