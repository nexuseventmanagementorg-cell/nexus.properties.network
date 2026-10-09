export interface MobileRule {
  title: string;
  description: string;
}

export interface MobileMetric {
  label: string;
  value: string;
}

export interface MobileEscalationRule {
  level: number;
  owner: string;
  trigger: string;
  action: string;
}

export const mobilePlatforms = ['Android', 'iOS', 'Tablet', 'Future Wearable Support'];

export const mobileApplications = [
  'Buyer App', 'Seller App', 'Agent App', 'Agency App', 'Developer App', 'Investor App', 'Industrial App', 'Corporate App', 'Government App', 'AI Admin App', 'Super Admin App',
];

export const coreMobileFeatures = [
  'Property Search', 'Property Discovery', 'Property Graph Access', 'AI Assistant Access', 'Voice Assistant Access', 'Lead Management', 'Deal Management', 'CRM Access', 'Notifications', 'Messaging', 'Document Upload', 'Verification Tracking', 'Payments', 'Subscriptions',
];

export const buyerAppFeatures = ['Search Properties', 'Save Properties', 'Compare Properties', 'AI Recommendations', 'Investment Insights', 'Voice Search', 'Property Tours', 'Inquiry Management'];
export const sellerAppFeatures = ['List Properties', 'Manage Listings', 'View Leads', 'Manage Inquiries', 'Track Verification', 'Track Performance'];
export const agentAppFeatures = ['Lead Management', 'Lead Lock', 'Deal Management', 'Deal Lock', 'CRM Access', 'AI Assistant', 'Commission Tracking', 'Performance Dashboard'];
export const agencyAppFeatures = ['Agent Management', 'Agency Dashboard', 'Revenue Tracking', 'Lead Monitoring', 'Deal Monitoring', 'Analytics'];
export const developerAppFeatures = ['Projects', 'Inventory', 'Sales Tracking', 'Analytics', 'Marketing Performance'];
export const investorAppFeatures = ['Investment Opportunities', 'Market Analytics', 'ROI Insights', 'Portfolio Tracking', 'AI Investment Assistant'];
export const adminAppFeatures = ['Moderation', 'Verification', 'Compliance', 'Fraud Monitoring', 'Trust Monitoring', 'Emergency Controls'];

export const aiFeatures = ['Future AI features for the 54-entry registry (not production agents)', 'Voice AI (proposed)', 'Knowledge AI (proposed)', 'Lead AI (proposed)', 'Deal AI (proposed)', 'Investment AI (proposed)', 'CRM AI (proposed)'];
export const voiceFeatures = ['Roman Urdu', 'Urdu', 'English', 'Voice Search', 'Voice Commands', 'Voice Assistant'];
export const offlineFeatures = ['Cached Listings', 'Saved Searches', 'Saved Properties', 'Offline Notes', 'Offline CRM Records'];
export const notificationTypes = ['Push Notifications', 'Lead Notifications', 'Deal Notifications', 'Payment Notifications', 'Verification Notifications', 'AI Notifications'];
export const securityFeatures = ['Biometric Login', 'OTP Login', 'Google Login', 'Session Security', 'Device Security', 'Fraud Detection'];
export const analyticsSignals = ['App Usage', 'User Retention', 'Session Duration', 'Conversion Rates', 'AI Usage', 'Voice Usage'];
export const auditEvents = ['Logins', 'Transactions', 'Property Actions', 'Lead Actions', 'Deal Actions', 'AI Actions'];

export const applicationRules: MobileRule[] = [
  { title: 'One mobile ecosystem', description: 'Android, iOS, tablet, and future wearable experiences share one governed Nexus identity, API, graph, and notification layer.' },
  { title: 'Role-aware applications', description: 'Each user role receives focused workflows while shared property, trust, AI, CRM, payment, and security capabilities remain consistent.' },
  { title: 'API-first mobile clients', description: 'Mobile applications use the Nexus API Ecosystem rather than duplicating business logic or bypassing governance.' },
  { title: 'Expansion-ready foundation', description: 'The mobile shell supports new countries, languages, currencies, roles, integrations, and future device classes.' },
];

