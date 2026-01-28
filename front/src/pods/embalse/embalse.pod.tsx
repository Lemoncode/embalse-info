import React from "react";
import {
  ReservoirCardDetail,
  ReservoirCardGauge,
  ReservoirCardInfo,
} from "./components";
import { mockData } from "@/model/reservoir-data";

interface Props {
  embalse: string;
}

export const EmbalsePod: React.FC<Props> = (props) => {
  const { embalse } = props;

  const reservoirData = mockData;
  const datosEmbv = mockData.datosEmbalse;
  const reservoirInfo = mockData.reservoirInfo;

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-6">
        <ReservoirCardGauge
          name={embalse}
          currentVolume={reservoirData.currentVolume}
          totalCapacity={reservoirData.totalCapacity}
          measurementDate={reservoirData.measurementDate}
          datosEmbalse={datosEmbv}
          reservoirInfo={reservoirInfo}
        />
        <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg">
          <ReservoirCardInfo reservoirInfo={reservoirInfo} />
        </div>
        <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg">
          <ReservoirCardDetail datosEmbalse={datosEmbv} />
        </div>
      </div>
    </div>
  );
};
