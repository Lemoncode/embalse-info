import { EmbalseUpdateSAIHEntity } from 'db-model';
import { EmbalsesSegura } from '@/api';

/**
 * Maps EmbalsesSegura data to EmbalseUpdateSAIH format.
 * @param embalsesSegura - Array of EmbalsesSegura objects
 * @returns Array of EmbalseUpdateSAIH objects
 */
export function mapToEmbalseUpdateSAIH(
  embalsesSegura: EmbalsesSegura[]
): EmbalseUpdateSAIHEntity[] {
  return embalsesSegura.map((embalse) => ({
    id: embalse.id,
    nombre: embalse.embalse,
    aguaActualSAIH: embalse.volumenActualHm3,
    fechaMedidaSAIH: embalse.fecha,
  }));
}