export const featureRules: MobileRule[] = [
  { title: 'Property-to-deal continuity', description: 'Search, discovery, graph context, inquiries, leads, deals, documents, payments, and subscriptions remain connected on mobile.' },
  { title: 'Role-specific workflows', description: 'FUTURE ARCHITECTURE: buyer, seller, agent, agency, developer, investor, industrial, corporate, government, AI Admin, and Super Admin workflows map to the current eleven-role runtime model. Server-side authorization remains a later-phase requirement.' },
  { title: 'AI-assisted actions', description: 'AI recommendations, voice, knowledge, lead, deal, investment, and CRM support are available inside authorized mobile workflows.' },
];

export const securityRules: MobileRule[] = [
  { title: 'Device-aware access', description: 'Biometric login, OTP, Google Login, session security, device security, and fraud detection protect mobile access.' },
  { title: 'Secure local state', description: 'Cached data, saved searches, notes, and offline CRM records are scoped, encrypted, expired, and synchronized safely.' },
  { title: 'Permission-safe actions', description: 'Every property, lead, deal, payment, document, AI, and admin action is checked against identity and role permissions.' },
];

export const voiceRules: MobileRule[] = [
  { title: 'Multilingual mobile voice', description: 'Roman Urdu, Urdu, and English support voice search, commands, and assistant conversations.' },
  { title: 'Context-aware voice', description: 'Voice actions understand the current property, lead, deal, CRM, and role context before executing.' },
  { title: 'Voice fallback', description: 'Voice failures return clear text controls and preserve the user workflow without losing state.' },
];

export const offlineRules: MobileRule[] = [
  { title: 'Read-ready inventory', description: 'Cached listings, saved properties, and saved searches remain available during temporary connectivity loss.' },
  { title: 'Offline work queue', description: 'Notes and approved CRM records can be updated offline and synchronized through conflict-aware rules.' },
  { title: 'No unsafe settlement offline', description: 'Sensitive verification, deal, payment, and privileged actions require a secure online confirmation.' },
];

export const notificationRules: MobileRule[] = [
  { title: 'Event-driven notifications', description: 'Push, lead, deal, payment, verification, and AI notifications originate from governed platform events.' },
  { title: 'Role and consent aware', description: 'Notification type, timing, channel, and content respect user role, preferences, privacy, and urgency.' },
  { title: 'Actionable alerts', description: 'Important notifications open the relevant property, lead, deal, task, or review context directly.' },
];

export const analyticsRules: MobileRule[] = [
  { title: 'Product intelligence', description: 'App usage, retention, sessions, conversion, AI usage, and voice usage reveal mobile product health.' },
  { title: 'Role-level performance', description: 'Buyer, seller, agent, agency, developer, investor, and admin journeys are measured separately.' },
  { title: 'Outcome-linked analytics', description: 'Mobile activity connects to saved properties, inquiries, leads, deals, revenue, trust, and successful outcomes.' },
];

export const auditRules: MobileRule[] = [
  { title: 'Mobile event history', description: 'Logins, transactions, property actions, lead actions, deal actions, and AI actions remain traceable.' },
  { title: 'Device and session evidence', description: 'Authentication, device, session, notification, synchronization, and offline changes retain audit context.' },
  { title: 'Administrative accountability', description: 'AI Admin and Super Admin actions require actor, reason, approval where applicable, and outcome. Moderator is not a current runtime role.' },
];

export const mobilePerformanceMetrics: MobileMetric[] = [
  { label: 'Installations', value: 'Platform adoption' },
  { label: 'Daily Active Users', value: 'Daily mobile engagement' },
  { label: 'Monthly Active Users', value: 'Monthly network reach' },
  { label: 'Retention', value: 'Returning user health' },
  { label: 'Crash Rate', value: 'Stability and reliability' },
  { label: 'Performance Score', value: 'Mobile experience quality' },
];

export const escalationRules: MobileEscalationRule[] = [
  { level: 1, owner: 'Mobile AI', trigger: 'Routine mobile feature, notification, sync, or app event', action: 'Process the governed mobile workflow and log the result.' },
  { level: 2, owner: 'Platform AI', trigger: 'Device, API, offline sync, performance, or integration anomaly', action: 'Review platform health, retry policy, and affected user scope.' },
  { level: 3, owner: 'AI Admin', trigger: 'Fraud, security, trust, compliance, or operational mobile concern', action: 'Flag, investigate, recommend, and escalate; access-restriction authority is DECISION REQUIRED.' },
  { level: 4, owner: 'Authorized human reviewer (role and authority DECISION REQUIRED)', trigger: 'Platform-wide mobile security, governance, or emergency event', action: 'Make an audited human decision within approved authority.' },
];

export const mobileAppArchitectureVersion = '39.0.0';
