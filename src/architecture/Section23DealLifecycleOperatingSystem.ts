export type DealStatus = 'Opportunity' | 'Qualified' | 'Property Visit' | 'Offer Submitted' | 'Negotiation' | 'Agreement Pending' | 'Deal Locked' | 'Documentation Pending' | 'Payment Pending' | 'Under Review' | 'Completed' | 'Closed' | 'Cancelled' | 'Expired' | 'Disputed' | 'Fraud Investigation';
export type DealSource = 'Qualified Leads' | 'Lead Lock System' | 'Direct Seller Connections' | 'Agency Referrals' | 'Developer Opportunities' | 'Investor Opportunities' | 'Corporate Requests' | 'Government Opportunities';
export type DealLockDuration = '7 Days';

export interface DealWorkflowStep {
  order: number;
  state: string;
  owner: string;
  requiredEvidence: string[];
  exitConditions: string[];
}

export interface DealLockRule {
  duration: DealLockDuration;
  extensionAllowed: boolean;
  maximumTotalDurationDays: 15;
  eligibility: string[];
  protections: string[];
  requiredAuditEvents: string[];
}

export interface PaymentRule {
  milestone: string;
  trigger: string;
  requiredEvidence: string[];
  releaseCondition: string;
}

export interface DealAuditRule {
  event: string;
  requiredFields: string[];
  retention: string;
}

export const dealSources: DealSource[] = ['Qualified Leads', 'Lead Lock System', 'Direct Seller Connections', 'Agency Referrals', 'Developer Opportunities', 'Investor Opportunities', 'Corporate Requests', 'Government Opportunities'];
export const dealStatuses: DealStatus[] = ['Opportunity', 'Qualified', 'Property Visit', 'Offer Submitted', 'Negotiation', 'Agreement Pending', 'Deal Locked', 'Documentation Pending', 'Payment Pending', 'Under Review', 'Completed', 'Closed', 'Cancelled', 'Expired', 'Disputed', 'Fraud Investigation'];

export const dealWorkflow: DealWorkflowStep[] = [
  { order: 1, state: 'Lead Converted', owner: 'Lead Lifecycle System', requiredEvidence: ['Converted lead', 'Lead owner', 'Lead Lock history'], exitConditions: ['Deal opportunity created'] },
  { order: 2, state: 'Deal Opportunity Created', owner: 'Deal service', requiredEvidence: ['Deal ID', 'Source', 'Participants', 'Property'], exitConditions: ['Deal record and audit event exist'] },
  { order: 3, state: 'Deal Qualification', owner: 'Deal Qualification AI', requiredEvidence: ['Buyer intent', 'Seller intent', 'Property match', 'Budget', 'Documentation readiness'], exitConditions: ['Deal qualifies or is closed with reason'] },
  { order: 4, state: 'Property Visit', owner: 'Assigned participants', requiredEvidence: ['Visit schedule', 'Participants', 'Visit outcome'], exitConditions: ['Offer permitted or opportunity expires'] },
  { order: 5, state: 'Offer Submission', owner: 'Buyer, seller, or authorized agent', requiredEvidence: ['Offer amount', 'Terms', 'Offer actor', 'Timestamp'], exitConditions: ['Accepted, countered, or rejected'] },
  { order: 6, state: 'Negotiation', owner: 'Deal participants', requiredEvidence: ['Offers', 'Counter-offers', 'Participant actions', 'Approvals'], exitConditions: ['Agreement terms recorded'] },
  { order: 7, state: 'Agreement Stage', owner: 'Authorized participants and compliance', requiredEvidence: ['Agreement', 'Supporting documents', 'Compliance review'], exitConditions: ['Deal Lock activated'] },
  { order: 8, state: 'Deal Lock', owner: 'Eligible participant', requiredEvidence: ['Lock duration', 'Lock reason', 'Participant eligibility'], exitConditions: ['Lock active and ownership history stored'] },
  { order: 9, state: 'Documentation', owner: 'Deal participants and verification', requiredEvidence: ['Agreements', 'Verification documents', 'Attachments'], exitConditions: ['Documents verified or issue escalated'] },
  { order: 10, state: 'Payment Processing', owner: 'Payment service and participants', requiredEvidence: ['Milestone', 'Payment event', 'Verification state'], exitConditions: ['Payment reconciled or dispute opened'] },
  { order: 11, state: 'Completion Review', owner: 'Deal Protection AI and AI Admin', requiredEvidence: ['Final documents', 'Milestones', 'Payment settlement', 'Commission eligibility'], exitConditions: ['Completed or escalated'] },
  { order: 12, state: 'Deal Closed', owner: 'Platform', requiredEvidence: ['Final outcome', 'Audit record', 'Settlement state'], exitConditions: ['Immutable closed record'] },
];

