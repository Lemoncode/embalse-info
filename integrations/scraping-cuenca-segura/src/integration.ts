import * as cheerio from 'cheerio';
import { getCuencaPageHTMLContent, EmbalsesSegura } from '@/api';
import { extractReservoirsFromSeguraPage } from '@/scraper';

/**
 * Scrapes Segura reservoir data and returns it as an array.
 * @param url - The URL to scrape the data from
 */
export async function scrapeCuencaSegura(
  url: string
): Promise<EmbalsesSegura[]> {
  const html = await getCuencaPageHTMLContent(url);
  const $: cheerio.CheerioAPI = cheerio.load(html);

  // Extract and map reservoir data
  return extractReservoirsFromSeguraPage($);
}
