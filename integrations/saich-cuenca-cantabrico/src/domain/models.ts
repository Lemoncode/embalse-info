// Modelos “del negocio”: lo que expondrás como JSON estable hacia fuera

export type IsoDateTime = string; // ISO-8601

export class Coordinates {
  constructor(public lat: number | null, public lon: number | null) {}
}

export class Thresholds {
  constructor(
    public seguimiento: number | null,
    public prealerta: number | null,
    public alerta: number | null
  ) {}
}

export class Colors {
  constructor(
    public caudal: string | null,
    public nivel: string | null,
    public precipitacion: string | null,
    public temperatura: string | null,
    public general: string | null
  ) {}
}

export class Trends {
  constructor(public caudal: number | null, public nivel: number | null) {}
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
    public parametrosMedidos: string[],
    public coords: Coordinates,
    // mediciones actuales
    public caudal: number | null,
    public nivel: number | null,
    public precipit1h: number | null,
    public precipit12h: number | null,
    public precipit24h: number | null,
    public temperatura: number | null,
    // fechas
    public fechaCaudal: IsoDateTime | null,
    public fechaNivel: IsoDateTime | null,
    public fechaPrecipitacion: IsoDateTime | null,
    public fechaTemperatura: IsoDateTime | null,
    public fechaGeneral: IsoDateTime | null,
    // umbrales/colores/tendencias
    public umbralCaudal: Thresholds,
    public umbralNivel: Thresholds,
    public colores: Colors,
    public tendencias: Trends,
    // flags
    public estadoSequia: boolean,
    public permisoEcologico: boolean,
    public subtipoEmbalse: boolean,
    public subtipoPiezometro: boolean
  ) {}
}

export class CantabricoSnapshot {
  constructor(
    public generatedAt: IsoDateTime,
    public total: number,
    public stations: Station[]
  ) {}
}
