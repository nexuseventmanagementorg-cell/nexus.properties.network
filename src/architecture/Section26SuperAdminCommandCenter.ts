export type SuperAdminModule = 'Executive Overview' | 'Business Intelligence' | 'Financial Intelligence' | 'Revenue Intelligence' | 'User Intelligence' | 'Property Intelligence' | 'Lead Intelligence' | 'Deal Intelligence' | 'Verification Intelligence' | 'Fraud Intelligence' | 'Trust Intelligence' | 'Compliance Intelligence' | 'AI Workforce Intelligence' | 'Growth Intelligence' | 'Audit Intelligence' | 'Emergency Control Center' | 'Strategic Planning Center';
export type ReportCadence = 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annual' | 'Executive' | 'Investor' | 'Custom';

export interface SuperAdminModuleDefinition {
  name: SuperAdminModule;
  purpose: string;
  monitors: string[];
  kpis: string[];
  actions: string[];
  restrictions: string[];
}

export interface GovernanceRule {
  domain: string;
  rules: string[];
  owner: string;
  escalation: string;
}

export interface ReportingRule {
  cadence: ReportCadence;
  report: string;
  contents: string[];
  audience: string;
}

export interface NotificationRule {
  event: string;
  priority: 'Critical' | 'Emergency';
  recipients: string[];
  action: string;
}

export interface AuditRule {
  domain: string;
  events: string[];
  requiredFields: string[];
  retention: string;
}

