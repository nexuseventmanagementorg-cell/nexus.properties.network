export interface AnalyticsRule {
  title: string;
  description: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string;
}

export interface AnalyticsEscalationRule {
  level: number;
  owner: string;
  trigger: string;
  action: string;
}

export const dataSources = [
  'Users', 'Properties', 'Cities', 'Areas', 'Developers', 'Agencies', 'Leads', 'Deals', 'Payments', 'Subscriptions', 'CRM', 'AI Assistants', 'Verification Systems', 'WhatsApp Systems', 'Facebook Systems', 'Property Graph', 'Knowledge Network',
];

export const dataCategories = [
  'User Data', 'Property Data', 'Area Data', 'City Data', 'Lead Data', 'Deal Data', 'Payment Data', 'CRM Data', 'AI Data', 'Compliance Data', 'Fraud Data', 'Trust Data',
];

export const analyticsLayers = [
  'Operational Analytics', 'Business Analytics', 'Marketplace Analytics', 'Property Analytics', 'Investment Analytics', 'Lead Analytics', 'Deal Analytics', 'Revenue Analytics', 'Trust Analytics', 'Fraud Analytics', 'AI Analytics',
];

export const propertyAnalytics = ['Top Areas', 'Top Cities', 'Top Categories', 'Property Demand', 'Property Supply', 'Property Trends', 'Property Growth'];
export const marketAnalytics = ['Market Activity', 'Market Demand', 'Market Supply', 'Pricing Trends', 'Rental Trends', 'Investment Trends'];
export const leadAnalytics = ['Lead Sources', 'Lead Quality', 'Lead Scores', 'Lead Conversion Rates', 'Lead Lock Performance'];
export const dealAnalytics = ['Deal Volume', 'Deal Success Rate', 'Deal Value', 'Deal Duration', 'Deal Lock Performance', 'Commission Analytics'];
export const revenueAnalytics = ['Subscriptions', 'Premium Listings', 'Lead Lock Revenue', 'Deal Lock Revenue', 'Verification Revenue', 'Enterprise Revenue', 'Marketplace Revenue'];
export const trustAnalytics = ['Trust Scores', 'Verification Success', 'Compliance Scores', 'Reputation Scores', 'Fraud Prevention Results'];
export const fraudAnalytics = ['Fraud Cases', 'Fake Listings', 'Fake Accounts', 'Fake Documents', 'Fraud Trends', 'Fraud Risk Indicators'];
export const aiAnalytics = ['Assistant Usage', 'Conversation Volume', 'Response Quality', 'Language Usage', 'Voice Usage', 'Knowledge Usage'];

export const predictionEngine = ['Lead Predictions', 'Deal Predictions', 'Revenue Forecasts', 'Market Forecasts', 'Area Growth Forecasts', 'Investment Forecasts'];
export const businessIntelligenceDashboards = ['Executive Overview', 'Revenue Overview', 'Marketplace Overview', 'Growth Overview', 'AI Overview', 'Trust Overview', 'Compliance Overview'];
export const reportingPeriods = ['Daily Reports', 'Weekly Reports', 'Monthly Reports', 'Quarterly Reports', 'Annual Reports'];
export const governanceControls = ['Data Quality', 'Data Ownership', 'Data Retention', 'Data Access Control', 'Data Security'];
export const auditEvents = ['Data Changes', 'Analytics Usage', 'Reports Generated', 'Predictions Generated', 'AI Queries'];

export const dataSourceRules: AnalyticsRule[] = [
  { title: 'Single intelligence source', description: 'Operational, marketplace, AI, CRM, verification, payment, lead, deal, and user events flow into one governed data lake.' },
  { title: 'Source lineage', description: 'Every analytic result retains its source system, collection time, ownership, freshness, and quality context.' },
  { title: 'Graph and knowledge integration', description: 'Property Graph relationships and Knowledge Network evidence enrich every authorized analytical query.' },
  { title: 'Event-ready collection', description: 'The lake accepts structured records, activity events, relationship changes, conversations, and outcome signals.' },
];

export const analyticsRules: AnalyticsRule[] = [
  { title: 'Layered intelligence', description: 'Operational, business, marketplace, property, investment, lead, deal, revenue, trust, fraud, and AI analytics remain separately understandable.' },
  { title: 'Role-aware dashboards', description: 'Analytics are filtered by identity, role, geography, permissions, and governance scope before presentation.' },
  { title: 'Decision-ready outputs', description: 'Dashboards convert raw events into trends, comparisons, alerts, explanations, and next-best actions.' },
];

export const predictionRules: AnalyticsRule[] = [
  { title: 'Lead prediction', description: 'Predict lead quality, conversion likelihood, routing priority, follow-up timing, and lock performance from verified behavior.' },
  { title: 'Deal prediction', description: 'Forecast deal success, timeline, value, commission, risk, and completion probability from lifecycle signals.' },
  { title: 'Market prediction', description: 'Forecast pricing, demand, supply, area growth, rental movement, and investment opportunity from market activity.' },
  { title: 'Confidence-aware forecasts', description: 'Every forecast exposes confidence, evidence, freshness, and known data gaps before it informs a decision.' },
];

