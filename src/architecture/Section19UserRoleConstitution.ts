export type NexusRole =
  | 'Buyer'
  | 'Seller'
  | 'Agent'
  | 'Agency'
  | 'Developer'
  | 'Investor'
  | 'Industrial'
  | 'Corporate'
  | 'Government'
  | 'AI Admin'
  | 'Super Admin';

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'approve' | 'verify' | 'lockLead' | 'lockDeal' | 'managePayments' | 'manageUsers' | 'accessAI' | 'accessReports';
export type TrustFactor = 'verification' | 'successfulDeals' | 'paymentHistory' | 'disputeHistory' | 'fraudHistory' | 'documentAuthenticity' | 'aiAdminReviews';

export interface RoleDefinition {
  role: NexusRole;
  overview: string;
  purpose: string;
  allowedActions: string[];
  restrictedActions: string[];
  requiredVerification: string[];
  dashboardAccess: string[];
  aiAssistantAccess: string[];
  leadAccess: string[];
  dealAccess: string[];
  propertyAccess: string[];
  trustScoreImpact: string;
  subscriptionAccess: string[];
  paymentAccess: string[];
  escalationRules: string[];
  complianceRules: string[];
  fraudRules: string[];
  auditRules: string[];
}

const sharedRules = {
  buyer: {
    requiredVerification: ['Email and phone', 'Identity verification before protected actions'], dashboardAccess: ['Buyer Dashboard'], aiAssistantAccess: ['Buyer AI', 'Property Recommendation AI', 'Property Matching AI'], leadAccess: ['Create buyer intent', 'View own lead history'], dealAccess: ['Start negotiation', 'View own deal timeline'], propertyAccess: ['Search', 'Save', 'Request information'], trustScoreImpact: 'Positive for verified identity, completed deals, timely payments; negative for proven disputes.', subscriptionAccess: ['Buyer plans', 'Feature-gated AI recommendations'], paymentAccess: ['Pay approved fees', 'View own invoices'], escalationRules: ['Escalate disputes to AI Admin', 'Escalate authority requests to Super Admin'], complianceRules: ['Use verified identity', 'Respect privacy and approved contact channels'], fraudRules: ['No fabricated identity, payment, or property claims'], auditRules: ['Searches, saves, leads, locks, and payments are append-only events'] },
  seller: {
    requiredVerification: ['Identity verification', 'Ownership and document verification'], dashboardAccess: ['Seller Dashboard'], aiAssistantAccess: ['Seller AI', 'Listing Verification AI'], leadAccess: ['Respond to leads assigned to own listings'], dealAccess: ['Review offers', 'View own deal milestones'], propertyAccess: ['Create and manage own listings', 'Upload images and documents'], trustScoreImpact: 'Positive for verified ownership, complete documents, and successful handover; negative for rejected or fraudulent listings.', subscriptionAccess: ['Seller plans', 'Listing and analytics features'], paymentAccess: ['View listing fees', 'Receive verified settlement records'], escalationRules: ['Verification disputes go to AI Admin review'], complianceRules: ['No self-approval of verification', 'Maintain accurate listing information'], fraudRules: ['Duplicate, fake, or misleading listings are investigated'], auditRules: ['Listing, document, lead, and approval activity is logged'] },
  agent: {
    requiredVerification: ['Identity verification', 'Professional and agency verification where applicable'], dashboardAccess: ['Agent Dashboard'], aiAssistantAccess: ['Agent AI', 'Lead Routing AI', 'Deal Coordination AI'], leadAccess: ['Receive eligible leads', 'Lock assigned leads', 'Maintain client history'], dealAccess: ['Manage assigned pipeline', 'View commission milestones'], propertyAccess: ['View verified inventory', 'Submit authorized listing requests'], trustScoreImpact: 'Positive for protected clients, successful deals, and response quality; negative for poaching, disputes, or policy violations.', subscriptionAccess: ['Agent plans', 'Lead and Deal Lock features'], paymentAccess: ['Pay subscriptions', 'View commission records'], escalationRules: ['Competitor or ownership disputes escalate to AI Admin'], complianceRules: ['No unauthorized contact or lead sharing', 'Use approved workflows'], fraudRules: ['Lead poaching, commission manipulation, and fake representations are reportable'], auditRules: ['Every lead touch, lock, handoff, and deal update is logged'] },
  agency: {
    requiredVerification: ['Authorized representative identity', 'Business and branch verification'], dashboardAccess: ['Agency Dashboard'], aiAssistantAccess: ['Agency AI Tools', 'Team Performance AI'], leadAccess: ['Assign and monitor team leads'], dealAccess: ['Monitor agency deal pipeline'], propertyAccess: ['Manage authorized agency inventory'], trustScoreImpact: 'Aggregated from verified agents, successful transactions, disputes, and compliance history.', subscriptionAccess: ['Agency plans', 'Team and branch modules'], paymentAccess: ['Manage subscriptions', 'View agency invoices'], escalationRules: ['Branch disputes escalate to Agency Admin, then AI Admin'], complianceRules: ['Maintain agent authorization and data boundaries'], fraudRules: ['Investigate team poaching, duplicate listings, and payment anomalies'], auditRules: ['Agent assignment, access, and team actions are logged'] },
  developer: {
    requiredVerification: ['Identity and company verification', 'Project, NOC, and ownership documentation'], dashboardAccess: ['Developer Dashboard'], aiAssistantAccess: ['Developer AI', 'Project Intelligence AI', 'Escrow Compliance AI'], leadAccess: ['View project leads and inquiry analytics'], dealAccess: ['Manage project sale milestones'], propertyAccess: ['Manage verified projects, inventory, and units'], trustScoreImpact: 'Driven by project verification, delivery milestones, document authenticity, disputes, and escrow conduct.', subscriptionAccess: ['Developer plans', 'Project and inventory modules'], paymentAccess: ['Project subscriptions', 'Escrow and invoice records'], escalationRules: ['Project compliance risks escalate to AI Admin and relevant authority'], complianceRules: ['Maintain approved NOCs, disclosures, and progress evidence'], fraudRules: ['Misrepresented inventory, timelines, or escrow use triggers investigation'], auditRules: ['Project, unit, document, and milestone events are immutable'] },
  investor: {
    requiredVerification: ['Identity verification', 'Investor profile and suitability information'], dashboardAccess: ['Investor Dashboard'], aiAssistantAccess: ['Investment AI', 'ROI Intelligence AI', 'Portfolio Intelligence AI'], leadAccess: ['Create investment inquiries', 'View own opportunity activity'], dealAccess: ['Track own investment deals'], propertyAccess: ['Search verified opportunities', 'Create watchlists'], trustScoreImpact: 'Positive for verified identity, payment reliability, and completed commitments; disputes reduce score.', subscriptionAccess: ['Investor plans', 'Market and portfolio intelligence'], paymentAccess: ['Pay subscriptions and approved investment fees', 'View invoices'], escalationRules: ['Investment risk and disputes escalate to AI Admin'], complianceRules: ['Review approved evidence and risk disclosures'], fraudRules: ['No market manipulation, fabricated funds, or false commitments'], auditRules: ['Watchlists, reports, inquiries, and transactions are logged'] },
  industrial: {
    requiredVerification: ['Business identity verification', 'Industrial asset or operating-purpose verification'], dashboardAccess: ['Industrial Dashboard'], aiAssistantAccess: ['Industrial AI', 'Logistics Intelligence AI'], leadAccess: ['Create and receive industrial inquiries'], dealAccess: ['Track authorized industrial deals'], propertyAccess: ['Search and manage authorized warehouses, factories, and land'], trustScoreImpact: 'Based on business verification, asset documents, payment history, and dispute outcomes.', subscriptionAccess: ['Industrial plans', 'Asset and logistics modules'], paymentAccess: ['Pay subscriptions and approved fees', 'View invoices'], escalationRules: ['Regulatory and asset disputes escalate to AI Admin'], complianceRules: ['Maintain operating, zoning, and ownership evidence'], fraudRules: ['Asset misrepresentation and document tampering trigger review'], auditRules: ['Asset, document, inquiry, and transaction activity is logged'] },
  corporate: {
    requiredVerification: ['Corporate identity and authorized representative verification'], dashboardAccess: ['Corporate Dashboard'], aiAssistantAccess: ['Corporate AI', 'Portfolio Intelligence AI'], leadAccess: ['Manage organization inquiries'], dealAccess: ['Manage approved corporate property deals'], propertyAccess: ['Manage authorized corporate properties and teams'], trustScoreImpact: 'Aggregated from organization verification, authorized actions, payments, and disputes.', subscriptionAccess: ['Corporate plans', 'Organization and asset modules'], paymentAccess: ['Manage corporate subscriptions', 'View organization invoices'], escalationRules: ['Organization conflicts escalate to authorized admin and AI Admin'], complianceRules: ['Enforce team permissions and data minimization'], fraudRules: ['Unauthorized access, payment anomalies, and false authority trigger review'], auditRules: ['Invitations, permissions, assets, and transactions are logged'] },
  government: {
    requiredVerification: ['Official identity verification', 'Department and authority verification'], dashboardAccess: ['Government Dashboard'], aiAssistantAccess: ['Government Workflow AI', 'Compliance AI'], leadAccess: ['Submit official requests only'], dealAccess: ['View approved public workflows where authorized'], propertyAccess: ['View approved public records and assigned cases'], trustScoreImpact: 'Based on official verification, evidence quality, response integrity, and case outcomes.', subscriptionAccess: ['Government access program'], paymentAccess: ['Approved institutional billing only'], escalationRules: ['Route legal and public-interest matters to authorized human authority'], complianceRules: ['Use official purpose, lawful access, and privacy controls'], fraudRules: ['Impersonation and unauthorized record access trigger immediate review'], auditRules: ['Every record access and decision is retained with authority context'] },
  aiAdmin: {
    requiredVerification: ['System-assigned AI identity', 'Policy and service attestation'], dashboardAccess: ['Proposed AI Admin Command Center'], aiAssistantAccess: ['Review 54 registry entries; production monitoring and routing are not established'], leadAccess: ['Proposed review and escalation; direct lock, release, or freeze authority DECISION REQUIRED'], dealAccess: ['Proposed risk/workflow review; participant eligibility and lock authority DECISION REQUIRED'], propertyAccess: ['Proposed verification/integrity review; approval authority DECISION REQUIRED'], trustScoreImpact: 'Does not receive a user trust score; maintains proposed review and policy signals.', subscriptionAccess: ['Internal platform authority DECISION REQUIRED'], paymentAccess: ['Payment review only; payment status and settlement authority are not granted'], escalationRules: ['Flag, recommend, and escalate beyond policy or authority to Super Admin'], complianceRules: ['Least privilege, explainability, human escalation, no fabricated evidence'], fraudRules: ['Flag suspicious activity and preserve evidence; freeze authority DECISION REQUIRED'], auditRules: ['Cannot delete audit history; every implemented decision must be logged'] },
  superAdmin: {
    requiredVerification: ['Human identity verification', 'Privileged device and MFA verification'], dashboardAccess: ['Super Admin Governance Dashboard'], aiAssistantAccess: ['All assistants through governed controls'], leadAccess: ['Lead Lock release/override and emergency authority DECISION REQUIRED'], dealAccess: ['Deal Lock release/override and emergency authority DECISION REQUIRED'], propertyAccess: ['Platform-wide governance access; verification approval authority DECISION REQUIRED'], trustScoreImpact: 'Platform authority is governed by audit and dual-control policy, not a user trust score.', subscriptionAccess: ['Platform owner access'], paymentAccess: ['Privileged payment and settlement authority DECISION REQUIRED'], escalationRules: ['Final human authority for escalated cases within approved scope'], complianceRules: ['Dual control where required, documented reason, lawful operation'], fraudRules: ['Suspension and freeze authority/scope DECISION REQUIRED; evidence must remain intact'], auditRules: ['All privileged actions require immutable audit records and reason codes'] },
};

