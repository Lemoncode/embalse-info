import * as cheerio from 'cheerio';
import { getCuencaPageHTMLContent, EmbalsesSegura } from './api/index.js';
import { extractReservoirsFromSeguraPage } from './scraper/index.js';
import { mapToEmbalseUpdateSAIH } from "./scraper/mapper.js";
import { EmbalseUpdateSAIHEntity } from 'db-model';

const URL = 'https://chsegura.es/es/cuenca/redes-de-control/estadisticas-hidrologicas/estado-de-embalses/';

/**
 * Scrapes Segura reservoir data and returns it as an array.
 * @param url - The URL to scrape the data from
 */
export async function scrapeCuencaSegura(): Promise<EmbalseUpdateSAIHEntity[]> {


  const html = await getCuencaPageHTMLContent(URL);
  const $: cheerio.CheerioAPI = cheerio.load(html);

  // Extract and map reservoir data
  const embalses = extractReservoirsFromSeguraPage($);
  return mapToEmbalseUpdateSAIH(embalses);
}
