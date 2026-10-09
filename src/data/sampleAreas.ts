import { SAMPLE_CITIES } from './sampleCities';

export interface SampleArea {
  areaId: string;
  cityId: string;
  city: string;
  name: string;
  province: string;
}

const areaOverrides: Record<string, string[]> = {
  Lahore: ['DHA', 'Bahria Town', 'Johar Town', 'Wapda Town', 'Model Town'],
  Islamabad: ['F-11', 'G-13', 'Bahria Enclave', 'DHA Islamabad', 'E-11'],
  Karachi: ['DHA', 'Clifton', 'Gulshan-e-Iqbal', 'North Nazimabad', 'Scheme 33'],
  Rawalpindi: ['Bahria Town', 'DHA Rawalpindi', 'Saddar', 'Chaklala', 'Adiala Road'],
  Faisalabad: ['Canal Road', 'Madina Town', 'D Ground', 'People\'s Colony', 'Satiana Road'],
  Multan: ['Cantonment', 'Gulgasht Colony', 'Bosan Road', 'DHA Multan', 'Mumtazabad'],
  Peshawar: ['Hayatabad', 'University Town', 'DHA Peshawar', 'Regi Model Town', 'Saddar'],
  Gujranwala: ['DHA Gujranwala', 'Wapda Town', 'Model Town', 'Sialkoti Gate', 'G.T. Road'],
  Sialkot: ['Cantonment', 'Paris Road', 'Daska Road', 'Model Town', 'Ugoki Road'],
  Bahawalpur: ['Model Town A', 'DHA Bahawalpur', 'Satellite Town', 'Civil Lines', 'Baghdad-ul-Jadeed'],
};

const fallbackAreas = (city: string) => [`${city} Central`, `${city} Heights`, `${city} Bypass`, `${city} Cantonment`, `${city} New Town`];

export const SAMPLE_AREAS: SampleArea[] = SAMPLE_CITIES.flatMap((city, cityIndex) => {
  const areaNames = areaOverrides[city.city] ?? fallbackAreas(city.city);
  return areaNames.map((name, areaIndex) => ({
    areaId: `sample-area-${String(cityIndex * 5 + areaIndex + 1).padStart(3, '0')}`,
    cityId: city.cityId,
    city: city.city,
    name,
    province: city.province,
  }));
});

export const SAMPLE_AREA_COUNT = SAMPLE_AREAS.length;
