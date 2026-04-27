import React from "react";
import { sizeChart as s } from "./chart.constants";

interface barRoundedTopProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}
export const BarRoundedTop: React.FC<barRoundedTopProps> = ({
  x,
  y,
  width,
  height,
  fill,
}): React.ReactNode => {
  return (
    <g fill={fill}>
      {/* Barra según porcentaje con esquinas redondeadas */}
      <rect x={x} y={y} width={width} height={height} rx={s.radius} />
      {/* Barra inferior sin redondeo para aplanar la base */}
      <rect x={x} y={y + height / 2} width={width} height={height / 2} />
    </g>
  );
};

export const ReferenceLine: React.FC<{
  yPos: number;
  x1: number;
  x2: number;
  stroke: string;
  dashArray: string;
}> = ({ yPos, x1, x2, stroke, dashArray }) => (
  <line
    y1={yPos}
    y2={yPos}
    x1={x1}
    x2={x2}
    stroke={stroke}
    strokeWidth={5}
    strokeDasharray={dashArray}
  />
);
