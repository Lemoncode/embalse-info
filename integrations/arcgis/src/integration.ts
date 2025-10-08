import { getLatestEntries } from "./api/getLatestEntries.js";
import { ArcGisEntry } from "./api/arcgis-embalse-model.js";

export async function scrapeSeedEmbalses(): Promise<ArcGisEntry[]> {
  const data = await getLatestEntries();
  return data;
}
