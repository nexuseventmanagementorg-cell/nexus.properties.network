// src/data/nexusData.ts
import { AIEmployee, PropertyItem, CityNode, ProblemSolutionItem, UserEcosystem } from '../types';

// ==========================================
// ALL 54 AI EMPLOYEES OF NEXUS OS™
// ==========================================
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

// ==========================================
// PAKISTAN PROPERTY GRAPH DATA
// ==========================================
export const PAKISTAN_CITIES: CityNode[] = [
  {
    name: 'Islamabad',
    province: 'Islamabad Capital Territory',
    areasCount: 280,
    activeListings: 4890,
    aiTrustIndex: 99.4,
    lat: 33.6844,
    lng: 73.0479,
    topSocieties: ['DHA Islamabad-Rawalpindi', 'Bahria Town', 'Sector F-7 & F-8', 'Sector E-11', 'Blue Area Commercial', 'Gulberg Greens']
  },
  {
    name: 'Lahore',
    province: 'Punjab',
    areasCount: 650,
    activeListings: 12450,
    aiTrustIndex: 99.1,
    lat: 31.5204,
    lng: 74.3587,
    topSocieties: ['DHA Phase 1-9 & Prism', 'Gulberg I-V', 'Bahria Town Lahore', 'Johar Town', 'Model Town', 'Lake City', 'Raiwind Corridor']
  },
  {
    name: 'Karachi',
    province: 'Sindh',
    areasCount: 890,
    activeListings: 18200,
    aiTrustIndex: 98.7,
    lat: 24.8607,
    lng: 67.0011,
    topSocieties: ['DHA Karachi Phase 1-8', 'Clifton Blocks 1-9', 'Bahria Town Karachi 1 & 2', 'PECHS', 'KDA Scheme 1', 'Gulshan-e-Iqbal']
  },
  {
    name: 'Rawalpindi',
    province: 'Punjab',
    areasCount: 310,
    activeListings: 5640,
    aiTrustIndex: 98.9,
    lat: 33.5651,
    lng: 73.0169,
    topSocieties: ['Bahria Town Phase 1-8', 'Chaklala Scheme 3', 'DHA Phase 1 & 4', 'Saddar Commercial', 'Askari 14', 'Top City-1']
  },
  {
    name: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    areasCount: 190,
    activeListings: 2480,
    aiTrustIndex: 98.2,
    lat: 34.0151,
    lng: 71.5249,
    topSocieties: ['DHA Peshawar', 'Hayatabad Phases 1-7', 'University Town', 'Regi Model Town', 'Peshawar Enclave']
  },
  {
    name: 'Quetta',
    province: 'Balochistan',
    areasCount: 95,
    activeListings: 1120,
    aiTrustIndex: 97.9,
    lat: 30.1798,
    lng: 66.9750,
    topSocieties: ['DHA Quetta', 'Samungli Road', 'Cantt Area', 'Chiltan Housing', 'Zarghun Housing']
  },
  {
    name: 'Gwadar',
    province: 'Balochistan',
    areasCount: 85,
    activeListings: 1890,
    aiTrustIndex: 99.2,
    lat: 25.1216,
    lng: 62.3254,
    topSocieties: ['Gwadar Golf City', 'Marine Drive Commercial', 'New Gwadar Masterplan Zone A', 'Naval Anchorage Gwadar', 'Sangar Housing']
  },
  {
    name: 'Faisalabad',
    province: 'Punjab',
    areasCount: 220,
    activeListings: 3200,
    aiTrustIndex: 98.6,
    lat: 31.4504,
    lng: 73.1350,
    topSocieties: ['FDA City', 'Canal Road Corridor', 'Madina Town', 'Civil Lines', 'Ghafoor City']
  }
];

