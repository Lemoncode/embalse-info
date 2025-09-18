import { EmbalsesAndalucia } from "../api";
import { EmbalseUpdateSAIHEntity } from "@embalse-info/db";

/**
 * Maps EmbalsesAndalucia data to EmbalseUpdateSAIH format.
 * @param embalsesAndalucia - Array of EmbalsesAndalucia objects
 * @returns Array of EmbalseUpdateSAIH objects
 */
export function mapToEmbalseUpdateSAIH(
  embalsesAndalucia: EmbalsesAndalucia[],
  currentDate: string
): EmbalseUpdateSAIHEntity[] {
  return embalsesAndalucia.map((embalse) => ({
    id: embalse.id,
    nombre: embalse.embalse,
    aguaActualSAIH: embalse.volumenActualHm3,
    fechaMedidaSAIH: currentDate,
  }));
}
