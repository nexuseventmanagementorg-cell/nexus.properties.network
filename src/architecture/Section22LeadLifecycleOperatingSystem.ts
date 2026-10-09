export type LeadStatus = 'New' | 'Pending Qualification' | 'Qualified' | 'Unqualified' | 'Assigned' | 'Locked' | 'In Discussion' | 'Negotiation' | 'Offer Submitted' | 'Deal In Progress' | 'Converted' | 'Closed' | 'Expired' | 'Cancelled' | 'Disputed' | 'Fraud Investigation';
export type LeadSource = 'Website Forms' | 'AI Property Search' | 'AI Assistants' | 'WhatsApp AI' | 'Facebook Leads' | 'Google Ads' | 'Direct Referrals' | 'Agency Referrals' | 'Developer Campaigns' | 'Corporate Requests' | 'Government Requests';
export type LockDuration = '48 Hours';

export interface LeadWorkflowStep {
  order: number;
  state: string;
  owner: string;
  requiredInputs: string[];
  exitConditions: string[];
}

export interface LeadScoreRule {
  factor: string;
  weight: number;
  positiveSignal: string;
  negativeSignal: string;
}

export interface LeadRoutingRule {
  priority: number;
  rule: string;
  action: string;
}

export interface LeadLockRule {
  duration: LockDuration;
  eligibility: string[];
  protections: string[];
  requiredAuditEvents: string[];
}

export interface LeadAuditRule {
  event: string;
  requiredFields: string[];
  retention: string;
}

export const leadSources: LeadSource[] = ['Website Forms', 'AI Property Search', 'AI Assistants', 'WhatsApp AI', 'Facebook Leads', 'Google Ads', 'Direct Referrals', 'Agency Referrals', 'Developer Campaigns', 'Corporate Requests', 'Government Requests'];
export const leadStatuses: LeadStatus[] = ['New', 'Pending Qualification', 'Qualified', 'Unqualified', 'Assigned', 'Locked', 'In Discussion', 'Negotiation', 'Offer Submitted', 'Deal In Progress', 'Converted', 'Closed', 'Expired', 'Cancelled', 'Disputed', 'Fraud Investigation'];

export const leadWorkflow: LeadWorkflowStep[] = [
  { order: 1, state: 'User Inquiry', owner: 'User, form, channel, or assistant', requiredInputs: ['User identity or contact', 'Inquiry text', 'Source', 'Property or intent context'], exitConditions: ['Lead record created'] },
  { order: 2, state: 'Lead Created', owner: 'Lead service', requiredInputs: ['Lead ID', 'Created timestamp', 'Source', 'Initial owner state'], exitConditions: ['Required fields stored and audit event emitted'] },
  { order: 3, state: 'Lead Qualification AI', owner: 'Lead Qualification AI', requiredInputs: ['Intent', 'Budget', 'Timeline', 'Property type', 'Location', 'Urgency', 'Completeness'], exitConditions: ['Qualified, unqualified, or information requested'] },
  { order: 4, state: 'Lead Scoring', owner: 'Lead Qualification AI', requiredInputs: ['Score factors', 'Confidence', 'Evidence references'], exitConditions: ['Score between 0 and 100 recorded'] },
  { order: 5, state: 'Lead Routing AI', owner: 'Lead Routing AI', requiredInputs: ['Area match', 'Role match', 'Trust score', 'Eligibility', 'Availability'], exitConditions: ['Eligible professional or queue assigned'] },
  { order: 6, state: 'Assigned To Eligible User', owner: 'Routing service', requiredInputs: ['Assigned user', 'Assignment reason', 'Response deadline'], exitConditions: ['Assignment notification delivered'] },
  { order: 7, state: 'Lead Lock', owner: 'Eligible assigned user', requiredInputs: ['Lock duration', 'Lock actor', 'Lock timestamp'], exitConditions: ['Lock active and history recorded'] },
  { order: 8, state: 'Negotiation', owner: 'Assigned professional and parties', requiredInputs: ['Communication events', 'Property match', 'Visit', 'Offer'], exitConditions: ['Deal opportunity or closure decision'] },
  { order: 9, state: 'Deal Opportunity', owner: 'Deal Protection AI', requiredInputs: ['Offer', 'Parties', 'Property', 'Milestones'], exitConditions: ['Deal pipeline record created'] },
  { order: 10, state: 'Deal Pipeline', owner: 'Assigned professional', requiredInputs: ['Milestone events', 'Commission participation', 'Audit trail'], exitConditions: ['Converted, closed, expired, cancelled, or disputed'] },
];

