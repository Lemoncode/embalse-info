import * as cheerio from "cheerio";
import {
  getCuencaPageHTMLContent,
  getUpdatedWithZoneOptionTable,
  Zone,
  ZoneInfo,
  ZONES,
} from "./api";
import {
  extractCurrentDate,
  mapToEmbalsesByZone,
  mapToEmbalseUpdateSAIH,
  reservoirInfoFromTable,
} from "./scraper";

async function processZoneData(html: string, zone: Zone): Promise<ZoneInfo> {
  const $ = cheerio.load(html);
  const rawReservoirs = reservoirInfoFromTable($);
  const currentdDate = extractCurrentDate($);
  const saihReservoirs = mapToEmbalseUpdateSAIH(rawReservoirs, currentdDate);
  return mapToEmbalsesByZone(zone.codigo, zone.nombre, saihReservoirs);
}

export const scrapeCuencaGuadalquivir = async (
  url: string
): Promise<ZoneInfo[]> => {
  const reservoirsCollection: ZoneInfo[] = [];

  // Process default zone (RG) with axios
  const defaultZone = ZONES.find((z) => z.isDefault)!;
  const defaultHtml = await getCuencaPageHTMLContent(url);
  reservoirsCollection.push(await processZoneData(defaultHtml, defaultZone));

  // Process other zones with Playwright
  const otherZones = ZONES.filter((z) => !z.isDefault);
  const otherZonePromises = otherZones.map(async (zone) => {
    try {
      const html = await getUpdatedWithZoneOptionTable(url, zone.codigo);
      return processZoneData(html, zone);
    } catch (error) {
      console.error(`Failed to scrape zone ${zone.codigo}:`, error);
      return {
        codigoZona: zone.codigo,
        nombreZona: zone.nombre,
        embalses: [],
      };
    }
  });
  const otherZonesReservoirs = await Promise.all(otherZonePromises);
  reservoirsCollection.push(...otherZonesReservoirs);

  return reservoirsCollection;
};
