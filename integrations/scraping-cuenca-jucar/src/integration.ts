import * as cheerio from 'cheerio';
import { getCuencaPageHTMLContent, EmbalsesJucar } from '@/api';
import { extractReservoirsFromJucarPage } from '@/scraper';

/**
 * Scrapes Júcar reservoir data and returns it as an array.
 * @param url - The URL to scrape the data from
 */
export async function scrapeCuencaJucar(
  url: string
): Promise<EmbalsesJucar[]> {
  const html = await getCuencaPageHTMLContent(url);
  const $: cheerio.CheerioAPI = cheerio.load(html);

  // Extract and map reservoir data
  return extractReservoirsFromJucarPage($);
}
