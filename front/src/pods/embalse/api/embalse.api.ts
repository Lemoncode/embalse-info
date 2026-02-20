import "server-only";
import { unstable_cache } from "next/cache";
import type { ReservoirInfo } from "./embalse.api-model";
import { contentIslandClient } from "@/lib";

/**
 * Cached version of getReservoirInfoBySlug.
 * Revalidates every 60 seconds.
 */
export const getReservoirInfoBySlugCached = unstable_cache(
  async (slug: string): Promise<ReservoirInfo | null> => {
    try {
      return await contentIslandClient.getContent<ReservoirInfo>({
        language: "es",
        "fields.slug": slug,
      });
    } catch (error) {
      console.warn(`Error fetching reservoir info for slug: ${slug}`, error);
      return null;
    }
  },
  ["reservoir-by-slug"],
  { revalidate: 60 }, // Check timing at least 1 hour
);
