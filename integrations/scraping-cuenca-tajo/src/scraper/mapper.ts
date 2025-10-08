import { EmbalseUpdateSAIHEntity } from "db-model";
import { SubcuencaInfo } from "../api";

export function mapToEmbalsesBySubcuenca(
  nombreSubcuenca: string,
  embalses: EmbalseUpdateSAIHEntity[]
): SubcuencaInfo {
  return {
    nombreSubcuenca: nombreSubcuenca,
    embalses: embalses,
  };
}
