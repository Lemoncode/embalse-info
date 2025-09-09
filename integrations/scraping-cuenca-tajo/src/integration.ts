import type { EmbalseUpdateSAIHEntity } from "db-model";
import { Browser } from "playwright";
import { getCuencaPageContent, SUBCUENCAS } from "./api";
import { getReservoirsFromTable } from "./scraper";

export const scrapeCuencaTajo = async (url: string) => {
  const reservoirsCollection: string[] = [];

  const subcuencasPromises = SUBCUENCAS.map(async (subcuenca) => {
    let browser: Browser | null = null;
    try {
      const { page, browser: browserInstance } = await getCuencaPageContent(
        url
      );
      browser = browserInstance;

      const result = await getReservoirsFromTable(page, subcuenca);
      return result;
    } catch (error) {
      console.error(error);
      return "not found";
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  });
  const subcuencasReservoirs = await Promise.all(subcuencasPromises);
  const validReservoirs = subcuencasReservoirs.filter(
    (result): result is string[] => Array.isArray(result)
  );
  reservoirsCollection.push(...validReservoirs.flat());

  return reservoirsCollection;
};
