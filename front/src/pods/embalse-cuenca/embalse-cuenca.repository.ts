"use server";

import { LookupApi } from "@/common/models";
import { getDb } from "@/lib/mongodb";
import { Embalse } from "db-model";

export const getEmbalsesPorCuenca = async (
  nombre: string,
): Promise<LookupApi[]> => {
  try {
    const db = await getDb();
    return await db
      .collection<Embalse>("embalses")
      .find({ "cuenca.nombre": nombre }, { projection: { _id: 1, nombre: 1 } })
      .toArray();
  } catch (error) {
    console.warn(
      "getEmbalsesByRiverBasin: MongoDB not available (build time?), returning empty array.",
      "Error:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
};