export const dealQualificationResponsibilities = ['Verify buyer intent', 'Verify seller intent', 'Verify property match', 'Verify budget alignment', 'Verify documentation readiness', 'Assess deal probability'];

export const dealLockRules: DealLockRule[] = [
  {
    duration: '7 Days',
    extensionAllowed: true,
    maximumTotalDurationDays: 15,
    eligibility: ['Active transaction opportunity'],
    protections: [
      'Preserve participants and milestones.',
      'Record and audit every extension decision.',
      'Enforce expiry server-side in production.',
      'Do not exceed 15 total days, including extensions.',
    ],
    requiredAuditEvents: ['Lock created', 'Extension decision', 'Participant/milestone changes', 'Lock released or expired'],
  },
];

export const legacyDealLockDurations = ['3 Days', '15 Days', '30 Days', 'Custom Enterprise Lock'] as const;
export const legacyDealLockDurationStatus = 'LEGACY / NON-CANONICAL';

export const dealOwnershipRules = ['Store Deal ID, lead source, lead owner, assigned agent, assigned agency, buyer, seller, property, timeline, and audit history.', 'Record every participant and role at the moment of participation.', 'Require authorized reason and audit event for participant changes.', 'Preserve ownership and contribution history through closure or dispute.', 'DECISION REQUIRED: dispute/fraud hold, freeze, and release authority.'];

export const negotiationTrackingRules = ['Offers', 'Counter Offers', 'Milestones', 'Participant Actions', 'Approvals', 'Timeline'];
export const dealDocuments = ['Agreements', 'Supporting Documents', 'Verification Documents', 'Compliance Documents', 'Deal Attachments'];

export const paymentRules: PaymentRule[] = [
  { milestone: 'Booking Payment', trigger: 'Approved booking or reservation', requiredEvidence: ['Booking record', 'Buyer identity', 'Payment reference'], releaseCondition: 'Payment provider verification and deal lock active' },
  { milestone: 'Advance Payment', trigger: 'Agreement milestone', requiredEvidence: ['Agreement', 'Payment instruction', 'Parties'], releaseCondition: 'Authorized payment verification' },
  { milestone: 'Installment Payment', trigger: 'Scheduled deal milestone', requiredEvidence: ['Milestone status', 'Invoice', 'Payment reference'], releaseCondition: 'Reconciliation complete' },
  { milestone: 'Commission Payment', trigger: 'DECISION REQUIRED: approved commission eligibility and settlement policy', requiredEvidence: ['Contribution history', 'Deal milestones', 'Authorized settlement approval'], releaseCondition: 'DECISION REQUIRED: dispute/hold release policy' },
  { milestone: 'Final Settlement', trigger: 'Completion review passed', requiredEvidence: ['Final documents', 'Completion evidence', 'Settlement statement'], releaseCondition: 'Authorized human approval; authority and settlement policy DECISION REQUIRED' },
];

export const commissionRules = [
  'CANONICAL: NEXUS platform share is 1%.',
  'DECISION REQUIRED: commission base, tax treatment, rounding, payer, participant split, dispute adjustment, and refund/chargeback behavior.',
];
export const commissionIntelligenceResponsibilities = ['DECISION REQUIRED: commission calculation and participant-allocation responsibilities.'];
export const dealProtectionResponsibilities = ['Monitor deal integrity', 'Monitor milestones', 'Detect suspicious activity', 'Detect participant conflicts', 'Generate risk reports'];

