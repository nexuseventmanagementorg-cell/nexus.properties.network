export type VerificationLayer = 'Identity Verification' | 'Role Verification' | 'Property Verification' | 'Document Verification' | 'Media Verification' | 'Fraud Screening' | 'Compliance Review' | 'Authorized Human Review (DECISION REQUIRED)';
export type VerificationStatus = 'Draft' | 'Pending' | 'Under Review' | 'Verification Required' | 'Approved' | 'Published' | 'Suspended' | 'Rejected' | 'Archived' | 'Flagged' | 'Fraud Investigation';
export type DocumentStatus = 'Uploaded' | 'Pending Review' | 'Verified' | 'Rejected' | 'Expired' | 'Needs Reupload';

export interface VerificationWorkflowStep {
  order: number;
  state: string;
  owner: string;
  requiredEvidence: string[];
  exitConditions: string[];
}

export interface VerificationQueueDefinition {
  name: string;
  purpose: string;
  inputs: string[];
  reviewer: string;
  decisions: string[];
}

export interface TrustRule {
  event: string;
  impact: number;
  rationale: string;
}

export interface AuditRule {
  event: string;
  actor: string;
  requiredFields: string[];
  retention: string;
}

export const verificationLayers: VerificationLayer[] = [
  'Identity Verification',
  'Role Verification',
  'Property Verification',
  'Document Verification',
  'Media Verification',
  'Fraud Screening',
  'Compliance Review',
  'Authorized Human Review (DECISION REQUIRED)',
];

export const verificationWorkflows: VerificationWorkflowStep[] = [
  { order: 1, state: 'Draft', owner: 'Submitting user', requiredEvidence: ['Required property fields', 'Contact details'], exitConditions: ['User submits listing'] },
  { order: 2, state: 'Submitted', owner: 'Platform', requiredEvidence: ['Submission timestamp', 'Submitter identity'], exitConditions: ['Automated validation passes'] },
  { order: 3, state: 'Pending Verification', owner: 'Verification AI', requiredEvidence: ['Identity and role state', 'Property payload'], exitConditions: ['Verification checks begin'] },
  { order: 4, state: 'Verification Queue', owner: 'Verification Operations', requiredEvidence: ['Ownership evidence', 'Location and pricing data', 'Documents and media'], exitConditions: ['All queues receive the case'] },
  { order: 5, state: 'Under Review', owner: 'Verification, Fraud, and Compliance AI', requiredEvidence: ['Verification report', 'Fraud report', 'Compliance report', 'Media report'], exitConditions: ['Reports are complete or escalated'] },
  { order: 6, state: 'Approved or Rejected', owner: 'Authorized reviewer (role and authority DECISION REQUIRED)', requiredEvidence: ['Decision reason', 'Evidence references', 'Trust impact'], exitConditions: ['Approved publishes after policy checks; rejected requests correction or closes case'] },
  { order: 7, state: 'Published', owner: 'Platform', requiredEvidence: ['Approval decision', 'Publication audit event'], exitConditions: ['Listing remains monitored'] },
];

export const verificationStatuses: VerificationStatus[] = ['Draft', 'Pending', 'Under Review', 'Verification Required', 'Approved', 'Published', 'Suspended', 'Rejected', 'Archived', 'Flagged', 'Fraud Investigation'];
export const documentStatuses: DocumentStatus[] = ['Uploaded', 'Pending Review', 'Verified', 'Rejected', 'Expired', 'Needs Reupload'];

export const verificationAiResponsibilities = [
  'Validate required fields',
  'Check ownership evidence',
  'Validate location data and boundaries',
  'Classify property type',
  'Analyze pricing data and anomalies',
  'Review uploaded documents',
  'Review uploaded images and media',
  'Validate contact details',
  'Detect listing consistency conflicts',
];

export const supportedDocumentTypes = ['Ownership Documents', 'Registry Documents', 'Possession Documents', 'Authority Approvals', 'Commercial Licenses', 'Industrial Documents', 'Government Approvals'];
export const mediaVerificationChecks = ['Duplicates', 'Manipulation', 'Missing Content', 'Irrelevant Content', 'Fraud Signals'];

export const fraudRules = [
  'Detect fake listings and duplicate listings before publication.',
  'Compare image hashes and source signals to detect stolen images.',
  'Detect price manipulation against approved market evidence.',
  'Compare identity, ownership, contact, and document subjects for mismatch.',
  'Quarantine suspicious uploads and mass spam submissions.',
  'Escalate repeated violations and preserve all evidence.',
];

export const complianceRules = [
  'Apply platform and verification policies to every listing.',
  'Enforce role restrictions and separation of submitter and reviewer.',
  'Calculate trust-score impact from evidence-based outcomes.',
  'Require audit events for every status and decision transition.',
  'Apply data privacy, retention, and authorized-access controls.',
];

export const trustRules: TrustRule[] = [
  { event: 'PROPOSED — Successful Verification', impact: 5, rationale: 'DECISION REQUIRED: impact value is an unapproved example.' },
  { event: 'PROPOSED — Repeated Approval', impact: 3, rationale: 'DECISION REQUIRED: impact value is an unapproved example.' },
  { event: 'PROPOSED — Rejected Documents', impact: -5, rationale: 'DECISION REQUIRED: impact value is an unapproved example.' },
  { event: 'PROPOSED — Fraud Detection', impact: -25, rationale: 'DECISION REQUIRED: impact value is an unapproved example.' },
  { event: 'PROPOSED — Suspension', impact: -15, rationale: 'DECISION REQUIRED: impact value is an unapproved example.' },
];

