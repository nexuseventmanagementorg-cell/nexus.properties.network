export type AutomationChannel = 'WhatsApp' | 'Facebook Messenger' | 'Facebook Lead Forms' | 'Instagram' | 'Website Chatbot' | 'Future API Channels';
export type AutomationRole = 'Buyer' | 'Seller' | 'Agent' | 'Agency' | 'Developer' | 'Investor' | 'Industrial' | 'Corporate' | 'Government';

export interface AutomationWorkflowStep {
  order: number;
  state: string;
  owner: string;
  inputs: string[];
  output: string;
}

export interface LeadQualificationRule {
  role: AutomationRole;
  questions: string[];
  requiredSignals: string[];
}

export interface FollowUpRule {
  day: number;
  action: string;
  purpose: string;
  stopCondition: string;
}

export interface AuditRule {
  event: string;
  requiredFields: string[];
  retention: string;
}

export const supportedChannels: AutomationChannel[] = ['WhatsApp', 'Facebook Messenger', 'Facebook Lead Forms', 'Instagram', 'Website Chatbot', 'Future API Channels'];

export const whatsappWorkflows: AutomationWorkflowStep[] = [
  { order: 1, state: 'User Message', owner: 'WhatsApp AI', inputs: ['Message', 'Phone', 'Consent', 'Language'], output: 'Normalized conversation event' },
  { order: 2, state: 'AI Assistant', owner: 'WhatsApp AI and role assistant', inputs: ['Conversation context', 'Language preference', 'User intent'], output: 'Answer or structured lead intent' },
  { order: 3, state: 'Lead Qualification AI', owner: 'Lead Qualification AI', inputs: ['Budget', 'Timeline', 'Location', 'Property type', 'Urgency'], output: 'Qualification state' },
  { order: 4, state: 'Lead Scoring', owner: 'Lead Qualification AI', inputs: ['Qualification signals', 'Verification', 'Completeness'], output: 'Score from 0 to 100' },
  { order: 5, state: 'Lead Routing AI', owner: 'Lead Routing AI', inputs: ['Area', 'Role', 'Trust', 'Eligibility', 'Availability'], output: 'Eligible assignment recommendation' },
  { order: 6, state: 'CRM', owner: 'CRM AI', inputs: ['Lead profile', 'Conversation history', 'Score', 'Routing decision'], output: 'Lead record and activity timeline' },
  { order: 7, state: 'Agent Assignment', owner: 'CRM AI and AI Admin policy', inputs: ['Eligible user', 'Assignment reason', 'Response deadline'], output: 'Assigned lead notification' },
  { order: 8, state: 'Lead Lock', owner: 'Lead Protection AI', inputs: ['Assignment', 'Lock eligibility', 'Consent'], output: 'Protected lead ownership event' },
];

export const facebookWorkflows: AutomationWorkflowStep[] = [
  { order: 1, state: 'Lead Submitted', owner: 'Facebook Lead Forms, Messenger, or Ads', inputs: ['Name', 'Phone', 'Email', 'Campaign', 'Consent'], output: 'Normalized lead event' },
  { order: 2, state: 'Lead Qualification AI', owner: 'Lead Qualification AI', inputs: ['Role', 'Budget', 'Timeline', 'Location', 'Property type'], output: 'Qualification state' },
  { order: 3, state: 'Lead Score', owner: 'Lead Qualification AI', inputs: ['Intent', 'Completeness', 'Verification', 'Match quality'], output: 'Score from 0 to 100' },
  { order: 4, state: 'Lead Routing', owner: 'Lead Routing AI', inputs: ['Area', 'Role', 'Trust', 'Campaign context'], output: 'Eligible assignment recommendation' },
  { order: 5, state: 'CRM', owner: 'CRM AI', inputs: ['Lead profile', 'Campaign', 'Conversation history', 'Score'], output: 'Lead record and campaign attribution' },
  { order: 6, state: 'Assigned Agent', owner: 'CRM AI', inputs: ['Eligibility', 'Capacity', 'Assignment policy'], output: 'Assigned agent and notification' },
  { order: 7, state: 'Lead Lock', owner: 'Lead Protection AI', inputs: ['Assignment', 'Lock duration', 'Audit context'], output: 'Protected lead ownership event' },
];

