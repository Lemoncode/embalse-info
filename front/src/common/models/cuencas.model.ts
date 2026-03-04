import { LookupApi } from "./lookup.model";

export interface EmbalsesCuencaListApi {
  embalse_id: string;
  nombre: string;
  slug: string;
  cuenca: LookupApi;
}

export interface EmbalsesCuencaList {
  id: string;
  name: string;
  slug?: string;
}
