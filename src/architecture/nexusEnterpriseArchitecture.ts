export type RoadmapStatus = 'Blueprint' | 'Ready for implementation' | 'Dependency pending';

export interface RoadmapPhase {
  id: string;
  title: string;
  progress: string;
  status: RoadmapStatus;
  dependencies: string[];
  milestones: string[];
}

export const developmentRoadmap: RoadmapPhase[] = [
  { id: 'A', title: 'Authentication System', progress: 'Blueprint complete', status: 'Ready for implementation', dependencies: ['Identity provider', 'Role policy service'], milestones: ['Email and password auth', 'Google OAuth', 'Role selection and verification'] },
  { id: 'B', title: 'Database System', progress: 'Schema defined', status: 'Ready for implementation', dependencies: ['PostgreSQL', 'Object storage', 'Migration runner'], milestones: ['Core relational schema', 'Indexes and constraints', 'Audit retention policy'] },
  { id: 'C', title: 'Role Dashboards', progress: 'Blueprint complete', status: 'Dependency pending', dependencies: ['Authentication', 'Permission service'], milestones: ['Buyer and seller workspaces', 'Agent and agency workspaces', 'Admin governance views'] },
  { id: 'D', title: 'Property Management System', progress: 'Blueprint complete', status: 'Dependency pending', dependencies: ['Database', 'Verification workflow', 'Object storage'], milestones: ['Property intake', 'Document verification', 'Inventory lifecycle'] },
  { id: 'E', title: 'Lead Lock System', progress: 'Architecture complete', status: 'Dependency pending', dependencies: ['Property system', 'Identity verification', 'Audit logs'], milestones: ['Lead creation', 'Ownership lock', 'Authorized release workflow'] },
  { id: 'F', title: 'Deal Lock System', progress: 'Architecture complete', status: 'Dependency pending', dependencies: ['Lead Lock', 'Payment service', 'E-signature provider'], milestones: ['Deal room', 'Milestone tracking', 'Completion and commission settlement'] },
  { id: 'G', title: 'Payment System', progress: 'Provider matrix defined', status: 'Dependency pending', dependencies: ['KYC policy', 'Payment providers', 'Invoice service'], milestones: ['JazzCash and EasyPaisa', 'Bank transfer reconciliation', 'Card payment verification'] },
  { id: 'H', title: 'AI Memory Engine', progress: 'Data contract defined', status: 'Dependency pending', dependencies: ['AI gateway', 'Consent policy', 'Database'], milestones: ['Preference memory', 'Conversation retrieval', 'Retention and deletion controls'] },
  { id: 'I', title: 'Voice System', progress: 'Provider contract defined', status: 'Ready for implementation', dependencies: ['TTS provider credentials', 'STT provider credentials', 'Consent policy'], milestones: ['Roman Urdu default', 'Urdu and English routing', 'Provider health and fallback'] },
  { id: 'J', title: 'AI Admin Command Center', progress: 'Governance blueprint complete', status: 'Dependency pending', dependencies: ['AI gateway', 'Audit database', 'Alerting'], milestones: ['Assistant health', 'Escalation queue', 'Policy and override controls'] },
  { id: 'K', title: 'National Marketplace Launch', progress: 'Expansion plan defined', status: 'Dependency pending', dependencies: ['All core systems', 'City inventory', 'Operations teams'], milestones: ['Lahore pilot', 'Punjab expansion', 'National launch readiness'] },
];

export interface SchemaTable {
  name: string;
  primaryKey: string;
  foreignKeys: string[];
  indexes: string[];
  constraints: string[];
  relationships: string[];
}

const table = (name: string, primaryKey: string, foreignKeys: string[], indexes: string[], constraints: string[], relationships: string[]): SchemaTable => ({ name, primaryKey, foreignKeys, indexes, constraints, relationships });

