import "server-only";
import { unstable_cache } from "next/cache";
import type { EmbalseApi } from "../embalse-provincia.api-model";
import { getEmbalsesByProvince as getEmbalsesByProvinceFromDb } from "../embalse-provincia.repository";

/**
 * Cached version of getEmbalsesByProvince.
 * Revalidates every 5 minutes.
 */
const getCachedEmbalsesByProvince = unstable_cache(
  async (provincia: string): Promise<EmbalseApi[]> => {
    const embalses = await getEmbalsesByProvinceFromDb(provincia);
    if (!embalses || embalses.length === 0) {
      throw new Error("Empty embalses por provincia - skip cache");
    }
    return embalses;
  },
  ["embalses-por-provincia"],
  { revalidate: 300 },
);

export const getEmbalsesByProvince = async (
  provincia: string,
): Promise<EmbalseApi[]> => {
  try {
    return await getCachedEmbalsesByProvince(provincia);
  } catch {
    return [];
  }
};
