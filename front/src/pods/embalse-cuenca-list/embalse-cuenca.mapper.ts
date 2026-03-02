import { CuencasModel, CuencasModelApi } from "@/common/models/cuencas.model";

export const mapRiverBasinListFromApiToView = (
  cuencas: CuencasModelApi[],
): CuencasModel[] =>
  Array.isArray(cuencas)
    ? cuencas.map((cuenca) => ({
        id: cuenca._id,
        name: cuenca.nombre,
      }))
    : [];
