import { LookupApi } from "@/common/models";
import { Lookup } from "@content-island/api-client";

export const mapLookupListFromApiToViewModel = (
  lookupList: LookupApi[],
): Lookup[] =>
  Array.isArray(lookupList) ? lookupList.map(mapLookupFromApiToViewModel) : [];

const mapLookupFromApiToViewModel = (lookup: LookupApi): Lookup => ({
  id: lookup._id,
  name: lookup.nombre,
});
