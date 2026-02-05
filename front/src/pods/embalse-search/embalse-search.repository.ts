"use server";

import { getDb } from "@/lib/mongodb";
import type { Embalse } from "./api/api.model";

export async function getEmbalsesFromDb(): Promise<Embalse[]> {
  const db = getDb();
  const docs = await db
    .collection("embalses")
    .find(
      {},
      {
        projection: {
          _id: 1,
          nombre: 1,
          provincia: 1,
        },
      },
    )
    .toArray();

  return docs.map((doc) => ({
    _id: doc._id?.toString() ?? "",
    nombre: doc.nombre ?? "",
    provincia: doc.provincia ?? "",
  }));
}
