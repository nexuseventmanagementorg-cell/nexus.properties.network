export interface KnowledgeLayer {
  name: string;
  description: string;
  records: string[];
}

export interface KnowledgeRule {
  title: string;
  description: string;
}

export interface KnowledgeMetric {
  label: string;
  value: string;
}

export interface KnowledgeEscalationRule {
  level: number;
  owner: string;
  trigger: string;
  action: string;
}

export const knowledgeLayers: KnowledgeLayer[] = [
  { name: 'Platform Knowledge', description: 'The governed operating rules shared by every Nexus assistant.', records: ['Platform Rules', 'Policies', 'Pricing Plans', 'Verification Rules', 'Trust Rules', 'Governance Rules', 'Subscription Rules'] },
  { name: 'Property Knowledge', description: 'Structured knowledge about property inventory, attributes, trends, performance, and risk.', records: ['Property Types', 'Property Features', 'Property Categories', 'Property Trends', 'Property Performance', 'Property Risks'] },
  { name: 'Area Knowledge', description: 'Local intelligence describing demand, supply, growth, amenities, and area risk.', records: ['Area Profiles', 'Area Demand', 'Area Supply', 'Area Growth', 'Area Trends', 'Area Risks', 'Area Amenities'] },
  { name: 'City Knowledge', description: 'City-level profiles and signals for growth, population, demand, supply, and investment.', records: ['City Profiles', 'City Growth', 'Population', 'Demand Trends', 'Supply Trends', 'Investment Trends'] },
  { name: 'Market Knowledge', description: 'Market-wide pricing, rental, investment, trend, and risk intelligence.', records: ['Market Trends', 'Pricing Trends', 'Rental Trends', 'Investment Trends', 'Market Risks'] },
  { name: 'Lead Knowledge', description: 'Behavioral and conversion intelligence for qualification, routing, and scoring.', records: ['Lead Behaviour', 'Lead Conversion Patterns', 'Lead Quality Indicators', 'Lead Scoring Models'] },
  { name: 'Deal Knowledge', description: 'Execution intelligence for negotiation, timelines, commissions, disputes, and risk.', records: ['Negotiation Patterns', 'Deal Timelines', 'Commission Models', 'Deal Risks', 'Dispute Patterns'] },
  { name: 'Legal Knowledge', description: 'Reference knowledge for documentation, verification, compliance, and regulation.', records: ['Property Documentation', 'Verification Requirements', 'Compliance Rules', 'Regulatory Frameworks'] },
  { name: 'Business Knowledge', description: 'Operating intelligence for agencies, developers, investors, corporates, and marketplace economics.', records: ['Agency Operations', 'Developer Operations', 'Investment Models', 'Corporate Property Management', 'Marketplace Economics'] },
  { name: 'National Intelligence', description: 'Pakistan-wide property, province, city, area, investment, and growth intelligence.', records: ['Pakistan Property Data', 'Province Data', 'City Data', 'Area Data', 'Investment Data', 'Growth Data'] },
];

export const faqKnowledgeSystem = [
  '500+ FAQ Framework', 'Buyer FAQ', 'Seller FAQ', 'Agent FAQ', 'Agency FAQ', 'Developer FAQ', 'Investor FAQ', 'Corporate FAQ', 'Government FAQ', 'AI FAQ', 'Payment FAQ', 'Verification FAQ',
];

export const knowledgeSources = [
  'Platform Database', 'Property Graph', 'CRM', 'Marketplace', 'Verification Systems', 'Lead Systems', 'Deal Systems', 'Payment Systems', 'Government Data',
];

export const aiMemorySystem = [
  'User Preferences', 'Saved Searches', 'Language Preferences', 'Conversation History', 'Lead History', 'Deal History', 'Property Interests',
];

export const aiLearningSystem = [
  'Verified Outcomes', 'Successful Deals', 'User Behaviour', 'Market Activity', 'Platform Activity',
];

export const connectedAssistants = [
  'Future integrations for 54 AI Workforce Registry entries (not deployed assistants)', 'Buyer AI (proposed)', 'Seller AI (proposed)', 'Agent AI (proposed)', 'Developer AI (proposed)', 'Investor AI (proposed)', 'CRM AI (proposed)', 'WhatsApp AI (proposed)', 'AI Admin design role', 'Other proposed registry roles',
];

export const knowledgeSearchTargets = [
  'Properties', 'Areas', 'Cities', 'Leads', 'Deals', 'FAQs', 'Documents', 'Policies',
];

export const knowledgeDashboardSignals = [
  'Knowledge Usage', 'Knowledge Sources', 'Search Volume', 'Knowledge Quality', 'Answer Quality', 'Knowledge Gaps',
];

export const knowledgeRules: KnowledgeRule[] = [
  { title: 'Shared intelligence', description: 'Every assistant reads from the same approved knowledge ecosystem so answers remain aligned across roles and channels.' },
  { title: 'Context-aware retrieval', description: 'Knowledge is retrieved by user role, property context, geography, language, permissions, and conversation state.' },
  { title: 'Single source of truth', description: 'Platform, property, market, legal, and business facts are versioned rather than duplicated across assistants.' },
  { title: 'Explainable answers', description: 'AI responses can be traced back to approved sources, evidence, policies, and knowledge versions.' },
];

