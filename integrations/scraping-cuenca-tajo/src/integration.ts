import { Browser, Page } from "playwright";
import { getCuencaPageContent, SubcuencaInfo, SUBCUENCAS } from "./api";
import { mapToEmbalsesBySubcuenca, reservoirInfoFromTable } from "./scraper";

async function processSubcuencaData(
  page: Page,
  subcuenca: string
): Promise<SubcuencaInfo> {
  const rawReservoirs = await reservoirInfoFromTable(page, subcuenca);
  return mapToEmbalsesBySubcuenca(subcuenca, rawReservoirs);
}

export const scrapeCuencaTajo = async (
  url: string
): Promise<SubcuencaInfo[]> => {
  const reservoirsCollection: SubcuencaInfo[] = [];

  const subcuencasPromises = SUBCUENCAS.map(async (subcuenca) => {
    let browser: Browser | null = null;
    try {
      const { page, browser: browserInstance } = await getCuencaPageContent(
        url
      );
      browser = browserInstance;

      const result = await processSubcuencaData(page, subcuenca);
      return result;
    } catch (error) {
      console.error(error);
      return {
        nombreSubcuenca: subcuenca,
        embalses: [],
      };
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  });
  const subcuencasReservoirs = await Promise.all(subcuencasPromises);

  reservoirsCollection.push(...subcuencasReservoirs);

  return reservoirsCollection;
};
