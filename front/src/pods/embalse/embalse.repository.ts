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
 * Obtain the average for a given month across the last 10 years.
 *
 * @param name:string Reservoir name
 * @param month:number Month number (1-12)
 * @returns HistoricalAverageReservoir:
 */
export const getAverageHistoricalByMonth = async (
  reservoirName: string,
  month: number,
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
        {
          $match: {
            "meses.mes": month,
            "meses.año": { $lt: new Date().getFullYear() },
          },
        },
        {
          $group: {
            _id: null,
            embalse: { $first: "$embalse" },
            mes: { $first: "$meses.mes" },
            promedio_agua_actual: { $avg: "$meses.promedio_agua_actual" },
          },
        },
        {
          $project: {
            _id: 0,
            embalse: 1,
            mes: 1,
            promedio_agua_actual: { $round: ["$promedio_agua_actual", 2] },
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
