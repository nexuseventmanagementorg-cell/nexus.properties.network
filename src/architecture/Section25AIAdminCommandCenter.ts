export type AdminModule = 'System Overview' | 'User Intelligence' | 'Property Intelligence' | 'Lead Intelligence' | 'Deal Intelligence' | 'Financial Intelligence' | 'Fraud Intelligence' | 'Trust Intelligence' | 'Compliance Intelligence' | 'AI Workforce Intelligence' | 'Audit Intelligence' | 'Emergency Control Center';
export type ReportCadence = 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annual' | 'Custom';

export interface AdminModuleDefinition {
  name: AdminModule;
  purpose: string;
  monitors: string[];
  kpis: string[];
  actions: string[];
  restrictions: string[];
}

export interface MonitoringRule {
  domain: string;
  signals: string[];
  response: string;
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
  priority: 'Informational' | 'Warning' | 'Critical' | 'Emergency';
  recipients: string[];
  action: string;
}

export interface AuditRule {
  domain: string;
  events: string[];
  requiredFields: string[];
  retention: string;
}

export const dashboardModules: AdminModuleDefinition[] = [
  { name: 'System Overview', purpose: 'Provide the authoritative platform health and risk snapshot.', monitors: ['Total Users', 'Total Properties', 'Total Leads', 'Total Deals', 'Total Revenue', 'Total AI Interactions', 'System Health Score', 'Platform Risk Score'], kpis: ['System health', 'Platform risk', 'Growth', 'Operational throughput'], actions: ['Generate executive report', 'Open system health view'], restrictions: ['No historical rewriting', 'No governance removal'] },
  { name: 'User Intelligence', purpose: 'Monitor user activity, verification, trust, roles, and growth.', monitors: ['New Users', 'Active Users', 'Suspended Users', 'Verification Status', 'Trust Scores', 'Role Distribution', 'Growth Trends'], kpis: ['New users', 'Active users', 'Suspensions', 'Verification rate'], actions: ['Review user', 'Request verification', 'Escalate risk'], restrictions: ['No unauthorized private-data access', 'No audit deletion'] },
  { name: 'Property Intelligence', purpose: 'Monitor listing quality, verification, coverage, and risk.', monitors: ['New Listings', 'Verified Listings', 'Rejected Listings', 'Flagged Listings', 'Fraud Alerts', 'Coverage Statistics'], kpis: ['New listings', 'Verification rate', 'Flagged inventory', 'Coverage'], actions: ['Review listing', 'Freeze listing', 'Open investigation'], restrictions: ['Evidence required for decisions', 'No silent status changes'] },
  { name: 'Lead Intelligence', purpose: 'Proposed review of lead creation, qualification, routing, locks, conversion, and disputes.', monitors: ['Lead Creation', 'Lead Qualification', 'Lead Routing', 'Lead Locks', 'Lead Conversions', 'Lead Disputes'], kpis: ['Qualified leads', 'Routing time', 'Lock rate', 'Conversion rate'], actions: ['Review lead', 'Flag concern', 'Escalate dispute'], restrictions: ['Lead ownership history should be immutable', 'Freeze/reassignment authority DECISION REQUIRED'] },
  { name: 'Deal Intelligence', purpose: 'Proposed review of transactions, milestones, revenue, and disputes.', monitors: ['Active Deals', 'Locked Deals', 'Completed Deals', 'Cancelled Deals', 'Deal Revenue', 'Deal Disputes'], kpis: ['Active deals', 'Completion rate', 'Deal time', 'Deal revenue'], actions: ['Review deal', 'Flag concern', 'Open investigation'], restrictions: ['Settlement and freeze authority DECISION REQUIRED', 'No participant history deletion'] },
  { name: 'Financial Intelligence', purpose: 'Proposed review of revenue, subscriptions, invoices, and transactions.', monitors: ['Revenue', 'Subscriptions', 'Invoices', 'Transactions', 'Refunds', 'Chargebacks', 'Lead Lock Revenue', 'Deal Lock Revenue'], kpis: ['Revenue', 'Payment success', 'Refund rate', 'Chargebacks'], actions: ['Review transaction', 'Flag risk', 'Generate financial report'], restrictions: ['Financial audit should be immutable', 'No unverified settlement; freeze authority DECISION REQUIRED'] },
  { name: 'Fraud Intelligence', purpose: 'Proposed detection and escalation of abuse signals across platform records.', monitors: ['Fake Listings', 'Fake Users', 'Duplicate Accounts', 'Lead Abuse', 'Deal Abuse', 'Payment Abuse', 'Commission Abuse', 'Suspicious Patterns'], kpis: ['Open fraud cases', 'Risk severity', 'Resolution time', 'Repeat violations'], actions: ['Flag', 'Investigate', 'Escalate', 'Recommend protective action'], restrictions: ['Preserve evidence', 'No unsupported accusations', 'Freeze authority DECISION REQUIRED'] },
  { name: 'Trust Intelligence', purpose: 'Track evidence-based reputation and platform trust trends.', monitors: ['Trust Scores', 'Trust Trends', 'Verification Success', 'User Reputation', 'Risk Profiles'], kpis: ['Average trust', 'Trust change', 'Verification success', 'High-risk profiles'], actions: ['Review trust signal', 'Request evidence', 'Escalate trust anomaly'], restrictions: ['Trust score requires evidence', 'No discriminatory proxy signals'] },
  { name: 'Compliance Intelligence', purpose: 'Monitor policy, verification, role, audit, and system compliance.', monitors: ['Policy Violations', 'Verification Violations', 'Audit Violations', 'Role Violations', 'System Compliance'], kpis: ['Open violations', 'Resolution rate', 'Audit completeness', 'Policy compliance'], actions: ['Flag concern', 'Recommend review', 'Escalate compliance'], restrictions: ['Lawful purpose and privacy controls required', 'Freeze authority DECISION REQUIRED', 'No bypass of role policy'] },
  { name: 'AI Workforce Intelligence', purpose: 'Catalog the 54 AI Workforce Registry entries; production services and telemetry are not implied.', monitors: ['54 Registry Entries', 'Intended Roles', 'Proposed Tools', 'Future Evaluations'], kpis: ['DECISION REQUIRED: production availability and performance measures'], actions: ['Review registry entry', 'Route implementation gap', 'Generate design report'], restrictions: ['AI cannot override Super Admin', 'Registry entries do not establish deployed agents'] },
  { name: 'Audit Intelligence', purpose: 'Track user, property, lead, deal, payment, AI, and admin actions.', monitors: ['User Actions', 'Property Actions', 'Lead Actions', 'Deal Actions', 'Payment Actions', 'AI Actions', 'Admin Actions'], kpis: ['Event volume', 'Audit completeness', 'Exceptions', 'Privileged actions'], actions: ['Inspect event', 'Open audit exception', 'Export report'], restrictions: ['Cannot delete audit history', 'Historical records cannot be altered'] },
  { name: 'Emergency Control Center', purpose: 'Review and escalate material platform risks; freeze/suspension authority is DECISION REQUIRED.', monitors: ['Critical alerts', 'System health', 'Fraud incidents', 'Security incidents'], kpis: ['Open emergencies', 'Response time', 'Affected workflows', 'Recovery state'], actions: ['Flag Incident', 'Request Human Review', 'Escalate Incident', 'Open Investigation'], restrictions: ['No freeze/suspension action is approved for AI Admin', 'Any human emergency action requires approved scope, reason, audit, and recovery controls'] },
];

