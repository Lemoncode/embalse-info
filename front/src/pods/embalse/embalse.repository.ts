"use server";

import { getDb } from "@/lib/mongodb";
import type { Embalse } from "db-model";
import { repositoryMapper } from "./embalse.repository.mapper";
export async function getEmbalseBySlug(slug: string): Promise<Embalse | null> {
    //conecta con BD y trae datos en base al slug
  const db = await getDb();
  const doc = await db.collection("embalses").findOne({ slug });

  if (!doc) {
    return null;
  }
  //mapea el resultado de la BD al tipo Embalse y nos aseguramos de que lleven los tipos correctos (tienen que ser primitivos)
  const mappedDoc = repositoryMapper(doc as unknown as Embalse);
  return mappedDoc;
    
  };