// ==========================================
// FLOATING 3D LUXURY PROPERTIES (SHOWCASE)
// ==========================================
export const SHOWCASE_PROPERTIES: PropertyItem[] = [
  {
    id: 'NX-9011',
    title: 'The Obsidian Signature Villa',
    city: 'Lahore',
    area: 'DHA Phase 6',
    society: 'DHA Phase 6 Block K',
    price: 'PKR 14.5 Crore',
    priceRaw: 1450,
    category: 'Buy',
    size: '1 Kanal (500 Sq Yards)',
    bedrooms: 5,
    bathrooms: 6,
    trustScore: 99.9,
    leadLockStatus: 'AVAILABLE',
    verifiedHash: '0x9E84F17C401D382B',
    featuredTag: 'Verified Title & Direct Owner Lock',
    annualRoi: '12.4% Projected',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    coordinates: [31.4682, 74.4287]
  },
  {
    id: 'NX-9012',
    title: 'Margalla Horizon Penthouse',
    city: 'Islamabad',
    area: 'Sector F-7',
    society: 'The Centaurus Sky Residences',
    price: 'PKR 8.8 Crore',
    priceRaw: 880,
    category: 'Buy',
    size: '4,200 Sq Ft',
    bedrooms: 4,
    bathrooms: 5,
    trustScore: 99.8,
    leadLockStatus: 'SECURED',
    verifiedHash: '0x7B12C94FA880193E',
    featuredTag: 'Lead Locked by AI Sentry',
    annualRoi: '10.8% Projected',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    coordinates: [33.7215, 73.0560]
  },
  {
    id: 'NX-9013',
    title: 'Creek Vista Waterfront Duplex',
    city: 'Karachi',
    area: 'DHA Phase 8',
    society: 'Creek Vista Enclave',
    price: 'PKR 11.2 Crore',
    priceRaw: 1120,
    category: 'Buy',
    size: '3,800 Sq Ft',
    bedrooms: 4,
    bathrooms: 5,
    trustScore: 99.7,
    leadLockStatus: 'AVAILABLE',
    verifiedHash: '0x5C992E389100BB4A',
    featuredTag: 'Arabian Sea Panoramic View',
    annualRoi: '13.1% Projected',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    coordinates: [24.7891, 67.0652]
  },
  {
    id: 'NX-9014',
    title: 'Apex Financial Corporate Tower Floor',
    city: 'Islamabad',
    area: 'Blue Area',
    society: 'Jinnah Avenue Commercial Core',
    price: 'PKR 24.0 Crore',
    priceRaw: 2400,
    category: 'Corporate',
    size: '10,000 Sq Ft Plate',
    trustScore: 100.0,
    leadLockStatus: 'IN_ESCROW',
    verifiedHash: '0x1F44E720B9901AC8',
    featuredTag: 'Grade-A Commercial In Deal Lock™',
    annualRoi: '14.5% Cap Rate',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    coordinates: [33.7103, 73.0645]
  },
  {
    id: 'NX-9015',
    title: 'CPEC Logistics Megaplex Warehouse',
    city: 'Gwadar',
    area: 'Free Zone North',
    society: 'Gwadar Deep Sea Port Axis',
    price: 'PKR 18.5 Crore',
    priceRaw: 1850,
    category: 'Industrial',
    size: '4 Acres (High-Bay Storage)',
    trustScore: 99.9,
    leadLockStatus: 'AVAILABLE',
    verifiedHash: '0x889241CCFE0045B1',
    featuredTag: 'Duty-Free SEZ Status Verified',
    annualRoi: '18.2% Projected Yield',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    coordinates: [25.1432, 62.3389]
  },
  {
    id: 'NX-9016',
    title: 'High-Yield Citrus & Olive Orchard Estate',
    city: 'Faisalabad',
    area: 'Samundri Road Corridor',
    society: 'Indus Agri-Basin',
    price: 'PKR 9.5 Crore',
    priceRaw: 950,
    category: 'Agriculture',
    size: '25 Acres (Perennial Canal Water)',
    trustScore: 99.4,
    leadLockStatus: 'AVAILABLE',
    verifiedHash: '0x33A900FF14B2788E',
    featuredTag: 'Soil Sensor & Satellite Verified',
    annualRoi: '16.0% Cashflow',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    coordinates: [31.3200, 73.0100]
  }
];

