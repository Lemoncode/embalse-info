"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { calculateFilledAngle, drawArc } from "./gauge-arcs.business";
import { arcConfig, gaugeDimensions } from "./model";

interface GaugeArcsProps {
  percentage: number;
}

export const GaugeArcs = ({ percentage }: GaugeArcsProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Center position
    const centerX = gaugeDimensions.width / 2;
    const centerY = arcConfig.outerRadius;

    // Create centered group
    const arcGroup = svg
      .append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`);

    // 1. Background arc (--color-total-water, full)
    drawArc({
      arcGroup,
      endAngle: arcConfig.endAngle,
      fillColor: "var(--color-total-water)",
    });

    // 2. Filled arc (primary color, based on percentage prop)
    const filledEndAngle = calculateFilledAngle(percentage);
    drawArc({
      arcGroup,
      endAngle: filledEndAngle,
      fillColor: "var(--color-primary)",
    });
  }, [percentage]);

  return (
    <svg
      ref={svgRef}
      width={gaugeDimensions.width}
      height={gaugeDimensions.height}
    />
  );
};