export const disputeRules = [
  { order: 1, owner: 'Deal Protection AI', action: 'Collect deal locks, participant actions, milestones, documents, and payment evidence.' },
  { order: 2, owner: 'Commission Intelligence AI', action: 'Collect relevant records for review; commission eligibility and calculation are DECISION REQUIRED.' },
  { order: 3, owner: 'Dispute Resolution AI', action: 'Classify dispute, request evidence, and recommend resolution.' },
  { order: 4, owner: 'AI Admin', action: 'Review evidence, flag, recommend, and escalate; freeze/decision authority is DECISION REQUIRED.' },
  { order: 5, owner: 'Authorized human reviewer (role and authority DECISION REQUIRED)', action: 'Make an audited human decision within approved authority.' },
];

export const disputeTypes = ['Commission Disputes', 'Ownership Disputes', 'Payment Disputes', 'Documentation Disputes', 'Participation Disputes'];
export const fraudRules = ['Detect deal hijacking and unauthorized participant changes.', 'Detect commission theft and bypass attempts.', 'Detect payment manipulation or mismatched payment references.', 'Detect fake participants and identity conflicts.', 'Detect document manipulation and ownership fraud.', 'Detect milestone abuse, false completion, and timeline manipulation.'];
export const dealPerformanceMetrics = ['Total Deals', 'Completed Deals', 'Cancelled Deals', 'Disputed Deals', 'Average Deal Time', 'Revenue Generated', 'Commission Generated', 'Success Rate'];
export const involvedAiAssistants = ['Deal AI', 'Negotiation AI', 'Deal Protection AI', 'Commission Intelligence AI', 'Dispute Resolution AI', 'Fraud Detection AI', 'AI Admin'];
export const notificationRules = ['Deal Created', 'Deal Qualified', 'Offer Submitted', 'Deal Locked', 'Milestone Reached', 'Payment Received', 'Dispute Opened', 'Deal Completed', 'Deal Closed'];
export const dealDashboardQueues = ['Deal Pipeline', 'Active Deals', 'Locked Deals', 'Milestones', 'Payments', 'Disputes', 'Reports', 'Performance Analytics'];

export const auditRules: DealAuditRule[] = [
  { event: 'Deal created and qualified', requiredFields: ['dealId', 'leadSource', 'participants', 'timestamp', 'status', 'AI decisions'], retention: 'Append-only deal lifecycle history' },
  { event: 'Offer, negotiation, and approval', requiredFields: ['dealId', 'actor', 'action', 'offer or counter-offer', 'timestamp', 'status'], retention: 'Immutable negotiation timeline' },
  { event: 'Deal lock and milestone', requiredFields: ['dealId', 'lockDetails', 'milestone', 'participant', 'timestamp'], retention: 'Retained through closure or dispute' },
  { event: 'Payment and final outcome', requiredFields: ['dealId', 'paymentEvent', 'AI decisions', 'finalOutcome', 'timestamp'], retention: 'Immutable financial and governance record' },
];

export const escalationRules = [
  { level: 1, owner: 'Deal AI', trigger: 'Unqualified intent, weak property match, or documentation gap', action: 'Request information or stop progression' },
  { level: 2, owner: 'Deal Protection AI', trigger: 'Deal integrity risk, milestone anomaly, or participant conflict', action: 'Flag, collect evidence, and generate risk report; freeze authority is DECISION REQUIRED' },
  { level: 3, owner: 'Commission Intelligence AI', trigger: 'Ownership or commission conflict', action: 'Escalate for authorized review; calculation and eligibility are DECISION REQUIRED' },
  { level: 4, owner: 'Dispute Resolution AI', trigger: 'Formal deal dispute', action: 'Classify dispute and recommend resolution' },
  { level: 5, owner: 'AI Admin', trigger: 'Material risk, fraud, payment, or policy exception', action: 'Review, flag, recommend, and escalate; approval/freeze authority is DECISION REQUIRED' },
  { level: 6, owner: 'Authorized human reviewer (role and authority DECISION REQUIRED)', trigger: 'Unresolved or platform-wide governance issue', action: 'Final human decision within approved authority' },
];

export const dealLifecycleOperatingSystemVersion = '23.0.0';
