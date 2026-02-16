import axios from 'axios';
import { EmbalseCatalanApi } from './cuenca.api-model.js';
import { mapApiToEmbalses } from '../cuenca.mapper.js';
import { EmbalseUpdateSAIHEntity } from 'db-model';

/**
 * Gets the data from the Catalan reservoirs API.
 * @param url
 * @returns Promise that resolves with the API data.
 */
export async function getCuencaCatalana(
  url: string
): Promise<EmbalseUpdateSAIHEntity[]> {
  const { data } = await axios.get<Record<string, EmbalseCatalanApi>>(url);
  return mapApiToEmbalses(data);
}