// ==========================================
// 10 STRUCTURAL PROBLEMS & NEXUS SOLUTIONS
// ==========================================
export const PROBLEMS_SOLVED: ProblemSolutionItem[] = [
  {
    id: 1,
    title: 'Fake Property Listings',
    crisisPoints: [
      'Same property listed by 15 different brokers at conflicting rates',
      'Phantom listings manufactured solely to harvest buyer contacts',
      'Sold listings deliberately left active for months to manipulate perception',
      'Buyers waste hundreds of hours chasing unavailable properties'
    ],
    nexusSolutions: [
      'Verification Infrastructure with Nadra & Cadastral cross-check',
      'Property Ownership Tracking with single digital title authority',
      'Perceptual Image & GPS duplicate detection engine',
      'Immutable listing audit logs and mandatory 14-day freshness challenge',
      'Listing Expiry Rules powered by AI Employee #01 & #11'
    ],
    impactMetric: 'Ghost inventory controls active',
    icon: 'ShieldOff'
  },
  {
    id: 2,
    title: 'Lead Theft & Poaching',
    crisisPoints: [
      'Unscrupulous agents intercept and poach client inquiries',
      'Buyers bombarded by dozens of competing unvetted brokers',
      'Sellers lose all faith in confidentiality and professional ethics',
      'Vicious commission disputes erupt upon deal closing'
    ],
    nexusSolutions: [
      'Lead Lock™ System: Cryptographic phone/CNIC exclusivity vault',
      'Immutable Lead Ownership Records timestamped on national graph',
      'Smart Lead Routing Engine to qualified specialist brokers',
      'Real-time Lead Activity Tracking with audit trails',
      'AI Admin Override Controls preventing multi-assignment'
    ],
    impactMetric: 'Zero Lead Leakage Across Network',
    icon: 'Lock'
  },
  {
    id: 3,
    title: 'Commission Disputes',
    crisisPoints: [
      'Zero paper or digital evidence of which broker introduced the client',
      'No formal record of who conducted buyer viewings and negotiations',
      'Multiple rogue brokers demand unearned commission splits at transfer'
    ],
    nexusSolutions: [
      'Deal Lock™ Infrastructure with cryptographic milestone signing',
      'Full Lead History Tracking with tamper-evident viewing logs',
      'Deal Ownership Records tied directly to verified digital contracts',
      'Commission Intelligence AI calculating statutory splits automatically',
      'Permanent Audit Trails admissible in court and society transfer desks'
    ],
    impactMetric: 'Dispute-aware settlement controls',
    icon: 'Scale'
  },
  {
    id: 4,
    title: 'Lack of Industry Trust',
    crisisPoints: [
      'Buyers distrust sellers over fake registry and non-existent possession',
      'Sellers fear bounced token cheques and malicious price suppression',
      'Brokers distrust agencies; investors distrust unvetted developer timelines'
    ],
    nexusSolutions: [
      '8-Layer Trust Infrastructure (Identity to Consensus Stack)',
      'Biometric Identity Verification for all counterparties',
      'Ground-truth Property & Satellite Possession Verification',
      'Cryptographic Document Vault with Zero-Knowledge proofs',
      'AI Admin Continuous Supervisory Governance'
    ],
    impactMetric: 'National Consensus Trust Score',
    icon: 'Award'
  },
  {
    id: 5,
    title: 'No National Property Database',
    crisisPoints: [
      'Data scattered across municipal registries, patwaris, and offline ledgers',
      'Zero unified national intelligence or real transaction transparency',
      'Fragmented provincial silos preventing institutional capital inflow'
    ],
    nexusSolutions: [
      'Pakistan Property Graph: Cities & 5,000+ Mapped Areas',
      'Hierarchical Province → City → Area → Society → Unit schema',
      'Unified National Property Network with standardized parcel IDs',
      'Area Intelligence Infrastructure aggregating live demand vectors',
      'Unified API for banks, institutions, and municipal authorities'
    ],
    impactMetric: 'Standardized digital parcel records',
    icon: 'Globe'
  },
  {
    id: 6,
    title: 'Unqualified Leads',
    crisisPoints: [
      'Casual browsers without budget or intent flood broker inboxes',
      'Agents spend significant working time on low-intent inquiries',
      'Deal conversion is weakened by fragmented workflows'
    ],
    nexusSolutions: [
      'AI Lead Qualification via multi-turn natural language screening',
      'Budget & Liquidity Verification before scheduling physical viewings',
      'Intent Classification algorithms scoring urgency and buying stage',
      'Predictive Lead Scoring matching verified buyers with ready sellers',
      'Smart Lead Routing ensuring high-value clients reach top performers'
    ],
    impactMetric: 'Broker closing workflow intelligence',
    icon: 'Filter'
  },
  {
    id: 7,
    title: 'Unverified Agents',
    crisisPoints: [
      'Zero barrier to entry allows rogue, unvetted actors to operate freely',
      'Agent track records, client ratings, and dispute histories remain hidden',
      'Identity spoofing and fake agency storefronts proliferate unchecked'
    ],
    nexusSolutions: [
      'Mandatory Agent Verification with biometric and background checks',
      'Agency Corporate Verification vetting business registration & tax NTN',
      'Real-time Performance Tracking across verified closed transactions',
      'Transparent Activity & Ethics History visible on agent profile',
      'Trust Infrastructure badges earned through certified milestones'
    ],
    impactMetric: 'Verified Professional Agent Tier',
    icon: 'UserCheck'
  },
  {
    id: 8,
    title: 'No Transaction Visibility',
    crisisPoints: [
      'Deals executed informally outside platforms with cash or cashiers cheques',
      'No verifiable transaction archive or pricing benchmark',
      'Zero accountability when milestones fail or possession is delayed'
    ],
    nexusSolutions: [
      'Deal Lock™ Milestone Pipeline tracking token, bayana, and final transfer',
      'Digital Document Tracking in an encrypted immutable vault',
      'Licensed Escrow Payment Tracking with banking partner integration',
      'AI Admin Monitoring ensuring milestone prerequisites are strictly met',
      'Public anonymized price indexing providing true market transparency'
    ],
    impactMetric: 'Transaction Visibility & Safety',
    icon: 'Eye'
  },
  {
    id: 9,
    title: 'Poor Investment Intelligence',
    crisisPoints: [
      'Investors forced to rely on speculative hearsay and broker hype',
      'No centralized institutional data on capital appreciation or rental yields',
      'Zero transparency on masterplan development delays or infrastructure lag'
    ],
    nexusSolutions: [
      'Investment AI: Automated Valuations & DCF cashflow underwriting',
      'Rental and capital gain intelligence based on market evidence',
      'Society Infrastructure Index tracking road carpeting, sewerage, power',
      'Macro Market Trend Intelligence correlating economic indicators',
      'Predictive Yield Maps highlighting undervalued emerging nodes'
    ],
    impactMetric: 'Institutional-Grade Investment Modeling',
    icon: 'TrendingUp'
  },
  {
    id: 10,
    title: 'Lack of Real Estate Automation',
    crisisPoints: [
      'Every task handled through manual paper slips, phone calls, and notebooks',
      'Manual lead follow-up can cause warm prospects to be lost',
      'Primitive manual property matching takes weeks to coordinate'
    ],
    nexusSolutions: [
      '54 Specialized AI Employees operating like an autonomous enterprise',
      'Automated CRM Dispatch syncing leads, tasks, and client follow-ups',
      '24/7 WhatsApp AI answering queries in Urdu, English, and Roman Urdu',
      'Algorithmic Property Matching pairing buyer vectors with seller units',
      'Automated Legal Contract Drafting generating Iqraarnama in minutes'
    ],
    impactMetric: 'Autonomous Operating System for Real Estate',
    icon: 'Cpu'
  }
];

