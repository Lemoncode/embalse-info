import { ReservoirData } from "../../../model/reservoir-data";
import { GaugeChart } from "./gauge-chart";
import { GaugeLegend } from "./gauge-legend.component";

interface Props extends ReservoirData {
  name: string;
}

export const ReservoirGauge = ({
  name,
  currentVolume,
  totalCapacity,
  measurementDate,
}: Props) => {
  // const percentage = currentVolume / totalCapacity;
  // TODO: replace hardcoded % for real reservoir filled water percentage

  return (
    <div className="card bg-base-100 items-center gap-6 p-4">
      <h2>Embalse de {name}</h2>
      <GaugeChart percentage={0.67} measurementDate={measurementDate} />
      <GaugeLegend
        currentVolume={currentVolume}
        totalCapacity={totalCapacity}
      />
    </div>
  );
};
