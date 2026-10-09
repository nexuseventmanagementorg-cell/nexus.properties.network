export interface FAQRule {
  title: string;
  description: string;
}

export interface FAQMetric {
  label: string;
  value: string;
}

export interface FAQEscalationRule {
  level: number;
  owner: string;
  trigger: string;
  action: string;
}

export const faqCategories = [
  'Platform FAQ', 'Buyer FAQ', 'Seller FAQ', 'Agent FAQ', 'Agency FAQ', 'Developer FAQ', 'Investor FAQ', 'Corporate FAQ', 'Government FAQ', 'Verification FAQ', 'Property FAQ', 'Lead FAQ', 'Deal FAQ', 'Payment FAQ', 'Subscription FAQ', 'Marketplace FAQ', 'CRM FAQ', 'AI FAQ', 'Voice FAQ', 'Security FAQ', 'Compliance FAQ', 'Trust FAQ',
];

export const faqScale = ['500+', '1000+', '5000+', 'Unlimited Future Expansion'];
export const supportedLanguages = ['Roman Urdu', 'Urdu', 'English', 'Arabic', 'Future Languages'];

export const answerGenerationEngine = [
  'Question Analysis',
  'Intent Detection',
  'Knowledge Search',
  'Knowledge Validation',
  'Answer Generation',
  'Confidence Scoring',
  'Response Delivery',
];

export const knowledgeRouting = [
  'Buyer Questions -> Buyer AI',
  'Seller Questions -> Seller AI',
  'Agent Questions -> Agent AI',
  'Developer Questions -> Developer AI',
  'Investor Questions -> Investor AI',
  'Government Questions -> Government AI',
  'Platform Questions -> Nexus AI',
];

export const answerTypes = ['Short Answers', 'Detailed Answers', 'Guides', 'Step-by-Step Instructions', 'Comparisons', 'Policy Explanations', 'Training Responses'];
export const confidenceLevels = ['High Confidence', 'Medium Confidence', 'Low Confidence', 'Escalation Required'];
export const approvalStatuses = ['Draft', 'Review', 'Approved', 'Published', 'Archived'];
export const faqSearchModes = ['Keyword Search', 'Semantic Search', 'Natural Language Search', 'Voice Search'];
export const learningInputs = ['User Questions', 'Successful Answers', 'Knowledge Updates', 'Market Changes'];
export const connectedAssistants = ['Future integration target: 54 AI Workforce Registry entries; no production assistant connections are established.'];
export const governanceControls = ['Approved Sources Only', 'Version Control', 'Editorial Review', 'Audit Logging'];
export const dashboardSignals = ['Top Questions', 'Top Categories', 'Search Volume', 'Knowledge Gaps', 'Answer Quality', 'User Satisfaction'];
export const auditEvents = ['Questions', 'Answers', 'Knowledge Changes', 'Approvals', 'Publications', 'Escalations'];

export const faqRules: FAQRule[] = [
  { title: 'Official source of truth', description: 'All assistant answers originate from approved FAQ content, knowledge layers, policies, and verified platform records.' },
  { title: 'Role-aware FAQ coverage', description: 'The knowledge base serves buyers, sellers, agents, agencies, developers, investors, corporate users, government, and platform operations.' },
  { title: 'Expandable content system', description: 'The FAQ library grows from 500+ to 1000+, 5000+, and unlimited future entries without changing the response contract.' },
  { title: 'Language-consistent answers', description: 'The same approved answer intent can be delivered in Roman Urdu, Urdu, English, Arabic, and future languages.' },
];

export const knowledgeRules: FAQRule[] = [
  { title: 'Approved layers only', description: 'Answers use governed platform, property, market, legal, CRM, graph, voice, and analytics knowledge.' },
  { title: 'Evidence before certainty', description: 'The engine validates retrieved knowledge and exposes confidence before presenting an answer.' },
  { title: 'Versioned knowledge', description: 'Every FAQ and supporting source has ownership, version, review status, publication date, and change history.' },
];

export const routingRules: FAQRule[] = [
  { title: 'Intent-based routing', description: 'Question intent determines the specialist AI, knowledge scope, response style, and escalation path.' },
  { title: 'Cross-domain handoff', description: 'A specialist can request authorized context from other knowledge domains without losing the original conversation.' },
  { title: 'Platform fallback', description: 'Unclassified platform questions route to Nexus AI for clarification, approved search, or escalation.' },
];