export const leadQualificationResponsibilities = ['Evaluate intent', 'Evaluate budget', 'Evaluate timeline', 'Evaluate property type', 'Evaluate location', 'Evaluate urgency', 'Evaluate completeness', 'DECISION REQUIRED: scoring weights/range and routing priorities are not approved; displayed values are examples only.'];

export const leadScoringRules: LeadScoreRule[] = [
  { factor: 'Intent Strength', weight: 25, positiveSignal: 'Specific property request and clear action intent', negativeSignal: 'Unclear or exploratory message only' },
  { factor: 'Budget Clarity', weight: 20, positiveSignal: 'Verified or consistent budget range', negativeSignal: 'Missing, contradictory, or implausible budget' },
  { factor: 'Timeline', weight: 15, positiveSignal: 'Defined purchase, lease, or visit window', negativeSignal: 'No timeline or repeated delay signals' },
  { factor: 'Verification Status', weight: 15, positiveSignal: 'Verified identity and consented contact', negativeSignal: 'Unverified or conflicting identity signals' },
  { factor: 'Response Quality', weight: 10, positiveSignal: 'Complete, responsive, and consistent answers', negativeSignal: 'Spam, evasive, or incomplete responses' },
  { factor: 'Property Match Quality', weight: 15, positiveSignal: 'Strong match against verified inventory', negativeSignal: 'No verified inventory match' },
];

export const leadRoutingRules: LeadRoutingRule[] = [
  { priority: 1, rule: 'Area Matching', action: 'Prefer eligible professionals covering the requested city, area, and society.' },
  { priority: 2, rule: 'Role Matching', action: 'Route buyer, seller, developer, investor, industrial, corporate, or government intent to the correct team.' },
  { priority: 3, rule: 'Trust Score Matching', action: 'Exclude professionals below policy threshold and prefer proven trust signals.' },
  { priority: 4, rule: 'Agent Eligibility', action: 'Check authorization, capacity, active status, and property fit.' },
  { priority: 5, rule: 'Agency Eligibility', action: 'Check branch, service area, team permissions, and conflict state.' },
  { priority: 6, rule: 'Developer Eligibility', action: 'Route project-specific demand only to verified project teams.' },
  { priority: 7, rule: 'Corporate Eligibility', action: 'Route enterprise requests to authorized corporate relationship teams.' },
];

export const leadLockRules: LeadLockRule[] = [
  {
    duration: '48 Hours',
    eligibility: ['Eligible agent with an active lead opportunity'],
    protections: [
      'Prevent another eligible agent from simultaneously locking the same protected opportunity.',
      'Keep the property publicly visible and display LEAD LOCK ACTIVE.',
      'Allow existing viewers and favorites to continue viewing.',
      'Use an authoritative server timestamp and server-enforced expiry in production.',
      'Apply deterministic reopen/reassignment rules; an excluded previous locking agent does not automatically regain the lead.',
    ],
    requiredAuditEvents: ['Lock created', 'Lock released', 'Lock expired', 'Reopen/reassignment decision'],
  },
];

export const legacyLeadLockDurations = ['24 Hours', '72 Hours', 'Custom'] as const;
export const legacyLeadLockDurationStatus = 'LEGACY / NON-CANONICAL';

export const leadOwnershipRules = ['Every lead has an immutable Lead ID.', 'Every lead has a created date, source, owner state, assigned user, and history.', 'Only eligible users can lock an assigned lead.', 'Ownership changes require a reason, authorized actor, and audit event.', 'Lead history cannot be deleted or silently rewritten.', 'DECISION REQUIRED: dispute holds, freezes, and release authority.'];

export const negotiationStages = ['Lead', 'Communication', 'Property Match', 'Visit', 'Offer', 'Negotiation', 'Deal Opportunity'];
export const leadPerformanceMetrics = ['Total Leads', 'Qualified Leads', 'Converted Leads', 'Expired Leads', 'Locked Leads', 'Response Time', 'Conversion Rate', 'Revenue Generated'];