// ==========================================
// 8-LAYER TRUST INFRASTRUCTURE
// ==========================================
export const TRUST_LAYERS = [
  {
    layer: 1,
    name: 'Identity Layer',
    badge: 'LAYER 01 // NADRA BIOMETRIC',
    description: 'Cryptographic identity attestation ensuring every buyer, seller, broker, and agency is biometrically authenticated.',
    protocols: ['NADRA Biometric API', 'Zero-Knowledge Proofs', 'NTN Corporate Verification']
  },
  {
    layer: 2,
    name: 'Property Layer',
    badge: 'LAYER 02 // CADASTRAL PARCEL MAPPING',
    description: 'Binds physical plot boundaries, GPS coordinates, and society masterplans to a single immutable digital asset representation.',
    protocols: ['Cadastral GPS Polygons', 'Patwari Fard Alignment', 'Society Allotment Ledger']
  },
  {
    layer: 3,
    name: 'Verification Layer',
    badge: 'LAYER 03 // ON-GROUND & DRONE AUDIT',
    description: 'Multi-agent consensus combining autonomous drone aerial surveys, on-ground certified field inspectors, and utility meter confirmations.',
    protocols: ['Drone Photogrammetry', 'Field Inspector Hash', 'WAPDA/SNGPL Meter Audits']
  },
  {
    layer: 4,
    name: 'Document Layer',
    badge: 'LAYER 04 // ZERO-KNOWLEDGE DIGITAL VAULT',
    description: 'Encrypts title deeds, allotment letters, NOC certificates, and transfer receipts into a tamper-evident digital vault.',
    protocols: ['SHA-256 Title Hashing', 'Zk-SNARK Document Verification', 'ETO 2002 E-Sign']
  },
  {
    layer: 5,
    name: 'Audit Layer',
    badge: 'LAYER 05 // IMMUTABLE TRANSACTION LOGS',
    description: 'Continuous audit trail logging every lead creation, viewing appointment, price negotiation, and milestone change.',
    protocols: ['Append-Only Ledger', 'Micro-Timestamping', 'Role-Based Access Control']
  },
  {
    layer: 6,
    name: 'Fraud Layer',
    badge: 'LAYER 06 // NEURAL SPOOFING & GHOST RADAR',
    description: 'Real-time neural sentry monitoring duplicate listings, predatory commission bid-rigging, and unauthorized lead transfers.',
    protocols: ['Perceptual Vector Matching', 'Sybil Attack Prevention', 'Anomalous Transaction Radar']
  },
  {
    layer: 7,
    name: 'Risk Layer',
    badge: 'LAYER 07 // LEGAL & ENCUMBRANCE SENTRY',
    description: 'Monitors civil court dockets, stay order filings, tax liabilities (7E / FBR), and municipal authority NOC status.',
    protocols: ['High Court Docket Ingestion', 'FBR 7E Tax Validator', 'Civic Authority NOC Tracker']
  },
  {
    layer: 8,
    name: 'Trust Layer',
    badge: 'LAYER 08 // NATIONAL CONSENSUS INDEX',
    description: 'The national consensus rating. A composite trust score from 0.0 to 100.0% assigned to each property and actor in Pakistan.',
    protocols: ['Multi-Agent Consensus', 'Reputation Scoring Matrix', 'National Trust Index™']
  }
];

