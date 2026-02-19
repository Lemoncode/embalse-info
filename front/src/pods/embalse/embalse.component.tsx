import React from "react";
import {
  ReservoirCardDetail,
  ReservoirCardGauge,
  ReservoirCardInfo,
} from "./components";
import { ReservoirData } from "./embalse.vm";
interface Props {
  reservoirData: ReservoirData;
}
/**   
    La prop name de ReservoirCardGauge ahora recibe reservoirData.nombre (el nombre real del embalse desde la BD).
    El resto de componentes hijos (ReservoirCardInfo, ReservoirCardDetail) reciben los datos mapeados
   */

export const Embalse: React.FC<Props> = (props) => {
  const { reservoirData } = props;
  return (
    <div className="flex flex-col gap-8 self-center p-8 md:max-w-[900px] md:flex-row md:flex-wrap md:gap-6">
      <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl shadow-lg md:order-1 md:w-[calc(50%-12px)]">
        <ReservoirCardGauge
          name={reservoirData.nombre}
          reservoirData={reservoirData}
        />
      </div>

      <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg md:order-3 md:max-w-[900px]">
        <ReservoirCardInfo />
      </div>
      <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg md:order-2 md:w-[calc(50%-12px)]">
        <ReservoirCardDetail datosEmbalse={reservoirData.datosEmbalse} />
      </div>
    </div>
  );
};
