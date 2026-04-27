import React from "react";
import { Embalse } from "./embalse.component";
import {
  DataLastYearModel,
  HistoricalAverageReservoir,
  ReservoirData,
} from "./embalse.vm";

interface Props {
  reservoirData: ReservoirData;
  dataOneYearAgo: DataLastYearModel;
  dataTenYearsAgo: HistoricalAverageReservoir;
}

export const EmbalsePod: React.FC<Props> = (props) => {
  const { reservoirData, dataOneYearAgo, dataTenYearsAgo } = props;
  return (
    <>
      <Embalse
        reservoirData={reservoirData}
        dataOneYearAgo={dataOneYearAgo}
        dataTenYearsAgo={dataTenYearsAgo}
      />
    </>
  );
};