export const dashboardModules: SuperAdminModuleDefinition[] = [
  { name: 'Executive Overview', purpose: 'Provide the authoritative platform, business, risk, and growth snapshot.', monitors: ['Platform Health Score', 'Total Users', 'Total Properties', 'Total Leads', 'Total Deals', 'Total Revenue', 'Total Subscriptions', 'Trust Score Index', 'Fraud Risk Index', 'AI Workforce Health', 'Growth Rate'], kpis: ['Platform health', 'Revenue', 'Trust index', 'Fraud risk', 'Growth rate'], actions: ['Generate executive report', 'Open governance overview'], restrictions: ['Every privileged view is audited', 'Historical metrics cannot be rewritten'] },
  { name: 'Business Intelligence', purpose: 'Monitor market adoption and role-based business expansion.', monitors: ['Role Growth', 'Market Expansion', 'City Growth', 'Province Growth', 'Agency Growth', 'Developer Growth', 'Investor Growth', 'Corporate Growth', 'Government Adoption'], kpis: ['Role growth', 'City expansion', 'Province expansion', 'Adoption'], actions: ['Generate business report', 'Open strategic plan'], restrictions: ['Use approved and traceable data', 'No fabricated forecasts'] },
  { name: 'Financial Intelligence', purpose: 'Govern financial health, risk, payments, and subscriptions.', monitors: ['Subscriptions', 'Invoices', 'Transactions', 'Refunds', 'Chargebacks', 'Payment Risk'], kpis: ['Payment success', 'Refund rate', 'Chargebacks', 'Financial risk'], actions: ['Review financial risk', 'Freeze payments', 'Generate financial report'], restrictions: ['No unverified settlement', 'Financial history remains immutable'] },
  { name: 'Revenue Intelligence', purpose: 'Monitor revenue performance and future financial scenarios.', monitors: ['Subscription Revenue', 'Lead Lock Revenue', 'Deal Lock Revenue', 'Verification Revenue', 'Advertising Revenue', 'AI Revenue', 'Marketplace Revenue', 'Future Revenue Forecasts'], kpis: ['Revenue by source', 'Growth', 'Forecast', 'Margin signals'], actions: ['Review revenue strategy', 'Generate revenue forecast'], restrictions: ['Forecasts must identify assumptions', 'Revenue records require audit lineage'] },
  { name: 'User Intelligence', purpose: 'Govern user growth, roles, verification, trust, and risk.', monitors: ['Role Distribution', 'Active Users', 'Inactive Users', 'Trust Leaders', 'High-Risk Users', 'Verification Status'], kpis: ['Active users', 'High-risk users', 'Verification rate', 'Role mix'], actions: ['Review account', 'Suspend account', 'Request verification'], restrictions: ['Privacy and lawful purpose required', 'No unsupported account action'] },
  { name: 'Property Intelligence', purpose: 'Proposed review of sample inventory, coverage, and verification signals.', monitors: ['Inventory Growth', 'Property Types', 'Coverage Statistics', 'Listing Quality', 'Verification Performance'], kpis: ['Inventory growth', 'Verification state', 'Coverage', 'Listing quality'], actions: ['Review listing', 'Flag evidence gap', 'Open verification investigation'], restrictions: ['Evidence required', 'Freeze/publication authority DECISION REQUIRED', 'No silent publication or removal'] },
  { name: 'Lead Intelligence', purpose: 'Proposed review of lead demand, conversion, protection, and disputes.', monitors: ['Lead Volume', 'Lead Conversion', 'Lead Locks', 'Lead Disputes', 'Lead Revenue'], kpis: ['Lead conversion', 'Lock rate', 'Disputes', 'Lead revenue'], actions: ['Review lead', 'Flag concern', 'Escalate ownership dispute'], restrictions: ['Lead ownership history should be immutable', 'Freeze/reassignment authority DECISION REQUIRED'] },
  { name: 'Deal Intelligence', purpose: 'Proposed review of transaction volume, value, conversion, locks, and commission.', monitors: ['Deal Volume', 'Deal Value', 'Deal Conversion', 'Deal Lock Activity', 'Commission Tracking'], kpis: ['Deal value', 'Success rate', 'Lock activity', 'Commission'], actions: ['Review deal', 'Flag concern', 'Open investigation'], restrictions: ['Settlement and freeze authority DECISION REQUIRED', 'Participant history should be preserved'] },
  { name: 'Verification Intelligence', purpose: 'Govern verification queues, approvals, rejections, escalations, and revenue.', monitors: ['Verification Queues', 'Approval Rates', 'Rejection Rates', 'Escalations', 'Verification Revenue'], kpis: ['Approval rate', 'Rejection rate', 'Queue age', 'Verification revenue'], actions: ['Review queue', 'Modify policy', 'Escalate case'], restrictions: ['Policy changes require audit', 'No self-approval bypass'] },
  { name: 'Fraud Intelligence', purpose: 'Proposed review of cross-domain fraud and high-risk signals.', monitors: ['Fraud Cases', 'Fake Listings', 'Fake Users', 'Payment Fraud', 'Commission Fraud', 'Trust Violations', 'High-Risk Areas'], kpis: ['Open cases', 'Risk severity', 'Resolution time', 'Repeat abuse'], actions: ['Flag signal', 'Open investigation', 'Escalate incident'], restrictions: ['Preserve evidence', 'No unsupported accusation', 'Freeze authority DECISION REQUIRED'] },
  { name: 'Trust Intelligence', purpose: 'Govern trust indices, trends, reputation, and recovery.', monitors: ['Trust Index', 'Trust Trends', 'Trust Leaders', 'Trust Risks', 'Trust Recovery'], kpis: ['Trust index', 'Trust change', 'High-risk profiles', 'Recovery rate'], actions: ['Review trust policy', 'Request evidence', 'Approve recovery workflow'], restrictions: ['Trust signals must be explainable', 'No discriminatory proxy'] },
  { name: 'Compliance Intelligence', purpose: 'Monitor policy, verification, audit, AI, and platform compliance.', monitors: ['Policy Compliance', 'Verification Compliance', 'Audit Compliance', 'AI Compliance', 'Platform Compliance'], kpis: ['Compliance rate', 'Open violations', 'Audit completeness', 'AI compliance'], actions: ['Approve policy', 'Reject policy', 'Open compliance investigation'], restrictions: ['Lawful purpose and privacy controls required', 'No governance bypass'] },
  { name: 'AI Workforce Intelligence', purpose: 'Govern the 54-entry design registry; production services and telemetry are not established.', monitors: ['54 Registry Entries', 'Intended Roles', 'Proposed Policies'], kpis: ['DECISION REQUIRED: production availability and performance measures'], actions: ['Review registry entry', 'Propose AI policy', 'Escalate implementation gap'], restrictions: ['AI decisions require traceability if implemented', 'Suspension authority DECISION REQUIRED'] },
  { name: 'Growth Intelligence', purpose: 'Monitor city, province, national, user, revenue, and marketplace growth.', monitors: ['City Expansion', 'Province Expansion', 'National Growth', 'User Growth', 'Revenue Growth', 'Marketplace Growth'], kpis: ['City growth', 'Province growth', 'User growth', 'Marketplace growth'], actions: ['Open expansion plan', 'Generate growth report'], restrictions: ['Plans require approved evidence and assumptions'] },
  { name: 'Audit Intelligence', purpose: 'Provide complete governance visibility into logs, actions, escalations, decisions, and events.', monitors: ['All Logs', 'All Actions', 'All Escalations', 'All Decisions', 'All Governance Events'], kpis: ['Audit completeness', 'Privileged actions', 'Open exceptions', 'Resolution time'], actions: ['Inspect audit event', 'Export audit report', 'Open audit investigation'], restrictions: ['Audit history cannot be deleted', 'Historical records cannot be altered'] },
  { name: 'Emergency Control Center', purpose: 'Proposed review and escalation of platform emergencies; intervention scope is DECISION REQUIRED.', monitors: ['Critical incidents', 'Security alerts', 'Fraud emergencies', 'Platform health'], kpis: ['Open emergencies', 'Response time', 'Affected systems', 'Recovery state'], actions: ['Flag incident', 'Request human review', 'Escalate incident', 'Propose scoped intervention'], restrictions: ['No emergency freeze scope is approved here', 'Any approved human action requires reason, audit, and recovery controls'] },
  { name: 'Strategic Planning Center', purpose: 'Manage long-term expansion, pricing, revenue, verification, trust, AI, and platform policy.', monitors: ['Expansion Plans', 'Pricing Policies', 'Revenue Strategies', 'Verification Policies', 'Trust Policies', 'AI Policies', 'Platform Rules'], kpis: ['Plan progress', 'Policy adoption', 'Revenue impact', 'Risk impact'], actions: ['Approve policy', 'Reject policy', 'Modify governance', 'Open strategic review'], restrictions: ['Policy changes require versioning, reason, and audit trail'] },
];