export const facebookSources = ['Facebook Lead Forms', 'Facebook Messenger', 'Facebook Ads', 'Property Campaigns', 'Retargeting Campaigns'];
export const leadAutomationRules = ['Normalize every channel event into one lead identity and conversation timeline.', 'Require consent and contact validation before protected follow-up.', 'Deduplicate leads across WhatsApp, Facebook, Instagram, website, and future APIs.', 'Apply qualification and scoring before assignment where sufficient information exists.', 'Route only to eligible, available, and policy-compliant users.', 'Create Lead Lock only after assignment and eligibility checks.', 'Stop automated follow-up when a user opts out, converts, disputes, or requests human handling.', 'DECISION REQUIRED: displayed scoring weights, score range, and routing outcomes are unapproved examples.'];

export const leadQualificationRules: LeadQualificationRule[] = [
  { role: 'Buyer', questions: ['What property type are you looking for?', 'What is your budget?', 'Which city or area?', 'When do you plan to buy?', 'Would you like a visit or agent contact?'], requiredSignals: ['Intent', 'Budget', 'Timeline', 'Location', 'Property type'] },
  { role: 'Seller', questions: ['What property do you want to list?', 'Where is it located?', 'Do you have ownership documents?', 'What price and timeline?', 'Would you like verification help?'], requiredSignals: ['Property', 'Location', 'Ownership evidence', 'Price', 'Timeline'] },
  { role: 'Agent', questions: ['Which areas do you cover?', 'What property types?', 'What is your verification status?', 'Do you need protected leads?', 'What subscription plan?'], requiredSignals: ['Area', 'Role', 'Eligibility', 'Lead need', 'Plan'] },
  { role: 'Agency', questions: ['How many agents and branches?', 'Which markets?', 'What lead volume?', 'What team controls?', 'What billing plan?'], requiredSignals: ['Organization', 'Coverage', 'Team', 'Volume', 'Billing'] },
  { role: 'Developer', questions: ['Which projects?', 'What inventory?', 'Which city?', 'What NOCs and documents?', 'What sales goal?'], requiredSignals: ['Project', 'Inventory', 'Location', 'Verification', 'Goal'] },
  { role: 'Investor', questions: ['What investment budget?', 'Which locations?', 'What return horizon?', 'What property type?', 'What risk preference?'], requiredSignals: ['Budget', 'Location', 'Timeline', 'Type', 'Risk'] },
  { role: 'Industrial', questions: ['Warehouse, factory, or land?', 'Which industrial area?', 'What size and budget?', 'What operating purpose?', 'What timeline?'], requiredSignals: ['Asset type', 'Location', 'Size', 'Purpose', 'Timeline'] },
  { role: 'Corporate', questions: ['What portfolio or asset need?', 'Which locations?', 'How many users?', 'What lease or acquisition goal?', 'What governance requirements?'], requiredSignals: ['Asset need', 'Location', 'Organization', 'Goal', 'Governance'] },
  { role: 'Government', questions: ['What official request?', 'Which department?', 'Which records or area?', 'What authority reference?', 'What timeline?'], requiredSignals: ['Purpose', 'Department', 'Scope', 'Authority', 'Timeline'] },
];

export const leadScoringRules = [
  { factor: 'Budget', weight: 20, positiveSignal: 'Clear and credible budget', negativeSignal: 'Missing or contradictory budget' },
  { factor: 'Timeline', weight: 15, positiveSignal: 'Defined action window', negativeSignal: 'No timeline' },
  { factor: 'Intent', weight: 20, positiveSignal: 'Specific action request', negativeSignal: 'Vague or exploratory request' },
  { factor: 'Location', weight: 15, positiveSignal: 'Specific city, area, or society', negativeSignal: 'No location preference' },
  { factor: 'Property Type', weight: 10, positiveSignal: 'Defined property or asset type', negativeSignal: 'Unclear type' },
  { factor: 'Completeness', weight: 10, positiveSignal: 'All required answers provided', negativeSignal: 'Missing qualification fields' },
  { factor: 'Verification', weight: 10, positiveSignal: 'Consent and verified contact or identity', negativeSignal: 'Unverified or conflicting identity' },
];