const role = (key: keyof typeof sharedRules, roleName: NexusRole, overview: string, purpose: string, allowedActions: string[], restrictedActions: string[]): RoleDefinition => ({
  role: roleName,
  overview,
  purpose,
  allowedActions,
  restrictedActions,
  ...sharedRules[key],
});

export const roleDefinitions: RoleDefinition[] = [
  role('buyer', 'Buyer', 'Verified property seeker.', 'Find and evaluate property safely.', ['Search properties', 'Save properties', 'Contact agents', 'Request information', 'Start negotiation', 'Use Buyer AI'], ['Lock an agent lead', 'Approve listings', 'Approve deals', 'Access other user data', 'Modify system records']),
  role('seller', 'Seller', 'Verified property owner or authorized representative.', 'List and manage verified property inventory.', ['List properties', 'Upload documents', 'Upload images', 'Respond to leads', 'Manage listings', 'Use Seller AI'], ['Verify own listings', 'Approve own verification', 'Modify audit records']),
  role('agent', 'Agent', 'Real estate intermediary; verification requirements are DECISION REQUIRED.', 'Represent clients through governed lead and deal workflows.', ['Receive eligible leads', 'Lock an eligible assigned lead for the canonical 48-hour duration', 'Manage clients', 'Manage deal pipeline', 'Use Agent AI'], ['Access competitor leads', 'Modify lead history', 'Delete audit records']),
  role('agency', 'Agency', 'Real estate organization; verification requirements are DECISION REQUIRED.', 'Operate authorized teams, branches, leads, and deals.', ['Manage multiple agents within authorized scope', 'Manage branches within authorized scope', 'Assign eligible leads', 'Monitor authorized team activity', 'Use Agency AI tools'], ['Lock a lead on behalf of an agent unless separately authorized', 'Access data outside authorization', 'Delete audit records']),
  role('developer', 'Developer', 'Verified project owner or developer organization.', 'Manage projects, inventory, units, and delivery evidence.', ['Manage projects', 'Manage inventories', 'Manage units', 'Upload project media', 'Use Developer AI'], ['Self-approve project verification', 'Alter audit history']),
  role('investor', 'Investor', 'Verified capital participant.', 'Analyze opportunities and manage an investment portfolio.', ['Track ROI', 'Analyze investments', 'Create watchlists', 'Use Investment AI'], ['Access non-public records', 'Guarantee outcomes through the platform']),
  role('industrial', 'Industrial', 'Verified industrial asset operator or participant.', 'Search and manage industrial property requirements.', ['Search industrial assets', 'Manage warehouses', 'Manage factories', 'Use Industrial AI'], ['Access unrelated private records', 'Bypass asset verification']),
  role('corporate', 'Corporate', 'Verified corporate property organization.', 'Manage enterprise properties, teams, and assets.', ['Manage corporate properties', 'Manage teams', 'Manage enterprise assets', 'Use Corporate AI'], ['Exceed organization permissions', 'Access unrelated user data']),
  role('government', 'Government', 'Verified public-sector authority.', 'Use approved public records and government workflows.', ['View approved public records', 'Submit government requests', 'Access government workflows'], ['Access private data without authority', 'Modify platform audit records']),
  role('aiAdmin', 'AI Admin', 'AI workforce registry supervisor under human governance.', 'Monitor and coordinate the AI WORKFORCE REGISTRY; this roster is not 54 production model-backed agents.', ['Review workflow evidence', 'Flag and recommend', 'Escalate cases', 'Monitor users, listings, leads, deals, payments, verification, fraud, and assistants'], ['Permanently ban users independently', 'Delete audit history', 'Override Super Admin']),
  role('superAdmin', 'Super Admin', 'Authorized human platform authority.', 'Govern platform policy, safety, and emergency operations.', ['Review escalated cases', 'Approve or reject permanent bans with recorded authority', 'Freeze platform under documented controls', 'Modify system rules through governed change', 'Archive records under retention policy'], ['Erase immutable audit history', 'Operate without reason codes or required controls']),
];

