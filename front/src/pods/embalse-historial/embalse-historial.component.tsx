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
    <section
      className="flex w-full flex-col gap-6 self-center pt-6 pr-4 pb-6 pl-4 md:max-w-225 md:flex-row md:flex-wrap md:gap-8 md:p-8"
      aria-labelledby="gauge-title"
    >
      <Chart
        key={statisticsLastYear.id}
        data={statisticsLastYear}
        maxCapacity={maxCapacity}
        title="Promedio por meses de los últimos 10 años"
      />
    </section>
  );
};
