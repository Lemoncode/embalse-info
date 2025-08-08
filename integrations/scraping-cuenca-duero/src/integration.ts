// Import the tools we need: axios for making HTTP requests, and cheerio for parsing HTML
import axios from 'axios';
import * as cheerio from 'cheerio';

// Define the URL we are going to scrape
const URL = 'https://www.saihduero.es/situacion-embalses';

// This is our main function, now with the real scraping logic
export const getEstadoCuencaDuero = async (): Promise<any> => {
  // Use axios to fetch the HTML content from the URL
  const response = await axios.get(URL);
  const html = response.data;

  // Load the HTML into cheerio so we can work with it
  const $ = cheerio.load(html);

  const reservoirs = [];

  // Find the table body and iterate over each row (tr)
  // We skip the first row (the table header) using .slice(1)
  $('tbody > tr').slice(1).each((index, element) => {
    const tds = $(element).find('td');

    // Extract the text from the cells using the indexes we found
    const name = $(tds[0]).text().trim();
    const capacity = $(tds[1]).text().trim();
    const currentVolume = $(tds[2]).text().trim();

    const normalizedName = name.toLowerCase();

    // Data Filtering: Only add the reservoir if it has a valid name and capacity,
    // and it's not a summary row like 'total' or '% del total'.
    if (capacity && normalizedName && !normalizedName.startsWith('total') && !normalizedName.startsWith('% del total')) {
      reservoirs.push({
        name,
        capacity,
        currentVolume,
      });
    }
  });

  return reservoirs;
};