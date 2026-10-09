export interface APIRule {
  title: string;
  description: string;
}

export interface APIMetric {
  label: string;
  value: string;
}

export interface APIEscalationRule {
  level: number;
  owner: string;
  trigger: string;
  action: string;
}

export const apiVisionConsumers = [
  'Website', 'Mobile Apps', 'CRM', 'WhatsApp', 'Facebook', 'AI Assistants', 'Partner Systems', 'Enterprise Clients', 'Government Integrations',
];

export const apiCategories = [
  'Authentication API', 'User API', 'Profile API', 'Property API', 'Property Verification API', 'Area API', 'City API', 'Marketplace API', 'Lead API', 'Lead Lock API', 'Deal API', 'Deal Lock API', 'Payment API', 'Subscription API', 'Invoice API', 'CRM API', 'AI API', 'Voice API', 'Knowledge API', 'FAQ API', 'Analytics API', 'Trust API', 'Fraud API', 'Admin API', 'Super Admin API',
];

export const authenticationMethods = ['OAuth', 'Google Login', 'JWT', 'API Keys', 'Refresh Tokens', 'Role-Based Access'];
export const propertyApiOperations = ['Create Property', 'Update Property', 'Delete Property', 'Verify Property', 'Search Property', 'Filter Property', 'Property Details', 'Property Images', 'Property Status'];
export const leadApiOperations = ['Create Lead', 'Update Lead', 'Lead Qualification', 'Lead Lock', 'Lead Routing', 'Lead Analytics'];
export const dealApiOperations = ['Create Deal', 'Update Deal', 'Deal Lock', 'Deal Status', 'Deal Documents', 'Deal Payments'];
export const paymentProviders = ['JazzCash', 'Easypaisa', 'Bank Transfer', 'Invoices', 'Refunds', 'Subscriptions', 'Premium Listings'];
export const crmApiOperations = ['Contacts', 'Tasks', 'Appointments', 'Follow Ups', 'Conversation History', 'CRM Analytics'];
export const voiceApiOperations = ['STT', 'TTS', 'Voice Preferences', 'Voice Analytics', 'Voice Sessions'];
export const aiApiOperations = ['Future AI API design for the 54-entry registry (not production agents)', 'AI Routing (proposed)', 'AI Memory (proposed)', 'AI Analytics (proposed)', 'AI Governance (proposed)'];
export const knowledgeApiOperations = ['FAQ Access', 'Knowledge Search', 'Knowledge Updates', 'Knowledge Analytics'];
export const analyticsApiOperations = ['Market Analytics', 'Lead Analytics', 'Deal Analytics', 'Revenue Analytics', 'Trust Analytics'];
export const webhookEvents = ['Property Events', 'Lead Events', 'Deal Events', 'Payment Events', 'CRM Events', 'AI Events'];
export const thirdPartyIntegrations = ['WhatsApp', 'Facebook', 'Google Maps', 'Google Login', 'Payment Providers', 'Email Providers', 'SMS Providers', 'Voice Providers'];
export const developerPortal = ['API Keys', 'Sandbox Environment', 'Documentation', 'Rate Limits', 'SDKs', 'Examples'];
export const securityControls = ['Encryption', 'Rate Limiting', 'Access Control', 'Audit Logging', 'Fraud Monitoring'];
export const auditEvents = ['API Calls', 'Errors', 'Authentication Events', 'Webhook Events', 'Admin Actions'];

export const authenticationApiRules: APIRule[] = [
  { title: 'Unified authentication', description: 'OAuth, Google Login, JWT, API keys, and refresh tokens connect every client to one identity and permission layer.' },
  { title: 'Role-based access', description: 'Every API request is checked against identity, role, verification, trust, scope, and resource permissions.' },
  { title: 'Token lifecycle', description: 'Access tokens expire, refresh tokens rotate, and compromised sessions can be revoked and audited.' },
];

export const propertyApiRules: APIRule[] = [
  { title: 'Property lifecycle API', description: 'Create, update, delete, verify, search, filter, inspect, image, and status operations share one governed property contract.' },
  { title: 'Verification before exposure', description: 'Property API responses respect verification status, trust, permissions, and marketplace publication rules.' },
  { title: 'Graph-connected records', description: 'Property responses can include authorized area, city, owner, lead, deal, document, and recommendation context.' },
];

export const leadApiRules: APIRule[] = [
  { title: 'Protected lead creation', description: 'Lead creation, qualification, routing, analytics, and Lead Lock operations preserve ownership and consent.' },
  { title: 'Event-driven routing', description: 'Lead events can notify CRM, AI assistants, agents, agencies, and approved partner systems.' },
  { title: 'Permission-safe analytics', description: 'Lead performance data is scoped by role, assignment, organization, and audit policy.' },
];

