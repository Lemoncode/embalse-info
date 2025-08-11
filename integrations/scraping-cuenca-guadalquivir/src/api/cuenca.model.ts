export interface EmbalsesGuadalquivir {
  id: number;
  embalse: string;
  provincia: string;
  nmnMsnm: number; // Metros sobre el nivel del mar máximo (m.s.n.m.)
  nivelActualMsnm: number;
  capacidadActualHm3: number;
  volumenActualHm3: number;
  porcentajeActual: number;
}
