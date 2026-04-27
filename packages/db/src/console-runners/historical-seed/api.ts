import axios from "axios";
import { ArcGISStatResponse } from "./types.js";

const BASE_URL =
  "https://services-eu1.arcgis.com/RvnYk1PBUJ9rrAuT/arcgis/rest/services/Embalses_Total/FeatureServer/0/query";

const DELAY_MS = 200; // pausa entre requests para no saturar la API

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Consulta estadística genérica con paginación por offset.
 */
async function fetchStatQuery(
  where: string,
): Promise<Array<{ embalse_nombre: string; avg_agua_actual: number }>> {
  const results: Array<{ embalse_nombre: string; avg_agua_actual: number }> =
    [];
  let offset = 0;

  while (true) {
    const params = {
      where,
      outStatistics: JSON.stringify([
        {
          statisticType: "avg",
          onStatisticField: "agua_actual",
          outStatisticFieldName: "avg_agua_actual",
        },
      ]),
      groupByFieldsForStatistics: "embalse_nombre",
      resultOffset: offset,
      resultRecordCount: 2000,
      f: "json",
    };

    const response = await axios.get<ArcGISStatResponse>(BASE_URL, { params });
    const { features, exceededTransferLimit } = response.data;

    for (const feature of features) {
      const nombre = feature.attributes.embalse_nombre as string;
      const avg = feature.attributes.avg_agua_actual as number;
      if (nombre && avg != null) {
        results.push({ embalse_nombre: nombre, avg_agua_actual: avg });
      }
    }

    if (exceededTransferLimit) {
      offset += 2000;
      await sleep(DELAY_MS);
    } else {
      break;
    }
  }

  return results;
}

/**
 * Promedio mensual de agua_actual por embalse para un año-mes dado.
 */
export async function fetchMonthlyAvg(
  year: number,
  month: number,
): Promise<Array<{ embalse_nombre: string; avg_agua_actual: number }>> {
  // Rango: primer día del mes a primer día del mes siguiente
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1)); // mes siguiente

  const where = `fecha >= timestamp '${formatTimestamp(start)}' AND fecha < timestamp '${formatTimestamp(end)}'`;

  await sleep(DELAY_MS);
  return fetchStatQuery(where);
}

function formatTimestamp(date: Date): string {
  return date.toISOString().replace("T", " ").replace("Z", "");
}
