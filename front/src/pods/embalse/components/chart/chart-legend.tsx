import React from "react";
import { color, monthsNames } from "./constants";

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
    <div className="card card-border max-w-90 gap-3 pt-3 pr-2 pb-3 pl-2 md:p-3">
      <div className="grid grid-cols-5 items-center gap-4">
        <div
          className="h-4 w-4 justify-self-center rounded-t-sm"
          style={{
            backgroundColor: color.actualAverage,
          }}
        ></div>
        <div className="col-span-4">
          <span>Agua embalsada:</span>
          <span className="pl-1 font-black">{currentLevel} Hm³</span>
        </div>
      </div>
      {averageOneYearAgo && (
        <div className="grid grid-cols-5 items-center gap-1">
          <div
            className={`pr-2 text-3xl font-black`}
            style={{ color: color.averageLastYear }}
          >
            ----
          </div>
          <div className="col-span-4">
            <span>
              Media en {monthsNames[monthOneYearAgo - 1]} de {yearOneYearAgo}:
            </span>
            <span className="pl-1 font-black">{averageOneYearAgo} Hm³</span>
          </div>
        </div>
      )}
      {averageTenYearsAgo && (
        <div className="grid grid-cols-5 items-center gap-1">
          <div
            className="justify-center pr-2 text-3xl font-black"
            style={{ color: color.averageLast10Years }}
          >
            ·······
          </div>
          <div className="col-span-4">
            <span>
              Media en {monthsNames[monthTenYearsAgo - 1]} de {yearTenYearsAgo}:
            </span>
            <span className="pl-1 font-black">{averageTenYearsAgo} Hm³</span>
          </div>
        </div>
      )}
    </div>
  );
};