export const permissionActions: PermissionAction[] = ['create', 'read', 'update', 'delete', 'approve', 'verify', 'lockLead', 'lockDeal', 'managePayments', 'manageUsers', 'accessAI', 'accessReports'];

const permissions = (...actions: PermissionAction[]) => actions;

export const rolePermissionMatrix: Record<NexusRole, PermissionAction[]> = {
  Buyer: permissions('create', 'read', 'accessAI', 'accessReports'),
  Seller: permissions('create', 'read', 'update', 'accessAI', 'accessReports'),
  Agent: permissions('create', 'read', 'update', 'lockLead', 'accessAI', 'accessReports'),
  Agency: permissions('create', 'read', 'update', 'manageUsers', 'accessAI', 'accessReports'),
  Developer: permissions('create', 'read', 'update', 'accessAI', 'accessReports'),
  Investor: permissions('create', 'read', 'accessAI', 'accessReports'),
  Industrial: permissions('create', 'read', 'update', 'accessAI', 'accessReports'),
  Corporate: permissions('create', 'read', 'update', 'manageUsers', 'accessAI', 'accessReports'),
  Government: permissions('read', 'accessAI', 'accessReports'),
  'AI Admin': permissions('create', 'read', 'accessAI', 'accessReports'),
  'Super Admin': permissionActions.filter((action) => !['lockLead', 'lockDeal', 'approve', 'verify', 'managePayments'].includes(action)),
};

