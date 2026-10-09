export interface IdentityRule {
  title: string;
  description: string;
}

export interface IdentityMetric {
  label: string;
  value: string;
}

export interface IdentityEscalationRule {
  level: number;
  owner: string;
  trigger: string;
  action: string;
}

export const identityAttributes = [
  'Unique Identity',
  'Account Profile',
  'Trust Score',
  'Verification Status',
  'Role Assignment',
  'Permissions',
  'Activity History',
  'Audit History',
];

export const authenticationMethods = [
  'Google Login',
  'Email Login',
  'Phone Number Login',
  'OTP Login',
  'Password Login',
  'Future Social Login Support',
];

export const accountCreationWorkflow = [
  'User Registration',
  'Identity Creation',
  'Role Selection',
  'Email Verification',
  'Phone Verification',
  'Trust Profile Creation',
  'Dashboard Assignment',
  'Account Activation',
];

export const userRoles = [
  'Buyer',
  'Seller',
  'Agent',
  'Agency',
  'Developer',
  'Investor',
  'Industrial',
  'Corporate',
  'Government',
  'AI Admin',
  'Super Admin',
];

export const roleRules: IdentityRule[] = [
  { title: 'Runtime role set', description: 'The current runtime role set is Buyer, Seller, Agent, Agency, Developer, Investor, Industrial, Corporate, Government, AI Admin, and Super Admin.' },
  { title: 'Multi-role support', description: 'FUTURE ARCHITECTURE / DECISION REQUIRED. Current runtime users have one primary role.' },
  { title: 'Role upgrade', description: 'Higher-trust roles require additional verification, professional evidence, or enterprise approval.' },
  { title: 'Role downgrade', description: 'Role scope can be reduced when evidence expires, policy changes, or trust requirements are no longer met.' },
  { title: 'Role suspension', description: 'A role can be temporarily disabled without deleting the underlying identity or audit history.' },
  { title: 'Role revocation', description: 'DECISION REQUIRED: role revocation authority and process. A permanent user ban requires authorized human/Super Admin approval; AI may only detect, flag, recommend, and escalate.' },
];

export const verificationLevels = [
  'Level 0: Guest',
  'Level 1: Email Verified',
  'Level 2: Phone Verified',
  'Level 3: Identity Verified',
  'Level 4: Professional Verified',
  'Level 5: Enterprise Verified',
];

export const trustComponents = [
  'Trust Score',
  'Verification Score',
  'Activity Score',
  'Property Score',
  'Lead Score',
  'Deal Score',
  'Compliance Score',
  'Reputation Score',
];

export const accountStatuses = ['Pending', 'Active', 'Restricted', 'Suspended', 'Under Review', 'Blocked', 'Archived'];

export const securityControls = [
  'Password Security',
  'OTP Security',
  'Session Security',
  'Device Tracking',
  'Location Tracking',
  'Multi Device Rules',
];

export const recoveryOptions = ['Forgot Password', 'OTP Recovery', 'Email Recovery', 'Admin Recovery'];

export const accessScopes = [
  'Dashboard Access',
  'Property Access',
  'Lead Access',
  'Deal Access',
  'CRM Access',
  'Payment Access',
  'Marketplace Access',
  'Admin Access',
];

export const sessionRules = [
  'Session Creation',
  'Session Expiry',
  'Session Renewal',
  'Concurrent Sessions',
  'Session Revocation',
];

export const fraudRisks = ['Duplicate Accounts', 'Identity Fraud', 'Fake Profiles', 'Suspicious Activity', 'Account Abuse'];
export const identityNotifications = ['Registration', 'Verification', 'Login', 'Password Change', 'Role Change', 'Suspension', 'Recovery'];

export const aiResponsibilities = ['Identity AI', 'Trust AI', 'Compliance AI', 'Fraud AI', 'Verification AI'];
export const aiAdminResponsibilities = ['Verification Oversight', 'Fraud Oversight', 'Trust Oversight', 'Escalation Oversight'];
export const superAdminResponsibilities = ['Identity Governance', 'Role Governance', 'Security Governance', 'Emergency Controls'];
export const auditEvents = ['Registrations', 'Logins', 'Role Changes', 'Verification Changes', 'Suspensions', 'Recoveries', 'Permission Changes'];

