export interface EmbalseUpdateSAIHEntity {
  id: number;
  nombre: string;
  aguaActualSAIH: number;
  fechaMedidaSAIH: string;
}
export interface InfoDestinoArcgis {
  nombre: string;
  idArcgis: number;
}

export interface Cuenca {
  _id: string;
  nombre: string;
}

export interface Embalse {
  _id: string;
  embalse_id: number;
  nombre: string;
  slug: string;
  cuenca: {
    _id: string;
    nombre: string;
  };
  provincia: string | null;
  capacidad: number;
  aguaActualAemet: number | null;
  fechaMedidaAguaActualAemet: Date | null;
  aguaActualSAIH: number | null;
  fechaMedidaAguaActualSAIH: Date | null;
  descripcion_id: string | null;
  uso: string;
}

interface UltimasImportacionesSAIH {
  nombresitio: string;
  ultimaimportacion: Date;
  ultimoStatus: string;
}

export interface MetaDatos {
  _id: string;
  ultimaImportacionAemet: Date;
  ultimoStatus: string;
  ultimasImportacionesSAIH: UltimasImportacionesSAIH[];
}
