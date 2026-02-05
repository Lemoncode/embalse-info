import { EmbalseSearchModel } from "./embalse-search.vm";
import { Embalse } from "./api";

export const mapEmbalseToSearch = (embalse: Embalse): EmbalseSearchModel => ({
  slug: embalse._id,
  name: `${embalse.name} (${embalse.province})`,
});
