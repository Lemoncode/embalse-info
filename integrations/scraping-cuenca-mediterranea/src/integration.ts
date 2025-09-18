import * as cheerio from "cheerio";
import { getCuencaPageHTMLContent } from "@/api";
import { EmbalseUpdateSAIHEntity } from "@embalse-info/db";
import {
  extractCurrentDate,
  extractProvinceTables,
  reservoirInfoFromTable,
} from "@/scraper/business";
import { mapToEmbalseUpdateSAIH } from "@/scraper/mapper";

/**
 * Scrapes Andalusian reservoir data and returns it as an array.
 * @param url - The URL to scrape the data from
 */
export async function scrapeCuencaMediterranea(
  url: string
): Promise<EmbalseUpdateSAIHEntity[]> {
  const html = await getCuencaPageHTMLContent(url);
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