export const escalationRules = [
  { level: 1, owner: 'Verification AI', trigger: 'Missing fields, evidence mismatch, or verification uncertainty', action: 'Request information or route to Fraud AI' },
  { level: 2, owner: 'Fraud Detection AI', trigger: 'Duplicate, stolen, manipulated, or suspicious listing signals', action: 'Flag, freeze evidence, and route to Compliance AI' },
  { level: 3, owner: 'Compliance AI', trigger: 'Policy, role, privacy, or regulatory concern', action: 'Prepare compliance report and route to AI Admin' },
  { level: 4, owner: 'AI Admin', trigger: 'Approval decision, material risk, or unresolved conflict', action: 'Review evidence, flag, recommend, request information, or escalate; decision and freeze authority are DECISION REQUIRED' },
  { level: 5, owner: 'Authorized human reviewer (role and authority DECISION REQUIRED)', trigger: 'Approval decision, authority conflict, emergency, or platform-wide risk', action: 'Make an audited human decision within approved authority' },
];

export const verificationQueues: VerificationQueueDefinition[] = [
  { name: 'Verification Queue', purpose: 'Coordinate cases across all verification layers.', inputs: ['Listing payload', 'Identity state', 'Verification reports'], reviewer: 'Verification Operations and AI Admin', decisions: ['Proceed', 'Request information', 'Escalate'] },
  { name: 'Document Queue', purpose: 'Review ownership, registry, possession, and authority evidence.', inputs: supportedDocumentTypes, reviewer: 'Document Verification AI and authorized reviewer', decisions: ['Verify', 'Reject', 'Needs Reupload', 'Expired'] },
  { name: 'Media Queue', purpose: 'Review images, videos, 3D media, and virtual tours.', inputs: ['Property images', 'Property videos', '3D media', 'Virtual tours'], reviewer: 'Media Verification AI', decisions: ['Accept', 'Reject', 'Request replacement', 'Flag'] },
  { name: 'Fraud Queue', purpose: 'Investigate suspicious listing, identity, media, and pricing signals.', inputs: ['Fraud signals', 'Duplicate matches', 'Evidence graph'], reviewer: 'Fraud Detection AI and AI Admin review', decisions: ['Recommend clear', 'Flag', 'Recommend freeze (authority DECISION REQUIRED)', 'Escalate'] },
  { name: 'Compliance Queue', purpose: 'Validate policy, role, trust, privacy, and audit requirements.', inputs: ['Compliance report', 'Role permissions', 'Trust impact'], reviewer: 'Compliance AI', decisions: ['Compliant', 'Non-compliant', 'Manual review'] },
  { name: 'Approval Queue', purpose: 'Present complete reports for authorized human review; final reviewer authority is DECISION REQUIRED.', inputs: ['Verification report', 'Fraud report', 'Compliance report', 'Media report', 'Trust report'], reviewer: 'AI Admin review/recommendation; authorized human decision', decisions: ['Review evidence', 'Recommend approve/reject', 'Request information', 'Escalate', 'Manual review'] },
  { name: 'Audit Queue', purpose: 'Ensure every event and decision has a complete immutable record.', inputs: ['Actor', 'Property', 'Timestamp', 'Action', 'Reports', 'Decision'], reviewer: 'Audit service and AI Admin', decisions: ['Accept event', 'Open audit exception', 'Escalate integrity issue'] },
];

export const notificationRules = ['Listing Submitted', 'Verification Started', 'Additional Information Required', 'Approved', 'Rejected', 'Suspended', 'Fraud Investigation'];

export const auditRules: AuditRule[] = [
  { event: 'Listing submission and status transition', actor: 'User or platform', requiredFields: ['user', 'property', 'timestamp', 'previousStatus', 'newStatus'], retention: 'Append-only lifecycle history' },
  { event: 'Verification action', actor: 'Verification AI or reviewer', requiredFields: ['user', 'property', 'timestamp', 'verificationAction', 'evidenceReferences'], retention: 'Append-only verification record' },
  { event: 'AI report generated', actor: 'Verification, Fraud, Media, or Compliance AI', requiredFields: ['property', 'timestamp', 'reportType', 'findings', 'confidence'], retention: 'Retained with case' },
  { event: 'Final decision', actor: 'Authorized human reviewer (role and authority DECISION REQUIRED)', requiredFields: ['user', 'property', 'timestamp', 'reviewer', 'finalDecision', 'reasonCode'], retention: 'Immutable governance record' },
];

export const verificationDashboardQueues = ['Verification Queue', 'Document Queue', 'Media Queue', 'Fraud Queue', 'Compliance Queue', 'Approval Queue', 'Audit Queue'];
export const aiAdminDecisionOptions = ['Review Evidence', 'Flag', 'Recommend', 'Request More Information', 'Escalate', 'Manual Review'];
export const propertyVerificationOperatingSystemVersion = '21.0.0';
