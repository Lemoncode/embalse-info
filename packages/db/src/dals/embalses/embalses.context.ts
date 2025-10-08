import { dbServer } from "#core/servers/index.js";
import type { Embalse } from "./embalses.model.js";

export const getEmbalsesContext = () =>
  dbServer.db?.collection<Embalse>("embalses");
