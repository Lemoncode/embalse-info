import type { SaichFeature } from "../api/index.js";

export interface RawRow {
  id: number; // codigo_general
  nombre: string; // nombre
  volumenActualHm3: number; // volumen_embalse
  fecha: string; // fecha
}

const numFlex = (v: unknown): number | null => {
  if (v == null) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "string") {
    const s = v.trim().replace(",", ".");
    if (!s) return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }
  const n = Number(v as any);
  return Number.isFinite(n) ? n : null;
};

const get = <T = unknown>(
  o: Record<string, unknown> | undefined,
  k: string
): T | undefined => o?.[k] as T | undefined;

/** Convierte features de SAICH a filas mínimas para el mapper final */
export function toRawRows(features: SaichFeature[]): RawRow[] {
  return (
    features
      .filter((f) => {
        const p = f.properties as Record<string, unknown> | undefined;
        // algunos payloads usan tipo_senial="embalse"
        const tipo = (
          get<string>(p, "tipo_estacion") ??
          get<string>(p, "tipo_senial") ??
          ""
        ).toLowerCase();
        return tipo === "embalse";
      })
      .map((f) => {
        const p = f.properties as Record<string, unknown> | undefined;

        const idStr = (
          get<string>(p, "codigo_general") ??
          get<string>(p, "Cod_Roea") ??
          "0"
        ).toString();
        const id = Number(idStr);
        const nombre = get<string>(p, "nombre") ?? "";

        const volumenActualHm3 = numFlex(get(p, "volumen_embalse"));
        const fecha = get<string>(p, "fecha") ?? "";

        return {
          id: Number.isFinite(id) ? id : 0,
          nombre,
          volumenActualHm3: volumenActualHm3 ?? 0,
          fecha,
        };
      })
      // por si llega algún registro incompleto
      .filter((r) => r.id > 0 && r.nombre && r.fecha)
  );
}