// ==========================================
// 8-STAGE LEAD LOCK™ LIFECYCLE
// ==========================================
export const LEAD_LOCK_STAGES = [
  {
    step: '01',
    name: 'Lead Creation',
    desc: 'Buyer or seller submits inquiry via Web, WhatsApp, or API. Raw data is captured in an encrypted temporary enclave.'
  },
  {
    step: '02',
    name: 'AI Qualification',
    desc: 'Intent Classifier AI & Budget Verifier AI conduct multi-factor screening, validating buying readiness and timeline.'
  },
  {
    step: '03',
    name: 'Smart Routing',
    desc: 'Smart Lead Router AI assigns the lead to the highest-scoring verified agent specialized in that precise micro-sector.'
  },
  {
    step: '04',
    name: 'Ownership Record',
    desc: 'Cryptographic ownership certificate is minted with exact millisecond timestamp, locking agent-client pairing.'
  },
  {
    step: '05',
    name: 'Lead Lock™ Activated',
    desc: 'Lead enters full protected state. Zero poaching allowed. Other agents attempting to claim lead are instantly rejected.'
  },
  {
    step: '06',
    name: 'Activity & Grace Watch',
    desc: 'Assigned agent must log activity within 4 hours. Lead Reopen Arbitrator AI monitors SLA response times.'
  },
  {
    step: '07',
    name: 'Verified Transfer',
    desc: 'If agent requires co-brokerage or escalation, ownership is formally transferred with guaranteed revenue split.'
  },
  {
    step: '08',
    name: 'Immutable History',
    desc: 'Complete timeline archived in tamper-evident ledger for lifelong commission attribution and dispute immunity.'
  }
];

