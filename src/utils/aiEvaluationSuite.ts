import { SAMPLE_AREAS } from '../data/sampleAreas';
import { SAMPLE_CITIES } from '../data/sampleCities';
import { intentToNaturalConfirmation, parsePropertyIntent, PropertyIntent } from './propertyIntentParser';

export interface AIEvaluationQuery {
  id: string;
  query: string;
  expected: Partial<PropertyIntent>;
  language: 'en' | 'roman_ur';
}

const cityFixtures = SAMPLE_CITIES.slice(0, 20).map((city) => ({
  city: city.city,
  area: SAMPLE_AREAS.find((area) => area.cityId === city.cityId)?.name || `${city.city} Central`,
}));

const templates: Array<{ query: (city: string, area: string) => string; expected: Partial<PropertyIntent>; language: 'en' | 'roman_ur' }> = [
  { query: (city, area) => `Show me 1 Kanal plot in ${area} ${city}`, expected: { propertyType: 'Plot', purpose: 'Residential', sizeText: '1 Kanal' }, language: 'en' },
  { query: (city, area) => `Mujhe 10 marla house chahiye ${area} ${city}`, expected: { propertyType: 'House', purpose: 'Residential', sizeText: '10 marla' }, language: 'roman_ur' },
  { query: (city, area) => `Budget 3 crore for property in ${area} ${city}`, expected: { budgetMaxRaw: 300 }, language: 'en' },
  { query: (city, area) => `Commercial shop in ${area} ${city}`, expected: { propertyType: 'Shop', purpose: 'Commercial' }, language: 'en' },
  { query: (city, area) => `Mujhe apartment chahiye in ${area} ${city}`, expected: { propertyType: 'Apartment', purpose: 'Residential' }, language: 'roman_ur' },
  { query: (city, area) => `Farm house Phase 1 in ${area} ${city}`, expected: { propertyType: 'Farm House', phase: 'Phase 1' }, language: 'en' },
  { query: (city, area) => `Office under budget 5 crore in ${area} ${city}`, expected: { propertyType: 'Office', purpose: 'Commercial', budgetMaxRaw: 500 }, language: 'en' },
  { query: (city, area) => `Investment property in ${area} ${city}`, expected: { propertyType: 'Investment', purpose: 'Investment' }, language: 'en' },
  { query: (city, area) => `3 bedroom ghar Phase 2 ${area} ${city}`, expected: { propertyType: 'House', purpose: 'Residential', bedrooms: 3, phase: 'Phase 2' }, language: 'roman_ur' },
  { query: (city, area) => `Mujhe residential plot 2 Kanal ${area} ${city} mein chahiye`, expected: { propertyType: 'Plot', purpose: 'Residential', sizeText: '2 Kanal' }, language: 'roman_ur' },
];

export const AI_EVALUATION_QUERIES: AIEvaluationQuery[] = cityFixtures.flatMap((fixture, cityIndex) => templates.map((template, templateIndex) => ({
  id: `AI-${String(cityIndex * templates.length + templateIndex + 1).padStart(3, '0')}`,
  query: template.query(fixture.city, fixture.area),
  expected: { ...template.expected, city: fixture.city, area: fixture.area },
  language: template.language,
})));

const matches = (actual: PropertyIntent, expected: Partial<PropertyIntent>, field: keyof PropertyIntent) => {
  if (expected[field] === undefined) return true;
  if (field === 'sizeText') return actual.sizeText?.toLowerCase() === String(expected[field]).toLowerCase();
  return actual[field] === expected[field];
};

export interface AIEvaluationReport {
  totalQueries: number;
  intentAccuracy: number;
  propertyAccuracy: number;
  cityAccuracy: number;
  budgetAccuracy: number;
  responseQuality: number;
}

export const evaluateAIQuality = (): AIEvaluationReport => {
  const results = AI_EVALUATION_QUERIES.map((item) => {
    const actual = parsePropertyIntent(item.query);
    const response = intentToNaturalConfirmation(actual, item.language);
    return {
      actual,
      expected: item.expected,
      intent: ['city', 'area', 'phase', 'propertyType', 'purpose', 'budgetMaxRaw', 'bedrooms', 'sizeText'].every((field) => matches(actual, item.expected, field as keyof PropertyIntent)),
      property: matches(actual, item.expected, 'propertyType'),
      city: matches(actual, item.expected, 'city'),
      budget: matches(actual, item.expected, 'budgetMaxRaw'),
      quality: !response.includes(item.query) && !/^Aap\s+(Show|Buy|Commercial)/i.test(response),
    };
  });

  const percentage = (key: 'intent' | 'property' | 'city' | 'budget' | 'quality') => Math.round((results.filter((item) => item[key]).length / results.length) * 100);
  return {
    totalQueries: results.length,
    intentAccuracy: percentage('intent'),
    propertyAccuracy: percentage('property'),
    cityAccuracy: percentage('city'),
    budgetAccuracy: percentage('budget'),
    responseQuality: percentage('quality'),
  };
};