import axios from "axios";

const API_URL =
  process.env.API_URL ??
  "https://services-eu1.arcgis.com/RvnYk1PBUJ9rrAuT/arcgis/rest/services/Embalses_Total/FeatureServer/0/query";

type ArcgisFeature = { attributes?: Record<string, unknown> };

/** Trae TODOS los registros de la fecha más reciente (Fecha_str) */
export const getLatestEntries = async (): Promise<Record<string, unknown>[]> => {
  // 1) Fecha más reciente
  const maxDateResp = await axios.get(API_URL, {
    params: {
      f: "json",
      where: "1=1",
      outFields: "Fecha_str",
      orderByFields: "fecha DESC",
      resultRecordCount: 1,
      returnGeometry: false,
    },
    timeout: 20000,
  });

  const feats1: ArcgisFeature[] = maxDateResp.data?.features ?? [];
  if (!feats1.length) throw new Error("No se pudo obtener Fecha_str.");

  const latestFechaStr =
    (feats1[0].attributes?.["Fecha_str"] as string | undefined) ??
    ((feats1[0] as any)["Fecha_str"] as string | undefined);

  if (!latestFechaStr) throw new Error("La respuesta no contenía 'Fecha_str'.");

  // 2) Paginación estable por OBJECTID
  const pageSize = 2000;
  let offset = 0;
  const all: Record<string, unknown>[] = [];

  // Importante: ArcGIS recomienda ordenar por un campo indexado (p.ej. OBJECTID)
  const baseParams = {
    f: "json",
    where: `Fecha_str = '${latestFechaStr}'`,
    outFields: "*",
    returnGeometry: false,
    orderByFields: "OBJECTID ASC",
    resultRecordCount: pageSize,
  } as const;

  for (;;) {
    const resp = await axios.get(API_URL, {
      params: { ...baseParams, resultOffset: offset },
      timeout: 30000,
    });

    const feats: ArcgisFeature[] = resp.data?.features ?? [];
    if (!feats.length) break;

        
        for (const f of feats) {
            all.push(f.attributes ?? (f as any));
        }

        offset += feats.length;

        // Si devuelve menos que el tamaño de página, ya no hay más
        if (feats.length < pageSize) break;

    }

    return all;
};