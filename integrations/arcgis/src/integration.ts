import { getLatestEntries } from "./api";

/**
 * Trae los datos del ArcGIS (fecha más reciente) y los devuelve como array de objects
 * con todos los atributos (tal y como hace el repo original).
 */
export async function scrapeSeedEmbalses(): Promise<Record<string, unknown>[]> {
  const data = await getLatestEntries();
  return data;
}
