// Pasa del payload SAICH a tus clases de dominio

import { CantabricoSnapshot, Colors, Coordinates, Station, Thresholds, Trends } from "../domain/models.js";
import type { SaichFeature, SaichPayload } from "./SaichHttpClient.js";

const num = (v: unknown): number | null => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const strArr = (csv?: unknown): string[] =>
  typeof csv === "string" ? csv.split(",").map(s => s.trim()).filter(Boolean) : [];

const get = <T = unknown>(o: Record<string, unknown>, key: string): T | undefined =>
  (o?.[key] as T | undefined);

function mapFeature(f: SaichFeature): Station {
  const p = (f.properties ?? {}) as Record<string, unknown>;
  const coords = Array.isArray(f.geometry?.coordinates) ? f.geometry.coordinates : [null, null];
  const [lonRaw, latRaw] = coords;

  const umbralCaudal = new Thresholds(
    num(get(p, "seguimiento_caudal")),
    num(get(p, "prealerta_caudal")),
    num(get(p, "alerta_caudal"))
  );

  const umbralNivel = new Thresholds(
    num(get(p, "seguimiento_nivel")),
    num(get(p, "prealerta_nivel")),
    num(get(p, "alerta_nivel"))
  );

  const colors = new Colors(
    (get(p, "color_caudal") as string) ?? null,
    (get(p, "color_nivel") as string) ?? null,
    (get(p, "color_precipitacion") as string) ?? null,
    (get(p, "color_temperatura") as string) ?? null,
    (get(p, "color_general") as string) ?? null
  );

  const trends = new Trends(
    num(get(p, "tendencia_caudal")),
    num(get(p, "tendencia_nivel"))
  );

  return new Station(
    (get(p, "codigo_general") as string) ?? (get(p, "Cod_Roea") as string) ?? null,
    (get(p, "nombre") as string) ?? null,
    (get(p, "rio") as string) ?? null,
    (get(p, "municipio") as string) ?? null,
    (get(p, "sistema") as string) ?? null,
    (get(p, "zona_hidrologica") as string) ?? null,
    (get(p, "tipo_estacion") as string) ?? null,
    (get(p, "camara") as string) ?? null,
    strArr(get(p, "parametros_medidos") as string | undefined),
    new Coordinates(
      num(get(p, "lat") ?? latRaw),
      num(get(p, "lon") ?? lonRaw),
    ),
    num(get(p, "caudal")),
    num(get(p, "nivel")),
    num(get(p, "precipit_1h")),
    num(get(p, "precipit_12h")),
    num(get(p, "precipit_24h")),
    num(get(p, "temperatura")),
    (get(p, "fecha_caudal") as string) ?? null,
    (get(p, "fecha_nivel") as string) ?? null,
    (get(p, "fecha_precipitacion") as string) ?? null,
    (get(p, "fecha_temperatura") as string) ?? null,
    (get(p, "fecha") as string) ?? null,
    umbralCaudal,
    umbralNivel,
    colors,
    trends,
    Boolean(get(p, "estado_sequia")),
    Boolean(get(p, "permiso_ecologico")),
    Boolean(get(p, "subtipo_embalse")),
    Boolean(get(p, "subtipo_piezometro"))
  );
}

export function mapSnapshot(payload: SaichPayload, onlyEmbalses?: boolean): CantabricoSnapshot {
  const all = payload.data.features;
  const filtered = onlyEmbalses
    ? all.filter(f => {
        const p = f.properties as Record<string, unknown>;
        return p?.["tipo_estacion"] === "embalse" || p?.["subtipo_embalse"] === true;
      })
    : all;

  const stations = filtered.map(mapFeature);
  return new CantabricoSnapshot(new Date().toISOString(), stations.length, stations);
}
