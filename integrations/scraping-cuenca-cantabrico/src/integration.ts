import { getCantabricoPayload } from "@/api";
import { toRawRows } from "@/scraper/business";
import { mapToEmbalseUpdateSAIH } from "@/scraper/mapper";
import type { EmbalseUpdateSAIHEntity } from "@embalse-info/db";

/** Orquesta: API → normaliza → mapea a tu entidad final */
export async function scrapeCuencaCantabrica(): Promise<
  EmbalseUpdateSAIHEntity[]
> {
  const payload = await getCantabricoPayload();
  const rows = toRawRows(payload.data.features);
  return mapToEmbalseUpdateSAIH(rows);
}
