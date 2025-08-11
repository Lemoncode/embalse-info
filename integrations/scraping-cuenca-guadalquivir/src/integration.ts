import * as cheerio from "cheerio";
import { getCuencaPageHTMLContent } from "./api";
import {
  extractCurrentDate,
  mapToEmbalseUpdateSAIH,
  reservoirInfoFromTable,
} from "./scraper";

export const scrapeCuencaGuadalquivir = async (url: string) => {
  const html = await getCuencaPageHTMLContent(url);
  const $ = cheerio.load(html);

  const reservoirs = reservoirInfoFromTable($);

  const currentdDate = extractCurrentDate($);

  return mapToEmbalseUpdateSAIH(reservoirs, currentdDate);
};
