"use client";
import React from "react";
import { ReservoirHistoryModel } from "./embalse-historial.vm";
import { Chart } from "./component/chart";

interface Props {
  statisticsLastYear: ReservoirHistoryModel;
  maxCapacity: number;
}
export const EmbalseHistorialComponent: React.FC<Props> = (props) => {
  const { statisticsLastYear, maxCapacity } = props;

  return (
    <>
      <Chart
        key={statisticsLastYear.id}
        data={statisticsLastYear}
        maxCapacity={maxCapacity}
      />
    </>
  );
};
