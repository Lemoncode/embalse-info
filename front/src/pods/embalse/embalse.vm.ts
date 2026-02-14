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
