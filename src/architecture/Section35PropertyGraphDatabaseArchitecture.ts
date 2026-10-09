export interface GraphNodeType {
  name: string;
  description: string;
  attributes: string[];
}

export interface GraphRule {
  title: string;
  description: string;
}

export interface GraphMetric {
  label: string;
  value: string;
}

export interface GraphEscalationRule {
  level: number;
  owner: string;
  trigger: string;
  action: string;
}

export const graphEntities = [
  'Users',
  'Properties',
  'Areas',
  'Cities',
  'Agencies',
  'Developers',
  'Leads',
  'Deals',
  'Payments',
  'AI Systems',
];

export const coreNodeTypes: GraphNodeType[] = [
  { name: 'User', description: 'Identity and behavior anchor for every role in the network.', attributes: ['Identity', 'Role', 'Trust Score', 'Verification Status', 'Preferences', 'Activity'] },
  { name: 'Property', description: 'Verified real-estate asset connected to location, ownership, media, and lifecycle.', attributes: ['Property Details', 'Category', 'Features', 'Verification', 'Ownership', 'Media', 'Status'] },
  { name: 'Area', description: 'Local market node that captures supply, demand, growth, amenities, and investment signals.', attributes: ['Area Profile', 'Demand', 'Supply', 'Growth', 'Amenities', 'Investment Rating'] },
  { name: 'City', description: 'City intelligence node for population, market, investment, and development activity.', attributes: ['Population', 'Growth', 'Market Activity', 'Investment Activity', 'Development Activity'] },
  { name: 'Province', description: 'Regional grouping for national marketplace and intelligence analysis.', attributes: ['Coverage', 'Market Signals', 'Policy Context'] },
  { name: 'Country', description: 'Jurisdiction node for global marketplace, compliance, and currency context.', attributes: ['Country Rules', 'Property Laws', 'Currency', 'Language', 'Compliance'] },
  { name: 'Agency', description: 'Professional network node connecting teams, agents, coverage, and performance.', attributes: ['Agency Profile', 'Agents', 'Cities', 'Performance', 'Trust'] },
  { name: 'Developer', description: 'Project and inventory node connecting developers to projects, units, and markets.', attributes: ['Developer Profile', 'Projects', 'Inventory', 'Cities', 'Trust'] },
  { name: 'Lead', description: 'Protected demand node connecting intent, source, qualification, routing, and conversion.', attributes: ['Lead Source', 'Lead Score', 'Lead Status', 'Lead Lock', 'Qualification Data'] },
  { name: 'Deal', description: 'Transaction node linking negotiation, commission, payment, documentation, and completion.', attributes: ['Deal Stage', 'Negotiation Status', 'Commission Status', 'Completion Status'] },
  { name: 'Payment', description: 'Financial node for invoices, transactions, subscriptions, and marketplace fees.', attributes: ['Invoices', 'Transactions', 'Subscriptions', 'Listing Payments', 'Lead Lock Fees', 'Deal Lock Fees'] },
  { name: 'Subscription', description: 'Recurring service relationship between an account and a Nexus plan.', attributes: ['Plan', 'Status', 'Billing Cycle', 'Entitlements'] },
  { name: 'Document', description: 'Evidence node for identity, property, deal, compliance, and verification workflows.', attributes: ['Type', 'Owner', 'Verification Status', 'Version', 'Audit History'] },
  { name: 'AI Assistant', description: 'Intelligence node that connects capabilities, knowledge, users, and outcomes.', attributes: ['Assistant Type', 'Capabilities', 'Knowledge Access', 'Activity History', 'Performance'] },
  { name: 'Trust Profile', description: 'Evidence-backed reputation node for identity, activity, compliance, and outcomes.', attributes: ['Trust Score', 'Verification', 'Reputation', 'Compliance', 'History'] },
];

export const relationshipTypes = [
  'USER OWNS PROPERTY',
  'USER LISTED PROPERTY',
  'USER INTERESTED IN PROPERTY',
  'USER CONTACTED AGENT',
  'AGENT MANAGES PROPERTY',
  'AGENCY MANAGES AGENT',
  'DEVELOPER BUILT PROJECT',
  'PROPERTY LOCATED IN AREA',
  'AREA LOCATED IN CITY',
  'CITY LOCATED IN PROVINCE',
  'LEAD GENERATED DEAL',
  'DEAL GENERATED PAYMENT',
  'AI ASSISTED USER',
];

export const matchingRules: GraphRule[] = [
  { title: 'Buyer matching', description: 'Match buyer intent, budget, preferences, trust, and activity to verified property and area nodes.' },
  { title: 'Seller matching', description: 'Connect seller property, category, location, and timeline to qualified demand and trusted agents.' },
  { title: 'Property matching', description: 'Rank properties against user interests, property features, investment profile, and market context.' },
  { title: 'Agent matching', description: 'Match users and properties with agents based on coverage area, specialization, trust, and performance.' },
  { title: 'Area matching', description: 'Recommend areas from demand, supply, growth, amenities, investment rating, and user purpose.' },
  { title: 'Investment matching', description: 'Connect investor profiles to opportunities using ROI, risk, growth, trust, and compliance signals.' },
];