export const answerRules: FAQRule[] = [
  { title: 'Answer type selection', description: 'The engine selects short answers, detailed answers, guides, comparisons, policy explanations, or training responses from user intent.' },
  { title: 'Consistent response structure', description: 'Every answer follows the same approved facts, terminology, language preference, and role-aware tone.' },
  { title: 'No unsupported claims', description: 'Low-confidence or missing knowledge becomes a clarification request or escalation instead of fabricated information.' },
];

export const approvalRules: FAQRule[] = [
  { title: 'Draft to review', description: 'New FAQ content begins as a draft and requires editorial and domain review before approval.' },
  { title: 'Approved to published', description: 'Only approved entries are published to assistant retrieval and connected channels.' },
  { title: 'Archive with history', description: 'Archived content is removed from active answers but preserved for audit, rollback, and learning analysis.' },
];

export const searchRules: FAQRule[] = [
  { title: 'Multi-mode retrieval', description: 'Keyword, semantic, natural-language, and voice searches share one governed FAQ search index.' },
  { title: 'Relevance and freshness', description: 'Search ranking considers intent, role, language, confidence, source authority, freshness, and publication status.' },
  { title: 'Search gap detection', description: 'Repeated unsuccessful searches become knowledge gap candidates for editorial review.' },
];

export const learningRules: FAQRule[] = [
  { title: 'Learn from questions', description: 'User questions reveal new intents, missing topics, terminology, and education needs.' },
  { title: 'Learn from outcomes', description: 'Successful answers, satisfaction, task completion, and escalation outcomes improve FAQ quality.' },
  { title: 'Governed learning', description: 'Learning suggestions remain drafts until approved, versioned, and published by the knowledge process.' },
];

export const performanceRules: FAQRule[] = [
  { title: 'Answer accuracy', description: 'Compare answers with approved facts, policies, and reviewed outcomes.' },
  { title: 'Knowledge coverage', description: 'Measure role, workflow, geography, language, and category coverage across the FAQ library.' },
  { title: 'Search success', description: 'Track whether users and assistants find an approved answer without unnecessary escalation.' },
  { title: 'Confidence accuracy', description: 'Compare reported confidence with expert review and actual answer quality.' },
];

export const auditRules: FAQRule[] = [
  { title: 'Question and answer history', description: 'Record questions, routed intents, answers, confidence, sources, and delivery channels.' },
  { title: 'Knowledge lifecycle history', description: 'Track changes, reviews, approvals, publications, archives, and version transitions.' },
  { title: 'Escalation evidence', description: 'Preserve unresolved questions, specialist handoffs, knowledge gaps, and governance decisions.' },
];

export const faqPerformanceMetrics: FAQMetric[] = [
  { label: 'Answer Accuracy', value: 'Approved response alignment' },
  { label: 'Knowledge Coverage', value: 'Role and topic completeness' },
  { label: 'FAQ Usage', value: 'Retrieval and answer volume' },
  { label: 'Search Success', value: 'Useful approved retrieval' },
  { label: 'User Satisfaction', value: 'Education and task outcomes' },
  { label: 'Confidence Accuracy', value: 'Confidence-to-quality alignment' },
];

export const escalationRules: FAQEscalationRule[] = [
  { level: 1, owner: 'FAQ AI', trigger: 'Routine FAQ search or answer request', action: 'Retrieve approved content and deliver a role-aware response.' },
  { level: 2, owner: 'Specialist AI', trigger: 'Domain-specific question or incomplete FAQ match', action: 'Search specialist knowledge and return an evidence-backed answer.' },
  { level: 3, owner: 'Knowledge AI', trigger: 'Low confidence, knowledge gap, policy conflict, or repeated failure', action: 'Review sources, create a governed learning candidate, or route for approval.' },
  { level: 4, owner: 'AI Admin', trigger: 'Content, quality, compliance, or routing governance issue', action: 'Flag, recommend, investigate, and escalate; publication-control authority is DECISION REQUIRED.' },
  { level: 5, owner: 'Authorized human reviewer (role and authority DECISION REQUIRED)', trigger: 'Platform-wide knowledge governance or critical policy decision', action: 'Make an audited human decision within approved authority.' },
];

export const aiFaqKnowledgeBaseEngineVersion = '37.0.0';
