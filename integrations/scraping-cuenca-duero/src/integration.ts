// Import the tools we need: axios for making HTTP requests, and cheerio for parsing HTML
import axios from 'axios';
import * as cheerio from 'cheerio';

// Define the URL we are going to scrape
const URL = 'https://www.saihduero.es/situacion-embalses';

// This is our main function, now with the real scraping logic
export const getEstadoCuencaDuero = async (): Promise<any> => {
  try {
    // We try to run all our existing logic
    const response = await axios.get(URL);
    const html = response.data;
    const $ = cheerio.load(html);
    const reservoirs = [];
    
    $('tbody > tr').slice(1).each((index, element) => {
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
    // If anything in the 'try' block fails, we land here
    console.error('Error fetching Duero basin data:', error);
    // We return an empty array so the app doesn't crash
    return [];
  }
};