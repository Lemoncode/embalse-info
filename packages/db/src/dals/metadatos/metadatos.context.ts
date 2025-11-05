import { dbServer } from "#core/servers/index.js";
import type { MetaDatos } from "db-model";

export const getMetadatosContext = () =>
  dbServer.db?.collection<MetaDatos>("metadatos");
