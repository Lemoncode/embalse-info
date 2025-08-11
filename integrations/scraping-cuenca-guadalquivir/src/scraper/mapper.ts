import { EmbalsesGuadalquivir } from "@/api";
import { EmbalseUpdateSAIHEntity } from "db-model";

export function mapToEmbalseUpdateSAIH(
  embalsesAndalucia: EmbalsesGuadalquivir[],
  currentDate: string
): EmbalseUpdateSAIHEntity[] {
  return embalsesAndalucia.map((embalse) => ({
    id: embalse.id,
    nombre: embalse.embalse,
    aguaActualSAIH: embalse.volumenActualHm3,
    fechaMedidaSAIH: currentDate,
  }));
}
