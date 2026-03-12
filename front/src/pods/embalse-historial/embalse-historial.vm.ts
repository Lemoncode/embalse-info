interface MonthHistoryData {
  month: number;
  average: number;
}
interface ReservoirHistoryMetadata {
  lastUpdate: string;
  startDate: string;
  endDate: string;
}
export interface ReservoirHistoryModel {
  id: string;
  reservoir: string;
  metadata: ReservoirHistoryMetadata;
  months: MonthHistoryData[];
}