export const revenueRules: AnalyticsRule[] = [
  { title: 'Revenue visibility', description: 'Subscriptions, premium listings, lead locks, deal locks, verification, enterprise, and marketplace revenue are measured together.' },
  { title: 'Forecasting by stream', description: 'Each revenue stream has its own trend, conversion, retention, cohort, and forecast signals.' },
  { title: 'Commercial governance', description: 'Revenue analytics remain permission-safe, auditable, and connected to verified payments and subscriptions.' },
];

export const trustRules: AnalyticsRule[] = [
  { title: 'Trust intelligence', description: 'Trust, verification, compliance, reputation, and fraud prevention outcomes are analyzed as connected signals.' },
  { title: 'Outcome-based trust', description: 'Successful verified activity strengthens trust analytics while suspicious patterns create review signals.' },
  { title: 'Explainable risk', description: 'Trust and risk dashboards show the evidence and source events behind score changes.' },
];

export const fraudRules: AnalyticsRule[] = [
  { title: 'Fraud pattern detection', description: 'Analyze fake listings, accounts, documents, cases, and risk indicators across the platform.' },
  { title: 'Early warning system', description: 'Emerging fraud trends create alerts before they become broad marketplace or trust incidents.' },
  { title: 'Investigation continuity', description: 'Fraud analytics connect cases to identities, properties, leads, deals, payments, evidence, and audit events.' },
];

export const governanceRules: AnalyticsRule[] = [
  { title: 'Data quality', description: 'Monitor completeness, freshness, consistency, duplication, validation, and source health.' },
  { title: 'Data ownership', description: 'Every source, dataset, metric, dashboard, and prediction has an accountable owner.' },
  { title: 'Data retention', description: 'Retention periods preserve operational usefulness, legal requirements, privacy, and audit needs.' },
  { title: 'Access and security', description: 'Analytics access follows identity, role, permissions, privacy, and security policy.' },
];

export const performanceRules: AnalyticsRule[] = [
  { title: 'Data volume', description: 'Measure the amount and growth rate of events, entities, relationships, queries, and analytical records.' },
  { title: 'Query speed', description: 'Track response time for dashboards, searches, reports, predictions, and AI intelligence requests.' },
  { title: 'Analytics accuracy', description: 'Compare analytical outputs with verified source data and reviewed business outcomes.' },
  { title: 'Prediction accuracy', description: 'Measure forecast quality against actual lead, deal, market, area, investment, and revenue outcomes.' },
  { title: 'Dashboard usage', description: 'Track adoption, repeat usage, task completion, and decision impact across dashboard roles.' },
];

export const auditRules: AnalyticsRule[] = [
  { title: 'Data changes', description: 'Track data creation, updates, corrections, imports, retention actions, and quality interventions.' },
  { title: 'Analytics usage', description: 'Record who accessed which metric, dashboard, query, source, and analytical result.' },
  { title: 'Reports generated', description: 'Preserve report scope, period, filters, sources, owner, and delivery history.' },
  { title: 'Predictions generated', description: 'Store prediction inputs, model version, confidence, output, and later outcome.' },
  { title: 'AI queries', description: 'Audit AI data requests, access scope, response evidence, and governance decisions.' },
];

export const analyticsPerformanceMetrics: AnalyticsMetric[] = [
  { label: 'Data Volume', value: 'Platform intelligence coverage' },
  { label: 'Query Speed', value: 'Dashboard and AI response time' },
  { label: 'Analytics Accuracy', value: 'Verified data alignment' },
  { label: 'Prediction Accuracy', value: 'Forecast-to-outcome performance' },
  { label: 'Dashboard Usage', value: 'Role-based intelligence adoption' },
];

export const escalationRules: AnalyticsEscalationRule[] = [
  { level: 1, owner: 'Analytics AI', trigger: 'Routine data collection, dashboard, report, or query event', action: 'Process the governed data request and log the result.' },
  { level: 2, owner: 'Intelligence AI', trigger: 'Quality gap, prediction anomaly, or unexplained analytical pattern', action: 'Review source lineage, confidence, and connected outcomes.' },
  { level: 3, owner: 'AI Admin', trigger: 'Security, fraud, compliance, access, or platform-wide data concern', action: 'Flag, investigate, and escalate; data-restriction/approval authority is DECISION REQUIRED.' },
  { level: 4, owner: 'Super Admin', trigger: 'Critical data governance, integrity, or executive intelligence event', action: 'Apply emergency controls and make the final governance decision.' },
];

export const dataLakeAnalyticsEngineVersion = '36.0.0';