export const databaseSchema: SchemaTable[] = [
  table('users', 'id', ['role_id -> roles.id', 'profile_id -> profiles.id'], ['email unique', 'phone unique'], ['identity_verified boolean'], ['one role, one profile, many leads and deals']),
  table('roles', 'id', [], ['name unique'], ['system role required'], ['one role to many users and permissions']),
  table('permissions', 'id', ['role_id -> roles.id'], ['role_id, resource'], ['action and resource required'], ['many permissions to one role']),
  table('profiles', 'id', ['user_id -> users.id'], ['user_id unique'], ['user_id required'], ['one profile to one user']),
  table('properties', 'id', ['owner_id -> users.id', 'city_id -> cities.id', 'area_id -> areas.id', 'society_id -> societies.id'], ['city_id, area_id', 'status, verification_status'], ['price >= 0'], ['one owner, many images, documents, leads']),
  table('property_images', 'id', ['property_id -> properties.id'], ['property_id, sort_order'], ['storage_key required'], ['many images to one property']),
  table('property_documents', 'id', ['property_id -> properties.id'], ['property_id, document_type'], ['verification_status required'], ['many documents to one property']),
  table('cities', 'id', [], ['province, name unique'], ['name required'], ['one city to many areas and properties']),
  table('areas', 'id', ['city_id -> cities.id'], ['city_id, name'], ['city_id required'], ['one city to many areas']),
  table('societies', 'id', ['city_id -> cities.id', 'area_id -> areas.id'], ['city_id, name'], ['name required'], ['one society to many properties']),
  table('leads', 'id', ['buyer_id -> users.id', 'property_id -> properties.id', 'assigned_agent_id -> users.id'], ['buyer_id, status', 'property_id, created_at'], ['buyer_id required'], ['many leads to users and properties']),
  table('lead_locks', 'id', ['lead_id -> leads.id', 'agent_id -> users.id'], ['lead_id unique', 'agent_id, status'], ['one active lock per lead'], ['one lead to lock history']),
  table('deals', 'id', ['lead_id -> leads.id', 'buyer_id -> users.id', 'seller_id -> users.id'], ['status, created_at'], ['parties required'], ['one deal to milestones, payments, audit events']),
  table('deal_locks', 'id', ['deal_id -> deals.id'], ['deal_id unique, status'], ['one active lock per deal'], ['one deal to one active lock']),
  table('payments', 'id', ['deal_id -> deals.id', 'user_id -> users.id'], ['deal_id, status', 'provider_reference unique'], ['amount > 0'], ['many payments to deal and user']),
  table('subscriptions', 'id', ['user_id -> users.id'], ['user_id, status'], ['plan required'], ['one user to many subscription periods']),
  table('invoices', 'id', ['subscription_id -> subscriptions.id', 'user_id -> users.id'], ['user_id, status', 'due_at'], ['total >= 0'], ['many invoices to user and subscription']),
  table('notifications', 'id', ['user_id -> users.id'], ['user_id, read_at'], ['message required'], ['many notifications to one user']),
  table('ai_assistants', 'id', [], ['code unique', 'department'], ['code required'], ['one assistant to memory and conversations']),
  table('ai_memory', 'id', ['user_id -> users.id', 'assistant_id -> ai_assistants.id'], ['user_id, memory_type', 'expires_at'], ['consent_required'], ['many memories to user and assistant']),
  table('ai_conversations', 'id', ['user_id -> users.id', 'assistant_id -> ai_assistants.id'], ['user_id, created_at'], ['message role required'], ['conversation history for user and assistant']),
  table('verification_requests', 'id', ['user_id -> users.id', 'property_id -> properties.id'], ['status, created_at'], ['subject required'], ['many requests to user and property']),
  table('trust_scores', 'id', ['user_id -> users.id', 'property_id -> properties.id'], ['subject unique'], ['score between 0 and 100'], ['latest score for user or property']),
  table('fraud_reports', 'id', ['reporter_id -> users.id', 'subject_user_id -> users.id', 'property_id -> properties.id'], ['status, severity'], ['evidence reference required'], ['reports become audit and investigation events']),
  table('audit_logs', 'id', ['user_id -> users.id'], ['user_id, action, created_at', 'ip_address'], ['action and result required'], ['append-only record of every action']),
  table('system_events', 'id', [], ['event_type, created_at'], ['event payload required'], ['feeds notifications, AI reporting, and admin monitoring']),
];

export interface DashboardBlueprint {
  role: string;
  purpose: string;
  modules: string[];
  permissions: string[];
}

