import {
  HistoryTenYearAgo
} from "db-model";
import { getHistoryTenYearAgoContext } from './history.context.js';

export const historyTenYearAgoRepository = {
  actualizarTenYearAgo: async (historyTenYearAgo: HistoryTenYearAgo): Promise<boolean> => {
    const { acknowledged } = await getHistoryTenYearAgoContext().insertOne(
      {
        embalse: historyTenYearAgo.embalse,
        meses: [...historyTenYearAgo.meses],
        metaData: {
          generatedAt: historyTenYearAgo.metaData.generatedAt,
          periodoInicio: historyTenYearAgo.metaData.periodoInicio,
          periodoFin: historyTenYearAgo.metaData.periodoFin
        }
      });
    return acknowledged;
  }
}
