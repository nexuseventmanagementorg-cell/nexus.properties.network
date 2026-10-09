export interface OperatingLayer {
  name: string;
  description: string;
  components: string[];
}

export interface MasterMetric {
  label: string;
  value: string;
}

export interface GovernanceRule {
  owner: string;
  scope: string;
  control: string;
}

export const operatingLayers: OperatingLayer[] = [
  { name: 'User Layer', description: 'All user roles, identity, verification, trust, permissions, and role-aware dashboards.', components: ['Buyers', 'Sellers', 'Agents', 'Agencies', 'Developers', 'Investors', 'Industrial Users', 'Corporate Users', 'Government Entities', 'AI Workforce'] },
  { name: 'Property Layer', description: 'Every listing, property record, media object, document, ownership evidence, and verification event.', components: ['Properties', 'Listings', 'Media', 'Documents', 'Verification', 'Ownership'] },
  { name: 'Marketplace Layer', description: 'Cities, areas, societies, inventory, and the national property network.', components: ['Cities', 'Areas', 'Societies', 'Developers', 'Agencies', 'Agents', 'Inventory'] },
  { name: 'Lead Layer', description: 'Lead generation, qualification, routing, protection, and ownership.', components: ['Lead Creation', 'Lead Qualification', 'Lead Routing', 'Lead Lock', 'Lead Protection'] },
  { name: 'Deal Layer', description: 'Deal creation, negotiation, confirmation, documentation, and completion.', components: ['Deal Creation', 'Negotiation', 'Deal Lock', 'Commission Protection', 'Documentation', 'Completion'] },
  { name: 'Payment Layer', description: 'Monetization, subscription management, invoice settlement, and fee structures.', components: ['Subscriptions', 'Invoices', 'Transactions', 'Lead Lock Fees', 'Deal Lock Fees', 'Premium Listings', 'Revenue Systems'] },
  { name: 'CRM Layer', description: 'Contact memory, appointments, tasks, follow-ups, retention, and lifecycle management.', components: ['Contacts', 'Tasks', 'Appointments', 'Follow Ups', 'Memory', 'Retention', 'Client Lifecycle'] },
  { name: 'AI Layer', description: 'A proposed AI architecture with a 54-entry registry; deployed assistants, automation, voice systems, and production integrations are not implied.', components: ['54 AI Workforce Registry entries', 'AI Admin design role', 'AI Governance design', 'Voice Systems (proposed)', 'Automation Systems (proposed)', 'Recommendations (proposed)', 'Intelligence Systems (proposed)'] },
  { name: 'Governance Layer', description: 'Verification, compliance, trust, fraud prevention, audit, and escalation.', components: ['Verification', 'Compliance', 'Fraud Prevention', 'Trust Systems', 'Audit Systems', 'Escalation Systems'] },
  { name: 'National Intelligence Layer', description: 'City, area, market, investment, and national-level intelligence.', components: ['City Intelligence', 'Area Intelligence', 'Market Intelligence', 'Investment Intelligence', 'National Property Intelligence'] },
];

export const userLayer = ['All User Roles', 'Identity', 'Verification', 'Trust', 'Permissions', 'Dashboards'];
export const propertyLayer = ['Properties', 'Listings', 'Media', 'Documents', 'Verification', 'Ownership'];
export const marketplaceLayer = ['Cities', 'Areas', 'Societies', 'Developers', 'Agencies', 'Agents', 'Property Inventory'];
export const leadLayer = ['Lead Creation', 'Lead Qualification', 'Lead Routing', 'Lead Lock', 'Lead Protection'];
export const dealLayer = ['Deal Creation', 'Negotiation', 'Deal Lock', 'Commission Protection', 'Documentation', 'Completion'];
export const paymentLayer = ['Subscriptions', 'Invoices', 'Transactions', 'Lead Lock Fees', 'Deal Lock Fees', 'Premium Listings', 'Revenue Systems'];
export const crmLayer = ['Contacts', 'Tasks', 'Appointments', 'Follow Ups', 'Memory', 'Retention', 'Client Lifecycle'];
export const aiLayer = ['54 AI Workforce Registry entries (not production agents)', 'AI Admin design role', 'AI Governance', 'Voice Systems', 'Automation Systems', 'Recommendations', 'Intelligence Systems'];
export const governanceLayer = ['Verification', 'Compliance', 'Fraud Prevention', 'Trust Systems', 'Audit Systems', 'Escalation Systems'];
export const nationalIntelligenceLayer = ['City Intelligence', 'Area Intelligence', 'Market Intelligence', 'Investment Intelligence', 'National Property Intelligence'];

export const dataFlowRules = [
  'User → AI Qualification',
  'AI Qualification → Property Graph',
  'Property Graph → Lead System',
  'Lead System → CRM',
  'CRM → Deal System',
  'Deal System → Payment System',
  'Payment System → Audit System',
  'Audit System → National Intelligence',
];

export const aiRules = [
  'FUTURE: connect individual AI Workforce Registry entries to approved property, lead, deal, payment, CRM, marketplace, governance, and analytics tools; no 54 production integrations are implied.',
  'AI Admin supervises all AI systems and escalations.',
  'AI governance ensures policy compliance, explainability, and human oversight.',
  'Voice systems, automation systems, and recommendation systems operate under governed trust and permissions.',
];

export const governanceRules: GovernanceRule[] = [
  { owner: 'AI Admin', scope: 'AI systems, escalations, and intelligence layers', control: 'Supervises and routes all exceptions and policy events.' },
  { owner: 'Super Admin', scope: 'Marketplace, governance, revenue, expansion, and policy', control: 'Highest authority with ultimate governance decisions.' },
  { owner: 'Trust Network', scope: 'Verification, reputation, and compliance', control: 'Enforces trust scores and audit trails.' },
  { owner: 'Audit System', scope: 'All platform actions and decisions', control: 'Preserves immutable evidence for governance and compliance.' },
];

export const trustRules = ['Verification', 'Trust Scores', 'Reputation', 'Audit Trails', 'Fraud Prevention', 'Compliance'];
export const revenueRules = ['Subscriptions', 'Listings', 'Lead Locks', 'Deal Locks', 'AI Services', 'Advertising', 'Marketplace Services'];
export const expansionRules = ['Lahore', 'Punjab', 'Pakistan', 'Regional Expansion', 'Global Expansion'];
export const performanceRules = ['Users', 'Properties', 'Cities', 'Areas', 'Leads', 'Deals', 'Revenue', 'Trust Index', 'Verification Success', 'AI Success'];
export const auditRules = ['Users', 'Properties', 'Leads', 'Deals', 'Payments', 'AI Decisions', 'Governance Actions'];
export const operatingPrinciples = ['Trust First', 'Verification First', 'Lead Protection', 'Deal Protection', 'Transparency', 'AI Assisted', 'Human Oversight', 'National Coverage'];

export const masterPerformanceMetrics: MasterMetric[] = [
  { label: 'Users', value: 'Connected Role-Based Network' },
  { label: 'Properties', value: 'Verified Inventory' },
  { label: 'Cities', value: '130+ Active Nodes' },
  { label: 'Areas', value: '5,000+ Coverage Zones' },
  { label: 'Leads', value: 'Protected and Routed' },
  { label: 'Deals', value: 'Auditable Execution' },
  { label: 'Revenue', value: 'Multi-Stream Monetization' },
  { label: 'Trust Index', value: 'Calculated and Governed' },
  { label: 'Verification Success', value: 'Policy-Driven Approvals' },
  { label: 'AI Success', value: 'Intelligence and Automation Outcomes' },
];

export const masterArchitectureVersion = '30.0.0';
