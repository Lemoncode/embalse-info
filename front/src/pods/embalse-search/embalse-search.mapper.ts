import * as vm from "./embalse-search.vm";
import * as api from "db-model";

export const mapEmbalseToSearch = (
  embalse: api.Embalse,
): vm.EmbalseSearchModel => ({
  slug: embalse._id,
  name: `${embalse.nombre} (${embalse.provincia})`,
});
