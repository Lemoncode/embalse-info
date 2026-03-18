import { ReservoirData } from "@/pods/embalse/embalse.vm";
import { ReservoirHistoryModel } from "../embalse-historial.vm";

export interface ChartModel {
  data: ReservoirHistoryModel;
  maxCapacity: number;
  title: string;
}
export interface MonthsAverage {
  month: number;
  average: number;
}
