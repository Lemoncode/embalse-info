import { EmbalseUpdateSAIHEntity } from "db-model";
import { extractCurrentDate } from "@/scraper/business";
import { mapToEmbalseUpdateSAIH } from "@/scraper/mapper";
import {  getCuencaJSONResponse } from "@/api";

/**
 * @param url - The URL to scrape the data from
 */

export async function scrapeCuencaGuadiana(
  url: string
): Promise<EmbalseUpdateSAIHEntity[]> {
  const json = await getCuencaJSONResponse(url);

  const currentDate = await extractCurrentDate(url);

  return mapToEmbalseUpdateSAIH(json, currentDate);
}
