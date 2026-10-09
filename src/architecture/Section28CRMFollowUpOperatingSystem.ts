export type CRMEntity = 'Users' | 'Contacts' | 'Leads' | 'Properties' | 'Agents' | 'Agencies' | 'Deals' | 'Conversations' | 'Tasks' | 'Appointments' | 'Documents' | 'Payments' | 'Subscriptions';
export type FollowUpMode = 'Automatic' | 'Manual' | 'AI Driven' | 'Scheduled' | 'Event Based';
export type ClientStage = 'Prospect' | 'Active Client' | 'Returning Client' | 'VIP Client' | 'Strategic Client' | 'Dormant Client';

export interface CRMWorkflowStep {
  order: number;
  state: string;
  owner: string;
  inputs: string[];
  output: string;
}

export interface FollowUpRule {
  name: string;
  mode: FollowUpMode;
  trigger: string;
  action: string;
  stopCondition: string;
}

export interface TaskRule {
  action: string;
  owner: string;
  requiredFields: string[];
  escalation: string;
}

export interface AppointmentRule {
  type: string;
  requiredFields: string[];
  reminderPolicy: string;
}

export interface AuditRule {
  event: string;
  requiredFields: string[];
  retention: string;
}

export const crmCoreEntities: CRMEntity[] = ['Users', 'Contacts', 'Leads', 'Properties', 'Agents', 'Agencies', 'Deals', 'Conversations', 'Tasks', 'Appointments', 'Documents', 'Payments', 'Subscriptions'];
export const contactFields = ['Name', 'Phone', 'Email', 'Role', 'City', 'Area', 'Language', 'Trust Score', 'Lead Score', 'Source', 'Status'];

export const crmWorkflows: CRMWorkflowStep[] = [
  { order: 1, state: 'Contact Created', owner: 'CRM AI or channel system', inputs: ['Contact identity', 'Consent', 'Source', 'Language'], output: 'Unified contact record' },
  { order: 2, state: 'Lead Generated', owner: 'Lead system', inputs: ['Inquiry', 'Property interest', 'Campaign or referral'], output: 'Linked lead record' },
  { order: 3, state: 'Lead Qualified', owner: 'Lead Qualification AI', inputs: ['Intent', 'Budget', 'Timeline', 'Location', 'Completeness'], output: 'Qualified lead and score' },
  { order: 4, state: 'Lead Assigned', owner: 'Lead Routing AI and CRM AI', inputs: ['Area', 'Role', 'Trust', 'Eligibility', 'Capacity'], output: 'Assigned owner and task' },
  { order: 5, state: 'Lead Locked', owner: 'Lead Protection AI', inputs: ['Assignment', 'Eligibility', 'Lock duration'], output: 'Protected ownership event' },
  { order: 6, state: 'Negotiation', owner: 'Agent, agency, seller, or developer', inputs: ['Conversation', 'Property match', 'Visit', 'Offer'], output: 'Negotiation timeline' },
  { order: 7, state: 'Deal Pipeline', owner: 'Deal AI and CRM AI', inputs: ['Deal opportunity', 'Milestones', 'Documents', 'Payments'], output: 'Tracked deal' },
  { order: 8, state: 'Deal Closed', owner: 'Deal system', inputs: ['Completion evidence', 'Final outcome', 'Audit trail'], output: 'Closed deal and retention task' },
  { order: 9, state: 'Customer Retention', owner: 'CRM AI and relationship owner', inputs: ['Deal history', 'Preferences', 'Follow-up consent'], output: 'Retention stage and next action' },
];

export const leadPipelineRules = ['New Lead', 'Qualified', 'Assigned', 'Locked', 'Visit Scheduled', 'Negotiation', 'Offer', 'Deal Opportunity', 'Closed', 'Lost'];
export const clientPipelineRules: ClientStage[] = ['Prospect', 'Active Client', 'Returning Client', 'VIP Client', 'Strategic Client', 'Dormant Client'];