export const governanceRules: GovernanceRule[] = [
  { domain: 'Platform Governance', rules: ['Maintain platform integrity', 'Preserve approved architecture', 'Require reasoned changes'], owner: 'Super Admin', escalation: 'Emergency or unresolved matters remain under Super Admin control.' },
  { domain: 'Business Governance', rules: ['Approve role, market, pricing, and revenue strategies', 'Use evidence-backed forecasts'], owner: 'Super Admin', escalation: 'Business risk is reported through Executive Overview.' },
  { domain: 'AI Governance', rules: ['Govern the 54-entry design registry', 'Review proposed AI policies', 'Define traceability before any deployment'], owner: 'Super Admin (proposed governance role)', escalation: 'AI Admin is a proposed design role; implementation and authority remain DECISION REQUIRED.' },
  { domain: 'Financial Governance', rules: ['Review revenue, subscriptions, invoices, payments, refunds, and chargebacks', 'Preserve financial audit lineage'], owner: 'Super Admin', escalation: 'Financial anomalies route through AI Admin and financial intelligence.' },
  { domain: 'Risk and Security Governance', rules: ['Control fraud, trust, compliance, and emergency workflows', 'Preserve evidence'], owner: 'Super Admin', escalation: 'Critical risk activates Emergency Control Center.' },
  { domain: 'Strategic Governance', rules: ['Version expansion, pricing, trust, verification, AI, and platform policies', 'Record impact and assumptions'], owner: 'Super Admin', escalation: 'Strategic decisions require governance audit events.' },
];

export const reportingRules: ReportingRule[] = [
  { cadence: 'Daily', report: 'Daily Executive Operations Report', contents: ['Platform health', 'Users', 'Properties', 'Leads', 'Deals', 'Payments', 'Fraud', 'AI workforce'], audience: 'Super Admin and approved operators' },
  { cadence: 'Weekly', report: 'Weekly Business and Risk Report', contents: ['Growth', 'Revenue', 'Trust', 'Fraud', 'Compliance'], audience: 'Super Admin and approved leadership' },
  { cadence: 'Monthly', report: 'Monthly Governance Report', contents: ['Policies', 'Audit integrity', 'AI governance', 'Financial performance'], audience: 'Super Admin and authorized governance' },
  { cadence: 'Quarterly', report: 'Quarterly Strategic Report', contents: ['Expansion', 'Pricing', 'Revenue strategy', 'Marketplace health'], audience: 'Super Admin and approved stakeholders' },
  { cadence: 'Annual', report: 'Annual Platform Report', contents: ['National growth', 'Trust outcomes', 'Financial outcomes', 'AI workforce outcomes'], audience: 'Super Admin and approved stakeholders' },
  { cadence: 'Executive', report: 'Executive Decision Brief', contents: ['Decision context', 'Options', 'Risks', 'Evidence', 'Recommendation'], audience: 'Super Admin only' },
  { cadence: 'Investor', report: 'Investor Report', contents: ['Approved business intelligence', 'Revenue', 'Growth', 'Market expansion'], audience: 'Authorized investors or stakeholders' },
  { cadence: 'Custom', report: 'Custom Governance Report', contents: ['Selected modules', 'Evidence graph', 'Actions', 'Outcomes'], audience: 'Authorized reviewer' },
];

