import { EmbalsesGuadalquivir, ZoneInfo } from "@/api";
import { EmbalseUpdateSAIHEntity } from "db-model";

export function mapToEmbalseUpdateSAIH(
  embalsesGuadalquivir: EmbalsesGuadalquivir[],
  currentDate: string
): EmbalseUpdateSAIHEntity[] {
  return embalsesGuadalquivir.map((embalse) => ({
    id: embalse.id,
    nombre: embalse.embalse,
    aguaActualSAIH: embalse.volumenActualHm3,
    fechaMedidaSAIH: currentDate,
  }));
}

export function mapToEmbalsesByZone(
  codigoZona: string,
  nombreZona: string,
  embalses: EmbalseUpdateSAIHEntity[]
): ZoneInfo {
  return {
    codigoZona: codigoZona,
    nombreZona: nombreZona,
    embalses: embalses,
  };
}
