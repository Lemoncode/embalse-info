import { GaugeChart } from "./gauge-chart.component";
import { GaugeLegend } from "./gauge-legend.component";

interface Props {
  name: string;
  percentage: number;
  measurementDate: string;
  currentVolume: number;
  totalCapacity: number;
}

export const ReservoirGauge = (props: Props) => {
  const { name, measurementDate, currentVolume, totalCapacity } = props;
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg">
      <h2 className="text-center">Embalse de {name}</h2>
      <GaugeChart percentage={0.67} measurementDate={measurementDate} />
      <GaugeLegend
        currentVolume={currentVolume}
        totalCapacity={totalCapacity}
      />
    </div>
  );
};
