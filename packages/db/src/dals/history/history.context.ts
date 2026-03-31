import { dbServer } from "#core/servers/index.js";
import type { HistoryLastYear, HistoryTenYearAgo } from "db-model";

export const getHistoryTenYearAgoContext = () =>
  dbServer.db?.collection<HistoryTenYearAgo>("embalsesPromedioHistoricoDiezAnios");

export const getHistoryLastYearContext = () =>
  dbServer.db?.collection<HistoryLastYear>("embalsesPromedioHistoricoPorMeses");