export const monitoringRules: MonitoringRule[] = [
  { domain: 'Platform Health', signals: ['Service failures', 'Latency anomalies', 'Queue backlog'], response: 'Create system alert and health report.', escalation: 'AI Admin to Super Admin for platform-wide impact.' },
  { domain: 'Users and Roles', signals: ['Suspicious activity', 'Verification failure', 'Role violation'], response: 'Flag evidence and request authorized review; restrictions require approved authority.', escalation: 'Compliance AI to AI Admin, then authorized human reviewer.' },
  { domain: 'Properties and Trust', signals: ['Fake listing', 'Document mismatch', 'Trust anomaly'], response: 'Flag, preserve evidence, and request review; freeze authority DECISION REQUIRED.', escalation: 'Fraud AI to AI Admin, then authorized human reviewer.' },
  { domain: 'Leads and Deals', signals: ['Ownership abuse', 'Routing manipulation', 'Deal hijacking'], response: 'Flag, collect audit evidence, and escalate; freeze authority DECISION REQUIRED.', escalation: 'Protection AI to AI Admin, then authorized human reviewer.' },
  { domain: 'Financial Activity', signals: ['Duplicate payment', 'Chargeback abuse', 'Invoice manipulation'], response: 'Flag, preserve evidence, and request verification; payment freeze authority DECISION REQUIRED.', escalation: 'Payment Intelligence AI to AI Admin, then authorized human reviewer.' },
  { domain: 'AI Workforce', signals: ['Failure spike', 'Quality decline', 'Unsafe escalation pattern'], response: 'Route failure report and recommend review; restriction authority DECISION REQUIRED.', escalation: 'AI Admin to Super Admin.' },
];

