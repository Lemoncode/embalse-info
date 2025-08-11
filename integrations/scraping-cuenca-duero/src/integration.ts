// Import the tools we need
import axios from 'axios';
import { load } from 'cheerio'; // Usamos un import nombrado, más limpio y preciso
import { Reservoir } from './types';

// Define the URL we are going to scrape
const URL = 'https://www.saihduero.es/situacion-embalses';

// This is our main function, now with the real scraping logic
export const getEstadoCuencaDuero = async (): Promise<Reservoir[]> => {
  try {
    const response = await axios.get(URL);
    const html = response.data;
    
    // Usamos la función 'load' directamente
    const $ = load(html);
    
    const reservoirs: Reservoir[] = [];
    
    $('tbody > tr').each((index, element) => {
      const tds = $(element).find('td');
      const name = $(tds[0]).text().trim();
      const capacity = $(tds[1]).text().trim();
      const currentVolume = $(tds[2]).text().trim();
      const normalizedName = name.toLowerCase();

      if (capacity && normalizedName && !normalizedName.startsWith('total') && !normalizedName.startsWith('% del total')) {
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