import { EmbalseUpdateSAIHEntity } from "db-model";

export interface SubcuencaInfo {
  nombreSubcuenca: string;
  embalses: EmbalseUpdateSAIHEntity[];
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

export const VOLUME_TITLES = [
  "VOLUMEN EMBALSE",
  "VOLUMEN DE AGUA EMBALSADA",
  "VOLUMEN DEL AGUA EMBALSADA",
  "VOLUMEN EMBALSE TAJO",
  "VOLUMEN EMBALSE TIETAR",
];