export const notificationRules: NotificationRule[] = [
  { event: 'Critical Fraud Alert', priority: 'Critical', recipients: ['Super Admin', 'AI Admin'], action: 'Preserve evidence and activate fraud governance.' },
  { event: 'Critical Payment Alert', priority: 'Critical', recipients: ['Super Admin', 'AI Admin'], action: 'Review and escalate; financial freeze authority and scope are DECISION REQUIRED.' },
  { event: 'Critical Trust Alert', priority: 'Critical', recipients: ['Super Admin', 'AI Admin'], action: 'Review evidence and trust policy impact.' },
  { event: 'Critical Compliance Alert', priority: 'Critical', recipients: ['Super Admin', 'Compliance AI', 'AI Admin'], action: 'Open compliance governance review.' },
  { event: 'Critical AI Alert', priority: 'Critical', recipients: ['Super Admin', 'AI Admin'], action: 'Review AI health, accuracy, and policy compliance.' },
  { event: 'Critical Security Alert', priority: 'Critical', recipients: ['Super Admin', 'Security operations'], action: 'Activate controlled security response.' },
  { event: 'Platform Emergency Alert', priority: 'Emergency', recipients: ['Super Admin', 'AI Admin'], action: 'Open Emergency Control Center incident.' },
];

export const emergencyRules = ['FUTURE / DECISION REQUIRED: emergency action scope, authority, and time limits.', 'Any approved emergency control requires a reason code, actor, target, timestamp, scope, and recovery owner.', 'Emergency controls must be reviewed and cannot erase historical records.', 'Platform-wide freeze approval and safeguards are DECISION REQUIRED.', 'Every approved emergency action generates notifications, audit events, and post-incident review.'];
export const overrideRules = ['Override AI Admin decisions only with a documented human reason and approved authority.', 'Override system decisions only within lawful and approved governance policy.', 'DECISION REQUIRED: account suspension authority, scope, duration, notice, appeal, and safeguards.', 'Archive records only under retention policy and never as audit erasure.', 'Approve or reject policies through versioned governance changes.', 'Open and close investigations with evidence, findings, and final outcome.'];
export const aiGovernanceRules = ['Super Admin is the proposed human governance authority; scope must be approved.', 'The 54 AI Workforce Registry entries are design definitions, not deployed assistants.', 'Any future AI Admin recommendations require human review and approved authority boundaries.', 'Implemented AI must not delete audit history or alter historical records.', 'AI policy changes require versioning, reason, impact, and audit record before implementation.'];
export const businessGovernanceRules = ['Business decisions use approved metrics and traceable assumptions.', 'Pricing and revenue changes require effective dates and policy versioning.', 'Expansion plans require evidence, dependency review, and risk assessment.', 'Investor and executive reports must distinguish measured results from forecasts.'];

export const auditRules: AuditRule[] = [
  { domain: 'Governance', events: ['Policy approved', 'Policy rejected', 'Governance modified'], requiredFields: ['actor', 'policy', 'version', 'reason', 'timestamp', 'outcome'], retention: 'Immutable governance archive' },
  { domain: 'Overrides', events: ['AI Admin override', 'System decision override', 'Account suspension', 'Record archive'], requiredFields: ['actor', 'target', 'action', 'reasonCode', 'scope', 'timestamp', 'outcome'], retention: 'Permanent privileged-action record' },
  { domain: 'Emergency', events: ['Freeze user', 'Freeze listing', 'Freeze lead', 'Freeze deal', 'Freeze payments', 'Freeze marketplace', 'Freeze AI', 'Freeze platform'], requiredFields: ['actor', 'target', 'scope', 'reason', 'timestamp', 'recoveryOwner', 'reviewState'], retention: 'Incident and post-incident archive' },
  { domain: 'Platform', events: ['All logs', 'All actions', 'All escalations', 'All decisions', 'All governance events'], requiredFields: ['actor', 'entity', 'action', 'timestamp', 'previousState', 'newState', 'result'], retention: 'Append-only platform history' },
];

export const superAdminPowers = ['Override AI Admin within approved authority', 'Override System Decisions within approved authority', 'Account suspension authority DECISION REQUIRED', 'Archive Records under approved retention policy', 'Approve Policies', 'Reject Policies', 'Modify Governance through controlled process', 'Open Investigations', 'Close Investigations'];
export const superAdminLimitations = ['All overrides must be logged', 'All governance changes must be logged', 'All emergency actions must be logged', 'Audit history cannot be deleted'];
export const superAdminCommandCenterVersion = '26.0.0';

export interface ReportingRule { cadence: ReportCadence; report: string; contents: string[]; audience: string }
