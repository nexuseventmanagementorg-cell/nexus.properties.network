import { SAMPLE_AREAS } from '../data/sampleAreas';
import { SAMPLE_CITIES } from '../data/sampleCities';

export type SpeechLanguage = 'roman-urdu' | 'urdu' | 'english' | 'proper-noun' | 'acronym';

export interface SpeechSegment {
  text: string;
  language: SpeechLanguage;
  speechLanguage: 'ur-PK' | 'en-IN';
}

export const BusinessTermDictionary = new Set([
  'sale', 'testing', 'demo', 'property', 'commercial', 'residential', 'lead', 'deal', 'investment', 'marketing', 'business', 'platform', 'dashboard', 'listing', 'verified', 'premium', 'agent', 'agency', 'developer', 'investor', 'marketplace', 'analytics', 'voice', 'system', 'application', 'mobile', 'website', 'revenue', 'verification', 'crm', 'subscription', 'payment', 'compliance', 'trust', 'security', 'performance', 'growth', 'demand', 'supply', 'price', 'pricing', 'corporate', 'enterprise', 'available', 'currently', 'found', 'compare', 'location', 'size', 'option', 'options', 'professional', 'advisor', 'status', 'environment', 'active', 'generated', 'completed', 'lock', 'phase', 'budget', 'bedroom', 'bathroom', 'farm', 'house', 'apartment', 'office', 'shop', 'building', 'plot', 'roi',
]);

export const RealEstateTermDictionary = new Set([
  'plot', 'house', 'apartment', 'flat', 'office', 'shop', 'building', 'commercial', 'residential', 'property', 'investment', 'roi', 'commission', 'lead', 'lock', 'deal', 'listing', 'inventory', 'area', 'society', 'phase', 'block', 'sector', 'villa', 'warehouse', 'land', 'project', 'unit', 'bedroom', 'bathroom', 'rent', 'sale', 'buyer', 'seller', 'agent', 'developer',
]);

export const ProtectedEnglishDictionary = new Set([
  ...BusinessTermDictionary,
  ...RealEstateTermDictionary,
  'google', 'facebook', 'whatsapp', 'openai', 'chatgpt', 'nexus',
]);

export const BrandDictionary = new Set([
  'google', 'facebook', 'whatsapp', 'openai', 'chatgpt', 'elevenlabs', 'jazzcash', 'easypaisa', 'nexus',
]);

export const CityAndAreaDictionary = new Set([
  ...SAMPLE_CITIES.map((item) => item.city.toLowerCase()),
  ...SAMPLE_AREAS.map((item) => item.name.toLowerCase()),
]);

export const AcronymDictionary = new Set([
  'CRM', 'API', 'ROI', 'AI', 'NLP', 'TTS', 'STT', 'OTP', 'JWT', 'DHA', 'FBR', 'LDA', 'CDA', 'KDA', 'RDA', 'NOC', 'CNIC', 'PKR', 'AED',
]);

const RomanUrduDictionary = new Set([
  'aap', 'ap', 'ke', 'ki', 'ka', 'ko', 'mein', 'main', 'mey', 'mujhe', 'mujhay', 'mera', 'meri', 'mere', 'liye', 'liay', 'chahta', 'chahti', 'hun', 'hoon', 'hai', 'hain', 'kya', 'kaise', 'kahan', 'kitni', 'kitna', 'dikhao', 'dikhayein', 'dekhna', 'chahiye', 'chahye', 'mili', 'milega', 'mujood', 'aur', 'yeh', 'ye', 'woh', 'wo', 'ek', 'aik', 'doosra', 'doosri', 'sath', 'saath', 'sirf', 'karne', 'karein', 'kare', 'pooch', 'sakte', 'sakty', 'agla', 'mujhe', 'mein', 'par', 'se', 'tak', 'ka', 'ki', 'ko', 'mein', 'ho', 'raha', 'rahi', 'chahte', 'chahtein', 'dhoond', 'dhoondh', 'rahe', 'rahi', 'jo', 'me', 'hey', 'assalamo', 'alaikum',
]);

const tokenPattern = /[A-Za-z0-9\u0600-\u06FF]+|[.,!?]+/g;