export const followUpWorkflows = ['Lead Follow Up', 'Property Follow Up', 'Visit Follow Up', 'Negotiation Follow Up', 'Deal Follow Up', 'Payment Follow Up', 'Retention Follow Up'];
export const followUpSchedules = ['1 Day', '3 Days', '7 Days', '14 Days', '30 Days', 'Custom'];
export const followUpRules: FollowUpRule[] = [
  { name: 'Lead Follow Up', mode: 'Automatic', trigger: 'New or qualified lead without response', action: 'Send approved next-step message and create follow-up task.', stopCondition: 'Response, opt-out, conversion, or dispute' },
  { name: 'Property Follow Up', mode: 'AI Driven', trigger: 'Saved property, match, or listing update', action: 'Suggest relevant verified property information.', stopCondition: 'Preference change or opt-out' },
  { name: 'Visit Follow Up', mode: 'Scheduled', trigger: 'Visit completed or missed', action: 'Request feedback and recommend next action.', stopCondition: 'Feedback received or visit closed' },
  { name: 'Negotiation Follow Up', mode: 'Event Based', trigger: 'Offer, counter-offer, or negotiation inactivity', action: 'Notify owner and suggest an authorized follow-up.', stopCondition: 'New negotiation event or closure' },
  { name: 'Deal Follow Up', mode: 'Manual', trigger: 'Deal milestone or documentation requirement', action: 'Create responsible-party task and deadline.', stopCondition: 'Milestone completed or escalated' },
  { name: 'Payment Follow Up', mode: 'Automatic', trigger: 'Invoice due, payment pending, or failed payment', action: 'Send approved reminder and update task state.', stopCondition: 'Payment reconciled, cancelled, or disputed' },
  { name: 'Retention Follow Up', mode: 'AI Driven', trigger: 'Closed deal, repeat signal, referral, or dormant client', action: 'Recommend relationship or service action.', stopCondition: 'No consent, opt-out, or client resolution' },
];

export const taskRules: TaskRule[] = [
  { action: 'Create', owner: 'Authorized CRM user or AI', requiredFields: ['Task ID', 'Related entity', 'Owner', 'Due date', 'Priority'], escalation: 'Missing required fields route to CRM AI.' },
  { action: 'Assign', owner: 'CRM AI or authorized manager', requiredFields: ['Assignee', 'Reason', 'Notification'], escalation: 'Assignment conflict routes to AI Admin.' },
  { action: 'Track', owner: 'Task service', requiredFields: ['Status', 'Activity', 'Updated timestamp'], escalation: 'Overdue tasks create alert.' },
  { action: 'Complete', owner: 'Assigned owner', requiredFields: ['Outcome', 'Completion timestamp'], escalation: 'Unsupported completion may require review.' },
  { action: 'Escalate', owner: 'CRM AI or AI Admin', requiredFields: ['Reason', 'Target authority', 'Evidence'], escalation: 'Super Admin for governance conflict.' },
  { action: 'Archive', owner: 'Policy-controlled service', requiredFields: ['Retention reason', 'Archive timestamp'], escalation: 'Audit exception if retention is bypassed.' },
];

export const appointmentRules: AppointmentRule[] = [
  { type: 'Property Visits', requiredFields: ['Property', 'Participants', 'Time', 'Location', 'Status'], reminderPolicy: 'Notify before appointment and record attendance or outcome.' },
  { type: 'Meetings', requiredFields: ['Participants', 'Agenda', 'Time', 'Owner'], reminderPolicy: 'Create reminder and outcome task.' },
  { type: 'Calls', requiredFields: ['Contact', 'Owner', 'Time', 'Purpose'], reminderPolicy: 'Record call outcome and next action.' },
  { type: 'Video Calls', requiredFields: ['Participants', 'Meeting link', 'Time', 'Consent'], reminderPolicy: 'Notify securely and record outcome.' },
  { type: 'Negotiation Sessions', requiredFields: ['Deal', 'Participants', 'Agenda', 'Terms context'], reminderPolicy: 'Link session to deal timeline and audit.' },
  { type: 'Document Reviews', requiredFields: ['Documents', 'Reviewers', 'Time', 'Decision scope'], reminderPolicy: 'Notify reviewers and retain decision evidence.' },
];