// ==========================================
// 8-STAGE DEAL LOCK™ TRANSACTION ENGINE
// ==========================================
export const DEAL_LOCK_STAGES = [
  {
    step: '01',
    name: 'Deal Creation',
    desc: 'Buyer and seller agree on commercial terms. Deal Lock™ initializes a multi-party digital transaction room.'
  },
  {
    step: '02',
    name: 'Deal Protection',
    desc: 'Property title is placed into reserved deal status. Duplicate negotiations and gazumping attempts are prevented.'
  },
  {
    step: '03',
    name: 'Document Vault',
    desc: 'Allotment letter, title deed, NOCs, and CNICs uploaded to cryptographic vault with SHA-256 verification.'
  },
  {
    step: '04',
    name: 'Token & Bayana Escrow',
    desc: 'Initial token deposit and Bayana payment deposited into licensed partner escrow, releasing digital receipt.'
  },
  {
    step: '05',
    name: 'Milestone Execution',
    desc: 'Condition milestones (FBR tax challan payment, NDC society clearance, utility NOCs) tracked sequentially.'
  },
  {
    step: '06',
    name: 'Multi-Party Approvals',
    desc: 'Buyer, seller, agent, and society registrar provide cryptographic e-signatures under ETO 2002 guidelines.'
  },
  {
    step: '07',
    name: 'Transfer & Settlement',
    desc: 'Society transfer completed; escrow funds disbursed to seller; automated commission settled to verified agents.'
  },
  {
    step: '08',
    name: 'Dispute Immunity Protocol',
    desc: 'Tamper-evident legal audit package generated, sealing transaction in national real estate history.'
  }
];

