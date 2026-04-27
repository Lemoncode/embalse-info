import React from "react";
import {
  ReservoirCardDetail,
  ReservoirCardGauge,
  ReservoirCardInfo,
  HistoryChart,
} from "./components";
import {
  ReservoirData,
  DataLastYearModel,
  HistoricalAverageReservoir,
} from "./embalse.vm";
interface Props {
  reservoirData: ReservoirData;
  dataOneYearAgo: DataLastYearModel;
  dataTenYearsAgo: HistoricalAverageReservoir;
}
/**   
    La prop name de ReservoirCardGauge ahora recibe reservoirData.nombre (el nombre real del embalse desde la BD).
    El resto de componentes hijos (ReservoirCardInfo, ReservoirCardDetail) reciben los datos mapeados
   */

export const Embalse: React.FC<Props> = (props) => {
  const { reservoirData, dataOneYearAgo, dataTenYearsAgo } = props;

  return (
    <div className="flex flex-col gap-6 self-center pt-6 pr-4 pb-6 pl-4 md:max-w-[900px] md:flex-row md:flex-wrap md:gap-8 md:p-8">
      <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl shadow-lg md:order-1 md:w-[calc(50%-16px)]">
        <ReservoirCardGauge
          name={reservoirData.nombre}
          reservoirData={reservoirData}
          dataOneYearAgo={dataOneYearAgo}
          dataTenYearsAgo={dataTenYearsAgo}
        />
      </div>
      <div className="card bg-base-100 mx-auto hidden w-full max-w-100 items-center gap-6 rounded-2xl shadow-lg md:order-2 md:block md:w-[calc(50%-16px)]">
        <HistoryChart
          titleChart="Histórico"
          reservoirData={reservoirData}
          dataOneYearAgo={dataOneYearAgo}
          dataTenYearsAgo={dataTenYearsAgo}
        />
      </div>
      {reservoirData.reservoirInfo && (
        <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg md:order-4 md:max-w-[900px]">
          <ReservoirCardInfo reservoirInfo={reservoirData.reservoirInfo} />
        </div>
      )}

      {reservoirData.datosEmbalse.mapUrl && (
        <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg md:order-5 md:max-w-[900px]">
          <iframe
            title={`Mapa del embalse ${reservoirData.nombre}`}
            src={reservoirData.datosEmbalse.mapUrl}
            width="100%"
            height="300"
            className="rounded-lg border-0"
          ></iframe>
        </div>
      )}

      <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg md:order-3 md:max-w-225">
        <ReservoirCardDetail datosEmbalse={reservoirData.datosEmbalse} />
      </div>
    </div>
  );
};
