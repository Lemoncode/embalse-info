import { ReservoirHistoryModel } from "./embalse-historial.vm";
import { ReservoirHistoryModel as ReservoirHistoryModelApi } from "./api/embalse-historial.api-model";

export const mapEmbalseHistorialToLookup = (
  apiData: ReservoirHistoryModelApi,
): ReservoirHistoryModel => {
  return {
    id: apiData._id,
    metadata: {
      lastUpdate: apiData.metadata.generatedAt,
      startDate: apiData.metadata.periodoInicio,
      endDate: apiData.metadata.periodoFin,
    },
    reservoir: apiData.embalse,
    months: apiData.meses.map((mes) => ({
      month: mes.mes,
      average: mes.promedio_agua_actual,
    })),
  };
};
