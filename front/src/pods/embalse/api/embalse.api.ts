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
        error
      );
      return null;
    }
  },
  ["reservoir-by-slug"],
  { revalidate: 60 }
);
