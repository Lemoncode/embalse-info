"use server";

import { LookupApi } from "@/common/models";
import { getDb } from "@/lib/mongodb";
import { unstable_cache } from "next/cache";

const getCachedRiverBasins = unstable_cache(
  async (): Promise<LookupApi[]> => {
    const db = await getDb();
    const result = await db
      .collection<LookupApi>("cuencas")
      .find({}, { projection: { _id: 1, nombre: 1 } })
      .toArray();
    if (result.length === 0) {
      throw new Error("Empty cuencas - skip cache");
    }
    return result;
  },
  ["cuencas-collection"],
  { revalidate: 300 },
);

export async function getRiverBasins(): Promise<LookupApi[]> {
  try {
    return await getCachedRiverBasins();
  } catch (error) {
    console.warn(
      "getRiverBasins: MongoDB not available or empty, returning empty array.",
      "Error:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}
