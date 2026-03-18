import React from "react";
import { Embalse } from "./embalse.component";
import { ReservoirData, ReservoirHistoryModel } from "./embalse.vm";

interface Props {
  reservoirData: ReservoirData;
  reservoirHistoryLastYear: ReservoirHistoryModel;
}
export const EmbalsePod: React.FC<Props> = (props) => {
  const { reservoirData, reservoirHistoryLastYear } = props;
  return (
    <>
      <Embalse
        reservoirData={reservoirData}
        statisticsLastYear={reservoirHistoryLastYear}
      />
    </>
  );
};
