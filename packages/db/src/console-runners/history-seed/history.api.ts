import axios from 'axios';
import { formatTimestamp, sleep } from './history.helpers.js';
import { HistoryResultApi, ArcGISStatResponse } from './history.model.js';
import { MonthyTenYearAgo, HistoryTenYearAgo } from 'db-model';

const BASE_URL =
  "https://services-eu1.arcgis.com/RvnYk1PBUJ9rrAuT/arcgis/rest/services/Embalses_Total/FeatureServer/0/query";

const DELAY_MS = 200; // pausa entre requests para no saturar la API
const START_YEAR = new Date().getFullYear() - 10;
const START_MONTH = new Date().getMonth();
const END_YEAR = new Date().getFullYear();
const END_MONTH = new Date().getMonth();

async function fetchStatQuery(where: string): Promise<HistoryResultApi[]> {
  const results: HistoryResultApi[] = [];
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

async function fetchMonthlyAvg(year: number,
  month: number): Promise<HistoryResultApi[]> {
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1)); // mes siguiente

  const where = `fecha >= timestamp '${formatTimestamp(start)}' AND fecha < timestamp '${formatTimestamp(end)}'`;

  await sleep(DELAY_MS);
  return fetchStatQuery(where);
}

export const generateMonthlyAverages = async (): Promise<HistoryTenYearAgo> => {
  let year = START_YEAR;
  let month = START_MONTH;
  let count = 0;

  const data: Record<string, MonthyTenYearAgo[]> = {};

  while (year < END_YEAR || (year === END_YEAR && month <= END_MONTH)) {
    count++;
    console.log(
      `[Mensual] Consultando ${year}-${String(month).padStart(2, "0")}...`
    );

    const results = await fetchMonthlyAvg(year, month);

    for (const r of results) {
      if (!data[r.embalse_nombre]) {
        data[r.embalse_nombre] = [];
      }
      data[r.embalse_nombre].push({
        año: year,
        mes: month,
        promedio_agua_actual: Math.round(r.avg_agua_actual * 100) / 100,
      });
    }


    // Avanzar al siguiente mes
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }
  return {
    metaData: {
      generatedAt: new Date().toISOString(),
      periodoInicio: `${START_YEAR}-${String(START_MONTH).padStart(2, "0")}`,
      periodoFin: `${END_YEAR}-${String(END_MONTH).padStart(2, "0")}`,
    },
    data,
  };
}
