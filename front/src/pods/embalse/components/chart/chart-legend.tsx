import React from "react";
import { monthsNames } from "./chart.constants";
import {
  DataLastYearModel,
  HistoricalAverageReservoir,
} from "@/pods/embalse/embalse.vm";

interface Props {
  currentLevel: number;
  dataOneYearAgo: DataLastYearModel;
  dataTenYearsAgo: HistoricalAverageReservoir;
}
export const ChartLegend: React.FC<Props> = ({
  currentLevel,
  dataOneYearAgo,
  dataTenYearsAgo,
}) => {
  return (
    <div className="flex w-full flex-col items-start pt-1">
      <div className="flex h-8 flex-row items-center gap-2">
        <div className="h-2 w-9.5 rounded-t-sm bg-(--color-primary)"></div>
        <div>
          <span className="text-base-content text-base">Embalsada:</span>
          <span className="pl-1">{currentLevel} Hm³</span>
        </div>
      </div>
      {dataOneYearAgo.average && (
        <div className="flex h-8 flex-row items-center gap-2">
          <div className="mx-auto h-0.5 w-10 border-t-4 border-dashed border-(--line-average-last-year)" />
          <div>
            <span>
              {monthsNames[dataOneYearAgo.month - 1]} de {dataOneYearAgo.year}:
            </span>
            <span className="pl-1">{dataOneYearAgo.average} Hm³</span>
          </div>
        </div>
      )}
      {dataTenYearsAgo.average && (
        <div className="flex h-8 flex-row items-center gap-2">
          <div className="mx-auto h-0.5 w-10 border-t-4 border-dotted border-(--line-average-last-ten-years)" />
          <div>
            <span>
              Media {monthsNames[dataTenYearsAgo.month - 1]} (10 años):
            </span>
            <span className="pl-1">{dataTenYearsAgo.average} Hm³</span>
          </div>
        </div>
      )}
    </div>
  );
};