export const recommendationRules: GraphRule[] = [
  { title: 'Recommended properties', description: 'Use graph proximity and verified attributes to suggest relevant property inventory.' },
  { title: 'Recommended areas', description: 'Surface areas that align with location preference, budget, demand, growth, and lifestyle signals.' },
  { title: 'Recommended agents', description: 'Recommend trusted agents with proven coverage and performance for the relevant property graph.' },
  { title: 'Recommended investments', description: 'Identify investment opportunities from market, property, trust, and investor relationships.' },
  { title: 'Recommended opportunities', description: 'Combine graph relationships and lifecycle signals to expose the next best action or opportunity.' },
];

export const graphSearchTargets = ['Users', 'Properties', 'Areas', 'Cities', 'Leads', 'Deals', 'Documents', 'Relationships'];

export const trustGraphSignals = ['Verification Links', 'Deal History', 'Lead History', 'Trust Scores', 'Reputation', 'Compliance'];

export const aiIntelligenceGraph = [
  '54 AI Workforce Registry entries (future integration; not production agents)',
  'Users',
  'Properties',
  'Leads',
  'Deals',
  'CRM',
  'Payments',
  'Knowledge Network',
];

export const graphAnalytics = ['Market Analytics', 'Relationship Analytics', 'Lead Analytics', 'Deal Analytics', 'Investment Analytics', 'Trust Analytics'];

export const nodeRules: GraphRule[] = [
  { title: 'Entity-first modeling', description: 'Users, properties, markets, transactions, evidence, and AI systems are represented as durable graph nodes.' },
  { title: 'Verified node state', description: 'Node quality, identity, ownership, verification, and lifecycle status remain visible to every authorized graph query.' },
  { title: 'Context-rich attributes', description: 'Nodes carry the details needed for matching, recommendations, trust, compliance, and intelligence.' },
  { title: 'Historical continuity', description: 'Node changes preserve history so the graph can explain how relationships and outcomes evolved.' },
];

export const relationshipRules: GraphRule[] = [
  { title: 'Explicit relationships', description: 'Each relationship has a clear type, direction, source, target, permission scope, and audit history.' },
  { title: 'Relationship evidence', description: 'Ownership, interest, contact, management, location, conversion, payment, and AI assistance links require supporting events.' },
  { title: 'Lifecycle-aware links', description: 'Relationships can be created, strengthened, restricted, expired, or revoked without losing their history.' },
];

export const graphRules: GraphRule[] = [
  { title: 'One intelligence backbone', description: 'The graph connects marketplace, CRM, verification, lead, deal, payment, knowledge, and AI systems.' },
  { title: 'Permission-safe traversal', description: 'Graph search only returns nodes and relationships allowed by identity, role, trust, and governance policy.' },
  { title: 'Explainable intelligence', description: 'Matches, recommendations, and analytics can show the relationships and evidence that produced them.' },
];

export const trustRules: GraphRule[] = [
  { title: 'Trust is relational', description: 'Trust reflects verified identity, property evidence, lead and deal outcomes, reputation, and compliance relationships.' },
  { title: 'History informs trust', description: 'Successful deals, protected leads, responsible activity, and verified interactions improve graph trust signals.' },
  { title: 'Trust remains governed', description: 'Trust changes are auditable, explainable, and subject to AI Admin and Super Admin oversight.' },
];

export const analyticsRules: GraphRule[] = [
  { title: 'Market analytics', description: 'Analyze supply, demand, growth, pricing, and investment relationships across areas, cities, and countries.' },
  { title: 'Lifecycle analytics', description: 'Trace lead-to-deal-to-payment paths and identify conversion, delay, and risk patterns.' },
  { title: 'Network analytics', description: 'Measure agency, developer, agent, investor, property, and user relationship strength and activity.' },
];

export const auditRules: GraphRule[] = [
  { title: 'Node changes', description: 'Track creation, updates, verification, status changes, and archival of graph nodes.' },
  { title: 'Relationship changes', description: 'Track relationship creation, updates, restriction, expiry, revocation, and evidence.' },
  { title: 'AI queries', description: 'Record graph queries used by assistants, including purpose, scope, and result context.' },
  { title: 'Graph searches', description: 'Audit user and system searches across nodes, relationships, and documents.' },
  { title: 'Recommendations', description: 'Preserve the graph evidence behind recommendations for quality and governance review.' },
];

export const graphPerformanceMetrics: GraphMetric[] = [
  { label: 'Nodes', value: 'Connected entity coverage' },
  { label: 'Relationships', value: 'Verified network depth' },
  { label: 'Queries', value: 'Graph intelligence demand' },
  { label: 'Search Success', value: 'Relevant traversal results' },
  { label: 'Matching Success', value: 'Qualified relationship matches' },
  { label: 'Recommendation Success', value: 'Useful next-best outcomes' },
];

export const escalationRules: GraphEscalationRule[] = [
  { level: 1, owner: 'Graph AI', trigger: 'Routine node, relationship, or graph search event', action: 'Execute the permission-safe query and log the result.' },
  { level: 2, owner: 'Intelligence AI', trigger: 'Matching anomaly, trust conflict, or unexplained graph pattern', action: 'Review connected evidence and route an intelligence decision.' },
  { level: 3, owner: 'AI Admin', trigger: 'Fraud, compliance, access, or platform-wide graph concern', action: 'Flag, investigate evidence, and escalate; access-restriction/approval authority is DECISION REQUIRED.' },
  { level: 4, owner: 'Super Admin', trigger: 'Critical graph governance, security, or integrity event', action: 'Apply emergency controls and make the final governance decision.' },
];

export const propertyGraphDatabaseArchitectureVersion = '35.0.0';
