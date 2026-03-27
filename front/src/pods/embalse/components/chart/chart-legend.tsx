import React from "react";
import { monthsNames } from "./chart.constants";
import { ReferenceLine } from "./chart.helpers";

interface Props {
  currentLevel: number;
  monthOneYearAgo: number;
  yearOneYearAgo: number;
  averageOneYearAgo: number;
  monthTenYearsAgo: number;
  yearTenYearsAgo: number;
  averageTenYearsAgo: number;
}
export const ChartLegend: React.FC<Props> = (props) => {
  const {
    currentLevel,
    monthOneYearAgo,
    yearOneYearAgo,
    averageOneYearAgo,
    monthTenYearsAgo,
    yearTenYearsAgo,
    averageTenYearsAgo,
  } = props;

  return (
    <div className="flex w-full flex-col items-start pt-1">
      <div className="flex h-8 flex-row items-center gap-2">
        <div className="h-2 w-9.5 rounded-t-sm bg-(--color-primary)"></div>
        <div>
          <span className="text-base-content text-base">Embalsada:</span>
          <span className="pl-1">{currentLevel} Hm³</span>
        </div>
      </div>
      {averageOneYearAgo && (
        <div className="flex h-8 flex-row items-center gap-2">
          <div className="mx-auto h-0.5 w-10 border-t-4 border-dashed border-(--line-average-last-year)" />
          <div>
            <span>
              {monthsNames[monthOneYearAgo - 1]} de {yearOneYearAgo}:
            </span>
            <span className="pl-1">{averageOneYearAgo} Hm³</span>
          </div>
        </div>
      )}
      {averageTenYearsAgo && (
        <div className="flex h-8 flex-row items-center gap-2">
          <div className="mx-auto h-0.5 w-10 border-t-4 border-dotted border-(--line-average-last-ten-years)" />
          <div>
            <span>
              {monthsNames[monthTenYearsAgo - 1]} de {yearTenYearsAgo}:
            </span>
            <span className="pl-1">{averageTenYearsAgo} Hm³</span>
          </div>
        </div>
      )}
    </div>
  );
};
