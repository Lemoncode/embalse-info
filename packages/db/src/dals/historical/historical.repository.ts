import {
  HistoricalLastYear,
  HistoricalTenYearsAgo,
} from "#console-runners/historical-seed/types.js";
import {
  getHistoricalLastYearContext,
  getHistoricalTenYearsAgoContext,
} from "./historical.context.js";

export const historicalRepository = {
  updateHistoricalTenYearsAgo: async (
    reservoirs: HistoricalTenYearsAgo[],
  ): Promise<boolean> => {
    const { ok } = await getHistoricalTenYearsAgoContext().bulkWrite(
      reservoirs.map((reservoir) => ({
        updateOne: {
          filter: { embalse: reservoir.embalse },
          update: { $set: reservoir },
          upsert: true,
        },
      })),
    );

    return ok === 1;
  },
  updateHistoricalLastYear: async (
    reservoirs: HistoricalLastYear[],
  ): Promise<boolean> => {
    const { ok } = await getHistoricalLastYearContext().bulkWrite(
      reservoirs.map((reservoir) => ({
        updateOne: {
          filter: { embalse: reservoir.embalse },
          update: { $set: reservoir },
          upsert: true,
        },
      })),
    );

    return ok === 1;
  },
};
