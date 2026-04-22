import {
  DataLastYearModel,
  HistoricalAverageReservoir,
  ReservoirData,
} from "@/pods/embalse/embalse.vm";

export interface ChartModel {
  titleChart?: string;
  reservoirData: ReservoirData;
  dataOneYearAgo?: DataLastYearModel;
  dataTenYearsAgo?: HistoricalAverageReservoir;
}
