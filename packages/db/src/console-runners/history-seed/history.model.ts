export interface HistoryResultApi {
  embalse_nombre: string;
  avg_agua_actual: number
}

export interface MonthyTenYearAgoApi {
  año: number;
  mes: number;
  promedio_agua_actual: number
}

export interface ArcGISStatResponse {
  features: Array<{
    attributes: Record<string, string | number | null>;
  }>;
  exceededTransferLimit?: boolean;
}