export const memoryRules: KnowledgeRule[] = [
  { title: 'User-controlled memory', description: 'Preferences, searches, interests, and histories improve continuity while remaining tied to permissions and consent.' },
  { title: 'Role-aware memory', description: 'Buyer, seller, agent, developer, investor, and enterprise context is kept separate and relevant.' },
  { title: 'Persistent conversation context', description: 'Conversation history and lifecycle events help assistants continue work without losing the operating context.' },
];

export const learningRules: KnowledgeRule[] = [
  { title: 'Outcome-based learning', description: 'Verified outcomes and successful deals improve recommendations, scoring, routing, and next-best actions.' },
  { title: 'Behavioral learning', description: 'User and market activity reveal changing demand, quality, conversion, and risk signals.' },
  { title: 'Governed improvement', description: 'Learning updates are reviewed, versioned, and promoted only when evidence supports the change.' },
];

export const faqRules: KnowledgeRule[] = [
  { title: 'Role-specific answers', description: 'The FAQ framework serves buyers, sellers, agents, agencies, developers, investors, corporates, government, payment, and verification workflows.' },
  { title: 'Consistent response language', description: 'FAQ answers are shared across assistants and localized for supported languages without changing the underlying policy.' },
  { title: 'Knowledge gap detection', description: 'Unresolved and repeated questions become candidates for new approved FAQ content.' },
];

export const searchRules: KnowledgeRule[] = [
  { title: 'Unified knowledge search', description: 'One search layer connects properties, areas, cities, leads, deals, FAQs, documents, and policies.' },
  { title: 'Evidence-ranked results', description: 'Search prioritizes approved, recent, relevant, verified, and permission-safe knowledge.' },
  { title: 'Cross-domain retrieval', description: 'A single question can combine property, CRM, marketplace, legal, and market context when the user is authorized.' },
];

export const governanceRules: KnowledgeRule[] = [
  { title: 'Only approved data', description: 'Assistants use governed sources and do not treat unverified information as platform truth.' },
  { title: 'No unverified sources', description: 'External or incomplete information is clearly separated from approved knowledge before it can influence an answer.' },
  { title: 'Audit logging', description: 'Knowledge retrieval, answer generation, source use, and policy events remain traceable.' },
  { title: 'Version control', description: 'Knowledge changes are reviewed, versioned, and reversible through an explicit governance process.' },
  { title: 'Human oversight', description: 'AI Admin and Super Admin retain authority over sensitive knowledge, policy, legal, and escalation decisions.' },
];

export const performanceRules: KnowledgeRule[] = [
  { title: 'Answer accuracy', description: 'Measure whether responses match approved facts, policies, and verified outcomes.' },
  { title: 'Knowledge coverage', description: 'Track whether each role, geography, workflow, and property category has sufficient knowledge.' },
  { title: 'Search success', description: 'Measure whether users and assistants find useful, relevant, and permission-safe evidence.' },
  { title: 'User satisfaction', description: 'Connect response quality to user feedback, task completion, and lifecycle outcomes.' },
  { title: 'AI confidence', description: 'Expose confidence and knowledge gaps so assistants can ask for clarification or escalate responsibly.' },
];

export const auditRules: KnowledgeRule[] = [
  { title: 'Knowledge changes', description: 'Track additions, edits, removals, approvals, and version transitions.' },
  { title: 'Knowledge usage', description: 'Record which sources and layers informed each assistant interaction.' },
  { title: 'AI responses', description: 'Preserve response and evidence trails for quality review and governance.' },
  { title: 'Knowledge sources', description: 'Monitor source health, freshness, authority, and access patterns.' },
  { title: 'Knowledge versions', description: 'Maintain a time-aware record of what the network knew when an answer was produced.' },
];

export const knowledgePerformanceMetrics: KnowledgeMetric[] = [
  { label: 'Answer Accuracy', value: 'Approved response alignment' },
  { label: 'Knowledge Coverage', value: 'Role and market completeness' },
  { label: 'Search Success', value: 'Relevant evidence retrieval' },
  { label: 'User Satisfaction', value: 'Task and conversation outcomes' },
  { label: 'AI Confidence', value: 'Evidence-backed certainty' },
];

export const escalationRules: KnowledgeEscalationRule[] = [
  { level: 1, owner: 'Knowledge AI', trigger: 'Routine retrieval, FAQ, or knowledge quality issue', action: 'Search approved sources and log the result.' },
  { level: 2, owner: 'Specialist AI', trigger: 'Domain-specific uncertainty or cross-layer knowledge gap', action: 'Review specialist evidence and provide a governed response.' },
  { level: 3, owner: 'AI Admin', trigger: 'Policy conflict, sensitive source, low confidence, or repeated gap', action: 'Review, restrict, update, or escalate the knowledge path.' },
  { level: 4, owner: 'Super Admin', trigger: 'Platform-wide knowledge governance or legal decision', action: 'Make the final human decision and approve the required change.' },
];

export const aiKnowledgeNetworkVersion = '32.0.0';