export const conversationChannels = ['Website Chat', 'WhatsApp', 'Facebook', 'Email', 'Phone Notes', 'AI Conversations'];
export const aiMemoryRules = ['Store preferences only with appropriate consent and privacy controls.', 'Store property interests, locations, budgets, past searches, and saved properties.', 'Link conversation history to contact, lead, and deal records.', 'Preserve lead history and deal history without silent deletion.', 'Respect language preference, opt-out state, retention, and access scope.', 'Use memory to improve recommendations and follow-up, never to fabricate facts.'];
export const crmAiResponsibilities = ['Lead Prioritization', 'Follow-Up Suggestions', 'Task Suggestions', 'Deal Recommendations', 'Retention Strategies', 'Risk Alerts'];
export const involvedAiAssistants = ['CRM AI', 'Buyer AI', 'Seller AI', 'Agent AI', 'Lead Qualification AI', 'Lead Routing AI', 'Deal AI', 'Negotiation AI', 'AI Admin'];

export const crmDashboardModules = ['Contacts', 'Leads', 'Clients', 'Tasks', 'Appointments', 'Follow Ups', 'Conversations', 'Deals', 'Reports', 'Performance'];
export const retentionRules = ['Track repeat clients and returning behavior.', 'Track referral clients and referral source attribution.', 'Track VIP clients with evidence-based service priority.', 'Track strategic clients with authorized relationship plans.', 'Track dormant clients with consent-aware re-engagement.', 'Calculate Customer Lifetime Value from verified revenue and retention events.'];
export const performanceRules = ['Lead Conversion', 'Response Time', 'Follow-Up Success', 'Client Retention', 'Deal Conversion', 'Revenue Per Client'];
export const notificationRules = ['New Contact', 'New Lead', 'Lead Assigned', 'Task Due', 'Appointment Due', 'Follow Up Due', 'Deal Update', 'Retention Alert'];

export const auditRules: AuditRule[] = [
  { event: 'Contact change', requiredFields: ['contactId', 'actor', 'field', 'previousValue', 'newValue', 'timestamp'], retention: 'Contact history with privacy controls' },
  { event: 'Lead change', requiredFields: ['leadId', 'actor', 'status', 'owner', 'timestamp'], retention: 'Append-only lead and CRM timeline' },
  { event: 'Task change', requiredFields: ['taskId', 'actor', 'action', 'assignee', 'dueDate', 'timestamp'], retention: 'Task lifecycle record' },
  { event: 'Follow-up or appointment', requiredFields: ['relatedId', 'channel', 'actor', 'action', 'timestamp', 'outcome'], retention: 'Relationship activity history' },
  { event: 'AI decision or deal update', requiredFields: ['entityId', 'assistant', 'decision', 'confidence', 'timestamp', 'outcome'], retention: 'AI and deal audit record' },
];

export const escalationRules = [
  { level: 1, owner: 'CRM AI', trigger: 'Routine relationship, task, or follow-up recommendation', action: 'Suggest, schedule, or create an authorized task.' },
  { level: 2, owner: 'Lead Qualification AI', trigger: 'Lead quality, completeness, or intent uncertainty', action: 'Ask approved questions and update qualification.' },
  { level: 3, owner: 'Deal AI', trigger: 'Deal pipeline, negotiation, or milestone risk', action: 'Recommend action and alert responsible owner.' },
  { level: 4, owner: 'AI Admin', trigger: 'Privacy, ownership, fraud, dispute, or policy concern', action: 'Review, flag, recommend, investigate, and escalate; freeze/decision authority is DECISION REQUIRED.' },
  { level: 5, owner: 'Authorized human reviewer (role and authority DECISION REQUIRED)', trigger: 'Final governance or unresolved platform issue', action: 'Final human decision within approved authority.' },
];

export const crmFollowUpVersion = '28.0.0';
