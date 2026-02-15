"use server";

import { getDb } from "@/lib/mongodb";
import type { Embalse } from "./api/api.model";

export async function getEmbalsesFromDb(): Promise<Embalse[]> {
  try {
    console.log("[embalse-search] getEmbalsesFromDb: querying MongoDB...");
    const db = await getDb();
    const docs = await db
      .collection("embalses")
      .find(
        {},
        {
          projection: {
            _id: 1,
            nombre: 1,
            provincia: 1,
            slug: 1,
          },
        },
      )
      .toArray();

    console.log(`[embalse-search] getEmbalsesFromDb: found ${docs.length} documents`);
    return docs.map((doc) => ({
      _id: doc.slug ?? createSlug(doc.nombre ?? ""),
      nombre: doc.nombre ?? "",
      provincia: doc.provincia ?? "",
    }));
  } catch (error) {
    console.warn(
      "getEmbalsesFromDb: MongoDB not available (build time?), returning empty array.",
      "Error:", error instanceof Error ? error.message : error
    );
    return [];
  }
}

const createSlug = (nombre: string): string => {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
