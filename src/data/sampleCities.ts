export interface SampleCity {
  cityId: string;
  city: string;
  province: string;
  areasCount: number;
}

const cityDefinitions: Array<[string, string]> = [
  ['Lahore', 'Punjab'], ['Rawalpindi', 'Punjab'], ['Faisalabad', 'Punjab'], ['Multan', 'Punjab'], ['Gujranwala', 'Punjab'], ['Sialkot', 'Punjab'], ['Bahawalpur', 'Punjab'], ['Sargodha', 'Punjab'], ['Gujrat', 'Punjab'], ['Jhelum', 'Punjab'], ['Sheikhupura', 'Punjab'], ['Rahim Yar Khan', 'Punjab'], ['Sahiwal', 'Punjab'], ['Okara', 'Punjab'], ['Kasur', 'Punjab'], ['Dera Ghazi Khan', 'Punjab'], ['Vehari', 'Punjab'], ['Muzaffargarh', 'Punjab'], ['Khanewal', 'Punjab'], ['Hafizabad', 'Punjab'], ['Mandi Bahauddin', 'Punjab'], ['Chakwal', 'Punjab'], ['Attock', 'Punjab'], ['Toba Tek Singh', 'Punjab'], ['Jhang', 'Punjab'], ['Chiniot', 'Punjab'], ['Bhakkar', 'Punjab'], ['Layyah', 'Punjab'], ['Pakpattan', 'Punjab'], ['Narowal', 'Punjab'], ['Mianwali', 'Punjab'], ['Lodhran', 'Punjab'], ['Nankana Sahib', 'Punjab'], ['Khushab', 'Punjab'], ['Rajanpur', 'Punjab'], ['Bahawalnagar', 'Punjab'], ['Wazirabad', 'Punjab'], ['Kamalia', 'Punjab'], ['Burewala', 'Punjab'], ['Muridke', 'Punjab'],
  ['Karachi', 'Sindh'], ['Hyderabad', 'Sindh'], ['Sukkur', 'Sindh'], ['Larkana', 'Sindh'], ['Nawabshah', 'Sindh'], ['Mirpur Khas', 'Sindh'], ['Jacobabad', 'Sindh'], ['Shikarpur', 'Sindh'], ['Khairpur', 'Sindh'], ['Dadu', 'Sindh'], ['Thatta', 'Sindh'], ['Badin', 'Sindh'], ['Tando Adam', 'Sindh'], ['Tando Allahyar', 'Sindh'], ['Umerkot', 'Sindh'], ['Matiari', 'Sindh'], ['Ghotki', 'Sindh'], ['Kashmore', 'Sindh'], ['Naushahro Feroze', 'Sindh'], ['Sanghar', 'Sindh'], ['Kotri', 'Sindh'], ['Jamshoro', 'Sindh'], ['Moro', 'Sindh'], ['Sehwan', 'Sindh'], ['Shahdadkot', 'Sindh'], ['Sakrand', 'Sindh'],
  ['Peshawar', 'Khyber Pakhtunkhwa'], ['Abbottabad', 'Khyber Pakhtunkhwa'], ['Mardan', 'Khyber Pakhtunkhwa'], ['Mingora', 'Khyber Pakhtunkhwa'], ['Kohat', 'Khyber Pakhtunkhwa'], ['Dera Ismail Khan', 'Khyber Pakhtunkhwa'], ['Bannu', 'Khyber Pakhtunkhwa'], ['Swabi', 'Khyber Pakhtunkhwa'], ['Nowshera', 'Khyber Pakhtunkhwa'], ['Mansehra', 'Khyber Pakhtunkhwa'], ['Charsadda', 'Khyber Pakhtunkhwa'], ['Haripur', 'Khyber Pakhtunkhwa'], ['Chitral', 'Khyber Pakhtunkhwa'], ['Timergara', 'Khyber Pakhtunkhwa'], ['Kabal', 'Khyber Pakhtunkhwa'], ['Hangu', 'Khyber Pakhtunkhwa'], ['Karak', 'Khyber Pakhtunkhwa'], ['Lakki Marwat', 'Khyber Pakhtunkhwa'], ['Tank', 'Khyber Pakhtunkhwa'], ['Batkhela', 'Khyber Pakhtunkhwa'],
  ['Quetta', 'Balochistan'], ['Gwadar', 'Balochistan'], ['Turbat', 'Balochistan'], ['Khuzdar', 'Balochistan'], ['Chaman', 'Balochistan'], ['Sibi', 'Balochistan'], ['Zhob', 'Balochistan'], ['Hub', 'Balochistan'], ['Loralai', 'Balochistan'], ['Dera Murad Jamali', 'Balochistan'], ['Uthal', 'Balochistan'], ['Nushki', 'Balochistan'], ['Kalat', 'Balochistan'], ['Mastung', 'Balochistan'],
  ['Islamabad', 'Islamabad Capital Territory'],
  ['Gilgit', 'Gilgit Baltistan'], ['Skardu', 'Gilgit Baltistan'], ['Hunza', 'Gilgit Baltistan'], ['Chilas', 'Gilgit Baltistan'], ['Ghizer', 'Gilgit Baltistan'], ['Astore', 'Gilgit Baltistan'], ['Ghanche', 'Gilgit Baltistan'], ['Shigar', 'Gilgit Baltistan'], ['Nagar', 'Gilgit Baltistan'], ['Roundu', 'Gilgit Baltistan'],
  ['Muzaffarabad', 'Azad Kashmir'], ['Mirpur', 'Azad Kashmir'], ['Rawalakot', 'Azad Kashmir'], ['Kotli', 'Azad Kashmir'], ['Bagh', 'Azad Kashmir'], ['Bhimber', 'Azad Kashmir'], ['Poonch', 'Azad Kashmir'], ['Neelum', 'Azad Kashmir'], ['Hattian Bala', 'Azad Kashmir'], ['Sudhanoti', 'Azad Kashmir'],
  ['Kharian', 'Punjab'], ['Taxila', 'Punjab'], ['Wah Cantt', 'Punjab'], ['Gujar Khan', 'Punjab'], ['Kamoke', 'Punjab'], ['Daska', 'Punjab'], ['Pasrur', 'Punjab'], ['Shorkot', 'Punjab'], ['Arifwala', 'Punjab'],
];

export const SAMPLE_CITIES: SampleCity[] = cityDefinitions.map(([city, province], index) => ({
  cityId: `sample-city-${String(index + 1).padStart(3, '0')}`,
  city,
  province,
  areasCount: 5,
}));

export const SAMPLE_CITY_COUNT = SAMPLE_CITIES.length;
