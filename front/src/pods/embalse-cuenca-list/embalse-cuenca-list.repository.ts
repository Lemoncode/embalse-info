"use server";

import { LookupApi } from "@/common/models";
import { getDb } from "@/lib/mongodb";

export async function getRiverBasins(): Promise<LookupApi[]> {
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
  }
}
