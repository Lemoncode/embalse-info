import { dbServer } from "#core/servers/index.js";
import type { HistoryTenYearAgo } from "db-model";

export const getHistoryTenYearAgoContext = () =>
  dbServer.db?.collection<HistoryTenYearAgo>("embalsesPromedioHistoricoDiezAnios");
