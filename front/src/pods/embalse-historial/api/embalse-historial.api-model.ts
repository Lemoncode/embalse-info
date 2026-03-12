interface MonthHistoryData {
  mes: number;
  promedio_agua_actual: number;
}

interface ReservoirHistoryMetadata {
  generatedAt: string;
  periodoInicio: string;
  periodoFin: string;
}

export interface ReservoirHistoryModel {
  _id: string;
  embalse: string;
  metadata: ReservoirHistoryMetadata;
  meses: MonthHistoryData[];
}
