import axios from "axios";
import { ArcGisEntry } from "./arcgis-embalse-model.js";

const API_URL =
  "https://services-eu1.arcgis.com/RvnYk1PBUJ9rrAuT/arcgis/rest/services/Embalses_Total/FeatureServer/0/query";

export const fetchLatestDate = async (): Promise<string> => {
  const response = await axios.get(API_URL, {
    params: {
      where: "1=1",
      outFields: "Fecha_str",
      orderByFields: "fecha DESC",
      resultRecordCount: 1,
      f: "json",
    },
    timeout: 20000,
  });

  const features = response.data.features;
  if (!features || features.length === 0) {
    throw new Error("No se pudo obtener la Fecha_str más reciente.");
  }

  const latestFechaStr = features[0].attributes?.Fecha_str as string;
  if (!latestFechaStr) {
    throw new Error(
      "La respuesta no contenía 'Fecha_str' para la fecha más reciente."
    );
  }
  return latestFechaStr;
};

// Trae todos los registros de ArcGisEntry para una fecha específica.
export const fetchEntriesByDate = async (
  date: string,
  offset = 0,
  allResults: ArcGisEntry[] = []
): Promise<ArcGisEntry[]> => {
  const response = await axios.get(API_URL, {
    params: {
      where: `Fecha_str = '${date}'`,
      outFields: "*",
      returnGeometry: false,
      f: "json",
      resultOffset: offset,
      orderByFields: "OBJECTID ASC",
    },
    timeout: 30000,
  });

  const features = response.data.features;
  if (!features || features.length === 0) {
    return allResults;
  }

  const newResults = features.map((f: any) => f.attributes as ArcGisEntry);
  const accumulatedResults = [...allResults, ...newResults];

  if (features.length === 2000) {
    return fetchEntriesByDate(
      date,
      offset + features.length,
      accumulatedResults
    );
  } else {
    return accumulatedResults;
  }
};
