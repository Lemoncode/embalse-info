import { ReservoirData } from "../embalse.vm";
import { GaugeChart } from "./reservoir-gauge";
import { GaugeLegend } from "./reservoir-gauge/gauge-chart/components/gauge-legend.component";

interface Props {
  name: string;
  reservoirData: ReservoirData;
}

export const ReservoirCardGauge: React.FC<Props> = (props) => {
  const { name, reservoirData } = props;
  const { currentVolume, totalCapacity, measurementDate } = reservoirData;
  const percentage = totalCapacity > 0 ? currentVolume / totalCapacity : 0;

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg">
      <h2 className="text-center">{name}</h2>
      <GaugeChart percentage={percentage} measurementDate={measurementDate} />
      <GaugeLegend
        currentVolume={currentVolume}
        totalCapacity={totalCapacity}
      />
    </div>
  );
};
