import "server-only";
import { unstable_cache } from "next/cache";
import type { LookupApi } from "@/common/models";
import { getEmbalsesPorCuenca as getEmbalsesPorCuencaFromDb } from "../embalse-cuenca.repository";

/**
 * Cached version of getEmbalsesPorCuenca.
 * Revalidates every 5 minutes.
 */
const getCachedEmbalsesPorCuenca = unstable_cache(
  async (nombre: string): Promise<LookupApi[]> => {
    const embalses = await getEmbalsesPorCuencaFromDb(nombre);
    if (!embalses || embalses.length === 0) {
      throw new Error("Empty embalses por cuenca - skip cache");
    }
    return embalses;
  },
  ["embalses-por-cuenca"],
  { revalidate: 300 },
);

export const getEmbalsesPorCuenca = async (
  nombre: string,
): Promise<LookupApi[]> => {
  try {
    return await getCachedEmbalsesPorCuenca(nombre);
  } catch {
    return [];
  }
};
