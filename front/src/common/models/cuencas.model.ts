import { Lookup } from "./lookup.model";

export interface CuencasModel {
  id: string;
  name: string;
}

export interface CuencasModelApi {
  _id: string;
  nombre: string;
}

export interface EmbalsesCuencaListApi {
  embalse_id: string;
  nombre: string;
  slug: string;
  cuenca: CuencasModelApi;
}

export interface EmbalsesCuencaList {
  id: string;
  name: string;
  slug?: string;
}