export const dashboardBlueprints: DashboardBlueprint[] = [
  { role: 'Buyer', purpose: 'Discover verified inventory and manage protected intent.', modules: ['Recommendations', 'Saved properties', 'Lead requests', 'Deal timeline'], permissions: ['Search', 'Save', 'Create lead', 'View own deals'] },
  { role: 'Seller', purpose: 'Verify ownership and manage property performance.', modules: ['My properties', 'Verification queue', 'Lead activity', 'Offer review'], permissions: ['Create property', 'Upload documents', 'Review own leads'] },
  { role: 'Agent', purpose: 'Manage assigned leads, clients, and commissions.', modules: ['Lead inbox', 'Lead Lock', 'Deal pipeline', 'Commission tracker'], permissions: ['Route lead', 'Lock lead', 'Update assigned deals'] },
  { role: 'Agency', purpose: 'Coordinate teams, inventory, and revenue.', modules: ['Agent roster', 'Team leads', 'Agency deals', 'Revenue reports'], permissions: ['Manage agents', 'Review team activity', 'Agency reporting'] },
  { role: 'Developer', purpose: 'Operate projects, inventory, and escrow milestones.', modules: ['Projects', 'Units', 'Construction updates', 'Escrow monitoring'], permissions: ['Manage projects', 'Publish inventory', 'Submit updates'] },
  { role: 'Investor', purpose: 'Evaluate opportunities and portfolio performance.', modules: ['Portfolio', 'ROI reports', 'Market intelligence', 'Opportunities'], permissions: ['View verified data', 'Save opportunities', 'Export own reports'] },
  { role: 'Industrial', purpose: 'Manage industrial assets and logistics requirements.', modules: ['Factories', 'Warehouses', 'Industrial land', 'Asset reports'], permissions: ['Search industrial inventory', 'Create inquiries'] },
  { role: 'Corporate', purpose: 'Manage branches, leases, and corporate property.', modules: ['Assets', 'Branches', 'Leases', 'Portfolio reports'], permissions: ['Manage organization assets', 'Invite approved members'] },
  { role: 'Government', purpose: 'Review governed property and development intelligence.', modules: ['Verification requests', 'City intelligence', 'Compliance reports', 'Public programs'], permissions: ['Read approved reports', 'Review assigned cases'] },
  { role: 'AI Admin', purpose: 'Monitor assistants, routing, memory, and escalations.', modules: ['Assistant health', 'Escalations', 'Fraud queue', 'Audit stream'], permissions: ['Route', 'Escalate', 'Request review', 'DECISION REQUIRED: suspend workflow authority'] },
  { role: 'Super Admin', purpose: 'Hold final human governance authority within approved scope.', modules: ['System health', 'Policy controls', 'Overrides', 'Audit export'], permissions: ['Approve or override only within approved authority; exact scope DECISION REQUIRED', 'Manage policies through governed change', 'Final escalation'] },
];

export const aiSystemLayers = [
  { name: 'AI Communication Layer', purpose: 'Normalize messages, language, channel, and assistant responses.' },
  { name: 'AI Escalation Layer', purpose: 'Route uncertainty, risk, and authority-boundary cases to AI Admin or Super Admin.' },
  { name: 'AI Memory Layer', purpose: 'Store consented preferences, searches, viewed listings, leads, deals, language, and voice preferences.' },
  { name: 'AI Reporting Layer', purpose: 'Produce traceable operational metrics from events and audit records.' },
  { name: 'AI Admin Monitoring Layer', purpose: 'Proposed monitoring of 54 registry entries; live assistants, policy telemetry, and queue health are not established.' },
];

export const faqKnowledgeRepository = {
  targetCount: 500,
  status: 'Repository architecture only',
  categories: ['Platform', 'Properties', 'Verification', 'Lead Lock', 'Deal Lock', 'Payments', 'AI Workforce', 'Roles', 'Security', 'Government', 'Voice and Language'],
  recordShape: ['id', 'category', 'intent', 'questionVariants', 'approvedAnswerReference', 'locale', 'authority', 'version', 'reviewStatus', 'sourceReferences', 'lastReviewedAt'],
  rule: 'No answer is generated from an unapproved or missing knowledge record.',
};

export const paymentProviders = ['JazzCash', 'EasyPaisa', 'Bank Transfer', 'Cards'];

export const voiceArchitecture = {
  defaultLanguage: 'roman_ur',
  supportedLanguages: ['roman_ur', 'ur', 'en'],
  providers: ['ElevenLabs', 'OpenAI TTS', 'Google TTS', 'Browser Fallback'],
  rule: 'Provider adapters are selected by the voice manager; browser speech is a final fallback only.',
};
