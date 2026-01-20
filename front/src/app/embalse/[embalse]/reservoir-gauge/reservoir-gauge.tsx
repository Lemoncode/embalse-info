import { ReservoirData } from "../../../model/reservoir-data";
import { GaugeChart } from "./gauge-chart";
import { GaugeDetailsSkeleton } from "./gauge-details.component";
import { GaugeLegend } from "./gauge-legend.component";
import { ReservoirInfo } from "./gauge-info.component";

interface Props extends ReservoirData {
  name: string;
}

export const ReservoirGauge = ({
  name,
  currentVolume,
  totalCapacity,
  measurementDate,
  datosEmbalse,
  reservoirInfo
}: Props) => {
  // const percentage = currentVolume / totalCapacity;
  // TODO: replace hardcoded % for real reservoir filled water percentage

  return (
    <div className="space-y-6">     
      <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg">
        <h2 className="text-center">Embalse de {name}</h2>
        <GaugeChart percentage={0.67} measurementDate={measurementDate} />
        <GaugeLegend
          currentVolume={currentVolume}
          totalCapacity={totalCapacity}
        />
      </div>
      <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg">  
        <ReservoirInfo reservoirInfo={reservoirInfo} />
      </div>
      <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg">  
        <GaugeDetailsSkeleton datosEmbalse={datosEmbalse} />
      </div>
        
    </div>
  );
};
