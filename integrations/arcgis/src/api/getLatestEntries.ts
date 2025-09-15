import {fetchLatestDate, fetchEntriesByDate} from "./arcgis-embalse.api";
import{ArcGisEntry} from "./arcgis-embalse-model"

//Trae todos los registros de la fecha más reciente en su formato ArcGisEntry original.

export const getLatestEntries = async (): Promise<ArcGisEntry[]> => {
  try {
    // 1) Obtiene la fecha más reciente
    const latestDate = await fetchLatestDate();
    console.log(`Última fecha obtenida: ${latestDate}`);

    // 2) Obtiene todos los registros para la fecha más reciente
    const allArcGisEntries = await fetchEntriesByDate(latestDate);
    console.log(`Se obtuvieron ${allArcGisEntries.length} registros para la fecha ${latestDate}.`);

    if (!allArcGisEntries.length) {
      console.warn("No se encontraron registros para la fecha más reciente.");
      return [];
    }

    // Devuelve directamente los ArcGisEntry
    return allArcGisEntries;
  } catch (error) {
    console.error("Error al obtener las entradas de los embalses:", error);
    throw error;
  }
};