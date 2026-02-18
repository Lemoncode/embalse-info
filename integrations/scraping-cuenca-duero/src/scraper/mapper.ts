import { EmbalseDuero } from '../api/cuenca.model.js';
import { EmbalseUpdateSAIHEntity } from "db-model";

/**
 * Maps EmbalsesAndalucia data to EmbalseUpdateSAIH format.
 * @param embalsesAndalucia - Array of EmbalsesAndalucia objects
 * @returns Array of EmbalseUpdateSAIH objects
 */
export function mapToEmbalseUpdateSAIH(
  embalsesAndalucia: EmbalseDuero[],
  currentDate: string
): EmbalseUpdateSAIHEntity[] {
  return embalsesAndalucia.map((embalse) => ({
    id: embalse.id,
    nombre: embalse.embalse,
    aguaActualSAIH: embalse.volumenActualHm3,
    fechaMedidaSAIH: currentDate,
  }));
}
