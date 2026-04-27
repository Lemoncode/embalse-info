import "server-only";
import { unstable_cache } from "next/cache";
import type {
  ReservoirInfo,
  ReservoirLastYearModel,
  HistoricalAverageReservoir,
} from "./embalse.api-model";
import { contentIslandClient } from "@/lib";
import {
  getEmbalseBySlug,
  getAverageLastYearByMonth,
  getAverageHistoricalByMonth,
} from "../embalse.repository";
import type { Embalse } from "db-model";

/**
 * Cached version of getReservoirInfoBySlug.
 * Revalidates every 60 seconds.
 */
export const getReservoirInfoBySlugCached = unstable_cache(
  async (slug: string): Promise<ReservoirInfo | null> => {
    try {
      const result = await contentIslandClient.getContent<ReservoirInfo>({
        language: "es",
        "fields.slug": slug,
      });

      if (!result) {
        console.warn(`Empty reservoir info for slug: ${slug}`);
        return null;
      }

      return result;
    } catch (error) {
      console.warn(
        `Warning reservoir info for slug not available: ${slug}`,
        error,
      );
      return null;
    }
  },
  ["reservoir-by-slug"],
  { revalidate: 60 },
);

/**
 * Cached version of getEmbalseBySlug.
 * Revalidates every 60 seconds.
 */
export const getEmbalseBySlugCached = unstable_cache(
  async (slug: string): Promise<Embalse | null> => {
    return getEmbalseBySlug(slug);
  },
  ["embalse-by-slug"],
  { revalidate: 60 },
);

/**
 * Function for historical average.
 *
 * Cached version of getHistoricalAverageByMonths.
 * Revalidates every 60 minutes.
 **/
export const getAverageLastYearByMonthCached = unstable_cache(
  async (name: string, month: number): Promise<ReservoirLastYearModel> => {
    try {
      const statisticsReservoir = await getAverageLastYearByMonth(name, month);

      if (!statisticsReservoir) {
        throw new Error("Empty data last year by month - skip cache");
      }

      return statisticsReservoir;
    } catch (error) {
      console.warn(
        "getAverageLastYearByMonthCached: MongoDB not available or empty, returning empty array.",
        "Error:",
        error instanceof Error ? error.message : error,
      );
      return;
    }
  },
  ["reservoir-last-year"],
  { revalidate: 3600 },
);

export const getAverageHistoricalByMonthCached = unstable_cache(
  async (
    reservoirName: string,
    month: number,
  ): Promise<HistoricalAverageReservoir> => {
    try {
      const historicalStatistics = await getAverageHistoricalByMonth(
        reservoirName,
        month,
      );

      if (!historicalStatistics) {
        throw new Error("Empty historical data by month and year");
      }
      return historicalStatistics;
    } catch (error) {
      console.warn(
        "getAverageHistoricalByMonthCached: MongoDB not available or empty, returning empty array.",
        "Error:",
        error instanceof Error ? error.message : error,
      );
      return;
    }
  },
  ["reservoir-last-ten-year"],
  { revalidate: 3600 },
);