export const reportingRules: ReportingRule[] = [
  { cadence: 'Daily', report: 'Daily Operations Report', contents: ['Health', 'Users', 'Properties', 'Leads', 'Deals', 'Payments', 'Fraud', 'AI activity'], audience: 'AI Admin and operations teams' },
  { cadence: 'Weekly', report: 'Weekly Risk and Trust Report', contents: ['Trust trends', 'Verification outcomes', 'Fraud cases', 'Compliance violations'], audience: 'AI Admin and Super Admin' },
  { cadence: 'Monthly', report: 'Monthly Executive Report', contents: ['Revenue', 'Growth', 'Conversion', 'AI workforce', 'Platform risk'], audience: 'Super Admin and approved leadership' },
  { cadence: 'Quarterly', report: 'Quarterly Governance Report', contents: ['Policy health', 'Audit integrity', 'Role access', 'System compliance'], audience: 'Super Admin and authorized governance' },
  { cadence: 'Annual', report: 'Annual Platform Intelligence Report', contents: ['Marketplace performance', 'Trust outcomes', 'Financial performance', 'National expansion signals'], audience: 'Super Admin and approved stakeholders' },
  { cadence: 'Custom', report: 'Custom Investigation Report', contents: ['Selected entities', 'Evidence graph', 'AI decisions', 'Final outcome'], audience: 'Authorized reviewer' },
];

export const notificationRules: NotificationRule[] = [
  { event: 'Fraud Alert', priority: 'Critical', recipients: ['AI Admin', 'Super Admin when escalated'], action: 'Preserve evidence and open fraud review.' },
  { event: 'Trust Alert', priority: 'Warning', recipients: ['AI Admin', 'Authorized owner'], action: 'Review trust signal and request evidence.' },
  { event: 'Verification Alert', priority: 'Warning', recipients: ['Verification team', 'AI Admin'], action: 'Route verification exception.' },
  { event: 'Payment Alert', priority: 'Critical', recipients: ['Financial team', 'AI Admin'], action: 'Review transaction and settlement state.' },
  { event: 'Dispute Alert', priority: 'Critical', recipients: ['AI Admin', 'Involved parties'], action: 'Review evidence and escalate; freeze authority is DECISION REQUIRED.' },
  { event: 'System Alert', priority: 'Critical', recipients: ['AI Admin', 'Super Admin'], action: 'Open health incident.' },
  { event: 'AI Alert', priority: 'Warning', recipients: ['AI Admin'], action: 'Review assistant health, quality, or failure pattern.' },
  { event: 'Emergency Alert', priority: 'Emergency', recipients: ['AI Admin', 'Super Admin'], action: 'Activate controlled emergency response.' },
];

