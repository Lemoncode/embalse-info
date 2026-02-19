import type { Embalse } from "db-model";

export interface DatosEmbalse {
  cuenca: string;
  provincia: string;
  uso: string;
}

export interface ReservoirData {
  nombre: string;
  currentVolume: number;
  totalCapacity: number;
  measurementDate: string;
  datosEmbalse: DatosEmbalse;
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
