import * as d3 from "d3";
import { arcConfig } from "./model";

type ArcGroup = d3.Selection<SVGGElement, unknown, null, undefined>;

interface DrawArcParams {
  arcGroup: ArcGroup;
  endAngle: number;
  fillColor: string;
}

const createArcGenerator = (endAngle: number) => {
  return d3
    .arc()
    .innerRadius(arcConfig.innerRadius)
    .outerRadius(arcConfig.outerRadius)
    .startAngle(arcConfig.startAngle)
    .endAngle(endAngle)
    .cornerRadius(arcConfig.cornerRadius);
};

// TODO: add unit tests for calculateFilledAngle

export const calculateFilledAngle = (percentage: number): number => {
  // Ensure percentage is within valid range [0, 1]
  const normalized = Math.max(0, Math.min(1, percentage));
  // Total sweep of the arc (from start to end)
  const totalAngle = arcConfig.endAngle - arcConfig.startAngle;
  // Calculate where the filled arc should end based on percentage
  return arcConfig.startAngle + normalized * totalAngle;
};

export const drawArc = ({ arcGroup, endAngle, fillColor }: DrawArcParams) => {
  const arcGenerator = createArcGenerator(endAngle);

  arcGroup
    .append("path")
    .attr("d", arcGenerator as any)
    .style("fill", fillColor);
};
