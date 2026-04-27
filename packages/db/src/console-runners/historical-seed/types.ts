// Respuesta de ArcGIS para consultas estadísticas
export interface ArcGISStatResponse {
  features: Array<{
    attributes: Record<string, string | number | null>;
  }>;
  exceededTransferLimit?: boolean;
}

// Entrada mensual por embalse
export interface PromedioMensualEntry {
  año: number;
  mes: number;
  promedio_agua_actual: number;
}

// Entrada de promedio global por mes (agregado sobre todos los años)
export interface PromedioAnualPorMesEntry {
  mes: number;
  promedio_agua_actual: number;
}

// Estructura del JSON de salida mensual
export interface PromedioMensualOutput {
  metadata: {
    generatedAt: string;
    periodoInicio: string;
    periodoFin: string;
  };
  data: Record<string, PromedioMensualEntry[]>;
}

// Estructura del JSON de salida de promedio por mes (agregado sobre los 10 años)
export interface PromedioAnualPorMesOutput {
  metadata: {
    generatedAt: string;
    periodoInicio: string;
    periodoFin: string;
  };
  data: Record<string, PromedioAnualPorMesEntry[]>;
}
// Genérico de metadata
export interface Metadata {
  generatedAt: string;
  periodoInicio: string;
  periodoFin: string;
}

// Estructura del JSON de salida para base de datos (sobre los últimos 10 años)
interface MonthlyTenYearsAgo {
  año: number;
  mes: number;
  promedio_agua_actual: number;
}
export interface HistoricalTenYearsAgo {
  embalse: string;
  meses: MonthlyTenYearsAgo[];
  metadata: Metadata;
}
export const createEmptyHistoricalTenYearsAgo = (): HistoricalTenYearsAgo[] => {
  return [
    {
      embalse: "",
      meses: [
        {
          año: new Date().getFullYear(),
          mes: new Date().getMonth() + 1,
          promedio_agua_actual: 0,
        },
      ],
      metadata: {
        generatedAt: "",
        periodoInicio: "",
        periodoFin: "",
      },
    },
  ];
};

// Estructura del JSON de salida para base de datos (del año anterior)

export interface HistoricalLastYear {
  embalse: string;
  meses: PromedioAnualPorMesEntry[];
  metadata: Metadata;
}

export const createEmptyHistoricalLastYear = (): HistoricalLastYear[] => {
  return [
    {
      embalse: "",
      meses: [
        {
          mes: new Date().getMonth() + 1,
          promedio_agua_actual: 0,
        },
      ],
      metadata: {
        generatedAt: "",
        periodoInicio: "",
        periodoFin: "",
      },
    },
  ];
};
