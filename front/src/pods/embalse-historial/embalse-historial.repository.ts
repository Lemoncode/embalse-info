"use server";

import { getDb } from "@/lib/mongodb";
import { ReservoirHistoryModel as ReservoirHistoryModelApi } from "./api/embalse-historial.api-model";

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
