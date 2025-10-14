import { getLatestEntries } from "./api/getLatestEntries.js";
import { Cuenca, Embalse } from "@embalse-info/db";
import {
  mapArgGisEntryToCuenca,
  mapArgGisEntryToEmbalse,
} from "./arcgis.mappers.js";

interface ScrapeResult {
  embalses: Embalse[];
  cuencas: Cuenca[];
}

export async function scrapeSeedEmbalses(): Promise<ScrapeResult> {
  const data = await getLatestEntries();

  const embalses = data
    .map(mapArgGisEntryToEmbalse)
    .filter((e): e is Embalse => e != null);

  const allCuencas = data
    .map(mapArgGisEntryToCuenca)
    .filter((e): e is Cuenca => e != null);
  const uniqueCuencasMap = new Map(allCuencas.map((c) => [c._id, c]));
  const cuencas = Array.from(uniqueCuencasMap.values());

  return { embalses, cuencas };
}
