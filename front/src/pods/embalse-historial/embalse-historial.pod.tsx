import React from "react";
import { ReservoirHistoryModel } from "./embalse-historial.vm";
import { EmbalseHistorialComponent } from "./embalse-historial.component";

interface Props {
  reservoirHistoryLastYear: ReservoirHistoryModel;
  maxCapacity: number;
}

export const EmbalseHistorialPod: React.FC<Props> = ({
  reservoirHistoryLastYear,
  maxCapacity,
}) => {
  return (
    <EmbalseHistorialComponent
      statisticsLastYear={reservoirHistoryLastYear}
      maxCapacity={maxCapacity}
    />
  );
};
