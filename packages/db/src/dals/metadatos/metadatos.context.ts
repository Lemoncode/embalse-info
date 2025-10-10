import { dbServer } from "#core/servers/index.js";
import type { MetaDatos } from "./metadatos.model.js";

export const getMetadatosContext = () =>
  dbServer.db?.collection<MetaDatos>("metadatos");
