import { HistoryTenYearAgo, MonthyTenYearAgo } from 'db-model';

export const mapFromMonthyTenYearAgoToHistoryTenYearAgo = (nombreEmbalse: string, monthyList: MonthyTenYearAgo[]): HistoryTenYearAgo => {
  const START_YEAR = new Date().getFullYear() - 10;
  const START_MONTH = new Date().getMonth();
  const END_YEAR = new Date().getFullYear();
  const END_MONTH = new Date().getMonth();

  return {
    embalse: nombreEmbalse,
    meses: monthyList.map(monthy => ({
      año: monthy.año,
      mes: monthy.mes,
      promedio_agua_actual: monthy.promedio_agua_actual
    })),
    metaData: {
      generatedAt: new Date().toISOString(),
      periodoInicio: `${START_YEAR}-${String(START_MONTH).padStart(2, "0")}`,
      periodoFin: `${END_YEAR}-${String(END_MONTH).padStart(2, "0")}`,
    }
  }
}
