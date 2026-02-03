export interface DatosEmbalse {
  cuenca: string;
  provincia: string;
  municipio: string;
  rio: string;
  embalsesAguasAbajo: number;
  tipoDePresa: string;
  anioConstruccion: number;
  superficie: number;
  localizacion: string;
}

export interface ReservoirInfo {
  Description: string;
}

export interface ReservoirData {
  nombre: string;
  currentVolume: number;
  totalCapacity: number;
  measurementDate: string;
  datosEmbalse: DatosEmbalse;
  reservoirInfo: ReservoirInfo;
}
