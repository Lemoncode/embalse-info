// integration.ts (Versión Final Correcta)
import axios from 'axios';
import { load } from 'cheerio';
import { Reservoir } from './types';

// Define the URL we are going to scrape
const URL = 'https://www.saihduero.es/situacion-embalses';

// Helper function to parse strings into numbers or null
const _parseToNumberOrNull = (value: string): number | null => {
  if (value === '-') {
    return null;
  }
  // Clean the string: remove thousand separators (.) and replace decimal comma (,)
  const cleanedValue = value.replace(/\./g, '').replace(',', '.');
  const numberValue = parseFloat(cleanedValue);
  return isNaN(numberValue) ? null : numberValue;
};

// This is our main function
export const getEstadoCuencaDuero = async (): Promise<Reservoir[]> => {
  try {
    const response = await axios.get(URL);
    const html = response.data;
    const $ = load(html);
    const reservoirs: Reservoir[] = [];

    $('tbody > tr').each((index, element) => {
      const tds = $(element).find('td');
      const name = $(tds[0]).text().trim();
      const normalizedName = name.toLowerCase();

      // Using the helper function to get clean numbers or null
      const capacity = _parseToNumberOrNull($(tds[1]).text().trim());
      const currentVolume = _parseToNumberOrNull($(tds[2]).text().trim());

      if (name && capacity !== null && !normalizedName.startsWith('total') && !normalizedName.startsWith('% del total')) {
        reservoirs.push({
          name,
          capacity,
          currentVolume,
        });
      }
    });

    return reservoirs;

  } catch (error) {
    console.error('Error fetching Duero basin data:', error);
    return [];
  }
};