export interface VoiceRule {
  title: string;
  description: string;
}

export interface VoiceMetric {
  label: string;
  value: string;
}

export interface VoiceEscalationRule {
  level: number;
  owner: string;
  trigger: string;
  action: string;
}

export const voiceIdentity = [
  'Pakistani Female',
  'Professional',
  'Confident',
  'Trustworthy',
  'Business Focused',
  'Real Estate Advisor',
  'Sales Consultant',
  'Customer Success Specialist',
];

export const voicePersonality = [
  'Warm',
  'Professional',
  'Helpful',
  'Intelligent',
  'Clear',
  'Calm',
  'Confident',
  'Persuasive',
  'Never Aggressive',
];

export const supportedLanguages = ['Roman Urdu', 'Urdu', 'English', 'Future Languages', 'Arabic', 'Hindi', 'Turkish'];
export const languageSelectionModes = ['Manual Selection', 'Auto Detection', 'Remember Preference', 'User Override'];

export const voiceChannels = [
  'Website AI Assistant',
  'Buyer AI',
  'Seller AI',
  'Agent AI',
  'WhatsApp AI',
  'Facebook AI',
  'CRM AI',
  'Deal AI',
  'Admin AI',
  '54 AI Workforce Registry entries (voice integration proposed, not production)',
];

export const voiceExperienceRules: VoiceRule[] = [
  { title: 'Natural speech', description: 'Use human-like rhythm, pauses, sentence awareness, and conversation-aware delivery.' },
  { title: 'Emotion-aware responses', description: 'Adjust tone and pacing to the user context while remaining calm, professional, and trustworthy.' },
  { title: 'Clean voice output', description: 'Never read markdown, URLs, symbols, system labels, or technical formatting aloud.' },
  { title: 'Consistent Nexus identity', description: 'Every assistant speaks with the same core voice identity while adapting vocabulary to its role.' },
];

export const textNormalizationRules: VoiceRule[] = [
  { title: 'Remove markdown', description: 'Strip #, *, _, @, brackets, parentheses, markdown syntax, and system labels before speech.' },
  { title: 'Remove technical noise', description: 'Remove URLs, code, raw identifiers, and technical symbols that are not useful in spoken output.' },
  { title: 'Preserve meaning', description: 'Normalize text without changing prices, names, property details, dates, or user intent.' },
];

export const sttRules: VoiceRule[] = [
  { title: 'Voice capture', description: 'Capture microphone input with permission-aware controls and clear recording state.' },
  { title: 'Noise reduction', description: 'Reduce background noise before recognition to improve property, name, and address accuracy.' },
  { title: 'Language detection', description: 'Detect Roman Urdu, Urdu, and English during the conversation and preserve the selected language preference.' },
  { title: 'Streaming recognition', description: 'Support responsive streaming transcription for natural conversational turn-taking.' },
];

export const ttsRules: VoiceRule[] = [
  { title: 'Streaming voice', description: 'Start playback progressively so users do not wait for an entire response to render.' },
  { title: 'Natural pauses', description: 'Respect sentence boundaries, emphasis, and conversational pacing.' },
  { title: 'Emotion control', description: 'Use controlled warmth, confidence, and calmness based on the assistant and conversation context.' },
  { title: 'Conversation awareness', description: 'Keep spoken responses concise, relevant, and aligned with the current workflow.' },
];

export const voiceMemoryRules: VoiceRule[] = [
  { title: 'Preferred language', description: 'Remember the user language preference and allow manual override at any time.' },
  { title: 'Preferred voice', description: 'Store the selected voice identity while preserving the Nexus voice governance baseline.' },
  { title: 'Preferred speed and tone', description: 'Remember playback speed, tone, and accessibility choices for future conversations.' },
  { title: 'Accessibility settings', description: 'Keep voice controls, captions, and playback preferences tied to the user profile.' },
];

export const voiceMemoryStore = ['Preferred Language', 'Preferred Voice', 'Preferred Speed', 'Preferred Tone', 'Accessibility Settings'];

export const voiceWorkflow = [
  'User Speaks',
  'Speech To Text',
  'Language Detection',
  'AI Assistant',
  'Response Generation',
  'Text Normalization',
  'Text To Speech',
  'Audio Playback',
];

export const providerRules: VoiceRule[] = [
  { title: 'Primary: ElevenLabs', description: 'Primary natural voice provider for the Pakistani female Nexus voice identity.' },
  { title: 'Secondary: OpenAI Realtime Voice', description: 'Secondary real-time voice path for conversational continuity and provider resilience.' },
  { title: 'Fallback: Google Cloud TTS', description: 'Fallback synthesis provider for regional availability and operational continuity.' },
  { title: 'Emergency: Browser Speech API', description: 'Emergency local fallback when managed voice providers are unavailable.' },
];