export const fraudRules = ['Correlate identity, property, lead, deal, payment, and commission signals.', 'Preserve evidence before freezing or escalating a case.', 'Use confidence and evidence references for every fraud signal.', 'Detect repeated violations and coordinated suspicious patterns.', 'Do not label a user or entity fraudulent without an authorized decision.', 'Route material fraud to AI Admin and unresolved matters to Super Admin.'];
export const trustRules = ['Trust scores must be evidence-based and explainable.', 'Trust trends must distinguish verification, transaction, payment, dispute, and fraud signals.', 'AI Admin may review or recommend trust changes but cannot fabricate evidence.', 'High-impact trust changes require audit records and notification policy.', 'Trust data must respect privacy and role-scoped access.'];
export const complianceRules = ['Enforce platform policies and role restrictions.', 'Require verification for protected workflows.', 'Require audit events for every privileged action.', 'Apply data privacy, retention, and authorized-access controls.', 'Escalate policy conflicts and system compliance failures.'];
export const emergencyRules = ['FUTURE / DECISION REQUIRED: emergency action scope, authority, and time limits.', 'Any approved emergency control requires an incident reason code and review.', 'Freezing must not delete or alter historical records.', 'High-impact controls require authorized human governance.', 'Every approved emergency action must generate notification, audit, and recovery events.'];
export const auditRules: AuditRule[] = [
  { domain: 'Platform', events: ['Health changes', 'Emergency controls', 'Configuration changes'], requiredFields: ['actor', 'action', 'timestamp', 'reason', 'result'], retention: 'Append-only governance history' },
  { domain: 'Entities', events: ['User', 'Property', 'Lead', 'Deal', 'Payment actions'], requiredFields: ['actor', 'entityId', 'action', 'timestamp', 'previousState', 'newState'], retention: 'Immutable entity audit trail' },
  { domain: 'AI Workforce', events: ['AI decisions', 'Escalations', 'Failures', 'Reports'], requiredFields: ['assistant', 'inputReference', 'decision', 'confidence', 'timestamp'], retention: 'Retained with AI operations history' },
  { domain: 'Administration', events: ['Approve', 'Reject', 'Suspend', 'Freeze', 'Escalate', 'Investigate'], requiredFields: ['admin', 'target', 'action', 'reasonCode', 'timestamp', 'outcome'], retention: 'Privileged action archive' },
];

export interface AuditRule { domain: string; events: string[]; requiredFields: string[]; retention: string }

export const escalationRules = [
  { level: 1, owner: 'AI Assistant', trigger: 'Routine user or workflow question', action: 'Respond or route to specialist.' },
  { level: 2, owner: 'Specialized AI', trigger: 'Domain-specific risk or decision', action: 'Analyze, report, and escalate material concerns.' },
  { level: 3, owner: 'AI Admin', trigger: 'Cross-domain risk, fraud, dispute, or governance issue', action: 'Monitor, flag, recommend, investigate, and escalate; approval, suspension, and freeze authority are DECISION REQUIRED.' },
  { level: 4, owner: 'Super Admin', trigger: 'Final authority, emergency, or unresolved governance issue', action: 'Apply final human decision and policy control.' },
];

export const aiGovernanceRules = ['AI Admin is the highest AI authority but remains subordinate to Super Admin.', 'AI Admin cannot delete audit history.', 'AI Admin cannot override Super Admin.', 'AI Admin cannot remove system governance.', 'AI Admin cannot alter historical records.', 'Every AI Admin decision must include evidence references, reason, timestamp, and outcome.'];
export const adminDecisionOptions = ['Review', 'Flag', 'Recommend', 'Escalate', 'Investigate', 'Request Information', 'Generate Reports'];
export const aiAdminCommandCenterVersion = '25.0.0';
