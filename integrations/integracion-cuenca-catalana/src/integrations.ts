import { getCuencaCatalana } from "./api";
import { EmbalseCatalan } from "./cuenca.vm";

export const URL =
  "https://aplicacions.aca.gencat.cat/aetr/vishid/v2/data/public/reservoir/capacity_6min?_=1754925763063";

export async function integracionCuencaCatalana(URL: string) {
  const embalses: EmbalseCatalan[] = await getCuencaCatalana(URL);
  return embalses;
}
