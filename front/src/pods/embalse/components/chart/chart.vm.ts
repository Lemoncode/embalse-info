import {
  DataLastYearModel,
  HistoricalAverageReservoir,
} from "@/pods/embalse/embalse.vm";

export interface ChartModel {
  titleChart: string;
  reservoirName: string;
  currentLevel: number;
  maxCapacity: number;
  dataOneYearAgo?: DataLastYearModel;
  dataTenYearsAgo?: HistoricalAverageReservoir;
}
