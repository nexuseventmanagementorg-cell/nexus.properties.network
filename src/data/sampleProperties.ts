import { SAMPLE_AREAS } from './sampleAreas';
import { SAMPLE_CITIES } from './sampleCities';

export type SamplePropertyType = 'House' | 'Plot' | 'Commercial' | 'Apartment' | 'Investment' | 'Farm House' | 'Building' | 'Shop' | 'Office';
export type SamplePropertyStatus = 'For Sale';

export interface SampleProperty {
  propertyId: string;
  title: string;
  propertyType: SamplePropertyType;
  city: string;
  province: string;
  area: string;
  phase: string;
  price: string;
  priceRaw: number;
  areaSize: string;
  bedrooms?: number;
  bathrooms?: number;
  propertyStatus: SamplePropertyStatus;
  purpose: 'Residential' | 'Commercial' | 'Investment';
  description: string;
  image: string;
  sampleBadge?: 'SAMPLE PROPERTY' | 'DEMO LISTING' | 'FOR TESTING ONLY';
  sampleBadges?: ['SAMPLE PROPERTY', 'DEMO LISTING', 'FOR TESTING ONLY'];
  cityId: string;
  areaId: string;
}

const propertyTemplates: Array<{
  code: string;
  type: SamplePropertyType;
  purpose: SampleProperty['purpose'];
  title: string;
  price: string;
  priceRaw: number;
  areaSize: string;
  bedrooms?: number;
  bathrooms?: number;
  annualRoi?: string;
}> = [
  { code: 'H', type: 'House', purpose: 'Residential', title: 'Sample 1 Kanal Luxury House', price: 'PKR 8 Crore', priceRaw: 800, areaSize: '1 Kanal', bedrooms: 5, bathrooms: 6 },
  { code: 'P', type: 'Plot', purpose: 'Residential', title: 'Sample Residential Plot', price: 'PKR 2.25 Crore', priceRaw: 225, areaSize: '1 Kanal' },
  { code: 'C', type: 'Commercial', purpose: 'Commercial', title: 'Sample Main Boulevard Commercial Property', price: 'PKR 5.5 Crore', priceRaw: 550, areaSize: '8 Marla' },
  { code: 'A', type: 'Apartment', purpose: 'Residential', title: 'Sample Modern Family Apartment', price: 'PKR 1.85 Crore', priceRaw: 185, areaSize: '1,650 Sq Ft', bedrooms: 3, bathrooms: 3 },
  { code: 'F', type: 'Farm House', purpose: 'Residential', title: 'Sample Family Farm House', price: 'PKR 6.5 Crore', priceRaw: 650, areaSize: '2 Kanal', bedrooms: 4, bathrooms: 5 },
  { code: 'B', type: 'Building', purpose: 'Commercial', title: 'Sample Multi-Storey Commercial Building', price: 'PKR 12 Crore', priceRaw: 1200, areaSize: '8,000 Sq Ft' },
  { code: 'S', type: 'Shop', purpose: 'Commercial', title: 'Sample Main Boulevard Shop', price: 'PKR 2.8 Crore', priceRaw: 280, areaSize: '450 Sq Ft' },
  { code: 'O', type: 'Office', purpose: 'Commercial', title: 'Sample Business District Office', price: 'PKR 4.2 Crore', priceRaw: 420, areaSize: '1,200 Sq Ft' },
];

const imageByType: Record<SamplePropertyType, string> = {
  House: '/images/media_1790111327854.png',
  Plot: '/images/media_1790111327854.png',
  Commercial: '/images/media_1790111327854.png',
  Apartment: '/images/media_1790111327854.png',
  Investment: '/images/media_1790111327854.png',
  'Farm House': '/images/media_1790111327854.png',
  Building: '/images/media_1790111327854.png',
  Shop: '/images/media_1790111327854.png',
  Office: '/images/media_1790111327854.png',
};

export const SAMPLE_PROPERTIES: SampleProperty[] = SAMPLE_CITIES.flatMap((city, cityIndex) => {
  const cityAreas = SAMPLE_AREAS.filter((area) => area.cityId === city.cityId);
  return propertyTemplates.map((template, templateIndex) => {
    const areaIndex = template.type === 'Commercial' || template.type === 'Plot' ? 0 : templateIndex % cityAreas.length;
    const area = cityAreas[areaIndex] ?? cityAreas[0];
    const propertyNumber = String(cityIndex + 1).padStart(3, '0');
    return {
      propertyId: `SAMPLE-${propertyNumber}-${template.code}-001`,
      title: `${template.title} - ${city.city}`,
      propertyType: template.type,
      city: city.city,
      province: city.province,
      area: area.name,
      phase: 'Phase 1',
      price: template.price,
      priceRaw: template.priceRaw,
      areaSize: template.areaSize,
      bedrooms: template.bedrooms,
      bathrooms: template.bathrooms,
      propertyStatus: 'For Sale',
      purpose: template.purpose,
      description: `Demo ${template.type.toLowerCase()} listing in ${area.name}, ${city.city}, created for Nexus AI search, filters, recommendations, and graph testing.`,
      image: imageByType[template.type],
      sampleBadge: 'SAMPLE PROPERTY',
      sampleBadges: ['SAMPLE PROPERTY', 'DEMO LISTING', 'FOR TESTING ONLY'],
      cityId: city.cityId,
      areaId: area.areaId,
    };
  });
});

export const SAMPLE_PROPERTY_COUNT = SAMPLE_PROPERTIES.length;

export interface SamplePropertySearchFilters {
  city?: string;
  area?: string;
  phase?: string;
  sizeText?: string;
  propertyType?: SamplePropertyType;
  maxPriceRaw?: number;
  minBedrooms?: number;
  purpose?: SampleProperty['purpose'];
  status?: SamplePropertyStatus;
}

export const searchSampleProperties = (filters: SamplePropertySearchFilters): SampleProperty[] => SAMPLE_PROPERTIES.filter((property) => {
  const matchesCity = !filters.city || property.city.toLowerCase() === filters.city.toLowerCase();
  const matchesArea = !filters.area || property.area.toLowerCase().includes(filters.area.toLowerCase());
  const matchesPhase = !filters.phase || property.phase.toLowerCase() === filters.phase.toLowerCase();
  const matchesSize = !filters.sizeText || property.areaSize.toLowerCase().replace(/\s+/g, ' ') === filters.sizeText.toLowerCase().replace(/\s+/g, ' ');
  const matchesType = !filters.propertyType || property.propertyType === filters.propertyType;
  const matchesPrice = filters.maxPriceRaw === undefined || property.priceRaw <= filters.maxPriceRaw;
  const matchesBedrooms = filters.minBedrooms === undefined || (property.bedrooms ?? 0) >= filters.minBedrooms;
  const matchesPurpose = !filters.purpose || property.purpose === filters.purpose;
  const matchesStatus = !filters.status || property.propertyStatus === filters.status;
  return matchesCity && matchesArea && matchesPhase && matchesSize && matchesType && matchesPrice && matchesBedrooms && matchesPurpose && matchesStatus;
});