export const identityRules: IdentityRule[] = [
  { title: 'One identity record', description: 'Every account maps to one durable identity record with profile, role, verification, trust, permissions, and history.' },
  { title: 'Evidence before access', description: 'Account access expands only when the required verification evidence and trust conditions are satisfied.' },
  { title: 'Lifecycle continuity', description: 'Pending, active, restricted, suspended, blocked, and archived states preserve the identity and its audit trail.' },
  { title: 'Role-aware experience', description: 'Dashboards, AI assistants, property tools, and workflows are assigned from verified roles and permissions.' },
];

export const authenticationRules: IdentityRule[] = [
  { title: 'Multiple authentication paths', description: 'Google, email, phone, OTP, password, and future social login methods connect to the same identity layer.' },
  { title: 'Verified account activation', description: 'Email and phone verification are completed before an account becomes fully active.' },
  { title: 'Secure session continuity', description: 'Sessions expire, renew, revoke, and enforce concurrent-device rules according to risk and policy.' },
  { title: 'Recovery with evidence', description: 'Password, OTP, email, and admin recovery routes require identity-aware checks and produce audit events.' },
];

export const verificationRules: IdentityRule[] = [
  { title: 'Progressive verification', description: 'Users move from guest to enterprise verification through clear, additive evidence levels.' },
  { title: 'Role-specific evidence', description: 'Professional, developer, corporate, government, and administrative roles require relevant verification.' },
  { title: 'Verification expiry', description: 'Evidence can be reviewed, renewed, restricted, or escalated when it becomes incomplete or outdated.' },
];

export const trustRules: IdentityRule[] = [
  { title: 'Composite trust score', description: 'Trust combines verification, activity, property, lead, deal, compliance, and reputation signals.' },
  { title: 'Outcome-aware trust', description: 'Verified outcomes, successful transactions, and responsible activity strengthen trust over time.' },
  { title: 'Trust with oversight', description: 'Trust changes remain explainable, auditable, and subject to AI Admin and Super Admin review.' },
];

export const securityRules: IdentityRule[] = [
  { title: 'Credential protection', description: 'Passwords, OTPs, sessions, devices, and recovery paths are treated as protected identity controls.' },
  { title: 'Risk-aware access', description: 'Location, device, concurrent sessions, and suspicious activity can restrict access or trigger review.' },
  { title: 'Permission boundaries', description: 'Dashboard, property, lead, deal, CRM, payment, marketplace, and admin access are independently governed.' },
];

export const fraudRules: IdentityRule[] = [
  { title: 'Duplicate detection', description: 'Potential duplicate accounts and identity conflicts are detected before they create network abuse.' },
  { title: 'Suspicious activity review', description: 'Unusual login, device, location, role, and transaction patterns route to fraud and compliance review.' },
  { title: 'Account abuse controls', description: 'Fake profiles, manipulation, unauthorized access, and repeated policy violations can restrict or block accounts.' },
];

export const auditRules: IdentityRule[] = [
  { title: 'Identity event history', description: 'Registrations, logins, recoveries, role changes, verification, suspensions, and permissions remain traceable.' },
  { title: 'Immutable accountability', description: 'Sensitive identity and access changes preserve actor, timestamp, evidence, and decision context.' },
  { title: 'Governance reporting', description: 'Audit data supports trust, compliance, fraud investigation, and emergency governance decisions.' },
];

export const identityPerformanceMetrics: IdentityMetric[] = [
  { label: 'Verified Accounts', value: 'Progressive identity coverage' },
  { label: 'Trust Index', value: 'Composite reputation health' },
  { label: 'Login Success', value: 'Secure access completion' },
  { label: 'Verification Completion', value: 'Evidence workflow conversion' },
  { label: 'Fraud Detection', value: 'Suspicious activity prevention' },
  { label: 'Account Recovery', value: 'Verified recovery success' },
];

export const escalationRules: IdentityEscalationRule[] = [
  { level: 1, owner: 'Identity AI', trigger: 'Routine registration, login, or profile event', action: 'Validate the identity path and record the event.' },
  { level: 2, owner: 'Verification AI', trigger: 'Missing evidence, verification conflict, or trust anomaly', action: 'Request evidence, restrict access, or route for specialist review.' },
  { level: 3, owner: 'AI Admin', trigger: 'Fraud signal, role abuse, compliance issue, or repeated failure', action: 'Review evidence, flag, recommend, and escalate; restriction/freeze authority is DECISION REQUIRED.' },
  { level: 4, owner: 'Super Admin', trigger: 'Identity governance, security emergency, or platform-wide threat', action: 'Apply emergency controls and make the final governance decision.' },
];

export const identityAuthenticationOperatingSystemVersion = '34.0.0';
