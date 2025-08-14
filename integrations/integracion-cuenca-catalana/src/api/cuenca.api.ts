import axios from "axios";
import { EmbalseCatalanApi } from "./cuenca.api-model";
import { mapApiToEmbalses } from "./cuenca.mapper";
import { EmbalseCatalan } from "@/cuenca.vm";

/**
 * Gets the data from the Catalan reservoirs API.
 * @param url
 * @returns Promise that resolves with the API data.
 */
export async function getCuencaCatalana(
  url: string
): Promise<EmbalseCatalan[]> {
  const { data } = await axios.get<Record<string, EmbalseCatalanApi>>(url);
  return mapApiToEmbalses(data);
}
