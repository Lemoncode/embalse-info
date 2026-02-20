import type { Embalse } from "db-model";
import type { Media } from "@content-island/api-client";

export interface DatosEmbalse {
  cuenca: string;
  provincia: string;
  uso: string;
}
//toDO mirar los campos exactos que necesitamos de la api de content island y mapearlos a esta interfaz
export interface ReservoirInfo {
  id: string;
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  name: string;
  mainPicture: Media;
  author?: string;
  authorUrl?: string;
  description: string;
}

export interface ReservoirData {
  nombre: string;
  currentVolume: number;
  totalCapacity: number;
  measurementDate: string;
  datosEmbalse: DatosEmbalse;
  reservoirInfo?: ReservoirInfo;
}

export const createEmptyEmbalse = (): Embalse => ({
  _id: "",
  embalse_id: 0,
  nombre: "",
  slug: "",
  cuenca: { _id: "", nombre: "" },
  provincia: null,
  capacidad: 0,
  aguaActualAemet: null,
  fechaMedidaAguaActualAemet: null,
  aguaActualSAIH: null,
  fechaMedidaAguaActualSAIH: null,
  descripcion_id: null,
  uso: "",
});

export const createEmptyEmbalseInfo = (): ReservoirInfo => ({
  id: "",
  lastUpdate: null,
  name: "",
  mainPicture: null,
  author: "",
  authorUrl: "",
  description: "",
});
