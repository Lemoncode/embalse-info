import { EmbalsesGuadiana } from "../api";
import { EmbalseUpdateSAIHEntity } from "db-model";

/**
 * Maps EmbalsesAndalucia data to EmbalseUpdateSAIH format.
 * @param embalsesAndalucia - Array of EmbalsesAndalucia objects
 * @returns Array of EmbalseUpdateSAIH objects
 */
export function mapToEmbalseUpdateSAIH(
  embalsesGuadiana: EmbalsesGuadiana[],
  currentDate: string
): EmbalseUpdateSAIHEntity[] {
  return embalsesGuadiana.map((embalse) => ({
    id: embalse.orden,
    nombre: embalse.nombre,
    aguaActualSAIH: embalse.VE1,
    fechaMedidaSAIH: currentDate,
  }));
}
