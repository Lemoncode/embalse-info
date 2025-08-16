// Import the tools we need
import axios from 'axios';
import { load } from 'cheerio'; // Using a named import for cleanliness and precision
import { Reservoir } from './types';

// Define the URL we are going to scrape
const URL = 'https://www.saihduero.es/situacion-embalses';

// This is our main function, now with the real scraping logic
export const getEstadoCuencaDuero = async (): Promise<Reservoir[]> => {
  try {
    const response = await axios.get(URL);
    const html = response.data;
    
    // Using the 'load' function directly
    const $ = load(html);
    
    const reservoirs: Reservoir[] = [];
    
    // Find all table rows in the body and iterate over them
    $('tbody > tr').each((index, element) => {
      const tds = $(element).find('td');
      const name = $(tds[0]).text().trim();
      const capacity = $(tds[1]).text().trim();
      const currentVolume = $(tds[2]).text().trim();
      const normalizedName = name.toLowerCase();

      // Data Filtering: Solo añadir si name, capacity y currentVolume tienen valor,
      // y no es una fila resumen como 'total' o '% del total'.
      if (
        name &&
        capacity &&
        currentVolume &&
        !normalizedName.startsWith('total') &&
        !normalizedName.startsWith('% del total')
      ) {
        reservoirs.push({
          name,
          capacity,
          currentVolume,
        });
      }
    });

    return reservoirs;

  } catch (error) {
    // If anything in the 'try' block fails, we land here
    console.error('Error fetching Duero basin data:', error);
    // We return an empty array so the app doesn't crash
    return [];
  }
};