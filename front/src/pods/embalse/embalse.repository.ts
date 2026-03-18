"use server";

import { getDb } from "@/lib/mongodb";
import type { Embalse } from "db-model";
import { ReservoirHistoryModel as ReservoirHistoryModelApi } from "./api";
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

export const getHistorialPromedioPorMeses = async (
  name: string,
): Promise<ReservoirHistoryModelApi> => {
  try {
    const db = await getDb();
    const statisticsLastYear = await db
      .collection<ReservoirHistoryModelApi>("embalsesPromedioHistoricoPorMeses")
      .findOne({ embalse: name });

    return statisticsLastYear;
  } catch (error) {
    console.warn(
      "getHistorialPromedioPorMeses: MongoDB not available (build time?), returning empty array.",
      "Error:",
      error instanceof Error ? error.message : error,
    );
  }
};
