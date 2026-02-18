import * as cheerio from 'cheerio';
import { getCuencaPageHTMLContent } from './api/cuenca.api.js';
import { extractCaudalRioData } from './scraper/business.js';

export const scrapeCuencaMinoSil = async (): Promise<void> => {
  const html = await getCuencaPageHTMLContent();

  const $: cheerio.CheerioAPI = cheerio.load(html);

  const embalses = extractCaudalRioData($);

  //return embalses;
};
