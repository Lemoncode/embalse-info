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
