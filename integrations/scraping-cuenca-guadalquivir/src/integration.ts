import { getCuencaPageContent, Zone, ZoneInfo, ZONES } from "./api/index.js";
import {
  extractCurrentDate,
  mapToEmbalsesByZone,
  mapToEmbalseUpdateSAIH,
  reservoirInfoFromTable,
} from "./scraper/index.js";
import { Browser, Page } from "playwright";

const url = "https://www.chguadalquivir.es/saih/";

async function processZoneData(page: Page, zone: Zone): Promise<ZoneInfo> {
  const rawReservoirs = await reservoirInfoFromTable(page);
  const currentDate = await extractCurrentDate(page);
  const saihReservoirs = mapToEmbalseUpdateSAIH(rawReservoirs, currentDate);
  return mapToEmbalsesByZone(zone.codigo, zone.nombre, saihReservoirs);
}

export const scrapeCuencaGuadalquivir = async (): Promise<ZoneInfo[]> => {
  const reservoirsCollection: ZoneInfo[] = [];

  const zonesPromises = ZONES.map(async (zone) => {
    let browser: Browser | null = null;
    try {
      const { page, browser: browserInstance } = await getCuencaPageContent(
        url,
        zone.codigo
      );
      browser = browserInstance;

      const result = await processZoneData(page, zone);
      return result;
    } catch (error) {
      console.error(`Failed to scrape zone ${zone.codigo}:`, error);
      return {
        codigoZona: zone.codigo,
        nombreZona: zone.nombre,
        embalses: [],
      };
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  });
  const zonesReservoirs = await Promise.all(zonesPromises);
  reservoirsCollection.push(...zonesReservoirs);

  return reservoirsCollection;
};