export class LanguageDetectionLayer {
  detect(word: string, defaultSpeechLanguage: 'ur-PK' | 'en-IN' = 'en-IN'): SpeechLanguage {
    if (/^[\u0600-\u06FF]+$/u.test(word)) return 'urdu';
    if (AcronymDictionary.has(word.toUpperCase())) return 'acronym';

    const normalized = word.toLowerCase();
    if (BrandDictionary.has(normalized)) return 'proper-noun';
    if (CityAndAreaDictionary.has(normalized)) return 'proper-noun';
    if (BusinessTermDictionary.has(normalized) || RealEstateTermDictionary.has(normalized)) return 'english';
    if (RomanUrduDictionary.has(normalized)) return 'roman-urdu';
    return defaultSpeechLanguage === 'ur-PK' ? 'roman-urdu' : 'english';
  }
}

export class PronunciationNormalizationLayer {
  constructor(private readonly languageDetection = new LanguageDetectionLayer()) {}

  normalizeWord(word: string): string {
    const normalized = word.toLowerCase();
    const specialMap: Record<string, string> = {
      sale: 'sale',
      testing: 'testing',
      lead: 'lead',
      deal: 'deal',
      property: 'property',
      commercial: 'commercial',
      residential: 'residential',
      'farm-house': 'farm house',
      'farmhouse': 'farm house',
      'roman': 'Roman',
      'urdu': 'Urdu',
      'nexus': 'NEXUS',
      'jazzcash': 'JazzCash',
      'easypaisa': 'Easypaisa',
      'whatsapp': 'WhatsApp',
      'facebook': 'Facebook',
      'google': 'Google',
      'openai': 'OpenAI',
    };

    if (this.languageDetection.detect(word) === 'acronym') return word.toUpperCase().split('').join(' ');
    if (BrandDictionary.has(normalized)) return specialMap[normalized] ?? word;
    if (ProtectedEnglishDictionary.has(normalized)) return (specialMap[normalized] ?? word).toUpperCase();
    return specialMap[normalized] ?? word;
  }

  normalizeText(text: string): string {
    return text
      .replace(/[™®©]/g, '')
      .replace(/[#*_`]/g, '')
      .replace(/(\d+)\s*\+/g, '$1 plus')
      .replace(/[+:;()[\]{}<>/\\|]/g, ' ')
      .replace(/\b(sale|testing|lead|deal|property|commercial|residential)\b/gi, (term) => term.toLowerCase())
      .replace(/\s+/g, ' ')
      .trim()
      .split(/(\s+|[.,!?]+)/)
      .map((part) => {
        if (!part.trim() || /^[.,!?]+$/.test(part)) return part;
        return this.languageDetection.detect(part) === 'acronym' ? part.toUpperCase() : this.normalizeWord(part);
      })
      .join('')
      .replace(/\s+/g, ' ')
      .trim();
  }
}

export class SpeechIntelligenceEngine {
  constructor(
    private readonly languageDetection = new LanguageDetectionLayer(),
    private readonly pronunciationNormalization = new PronunciationNormalizationLayer(languageDetection),
  ) {}

  detectWord(word: string, defaultSpeechLanguage: 'ur-PK' | 'en-IN' = 'en-IN'): SpeechLanguage {
    return this.languageDetection.detect(word, defaultSpeechLanguage);
  }

  normalizeForSpeech(text: string): string {
    return this.pronunciationNormalization.normalizeText(text);
  }

  prepareSegments(text: string, defaultSpeechLanguage: 'ur-PK' | 'en-IN' = 'en-IN'): SpeechSegment[] {
    const normalizedText = this.normalizeForSpeech(text);
    const tokens = normalizedText.match(tokenPattern) || [];
    const segments: SpeechSegment[] = [];
    let current: SpeechSegment | null = null;

    for (const token of tokens) {
      const isPunctuation = /^[.,!?]+$/.test(token);
      const previousLanguage: SpeechLanguage = current ? current.language : 'english';
      const language: SpeechLanguage = isPunctuation ? previousLanguage : this.detectWord(token, defaultSpeechLanguage);
      const normalizedToken = isPunctuation ? token : this.pronunciationNormalization.normalizeWord(token);
      const speechLanguage: 'ur-PK' | 'en-IN' = language === 'roman-urdu' || language === 'urdu' ? 'ur-PK' : 'en-IN';
      const separator = isPunctuation ? '' : current ? ' ' : '';

      if (!current || current.speechLanguage !== speechLanguage) {
        if (current) segments.push(current);
        current = { text: normalizedToken, language, speechLanguage };
      } else {
        current.text += `${separator}${normalizedToken}`;
      }
    }

    if (current) segments.push(current);
    return segments.filter((segment) => segment.text.trim());
  }
}

export const speechIntelligenceEngine = new SpeechIntelligenceEngine();
