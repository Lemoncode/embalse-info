import React from "react";
import { color } from "./constants";

interface Props {
  currentLevel: number;
  averageLastYear: number;
  averageHistory: number;
}
export const ChartLegend: React.FC<Props> = (props) => {
  const { currentLevel, averageLastYear, averageHistory } = props;

  return (
    <div className="card card-border gap-2 pt-3 pr-2 pb-3 pl-2">
      <div className="flex flex-row justify-center gap-3">
        <div
          className="h-4 w-4"
          style={{
            backgroundColor: color.actualAverage,
          }}
        ></div>
        <div>Agua embalsada: {currentLevel} Hm³</div>
      </div>
      <div className="flex flex-row gap-1">
        <div
          className={`pr-2 text-2xl font-black`}
          style={{ color: color.averageLastYear }}
        >
          -----
        </div>
        <span>Media año anterior: {averageLastYear.toFixed(2)} Hm³</span>
      </div>
      <div className="flex flex-row gap-1">
        <div
          className="pr-2 text-2xl font-black"
          style={{ color: color.averageLast10Years }}
        >
          -----
        </div>
        <span>Media histórica: {averageHistory} Hm³</span>
      </div>
    </div>
  );
};
