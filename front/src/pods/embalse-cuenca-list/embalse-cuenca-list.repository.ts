"use server";

import { LookupApi } from "@/common/models";
import { getDb } from "@/lib/mongodb";
import { unstable_cache } from "next/cache";

const getCachedRiverBasins = unstable_cache(
  async (): Promise<LookupApi[]> => {
    try {
      const db = await getDb();
      return await db
        .collection<LookupApi>("cuencas")
        .find({}, { projection: { _id: 1, nombre: 1 } })
        .toArray();
    } catch (error) {
      console.warn(
        "getEmbalsesByRiverBasin: MongoDB not available (build time?), returning empty array.",
        "Error:",
        error instanceof Error ? error.message : error,
      );
      return [];
    }
  },
  ["cuencas-collection"],
  { revalidate: 300 },
);

export async function getRiverBasins(): Promise<LookupApi[]> {
  return getCachedRiverBasins();
}
