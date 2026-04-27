import { dbServer } from "#core/servers/index.js";
import {
  HistoricalLastYear,
  HistoricalTenYearsAgo,
} from "#console-runners/historical-seed/types.js";

export const getHistoricalTenYearsAgoContext = () =>
  dbServer.db?.collection<HistoricalTenYearsAgo>(
    "embalsesPromedioHistoricoDiezAnios",
  );

export const getHistoricalLastYearContext = () =>
  dbServer.db?.collection<HistoricalLastYear>(
    "embalsesPromedioHistoricoPorMeses",
  );
