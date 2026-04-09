import {
  PromedioAnualPorMesOutput,
  PromedioMensualOutput,
  HistoricalTenYearsAgo,
  HistoricalLastYear,
  createEmptyHistoricalTenYearsAgo,
  createEmptyHistoricalLastYear,
} from "./types.js";

export const mapHistoricalAverageToDB = (
  historicalData: PromedioMensualOutput,
): HistoricalTenYearsAgo[] => {
  if (Boolean(historicalData)) {
    const { data, metadata } = historicalData;

    const dataMapped: HistoricalTenYearsAgo[] = Object.entries(data).map(
      ([reservoirName, monthly]) => {
        return {
          embalse: reservoirName,
          meses: monthly.map((month) => ({
            mes: month.mes,
            año: month.año,
            promedio_agua_actual: month.promedio_agua_actual,
          })),
          metadata: {
            generatedAt: metadata.generatedAt,
            periodoInicio: metadata.periodoInicio,
            periodoFin: metadata.periodoFin,
          },
        };
      },
    );

    return dataMapped;
  } else {
    return createEmptyHistoricalTenYearsAgo();
  }
};

export const mapLastYearAverageToDB = (
  lastYearData: PromedioAnualPorMesOutput,
): HistoricalLastYear[] => {
  if (Boolean(lastYearData)) {
    const { data, metadata } = lastYearData;

    const dataMapped: HistoricalLastYear[] = Object.entries(data).map(
      ([reservoirName, monthly]) => {
        return {
          embalse: reservoirName,
          meses: monthly.map((month) => ({
            mes: month.mes,
            promedio_agua_actual: month.promedio_agua_actual,
          })),
          metadata: {
            generatedAt: metadata.generatedAt,
            periodoInicio: metadata.periodoInicio,
            periodoFin: metadata.periodoFin,
          },
        };
      },
    );

    return dataMapped;
  } else {
    return createEmptyHistoricalLastYear();
  }
};
