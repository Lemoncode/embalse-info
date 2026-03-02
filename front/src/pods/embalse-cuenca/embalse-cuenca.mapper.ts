import {
  EmbalsesCuencaList,
  EmbalsesCuencaListApi,
} from "@/common/models/cuencas.model";

export const mapRiverBasinListFromApiToView = (
  embalses: EmbalsesCuencaListApi[],
): EmbalsesCuencaList[] =>
  Array.isArray(embalses)
    ? embalses.map((embalse) => ({
        id: embalse.embalse_id,
        name: embalse.nombre,
      }))
    : [];
