import { ReservoirHistoryModel } from "@/pods/embalse/embalse.vm";

export interface ChartModel {
  data: ReservoirHistoryModel;
  currentLevel: number;
  maxCapacity: number;
  averageLastYear: number;
  averageHistory: number;
  title: string;
}
export interface MonthsAverage {
  month: number;
  average: number;
}
