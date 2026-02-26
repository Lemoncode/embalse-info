import { EmbalseUpdateSAIHEntity } from 'db-model';
import { EmbalsesMinoSil } from '../api/index.js';

export function mapToEmbalseUpdateSAIH(
  embalsesMinoSil: EmbalsesMinoSil[]
): EmbalseUpdateSAIHEntity[] {
  return embalsesMinoSil.map((embalse) => ({
    id: embalse.id,
    nombre: embalse.embalse,
    aguaActualSAIH: embalse.volumenActualHm3,
    fechaMedidaSAIH: embalse.fecha,
  }));
}
