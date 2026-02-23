"use server";

import { getDb } from "@/lib/mongodb";
import type { EmbalseApi } from "./embalse-provincia.api-model";

export async function getEmbalsesByProvince(provincia: string): Promise<EmbalseApi[]> {
  try {

    const db = await getDb();
    const docs = await db
      .collection("embalses")
      .find(
        {provincia: { $regex: new RegExp(provincia, "i") }},
        {
          projection: {
            _id: 1,
            nombre: 1,
            slug: 1,
          },
        },
      )
      .toArray();

      console.log(docs)
    return docs.map((doc) => ({
      _id: doc.slug ?? String(doc._id),
      name: doc.nombre ?? "",
    }));
  } catch (error) {
    console.warn(
      "getEmbalsesByProvince: MongoDB not available (build time?), returning empty array.",
      "Error:", error instanceof Error ? error.message : error
    );
    return [];
  }
}

