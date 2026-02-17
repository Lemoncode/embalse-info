import { getCantabricoPayload } from "./api/index.js";
import { toRawRows } from "./scraper/business.js";
import { mapToEmbalseUpdateSAIH } from "./scraper/mapper.js";
import type { EmbalseUpdateSAIHEntity } from "db-model";

/** Orquesta: API → normaliza → mapea a tu entidad final */
export async function scrapeCuencaCantabrica(): Promise<
  EmbalseUpdateSAIHEntity[]
> {
  const payload = await getCantabricoPayload();
  const rows = toRawRows(payload.data.features);
  return mapToEmbalseUpdateSAIH(rows);
}
