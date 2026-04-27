import type { Media } from "@content-island/api-client";
export interface ReservoirInfo {
  id: string;
  language: "es";
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  slug: string;
  name: string;
  mainPicture: Media;
  author?: string;
  authorUrl?: string;
  description: string;
  mapUrl?: string;
}

export interface ReservoirLastYearModel {
  mes: number;
  promedio_agua_actual: number;
}

export interface HistoricalAverageReservoir {
  embalse: string;
  mes: number;
  promedio_agua_actual: number;
}
