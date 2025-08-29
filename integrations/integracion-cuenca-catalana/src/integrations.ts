import { EmbalseUpdateSAIHEntity } from 'db-model';
import { getCuencaCatalana } from './api';

export const URL =
  'https://aplicacions.aca.gencat.cat/aetr/vishid/v2/data/public/reservoir/capacity_6min?_=1754925763063';

export async function integracionCuencaCatalana(URL: string) {
  const embalses: EmbalseUpdateSAIHEntity[] = await getCuencaCatalana(URL);
  return embalses;
}
