"use server";

import { getDb } from "@/lib/mongodb";
import type { Embalse } from "db-model";
import { mapEmbalse } from "./embalse.repository.mapper";
export async function getEmbalseBySlug(slug: string): Promise<Embalse | null> {
  //conecta con BD y trae datos en base al slug
  const db = await getDb();
  const embalse = await db.collection<Embalse>("embalses").findOne({ slug });

  if (!embalse) {
    return null;
  }

  const mappedEmbalse = mapEmbalse(embalse);
  return mappedEmbalse;
}
