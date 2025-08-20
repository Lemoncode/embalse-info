// Modelos “del negocio”: lo que expondrás como JSON estable hacia fuera

export type IsoDateTime = string; // ISO-8601

export class Coordinates {
  constructor(public lat: number | null, public lon: number | null) {}
}

export class EmbalseData {
  constructor(
    public fecha: string | null,            // "2025-08-18 21:55:00"
    public nivelMsnm: number | null,        // nivel_embalse (m s.n.m.)
    public volumenActualHm3: number | null, // volumen_embalse (hm³)
    public porcentajeLleno: number | null,  // porcentaje_llenado (%)
    public nmnMsnm: number | null,          // nmn (m s.n.m., Nivel Máximo Normal)
    public volumenTotalHm3: number | null   // volumenTotal (hm³)
  ) {}
}



export class Station {
  constructor(
    public id: string | null,
    public nombre: string | null,
    public rio: string | null,
    public municipio: string | null,
    public sistema: string | null,
    public zonaHidrologica: string | null,
    public tipoEstacion: string | null,
    public camara: string | null,
    public coords: Coordinates,
    // mediciones actuales
   public embalse: EmbalseData | null,
  ) {}
}

export class CantabricoSnapshot {
  constructor(
    public generatedAt: IsoDateTime,
    public total: number,
    public stations: Station[]
  ) {}
}
