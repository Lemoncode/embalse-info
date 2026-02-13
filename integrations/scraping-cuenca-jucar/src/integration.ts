import * as cheerio from 'cheerio';
import { getCuencaPageHTMLContent } from './api/index.js';
import {
  extractReservoirsFromJucarPage,
  mapToEmbalseUpdateSAIH,
} from './scraper/index.js';
import { EmbalseUpdateSAIHEntity } from 'db-model';

/**
 * Scrapes Júcar reservoir data and returns it as an array.
 * @param url - The URL to scrape the data from
 */
export async function scrapeCuencaJucar(
  url: string
): Promise<EmbalseUpdateSAIHEntity[]> {
  const html = await getCuencaPageHTMLContent(url);
  const $: cheerio.CheerioAPI = cheerio.load(html);

  // Extract and map reservoir data
  const reservoirs = extractReservoirsFromJucarPage($);
  return mapToEmbalseUpdateSAIH(reservoirs);
}
