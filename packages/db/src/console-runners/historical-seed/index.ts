import * as fs from "fs";
import * as path from "path";
import { fetchMonthlyAvg } from "./api.js";
import {
  PromedioMensualOutput,
  PromedioAnualPorMesOutput,
  PromedioMensualEntry,
  PromedioAnualPorMesEntry,
} from "./types.js";
import {
  mapHistoricalAverageToDB,
  mapLastYearAverageToDB,
} from "./historical.mapped.js";
import { historicalRepository } from "#dals/index.js";
import { dbServer } from "#core/servers/db.server.js";

const END_YEAR = new Date().getFullYear();
const END_MONTH = new Date().getMonth() + 1;
const START_YEAR = END_YEAR - 10;
const START_MONTH = END_MONTH;

async function generateMonthlyAverages(): Promise<PromedioMensualOutput> {
  const data: Record<string, PromedioMensualEntry[]> = {};

  let year = START_YEAR;
  let month = START_MONTH;
  let count = 0;

  while (year < END_YEAR || (year === END_YEAR && month <= END_MONTH)) {
    count++;
    console.log(
      `[Mensual] Consultando ${year}-${String(month).padStart(2, "0")}...`,
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
  console.log(
    `[Mensual] Completado: ${count} meses, ${Object.keys(data).length} embalses`,
  );

  return {
    metadata: {
      generatedAt: new Date().toISOString(),
      periodoInicio: `${START_YEAR}-${String(START_MONTH).padStart(2, "0")}`,
      periodoFin: `${END_YEAR}-${String(END_MONTH).padStart(2, "0")}`,
    },
    data,
  };
}

/**
 * generateMonthlyGlobalAverages
 *
 * Esta función recibe los datos mensuales de todos los embalses y extrae
 * únicamente los datos del año anterior (el año previo al END_YEAR).
 *
 * Para cada embalse, filtra las entradas que corresponden al año anterior
 * y devuelve un array con la medida de agua_actual de cada mes de ese año.
 *
 * Ejemplo: si END_YEAR es 2026, la función devuelve los datos de 2025.
 * Para el embalse "Buendía" devolvería: enero 2025 -> 100, febrero 2025 -> 95, etc.
 *
 * @param monthlyData - Diccionario donde la clave es el nombre del embalse y el valor
 *                      es un array con las entradas mensuales (año, mes, promedio_agua_actual).
 * @returns Un objeto con metadata (fecha de generación, periodo) y los datos del año anterior por mes.
 */
function generateMonthlyGlobalAverages(
  monthlyData: Record<string, PromedioMensualEntry[]>,
): PromedioAnualPorMesOutput {
  // El año anterior al año final configurado
  const previousYear = END_YEAR - 1;

  // Objeto donde almacenaremos el resultado: clave = nombre del embalse, valor = array de datos por mes
  const data: Record<string, PromedioAnualPorMesEntry[]> = {};

  // Iteramos sobre cada embalse y sus entradas mensuales
  for (const [embalse, entries] of Object.entries(monthlyData)) {
    // Filtramos solo las entradas que pertenecen al año anterior
    data[embalse] = entries
      .filter((entry) => entry.año === previousYear)
      // Ordenamos por mes (enero a diciembre)
      .sort((a, b) => a.mes - b.mes)
      // Mapeamos al formato de salida, manteniendo el valor original (sin promediar)
      .map((entry) => ({
        mes: entry.mes,
        promedio_agua_actual: entry.promedio_agua_actual,
      }));
  }

  // Log informativo: cuántos embalses se han procesado
  console.log(
    `[Anual por mes] Completado: ${Object.keys(data).length} embalses (año ${previousYear})`,
  );

  // Devolvemos el resultado con metadata y los datos del año anterior
  return {
    metadata: {
      generatedAt: new Date().toISOString(),
      periodoInicio: `${previousYear}-01`,
      periodoFin: `${previousYear}-12`,
    },
    data,
  };
}

export async function run() {
  try {
    /**  Promedio por meses de los últimos 10 años **/
    console.log("=== Generando promedios mensuales (10 años) ===");
    const historicalData = await generateMonthlyAverages();

    const historicalDataMapped = mapHistoricalAverageToDB(historicalData);
    if (historicalDataMapped.length === 0) {
      console.log("No se encontraron datos de histórico para actualizar");
      return;
    }
    await historicalRepository.updateHistoricalTenYearsAgo(
      historicalDataMapped,
    );

    /** Promedio por mes del último año **/
    console.log("=== Generando promedios por mes del último año ===");
    const lastYearData = generateMonthlyGlobalAverages(historicalData.data);
    const lastYearDataMapped = mapLastYearAverageToDB(lastYearData);
    if (lastYearDataMapped.length === 0) {
      console.log("No se encontraron datos del último año para actualizar");
      return;
    }
    await historicalRepository.updateHistoricalLastYear(lastYearDataMapped);

    await dbServer.disconnect();
  } catch (error) {
    console.error("Console-runners historical data: ", error);
  }

  console.log("Listo!");
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
