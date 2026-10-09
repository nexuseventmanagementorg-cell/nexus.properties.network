import { SAMPLE_AREAS } from '../data/sampleAreas';
import { SAMPLE_CITIES } from '../data/sampleCities';
import { SamplePropertyType } from '../data/sampleProperties';

export type PropertyPurpose = 'Residential' | 'Commercial' | 'Investment';

export interface PropertyIntent {
  city?: string;
  area?: string;
  phase?: string;
  propertyType?: SamplePropertyType;
  purpose?: PropertyPurpose;
  budgetMaxRaw?: number;
  budgetText?: string;
  bedrooms?: number;
  sizeText?: string;
  confidence: number;
}

const typePatterns: Array<{ type: SamplePropertyType; pattern: RegExp }> = [
  { type: 'Farm House', pattern: /farm\s*house|farmhouse|farm\s*home/i },
  { type: 'Apartment', pattern: /apartment|flat|portion/i },
  { type: 'Building', pattern: /building|plaza/i },
  { type: 'Shop', pattern: /shop|dukan|duk[a|e]n/i },
  { type: 'Office', pattern: /office|daftar/i },
  { type: 'Commercial', pattern: /commercial(?:\s+property)?|business\s+property/i },
  { type: 'House', pattern: /house|ghar|home|kothi|villa/i },
  { type: 'Plot', pattern: /plot|residential\s+plot|zameen|land/i },
  { type: 'Investment', pattern: /investment(?:\s+property)?|invest|sarmaya/i },
];

const normalizeText = (text: string) => text.toLowerCase().replace(/[،؛]/g, ' ').replace(/\s+/g, ' ').trim();

const parseBudget = (text: string): Pick<PropertyIntent, 'budgetMaxRaw' | 'budgetText'> => {
  const match = text.match(/(?:budget|max(?:imum)?|under|upto|up\s+to|tak)\s*(?:is|of|:)?\s*(?:pkr\s*)?(\d+(?:\.\d+)?)\s*(crore|karor|cr|lakh|lac|million|m)?/i)
    || text.match(/(?:pkr\s*)?(\d+(?:\.\d+)?)\s*(crore|karor|cr|lakh|lac|million|m)\b/i);
  if (!match) return {};

  const amount = Number(match[1]);
  const unit = (match[2] || '').toLowerCase();
  const multiplier = unit === 'crore' || unit === 'karor' || unit === 'cr' ? 100 : unit === 'million' || unit === 'm' ? 10 : 1;
  return { budgetMaxRaw: amount * multiplier, budgetText: match[0].trim() };
};

const parseSize = (text: string) => text.match(/\b\d+(?:\.\d+)?\s*(?:kanal|marla|acre|sq\.?\s*(?:ft|feet)|square\s*feet)\b/i)?.[0];

export const parsePropertyIntent = (query: string, previous: PropertyIntent = { confidence: 0 }): PropertyIntent => {
  const text = normalizeText(query);
  const city = SAMPLE_CITIES.find((item) => text.includes(item.city.toLowerCase()))?.city;
  const area = SAMPLE_AREAS.find((item) => text.includes(item.name.toLowerCase()))?.name;
  const phaseMatch = text.match(/\bphase\s*[-#]?\s*([a-z0-9]+)\b/i);
  const bedroomMatch = text.match(/\b(\d+)\s*(?:bed(?:room)?s?|br)\b/i);
  const type = typePatterns.find((item) => item.pattern.test(text))?.type;
  const budget = parseBudget(text);
  const sizeText = parseSize(text);
  const purpose: PropertyPurpose | undefined = /commercial|shop|dukan|office|building/i.test(text)
    ? 'Commercial'
    : /investment|invest|sarmaya/i.test(text)
      ? 'Investment'
      : /residential|ghar|house|plot|apartment|flat/i.test(text)
        ? 'Residential'
        : undefined;

  const parsed: PropertyIntent = {
    city: city || previous.city,
    area: area || previous.area,
    phase: phaseMatch ? `Phase ${phaseMatch[1]}` : previous.phase,
    propertyType: type || previous.propertyType,
    purpose: purpose || previous.purpose,
    budgetMaxRaw: budget.budgetMaxRaw ?? previous.budgetMaxRaw,
    budgetText: budget.budgetText || previous.budgetText,
    bedrooms: bedroomMatch ? Number(bedroomMatch[1]) : previous.bedrooms,
    sizeText: sizeText || previous.sizeText,
    confidence: 0,
  };

  // This deterministic field-coverage heuristic is not a model probability.
  const detectedFields = [city, area, phaseMatch, type, purpose, budget.budgetMaxRaw, bedroomMatch, sizeText].filter(Boolean).length;
  parsed.confidence = Math.min(1, detectedFields / 3);
  return parsed;
};

export const intentToNaturalConfirmation = (intent: PropertyIntent, language: 'en' | 'ur' | 'roman_ur'): string => {
  const parts = [intent.sizeText, intent.propertyType?.toLowerCase(), intent.area, intent.city].filter(Boolean);
  const target = parts.join(' ');
  const budget = intent.budgetText ? ` within ${intent.budgetText}` : '';
  const bedrooms = intent.bedrooms ? ` with ${intent.bedrooms} bedrooms` : '';

  if (language === 'ur') return `آپ ${target || 'پراپرٹی'}${bedrooms}${budget} تلاش کر رہے ہیں۔`;
  if (language === 'roman_ur') return `Aap ${target || 'property'}${bedrooms}${budget} dhoond rahe hain.`;
  return `I am looking for ${target || 'property options'}${bedrooms}${budget}.`;
};