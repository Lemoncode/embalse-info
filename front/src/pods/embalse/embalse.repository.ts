"use server";

import { getDb } from "@/lib/mongodb";
import type { Embalse } from "db-model";
import * as ApiModel from "./api";
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

/**
 * Obtain the monthly average for the last year.
 * @param name:string Reservoir name
 * @returns ReservoirHistoryModelApi:
 */
export const getAverageLastYearByMonth = async (
  reservoirName: string,
  month: number,
): Promise<ApiModel.ReservoirLastYearModel> => {
  try {
    const db = await getDb();
    const results = await db
      .collection<ApiModel.ReservoirLastYearModel>(
        "embalsesPromedioHistoricoPorMeses",
      )
      .aggregate<ApiModel.ReservoirLastYearModel>([
        { $match: { embalse: reservoirName } },
        { $unwind: "$meses" },
        { $match: { "meses.mes": month } },
        {
          $project: {
            mes: "$meses.mes",
            promedio_agua_actual: "$meses.promedio_agua_actual",
          },
        },
        { $limit: 1 },
      ])
      .next();

    return results;
  } catch (error) {
    console.warn(
      "getAverageByMonths: MongoDB not available (build time?), returning empty array.",
      "Error:",
      error instanceof Error ? error.message : error,
    );
  }
};

/**
 * Obtain the average monthly and annual values ​​received per parameter
 *
 * @param name:string Reservoir name
 * @param month:number Month number (1-12)
 * @param year:number Year number (yyyy)
 * @returns HistoricalAverageReservoir:
 */
export const getAverageHistoricalByMonth = async (
  reservoirName: string,
  month: number,
  year: number,
): Promise<ApiModel.HistoricalAverageReservoir> => {
  try {
    const db = await getDb();
    const results = await db
      .collection<ApiModel.HistoricalAverageReservoir>(
        "embalsesPromedioHistoricoDiezAnios",
      )
      .aggregate<ApiModel.HistoricalAverageReservoir>([
        { $match: { embalse: reservoirName } },
        { $unwind: "$meses" },
        { $match: { "meses.año": year, "meses.mes": month } },
        {
          $project: {
            _id: 0,
            embalse: 1,
            año: "$meses.año",
            mes: "$meses.mes",
            promedio_agua_actual: "$meses.promedio_agua_actual",
          },
        },
      ])
      .next();

    return results;
  } catch (error) {
    console.warn(
      "getAverageHistorical: MongoDB not available (build time?), returning empty array.",
      "Error:",
      error instanceof Error ? error.message : error,
    );
    return;
  }
};
