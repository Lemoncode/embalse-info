import { dbServer } from "#core/servers/index.js";
import type { Cuenca } from "./cuencas.model.js";

export const getCuencasContext = () =>
  dbServer.db?.collection<Cuenca>("cuencas");
