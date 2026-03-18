import "server-only";
import { unstable_cache } from "next/cache";
import type { ReservoirInfo } from "./embalse.api-model";
import { contentIslandClient } from "@/lib";
import {
  getEmbalseBySlug,
  getHistorialPromedioPorMeses,
} from "../embalse.repository";
import type { Embalse } from "db-model";
import { ReservoirHistoryModel } from "./embalse.api-model";

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
const getHistoricalAverageByMonthsCached = unstable_cache(
  async (name: string): Promise<ReservoirHistoryModel> => {
    const statisticsReservoir = await getHistorialPromedioPorMeses(name);

    if (!statisticsReservoir) {
      throw new Error("Empty historico embalse - skip cache");
    }

    return statisticsReservoir;
  },
  ["embalses-historico-por-meses"],
  { revalidate: 3600 },
);

export const getHistoricalAverageByMonths = async (
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
