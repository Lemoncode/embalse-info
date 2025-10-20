import * as cheerio from "cheerio";
import { getCuencaPageHTMLContent } from "./api/index.js";
import { EmbalseUpdateSAIHEntity } from "db-model";
import {
  extractCurrentDate,
  extractProvinceTables,
  reservoirInfoFromTable,
} from "./scraper/business.js";
import { mapToEmbalseUpdateSAIH } from "./scraper/mapper.js";

const URL = "https://www.redhidrosurmedioambiente.es/saih/resumen/embalses";
export async function scrapeCuencaMediterranea(): Promise<
  EmbalseUpdateSAIHEntity[]
> {
  const html = await getCuencaPageHTMLContent(URL);
  const $: cheerio.CheerioAPI = cheerio.load(html);

  // Extract tables organized by province
  const provinceTables = extractProvinceTables($);

  // Process each province table and flatten the results
  const allReservoirs = provinceTables.flatMap((table) => {
    return reservoirInfoFromTable(table.rows, table.province, $);
  });

  // Extract the current date from the page
  const currentDate = extractCurrentDate($);

  // Map to EmbalseUpdateSAIH format
  return mapToEmbalseUpdateSAIH(allReservoirs, currentDate);
}
