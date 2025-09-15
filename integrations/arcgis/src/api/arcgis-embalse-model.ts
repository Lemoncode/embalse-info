export interface Cuenca {
  _id: string;
  nombre: string;
}

export interface Embalse {
  id: string;
  embalse_id: number;
  nombre: string;
  cuenca: {
    _id: string;
    nombre: string;
  };
  provincia: string | null;
  capacidad: number;
  aguaActualAemet: number | null;
  fechaMedidaAguaActualAemet: Date | null;
  aguaActualSAIH: string | null;
  fechaMedidaAguaActualSAIH: Date | null;
  descripcion_id: string | null;
  uso: string;
}

export interface MetaDatos {
  _id: string;
  ultimaImportacionAemet: Date;
  ultimoStatus: string;
  ultimasImportacionesSAIH: {
    nombresitio: string;
    ultimaimportacion: Date;
    ultimoStatus: string;
  }[];
}

export interface ArcGisEntry {
  OBJECTID_1?: number;
  EMBALSE_ID: number;
  embalse_nombre: string;
  ambito_id: number;
  agua_total: number;
  ambito_nombre: string;
  Uso: string;
  energia_actual: number | null;
  agua_actual: number;
  fecha: number;
  boletin_anyo: number;
  boletin_num: number;
  Porcentaje_Reserva: number;
  Años: string;
  Orden_Semana: number;
  Fecha_str: string;
  Variacion_Reserva: number;
  ID_Unico: string;
  Estado_Porc: string;
  Estado_Porcentaje_Energia: string;
  energia_total: number;
  Variacion_Porcentaje: number;
  Variacion_Energia: number;
  Porcentaje_Energia: number | null;
  Variacion_Porcentaje_Energia: number | null;
  embalse_id_1: number;
  electrico_flag: number;
  OBJECTID: number;
  ORIG_FID: number;
  EMBALSES_ID: number | null;
}