export const crmRules = ['Store name, phone, email, role, budget, location, property interest, lead score, and lead owner.', 'Maintain conversation history across supported channels with source attribution.', 'Store campaign, ad, form, referral, and agent attribution.', 'Deduplicate records using approved identity and contact matching rules.', 'Preserve consent, language preference, opt-out, and human-handoff state.', 'Link CRM activity to Lead Lock, deal, notification, and audit records.'];
export const followUpRules: FollowUpRule[] = [
  { day: 1, action: 'Welcome', purpose: 'Confirm receipt, consent, and next step.', stopCondition: 'Opt-out, human handoff, or converted lead' },
  { day: 2, action: 'Property Suggestions', purpose: 'Send approved property matches based on stated interest.', stopCondition: 'No consent or preference changed' },
  { day: 3, action: 'Area Insights', purpose: 'Share relevant city, area, or market intelligence.', stopCondition: 'User declines updates' },
  { day: 5, action: 'Follow Up', purpose: 'Ask whether the user needs clarification or agent contact.', stopCondition: 'Response, opt-out, or dispute' },
  { day: 7, action: 'Re Engagement', purpose: 'Offer a new search or updated matching path.', stopCondition: 'Lead closed, converted, or opted out' },
  { day: 14, action: 'Conversion Campaign', purpose: 'Present a final relevant action with respectful frequency control.', stopCondition: 'Conversion, opt-out, or campaign expiry' },
];

export const involvedAiAssistants = ['Buyer AI', 'Seller AI', 'Agent AI', 'Lead Qualification AI', 'Lead Routing AI', 'Area Intelligence AI', 'Property Recommendation AI', 'Lead Protection AI', 'CRM AI', 'WhatsApp AI'];
export const conversationMemoryRules = ['Language Preference: Roman Urdu, Urdu, English', 'Previous Conversations', 'Property Interests', 'Saved Searches', 'Lead Status', 'Consent and opt-out state', 'Channel and campaign attribution'];
export const voiceSupportRules = ['Roman Urdu', 'Urdu', 'English', 'Future TTS Integration', 'Future STT Integration'];
export const commandCenterMetrics = ['Messages', 'Leads', 'Conversions', 'Response Time', 'Lead Scores', 'Agent Assignment', 'Campaign Performance', 'Ad Leads', 'Messenger Leads', 'Campaign Leads', 'Cost Per Lead', 'Lead Quality'];
export const notificationRules = ['New Lead', 'Qualified Lead', 'Assigned Lead', 'Lead Locked', 'Lead Converted', 'Lead Expired', 'Campaign Alert'];

export const auditRules: AuditRule[] = [
  { event: 'Channel message received or sent', requiredFields: ['channel', 'messageId', 'userId', 'timestamp', 'consent', 'language'], retention: 'Conversation history with privacy controls' },
  { event: 'AI qualification and score', requiredFields: ['leadId', 'assistant', 'score', 'factors', 'timestamp', 'confidence'], retention: 'Lead-linked decision history' },
  { event: 'Routing and agent assignment', requiredFields: ['leadId', 'routingDecision', 'assignedUser', 'reason', 'timestamp'], retention: 'Append-only assignment record' },
  { event: 'Follow-up and conversion', requiredFields: ['leadId', 'campaign', 'action', 'timestamp', 'response', 'outcome'], retention: 'Campaign and CRM audit history' },
];

export const escalationRules = [
  { level: 1, owner: 'WhatsApp AI', trigger: 'Routine conversation or property question', action: 'Respond, qualify, or route.' },
  { level: 2, owner: 'Lead Qualification AI', trigger: 'Incomplete, ambiguous, or high-risk intent', action: 'Request information, score, or flag.' },
  { level: 3, owner: 'Lead Routing AI', trigger: 'No eligible assignment or routing conflict', action: 'Queue and notify CRM AI or AI Admin.' },
  { level: 4, owner: 'CRM AI', trigger: 'Ownership, consent, duplication, or campaign issue', action: 'Preserve record and escalate.' },
  { level: 5, owner: 'AI Admin', trigger: 'Material fraud, dispute, compliance, or platform risk', action: 'Review, flag, recommend, investigate, and escalate; freeze/decision authority is DECISION REQUIRED.' },
  { level: 6, owner: 'Authorized human reviewer (role and authority DECISION REQUIRED)', trigger: 'Final governance or unresolved platform issue', action: 'Final human decision within approved authority.' },
];

export interface AuditRule { event: string; requiredFields: string[]; retention: string }
export const whatsappFacebookAutomationVersion = '27.0.0';