export const dealApiRules: APIRule[] = [
  { title: 'Deal lifecycle contract', description: 'Deal creation, updates, Deal Lock, status, documents, and payments remain connected through one auditable API.' },
  { title: 'Milestone integrity', description: 'Deal transitions require authorized actors, required evidence, and valid payment or documentation state.' },
  { title: 'Completion evidence', description: 'Completed deals retain payment, commission, document, participant, and audit references.' },
];

export const paymentApiRules: APIRule[] = [
  { title: 'Provider abstraction', description: 'JazzCash, Easypaisa, bank transfer, invoices, refunds, subscriptions, and premium listings share a controlled payment layer.' },
  { title: 'Idempotent transactions', description: 'Payment requests and webhook retries remain safe, traceable, and resistant to duplicate settlement.' },
  { title: 'Financial auditability', description: 'Every payment state, invoice, refund, and subscription event is connected to its source and authorization.' },
];

export const crmApiRules: APIRule[] = [
  { title: 'Unified relationship API', description: 'Contacts, tasks, appointments, follow-ups, conversation history, and CRM analytics share lifecycle context.' },
  { title: 'Cross-channel continuity', description: 'Website, WhatsApp, Facebook, voice, and AI events can update approved CRM records through governed APIs.' },
  { title: 'Role-aware automation', description: 'CRM API actions respect ownership, organization, assignment, privacy, and escalation policy.' },
];

export const aiApiRules: APIRule[] = [
  { title: '54-assistant gateway', description: 'AI routing, memory, analytics, voice, knowledge, FAQ, and governance operations use a unified AI API boundary.' },
  { title: 'Context and permissions', description: 'AI requests carry identity, role, language, graph scope, knowledge scope, and audit context.' },
  { title: 'Governed outputs', description: 'AI API responses expose confidence, evidence, escalation, and policy state where required.' },
];

export const analyticsApiRules: APIRule[] = [
  { title: 'Intelligence access', description: 'Market, lead, deal, revenue, and trust analytics are available through role-aware API resources.' },
  { title: 'Freshness and lineage', description: 'Analytics responses identify data freshness, source lineage, and permission scope.' },
  { title: 'Prediction safety', description: 'Forecasts expose confidence and do not become autonomous decisions without governance controls.' },
];

export const securityRules: APIRule[] = [
  { title: 'Encrypted transport and storage', description: 'API traffic, credentials, tokens, sensitive records, and integration secrets use protected handling.' },
  { title: 'Rate and access controls', description: 'Rate limits, scopes, roles, tenant boundaries, and resource permissions protect every API surface.' },
  { title: 'Fraud and audit monitoring', description: 'API anomalies, authentication failures, abuse patterns, and privileged actions generate monitored events.' },
];

export const auditRules: APIRule[] = [
  { title: 'Complete API trace', description: 'Track caller, endpoint, method, resource, scope, response, latency, error, and correlation ID.' },
  { title: 'Webhook accountability', description: 'Record event creation, delivery attempts, retries, signatures, failures, and subscriber response.' },
  { title: 'Privileged action history', description: 'Admin and Super Admin API actions preserve actor, reason, approval, and outcome evidence.' },
];

export const apiPerformanceMetrics: APIMetric[] = [
  { label: 'API Requests', value: 'Internal and external request volume' },
  { label: 'Response Time', value: 'Endpoint latency and percentile health' },
  { label: 'Error Rate', value: 'Failed request and integration rate' },
  { label: 'Success Rate', value: 'Completed API operation quality' },
  { label: 'Webhook Success', value: 'Event delivery reliability' },
];

export const escalationRules: APIEscalationRule[] = [
  { level: 1, owner: 'API AI', trigger: 'Routine API request, validation, or webhook event', action: 'Process the governed request and record its result.' },
  { level: 2, owner: 'Platform AI', trigger: 'Integration failure, unusual traffic, or repeated endpoint errors', action: 'Review access, provider health, rate limits, and retry policy.' },
  { level: 3, owner: 'AI Admin', trigger: 'Fraud, security, compliance, data, or privileged API concern', action: 'Flag, investigate, and escalate; access-restriction authority is DECISION REQUIRED.' },
  { level: 4, owner: 'Authorized human reviewer (role and authority DECISION REQUIRED)', trigger: 'Platform-wide API, integration, or emergency governance event', action: 'Make an audited human decision within approved authority.' },
];

export const nexusApiEcosystemVersion = '38.0.0';
