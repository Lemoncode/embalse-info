import { dbServer } from "#core/servers/index.js";
import type { Cuenca } from "db-model";

export const getCuencasContext = () =>
  dbServer.db?.collection<Cuenca>("cuencas");
