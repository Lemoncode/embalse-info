import React from "react";
import {
  ReservoirCardDetail,
  ReservoirCardGauge,
  ReservoirCardInfo,
} from "./components";
import { MOCK_DATA } from "./embalse-mock-data";

interface Props {
  embalse: string;
}

export const Embalse: React.FC<Props> = (props) => {
  const { embalse } = props;
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-6">
        <ReservoirCardGauge name={embalse} reservoirData={MOCK_DATA} />
        <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg">
          <ReservoirCardInfo reservoirInfo={MOCK_DATA.reservoirInfo} />
        </div>
        <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg">
          <ReservoirCardDetail datosEmbalse={MOCK_DATA.datosEmbalse} />
        </div>
      </div>
    </div>
  );
};
