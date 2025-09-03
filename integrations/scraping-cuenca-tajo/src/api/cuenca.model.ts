import { EmbalseUpdateSAIHEntity } from "db-model";

export interface EmbalsesTajo {
  id: number;
  embalse: string;
  cotaEmbalse: number;
  volumenEmbalseHm3: number; // o VOLUMEN DEL AGUA EMBALSADA
  precipitacionUltimaHora?: number;
  precipitacionUltimas24Horas?: number;
  pluviometro?: number;
  velocidadViento?: number;
  direccionViento?: number;
  temperaturaAmbiente?: number;
  humedadRelativa?: number;
  presionAtmosferica?: number;
  radiacionSolarTotal?: number;
}

export const SUBCUENCAS: string[] = [
  "ALAGÓN",
  "ALBERCHE",
  "BAJO TAJO",
  "CABECERA",
  "HENARES",
  "MADRID",
  "TAJO IZQUIERDA",
  "TAJUÑA",
  "TIÉTAR",
  "ÁRRAGO",
];
