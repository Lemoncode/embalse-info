import React from "react";
import { ReservoirHistoryModel } from "./embalse-historial.vm";
import { EmbalseHistorialComponent } from "./embalse-historial.component";

interface Props {
  reservoirHistoryLastYear: ReservoirHistoryModel;
}

export const EmbalseHistorialPod: React.FC<Props> = ({
  reservoirHistoryLastYear,
}) => {
  return (
    <EmbalseHistorialComponent statisticsLastYear={reservoirHistoryLastYear} />
  );
};
