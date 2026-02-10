import { EmbalseUpdateSAIHEntity } from 'db-model';
import { getCuencaCatalana } from './api/cuenca.api.js';

const URL =
  'https://aplicacions.aca.gencat.cat/aetr/vishid/v2/data/public/reservoir/capacity';

export async function integracionCuencaCatalana() {
  const embalses: EmbalseUpdateSAIHEntity[] = await getCuencaCatalana(URL);
  return embalses;
}
