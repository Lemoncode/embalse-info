export interface EmbalsesJucar {
  id: number;
  embalse: string;
  provincia: string;
  porcentajeActual: number;
  capacidadTotalHm3: number;
  acumuladoHoyMm: number;
  volumenActualHm3: number;
  acumuladoSemanaAnteriorMm: number;
  volumenSemanaAnteriorHm3: number;
  acumuladoAnioAnteriorMm: number;
  volumenAnioAnteriorHm3: number;
  grafico: any;
}
