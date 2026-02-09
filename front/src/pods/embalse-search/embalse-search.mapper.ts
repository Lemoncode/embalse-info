import * as vm from "./embalse-search.model";
import * as api from "db-model";
import { Embalse } from "db-model";
import { EmbalseSearchModel } from "./embalse-search.model";

export const mapEmbalseToSearch = (embalse: Embalse): EmbalseSearchModel => ({
  slug: embalse._id,
  name: `${embalse.name} (${embalse.province})`,
});