export const commissionRules = [
  'CANONICAL: NEXUS platform share is 1%.',
  'DECISION REQUIRED: commission base, tax treatment, rounding, payer, participant split, dispute adjustment, and refund/chargeback behavior.',
];

export const disputeRules = [
  { order: 1, owner: 'Lead Protection AI', action: 'Collect lead ownership, lock, communication, and assignment evidence.' },
  { order: 2, owner: 'Deal Protection AI', action: 'Compare deal participation, milestones, offers, and transaction records.' },
  { order: 3, owner: 'Commission Intelligence AI', action: 'Flag commission questions and escalate; eligibility and calculation are DECISION REQUIRED.' },
  { order: 4, owner: 'AI Admin', action: 'Review evidence, flag, recommend, and escalate; freeze/decision authority is DECISION REQUIRED.' },
  { order: 5, owner: 'Authorized human reviewer (role and authority DECISION REQUIRED)', action: 'Make an audited human decision within approved authority.' },
];

export const fraudRules = ['Detect lead farming and repeated low-quality submissions.', 'Detect duplicate leads across channels and identities.', 'Detect spam and fake leads.', 'Detect ownership abuse and unauthorized contact.', 'Detect routing manipulation and assignment interference.', 'Preserve evidence and route repeated violations to AI Admin.'];
export const notificationRules = ['Lead Created', 'Lead Qualified', 'Lead Assigned', 'Lead Locked', 'Lead Expired', 'Lead Converted', 'Lead Disputed', 'Lead Escalated'];
export const leadDashboardQueues = ['Lead Inbox', 'Lead Queue', 'Qualification Queue', 'Routing Queue', 'Locked Leads', 'Negotiations', 'Disputes', 'Performance Reports'];

export const auditRules: LeadAuditRule[] = [
  { event: 'Lead created', requiredFields: ['leadId', 'userId', 'source', 'timestamp', 'initialStatus'], retention: 'Append-only lifecycle history' },
  { event: 'Qualification and scoring', requiredFields: ['leadId', 'actor', 'timestamp', 'status', 'score', 'AI decisions'], retention: 'Retained with lead and report history' },
  { event: 'Assignment and lock', requiredFields: ['leadId', 'assignedUser', 'owner', 'lockStatus', 'lockDetails', 'timestamp'], retention: 'Retained through deal or closure' },
  { event: 'Negotiation and deal outcome', requiredFields: ['leadId', 'status', 'milestones', 'participants', 'finalOutcome'], retention: 'Immutable deal-linked record' },
];

export const escalationRules = [
  { level: 1, owner: 'Lead Qualification AI', trigger: 'Incomplete, ambiguous, or suspicious intent', action: 'Request information or mark unqualified' },
  { level: 2, owner: 'Lead Routing AI', trigger: 'No eligible match, conflict, or routing anomaly', action: 'Place in routing queue and notify AI Admin' },
  { level: 3, owner: 'Lead Protection AI', trigger: 'Ownership abuse, unauthorized contact, or lock dispute', action: 'Flag, collect evidence, and escalate; lock freeze authority is DECISION REQUIRED' },
  { level: 4, owner: 'Commission Intelligence AI', trigger: 'Participation or commission conflict', action: 'Escalate for authorized review; eligibility and calculation are DECISION REQUIRED' },
  { level: 5, owner: 'AI Admin', trigger: 'Material dispute, fraud signal, or policy exception', action: 'Review, flag, recommend, and escalate; approval/freeze authority is DECISION REQUIRED' },
  { level: 6, owner: 'Authorized human reviewer (role and authority DECISION REQUIRED)', trigger: 'Unresolved or platform-wide governance issue', action: 'Final human decision within approved authority' },
];

export const involvedAiAssistants = ['Lead Qualification AI', 'Lead Routing AI', 'Lead Protection AI', 'Deal Protection AI', 'Commission Intelligence AI', 'Fraud Detection AI', 'AI Admin'];
export const leadLifecycleOperatingSystemVersion = '22.0.0';
