import "server-only";
import { unstable_cache } from "next/cache";
import type { ReservoirInfo } from "./embalse.api-model";
import { contentIslandClient } from "@/lib";

const fetchReservoirInfoBySlug = async (
  slug: string
): Promise<ReservoirInfo> => {
  const result = await contentIslandClient.getContent<ReservoirInfo>({
    language: "es",
    "fields.slug": slug,
  });

  if (!result) {
    throw new Error(`Empty reservoir info for slug: ${slug}`);
  }

  return result;
};

const fetchReservoirInfoBySlugCached = unstable_cache(
  fetchReservoirInfoBySlug,
  ["reservoir-by-slug"],
  { revalidate: 60 }
);

/**
 * Cached version of getReservoirInfoBySlug.
 * Revalidates every 60 seconds.
 * Only caches when data is available.
 */
export const getReservoirInfoBySlugCached = async (
  slug: string
): Promise<ReservoirInfo | null> => {
  try {
    return await fetchReservoirInfoBySlugCached(slug);
  } catch (error) {
    console.warn(`Warning reservoir info for slug not available: ${slug}`);
    return null;
  }
};
