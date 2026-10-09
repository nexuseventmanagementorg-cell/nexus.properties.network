import { SAMPLE_PROPERTIES, SampleProperty, SamplePropertySearchFilters, SamplePropertyType } from './sampleProperties';

export type InventoryState = 'SAMPLE PROPERTY' | 'LIVE PROPERTY' | 'ARCHIVED PROPERTY';

export interface LiveProperty extends Omit<SampleProperty, 'sampleBadge' | 'sampleBadges' | 'cityId' | 'areaId' | 'province'> {
  cityId?: string;
  areaId?: string;
  province?: string;
  state: 'LIVE PROPERTY' | 'ARCHIVED PROPERTY';
  phase: string;
  features: string[];
  agent: string;
  verificationStatus: string;
  galleryImages?: string[];
}

export interface InventoryCounters {
  totalLiveListings: number;
  totalSampleListings: number;
  hiddenSampleListings: number;
  archivedListings: number;
  citiesWithoutLiveInventory: number;
}

const sameInventoryKey = (left: { city: string; area: string; phase?: string; propertyType: SamplePropertyType; areaSize: string }, right: { city: string; area: string; phase?: string; propertyType: SamplePropertyType; areaSize: string }) => (
  left.city.toLowerCase() === right.city.toLowerCase()
  && left.area.toLowerCase() === right.area.toLowerCase()
  && (left.phase || left.area).toLowerCase() === (right.phase || right.area).toLowerCase()
  && left.propertyType === right.propertyType
  && left.areaSize.toLowerCase() === right.areaSize.toLowerCase()
);

export const getHiddenSampleIds = (liveProperties: LiveProperty[] = []): Set<string> => new Set(
  SAMPLE_PROPERTIES.filter((sample) => liveProperties.some((live) => sameInventoryKey(sample, live))).map((sample) => sample.propertyId),
);

export const matchesFilters = (property: SampleProperty | LiveProperty, filters: SamplePropertySearchFilters) => {
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
};
