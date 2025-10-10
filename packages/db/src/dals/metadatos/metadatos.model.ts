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