// ==========================================
// 9 USER ECOSYSTEMS
// ==========================================
export const USER_ECOSYSTEMS: UserEcosystem[] = [
  {
    id: 'buyers',
    title: 'Buyers',
    role: 'Homebuyers & Commercial Acquirers',
    headline: 'Purchase Pakistan Property with Verified Title Records',
    description: 'Never encounter a fake listing, phantom plot, or litigation trap again. Search through verified inventory protected by the 8-layer trust infrastructure.',
    features: [
      'Verified Titles & GPS Boundaries',
      'Real-time Market Valuation Comparison',
      'Zero Lead Poaching or Aggressive Spam',
      'Escrow-Protected Token & Bayana Security',
      '24/7 AI Concierge in Urdu & English'
    ],
    badge: 'CONSUMER PROTECTION TIER',
    metrics: [
      { label: 'Verified Listings', value: 'Operational' },
      { label: 'Fraud Monitoring', value: 'Active' }
    ]
  },
  {
    id: 'sellers',
    title: 'Sellers',
    role: 'Individual Owners & Asset Holders',
    headline: 'Direct Market Reach with Guaranteed Lead Exclusivity',
    description: 'List your property once on the national property network. Connect directly with qualified, pre-vetted buyers without rogue broker harassment.',
    features: [
      'Single-Authority Digital Listing Certificate',
      'Zero Duplicate Rogue Listings of Your Asset',
      'Direct Buyer Pre-Qualification & Proof of Funds',
      'Automated Legal Sales Agreement (Iqraarnama)',
      'Bank-Backed Safe Escrow Payouts'
    ],
    badge: 'ASSET PROTECTION TIER',
    metrics: [
      { label: 'Sales Workflow', value: 'Operational' },
      { label: 'Price Review', value: 'Available' }
    ]
  },
  {
    id: 'agents',
    title: 'Agents',
    role: 'Elite Certified Real Estate Brokers',
    headline: 'Your Leads Locked. Your Commissions Protected.',
    description: 'Operate with superpowers. Never worry about another agent stealing your client. Lead Lock™ ensures your hard-won buyers and commissions are legally locked to you.',
    features: [
      'Lead Lock™ Cryptographic Client Exclusivity',
      'Automatic Commission Split Enforcement',
      'AI Employees Acting as Your Back-Office',
      'Automated WhatsApp Client Engagement & Follow-Ups',
      'Verified Inventory Access Across Pakistan'
    ],
    badge: 'PROFESSIONAL BROKER OS',
    metrics: [
      { label: 'Lead Protection', value: 'Active' },
      { label: 'Commission Controls', value: 'Active' }
    ]
  },
  {
    id: 'agencies',
    title: 'Agencies',
    role: 'Brokerage Firms & Franchises',
    headline: 'Enterprise Command Center for Scaled Brokerage',
    description: 'Empower dozens or hundreds of agents with unified pipeline management, automated SLA enforcement, agent performance scoring, and corporate escrow governance.',
    features: [
      'Centralized Lead Ingestion & Smart Routing',
      'Agent SLA Tracking & Automated Re-routing',
      'Agency-Wide Commission Audit Ledger',
      'White-Label Nexus OS Client Portals',
      'Real-Time Team Telemetry & Deal Pipelines'
    ],
    badge: 'ENTERPRISE BROKERAGE',
    metrics: [
      { label: 'Team Productivity', value: '+240%' },
      { label: 'Dispute Reduction', value: '99.9%' }
    ]
  },
  {
    id: 'developers',
    title: 'Developers',
    role: 'Master Builders & High-Rise Developers',
    headline: 'National Capital Mobilization & Inventory Velocity',
    description: 'Launch off-plan projects with nationwide distribution, digital milestone escrow management, and automated sales velocity forecasting.',
    features: [
      'Digital Project Allotment & Inventory Grid',
      'Regulatory Escrow Account Compliance AI',
      'Instant Investor Reach Across Overseas Diaspora',
      'Drone Aerial Construction Audit Verification',
      'Automated Milestone Payment Reminders'
    ],
    badge: 'DEVELOPER ACCELERATOR',
    metrics: [
      { label: 'Off-Plan Sellout Speed', value: '2.8x' },
      { label: 'Investor Trust Index', value: '99.5%' }
    ]
  },
  {
    id: 'investors',
    title: 'Investors',
    role: 'Institutional Funds & High-Net-Worth Individuals',
    headline: 'Algorithmic Alpha Across Pakistan Real Estate',
    description: 'Deploy capital backed by deep macro data, predictive rental yields, society infrastructure benchmarking, and automated asset valuation models.',
    features: [
      'Predictive Capital Growth & Rental Yield Forecasts',
      'High-Yield Commercial & Bulk Plot Identification',
      'Macro Real Estate Economic Correlation Models',
      'Portfolio Rebalancing & Exit Liquidity Analysis',
      'Direct Embassy & Foreign Remittance Gateways'
    ],
    badge: 'INSTITUTIONAL CAPITAL',
    metrics: [
      { label: 'Underwritten ROI Accuracy', value: '98.9%' },
      { label: 'Institutional AUM', value: 'PKR 120B+' }
    ]
  },
  {
    id: 'industrial',
    title: 'Industrial',
    role: 'Logistics, Warehousing & SEZ Operators',
    headline: 'CPEC Corridors & Special Economic Zone Infrastructure',
    description: 'Discover and acquire industrial parcels with verified utility load allotments (gas, high-tension power, water) and dry-port connectivity.',
    features: [
      'SEZ & CPEC Logistics Corridor Telemetry',
      'Industrial Power & Gas Load Verification',
      'Highway & Freight Rail Intermodal Analysis',
      'Environmental Clearance & Zoning Audit',
      'Long-Term Land Lease & Freehold Structuring'
    ],
    badge: 'INDUSTRIAL CORRIDOR',
    metrics: [
      { label: 'Industrial Parcels', value: '3,800+' },
      { label: 'Freight Proximity Score', value: 'A+' }
    ]
  },
  {
    id: 'corporate',
    title: 'Corporate',
    role: 'Multinationals, Banks & Enterprise Tenants',
    headline: 'Grade-A Corporate Real Estate Procurement',
    description: 'Acquire and lease prime commercial headquarters with verified building safety codes, seismic engineering certifications, and parking compliance.',
    features: [
      'Grade-A Floorplate & Occupancy Modeling',
      'Corporate Lease Standard Contracting',
      'LEED & Energy Efficiency Indexing',
      'Multi-City Branch Expansion Mapping',
      'Consolidated Commercial Rent Escrow'
    ],
    badge: 'CORPORATE REAL ESTATE',
    metrics: [
      { label: 'Corporate Leases Managed', value: '1,420+' },
      { label: 'Occupancy Efficiency', value: '94.8%' }
    ]
  },
  {
    id: 'government',
    title: 'Government',
    role: 'Municipal Bodies & Land Revenue Regulators',
    headline: 'Sovereign Digital Cadastre & Revenue Integrity',
    description: 'Partnering with CDA, LDA, KDA, RDA, GDA, and Provincial Revenue Authorities to eliminate land grabbing, fraud, and tax evasion.',
    features: [
      'Digital Land Registry & Cadastral Synchronization',
      'Automated Stamp Duty & FBR 7E Tax Assessment',
      'Encroachment & Illegal Housing Society Detection',
      'Civic Masterplan Zoning Enforcement',
      'Sovereign Real Estate National Intelligence API'
    ],
    badge: 'SOVEREIGN GOVERNANCE',
    metrics: [
      { label: 'Tax Leakage Recovered', value: 'PKR 4.2B' },
      { label: 'Societies Regulated', value: '1,240+' }
    ]
  }
];
