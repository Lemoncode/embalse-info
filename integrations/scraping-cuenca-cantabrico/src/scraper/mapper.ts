import type { EmbalseUpdateSAIHEntity } from "db-model";
import type { RawRow } from "./business.js";

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
