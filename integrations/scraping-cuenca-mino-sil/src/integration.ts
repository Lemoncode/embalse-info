import * as cheerio from "cheerio";
import { EmbalseUpdateSAIHEntity } from "db-model";
import { getCuencaPageHTMLContent } from "./api/index.js";
import { extractProvinceTables } from "./scraper/index.js";
import { mapToEmbalseUpdateSAIH } from './scraper/index.js';

export async function scrapeCuencaMinioSil(): Promise<EmbalseUpdateSAIHEntity[]> {
  const html = await getCuencaPageHTMLContent();
  const $: cheerio.CheerioAPI = cheerio.load(html);
  const rawEmbalses = extractProvinceTables($);

  console.log("Embalses extraídos:", rawEmbalses);
  return mapToEmbalseUpdateSAIH(rawEmbalses);
}
