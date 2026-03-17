import React from "react";
import { Embalse } from "./embalse.component";
import { ReservoirData, ReservoirInfo } from "./embalse.vm";
import {
  EmbalseHistorialPod,
  ReservoirHistoryModel,
} from "../embalse-historial";

interface Props {
  reservoirData: ReservoirData;
  reservoirHistoryLastYear: ReservoirHistoryModel;
}
export const EmbalsePod: React.FC<Props> = (props) => {
  const { reservoirData, reservoirHistoryLastYear } = props;
  return (
    <>
      <Embalse reservoirData={reservoirData} />
      <EmbalseHistorialPod
        reservoirHistoryLastYear={reservoirHistoryLastYear}
        maxCapacity={reservoirData.totalCapacity}
      />
    </>
  );
};
