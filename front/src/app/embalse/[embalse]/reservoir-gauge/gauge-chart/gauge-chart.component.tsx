import { gaugeDimensions } from "./components/model";
import { GaugeInformation } from "./components";
import { GaugeArcs } from "./components/gauge-arcs.component";

interface Props {
  percentage: number;
  measurementDate: string;
}

export const GaugeChart = ({ percentage, measurementDate }: Props) => {
  return (
    <div
      className="relative"
      style={{
        width: gaugeDimensions.width,
        height: gaugeDimensions.height,
      }}
    >
      {/* The SVG arc */}
      <GaugeArcs percentage={percentage} />

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <GaugeInformation
          percentage={percentage}
          measurementDate={measurementDate}
        />
      </div>
    </div>
  );
};
