import { dbServer } from "#core/servers/index.js";
import type { Embalse } from "db-model";

export const getEmbalsesContext = () =>
  dbServer.db?.collection<Embalse>("embalses");
