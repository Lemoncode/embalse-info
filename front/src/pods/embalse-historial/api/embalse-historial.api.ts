import "server-only";
import { unstable_cache } from "next/cache";
import { ReservoirHistoryModel } from "../embalse-historial.vm";
import { getHistorialPromedioPorMeses } from "../embalse-historial.repository";
import { mapEmbalseHistorialToLookup } from "../embalse-historial.mapper";

/**
 * Cached version of getPromedioHistoricoPorMeses.
 * Revalidates every 5 minutes.
 */
const getHistoricalAverageByMonthsCached = unstable_cache(
  async (name: string): Promise<ReservoirHistoryModel> => {
    const statisticsReservoir = await getHistorialPromedioPorMeses(name);

    if (!statisticsReservoir) {
      throw new Error("Empty historico embalse - skip cache");
    }
    const reservoirStatisticsLastYear: ReservoirHistoryModel =
      mapEmbalseHistorialToLookup(statisticsReservoir);
    return reservoirStatisticsLastYear;
  },
  ["embalses-historico-por-meses"],
  { revalidate: 300 },
);

export const getPromedioHistoricoPorMeses = async (
  name: string,
): Promise<ReservoirHistoryModel> => {
  try {
    return await getHistoricalAverageByMonthsCached(name);
  } catch (error) {
    console.warn(
      "getHistoricalAverageByMonths: MongoDB not available or empty, returning empty array.",
      "Error:",
      error instanceof Error ? error.message : error,
    );
    return;
  }
};