export const voiceQualityRules: VoiceRule[] = [
  { title: 'Latency', description: 'Measure time from user speech completion to transcription, response, and audio playback.' },
  { title: 'Audio clarity', description: 'Monitor intelligibility, pronunciation, clipping, and playback quality across devices.' },
  { title: 'Language accuracy', description: 'Measure language detection and multilingual normalization accuracy.' },
  { title: 'Speech accuracy', description: 'Compare transcription and spoken output against verified conversation intent.' },
  { title: 'User satisfaction', description: 'Track feedback, repeat requests, and successful voice task completion.' },
  { title: 'Completion rate', description: 'Measure how often users complete the intended voice workflow.' },
];

export const voiceDashboardSignals = ['Requests', 'Languages', 'Latency', 'Errors', 'Provider Health', 'Voice Quality'];
export const voiceNotifications = ['Voice Failure', 'Provider Failure', 'Language Failure', 'STT Failure', 'TTS Failure', 'Quality Alert'];

export const aiAdminResponsibilities = [
  'Monitor Voice Systems',
  'Monitor Providers',
  'Monitor Failures',
  'Monitor Quality',
  'Approve Changes',
];

export const superAdminResponsibilities = ['Voice Governance', 'Provider Governance', 'Policy Governance', 'Emergency Controls'];

export const voiceAuditSystem = ['Voice Requests', 'Provider Usage', 'Language Changes', 'Failures', 'Escalations'];

export const voiceRules: VoiceRule[] = [
  { title: 'Proposed voice identity', description: 'A future voice experience may use a consistent Pakistani voice identity; no shared production voice service is established for the 54 registry entries.' },
  { title: 'Voice follows permissions', description: 'Audio capture, memory, language, and provider routing respect user consent, role permissions, and platform policy.' },
  { title: 'Spoken output is presentation-ready', description: 'Every response passes through text normalization before it reaches text-to-speech.' },
  { title: 'Provider resilience', description: 'Primary, secondary, fallback, and emergency providers keep voice workflows available during failures.' },
];

export const languageRules: VoiceRule[] = [
  { title: 'Roman Urdu first-class support', description: 'Roman Urdu is recognized, remembered, and spoken as a primary Nexus interaction mode.' },
  { title: 'Urdu and English continuity', description: 'Users can switch between Urdu and English without losing workflow context or memory.' },
  { title: 'Future language readiness', description: 'Arabic, Hindi, Turkish, and future languages plug into the same language selection and governance layer.' },
];

export const qualityRules = voiceQualityRules;
export const auditRules: VoiceRule[] = [
  { title: 'Request traceability', description: 'Track voice requests from capture through provider selection, response generation, and playback.' },
  { title: 'Provider accountability', description: 'Record provider usage, health, failures, latency, and quality outcomes.' },
  { title: 'Language change history', description: 'Audit language detection, manual selection, user overrides, and preference changes.' },
  { title: 'Escalation evidence', description: 'Preserve failures, quality alerts, and governance decisions for review.' },
];

export const voicePerformanceMetrics: VoiceMetric[] = [
  { label: 'Latency', value: 'Speech-to-response time' },
  { label: 'Audio Clarity', value: 'Device and provider quality' },
  { label: 'Language Accuracy', value: 'Detection and normalization' },
  { label: 'Speech Accuracy', value: 'STT and TTS intent fidelity' },
  { label: 'User Satisfaction', value: 'Voice workflow feedback' },
  { label: 'Completion Rate', value: 'Successful task completion' },
];

export const escalationRules: VoiceEscalationRule[] = [
  { level: 1, owner: 'Voice AI', trigger: 'Routine voice request or low-level playback issue', action: 'Retry the governed voice workflow and log the event.' },
  { level: 2, owner: 'Assistant AI', trigger: 'Assistant-specific language, context, or response issue', action: 'Adjust the response path and route the quality signal.' },
  { level: 3, owner: 'AI Admin', trigger: 'Provider failure, repeated STT/TTS errors, or quality alert', action: 'Investigate quality and recommend a provider change; operational authority is DECISION REQUIRED.' },
  { level: 4, owner: 'Super Admin', trigger: 'Voice governance, policy, or emergency platform event', action: 'Apply emergency controls and make the final governance decision.' },
];

export const voiceAiOperatingSystemVersion = '33.0.0';
