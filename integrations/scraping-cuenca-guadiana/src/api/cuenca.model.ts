export interface EmbalsesGuadiana {
  PI: number;
  NE1: number;
  PRA: number;
  PV1: number;
  SE1: number;
  VE1: number;
  tipo: string;
  zona: string;
  orden: number;
  cam360: null;
  nombre: string;
  acronimo: string;
  timestamp: string;
  cod_estacion: string;
}

export interface RequestBody {
  id: string;
  type: string;
}

export interface ApiResponse {
  info: {
    titulo: null;
    texto: string;
    descripcion: null;
  };
  embalses_volcap: {
    volumen: number;
    capacidad: number;
    porcentajeVol: number;
  };
  "360": null;
  video;
  ult_res: {
    encabezado: string[];
    valores: EmbalsesGuadiana[];
  };
}
