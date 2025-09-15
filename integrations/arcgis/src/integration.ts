import { getLatestEntries } from "./api/getLatestEntries";
import{ArcGisEntry} from "./api/arcgis-embalse-model"

export async function scrapeSeedEmbalses(): Promise<ArcGisEntry[]> {
  const data = await getLatestEntries();
  return data;
}