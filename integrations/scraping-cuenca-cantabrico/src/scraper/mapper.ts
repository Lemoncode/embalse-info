import type { EmbalseUpdateSAIHEntity } from "@embalse-info/db";
import type { RawRow } from "./business";

/** Mapea a EmbalseUpdateSAIHEntity*/
export function mapToEmbalseUpdateSAIH(
  rows: RawRow[]
): EmbalseUpdateSAIHEntity[] {
  return rows.map<EmbalseUpdateSAIHEntity>((r) => ({
    id: r.id,
    nombre: r.nombre,
    aguaActualSAIH: r.volumenActualHm3,
    fechaMedidaSAIH: r.fecha,
  }));
}
