"use server";

import { getDb } from "@/lib/mongodb";
import { CuencasModelApi } from "@/common/models/cuencas.model";

export async function getEmbalsesPorCuenca(
  nombre: string,
): Promise<CuencasModelApi[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection("embalses")
      .find({ "cuenca.nombre": nombre }, { projection: { _id: 1, nombre: 1 } })
      .toArray();

    return docs.map((doc) => ({
      _id: doc.slug ?? String(doc._id),
      nombre: doc.nombre ?? "",
    }));
  } catch (error) {
    console.warn(
      "getEmbalsesByRiverBasin: MongoDB not available (build time?), returning empty array.",
      "Error:",
      error instanceof Error ? error.message : error,
    );
  }
  return [];
}