export const rolePermissionDecisions = [
  'DECISION REQUIRED: eligible Deal Lock participant roles and role-scoped Deal Lock permissions.',
  'DECISION REQUIRED: whether any administrative role may release or override an active Lead Lock or Deal Lock.',
  'DECISION REQUIRED: verification and general approval authority by role.',
  'FUTURE ARCHITECTURE / DECISION REQUIRED: multi-role support. Runtime remains one primary role.',
];

export interface TrustMatrixEntry {
  factor: TrustFactor;
  positiveSignal: string;
  negativeSignal: string;
  weight: number;
}

export const trustMatrix: TrustMatrixEntry[] = [
  { factor: 'verification', positiveSignal: 'Verified identity, role, property, or project', negativeSignal: 'Failed or conflicting verification', weight: 25 },
  { factor: 'successfulDeals', positiveSignal: 'Completed, dispute-free handovers', negativeSignal: 'Abandoned or disputed transactions', weight: 20 },
  { factor: 'paymentHistory', positiveSignal: 'Verified timely payments and settlement', negativeSignal: 'Failed, reversed, or suspicious payments', weight: 15 },
  { factor: 'disputeHistory', positiveSignal: 'Resolved disputes with evidence and cooperation', negativeSignal: 'Repeated upheld complaints', weight: 10 },
  { factor: 'fraudHistory', positiveSignal: 'No substantiated fraud findings', negativeSignal: 'Confirmed fraud or manipulation', weight: 15 },
  { factor: 'documentAuthenticity', positiveSignal: 'Authentic, complete, current documents', negativeSignal: 'Forged, altered, or missing documents', weight: 10 },
  { factor: 'aiAdminReviews', positiveSignal: 'Consistent policy-compliant reviews', negativeSignal: 'Repeated escalations or policy violations', weight: 5 },
];

export const roleDashboardMatrix: Record<NexusRole, string[]> = Object.fromEntries(roleDefinitions.map((definition) => [definition.role, definition.dashboardAccess])) as Record<NexusRole, string[]>;
export const aiAccessMatrix: Record<NexusRole, string[]> = Object.fromEntries(roleDefinitions.map((definition) => [definition.role, definition.aiAssistantAccess])) as Record<NexusRole, string[]>;
export const escalationMatrix: Record<NexusRole, string[]> = Object.fromEntries(roleDefinitions.map((definition) => [definition.role, definition.escalationRules])) as Record<NexusRole, string[]>;

export const complianceRules = ['Verification rules', 'Trust rules', 'DECISION REQUIRED: trust-score weights and impacts shown in this architecture are unapproved examples.', 'Audit rules', 'Fraud rules', 'Data privacy rules'];
export const roleConstitutionVersion = '19.0.0';
