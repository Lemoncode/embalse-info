import React from "react";
import { sizeChart as s } from "./chart.constants";

interface BarRoundedTopProps {
  x: number;
  y: number;
  width: number;
  height: number;
  bottomY: number;
  fill: string;
  delay?: string;
}

export const BarRoundedTop: React.FC<BarRoundedTopProps> = ({
  x,
  y,
  width,
  height,
  fill,
  bottomY = y,
  delay = "0ms",
}): React.ReactNode => {
  return (
    // Agregamos opacidad inicial a 0 al grupo para el fade-in
    <g fill={fill} opacity="0">
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur="400ms"
        begin={delay}
        fill="freeze"
      />

      {/* Barra principal (redondeada) */}
      {/* Empieza en bottomY con altura 0 */}
      <rect x={x} y={bottomY} width={width} height={0} rx={s.radius}>
        <animate
          attributeName="y"
          from={bottomY}
          to={y}
          dur="800ms"
          begin={delay}
          fill="freeze"
        />
        <animate
          attributeName="height"
          from="0"
          to={height}
          dur="800ms"
          begin={delay}
          fill="freeze"
        />
      </rect>

      {/* Barra inferior (cuadrada) para tapar el radio inferior */}
      {/* También empieza en bottomY con altura 0 y crece sincrónicamente */}
      <rect x={x} y={bottomY} width={width} height={0}>
        <animate
          attributeName="y"
          from={bottomY}
          to={y + height / 2}
          dur="800ms"
          begin={delay} // Mismo delay para que no se desfase
          fill="freeze"
        />
        <animate
          attributeName="height"
          from="0"
          to={height / 2}
          dur="800ms"
          begin={delay} // Misma duración
          fill="freeze"
        />
      </rect>
    </g>
  );
};

export const ReferenceLine: React.FC<{
  yPos: number;
  x1: number;
  x2: number;
  stroke: string;
  dashArray: string;
  bottomY?: number;
  delay?: string;
}> = ({ yPos, x1, x2, stroke, dashArray, bottomY = yPos, delay = "0ms" }) => (
  // Quitamos el opacity={0} del <g> para no bloquear la animación de los hijos
  <g>
    <line
      y1={bottomY}
      y2={bottomY}
      x1={x1}
      x2={x2}
      stroke={stroke}
      strokeWidth={5}
      strokeDasharray={dashArray}
      opacity="0" // La opacidad inicial se la damos directamente a la línea
    >
      <animate
        attributeName="y1"
        from={bottomY}
        to={yPos}
        dur="800ms"
        begin={delay}
        fill="freeze"
      />
      <animate
        attributeName="y2"
        from={bottomY}
        to={yPos}
        dur="800ms"
        begin={delay}
        fill="freeze"
      />
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur="600ms"
        begin={delay}
        fill="freeze"
      />
    </line>
  </g>
);
