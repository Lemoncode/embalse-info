// Pasa del payload SAICH a tus clases de dominio

import { CantabricoSnapshot, Coordinates, Station, EmbalseData} from "../domain/models.js";
import type { SaichFeature, SaichPayload } from "./SaichHttpClient.js";

const numFlex = (v: unknown): number | null => {
  if (v == null) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "string") {
    const s = v.trim().replace(",", ".");
    if (!s || s.toLowerCase() === "null" || s.toLowerCase() === "nan") return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }
  const n = Number(v as any);
  return Number.isFinite(n) ? n : null;
};

const get = <T = unknown>(o: Record<string, unknown>, k: string): T | undefined =>
  (o?.[k] as T | undefined);

const num = (v: unknown): number | null => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const strArr = (csv?: unknown): string[] =>
  typeof csv === "string" ? csv.split(",").map(s => s.trim()).filter(Boolean) : [];

function mapFeature(f: SaichFeature): Station {
  const p = (f.properties ?? {}) as Record<string, unknown>;
  const coords = Array.isArray(f.geometry?.coordinates) ? f.geometry.coordinates : [null, null];
  const [lonRaw, latRaw] = coords;

  return new Station(
    (get(p, "codigo_general") as string) ?? (get(p, "Cod_Roea") as string) ?? null,
    (get(p, "nombre") as string) ?? null,
    (get(p, "rio") as string) ?? null,
    (get(p, "municipio") as string) ?? null,
    (get(p, "sistema") as string) ?? null,
    (get(p, "zona_hidrologica") as string) ?? null,
    (get(p, "tipo_estacion") as string) ?? (get(p, "tipo_senial") as string) ?? null,
    (get(p, "camara") as string) ?? null,
    new Coordinates(
      num(get(p, "lat") ?? latRaw),
      num(get(p, "lon") ?? lonRaw),
    ),
   new EmbalseData(
  get<string>(p, "fecha") ?? null,               // fecha
  numFlex(get(p, "nivel_embalse")),              // nivelMsnm
  numFlex(get(p, "volumen_embalse")),            // volumenActualHm3
  numFlex(get(p, "porcentaje_llenado")),         // porcentajeLleno
  numFlex(get(p, "nmn")),                        // nmnMsnm
  numFlex(get(p, "volumenTotal"))                // volumenTotalHm3
),
  );
}

export function mapSnapshot(payload: SaichPayload, onlyEmbalses?: boolean): CantabricoSnapshot {
  const all = payload.data.features;

  const filtered = onlyEmbalses
    ? all.filter(f => {
        const p = f.properties as Record<string, unknown>;
        return (
          p?.["tipo_estacion"] === "embalse" ||
          p?.["tipo_senial"] === "embalse" ||      // 👈 añade esto
          p?.["subtipo_embalse"] === true
        );
      })
    : all;

  const stations = filtered.map(mapFeature);
  return new CantabricoSnapshot(new Date().toISOString(), stations.length, stations);
}
