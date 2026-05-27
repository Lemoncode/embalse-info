import * as d3 from "d3";
import { ChartModel } from "./chart.vm";
import { sizeChart as s } from "./chart.constants";
import { ChartLegend } from "./chart-legend";
import { BarRoundedTop, ReferenceLine } from "./chart.helpers";

export const HistoryChart: React.FC<ChartModel> = ({
  titleChart,
  reservoirData,
  dataOneYearAgo,
  dataTenYearsAgo,
}) => {
  // 1. Aseguramos límites lógicos (0% - 100%)
  let percentageActual =
    (reservoirData.currentVolume * 100) / reservoirData.totalCapacity;
  if (percentageActual > 100) percentageActual = 100;
  if (percentageActual < 0) percentageActual = 0;

  const isOutside = percentageActual < 10;

  // 2. Cálculo de escalas
  const x = d3
    .scaleBand()
    .domain([reservoirData.nombre])
    .range([s.margin.left, s.width - s.margin.right])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, 105])
    .range([s.height - s.margin.bottom, s.margin.top]);

  const barX = x(reservoirData.nombre) || 0;
  const barWidth = x.bandwidth();

  // 3. Cálculos de altura base (protegidos con Math.max para evitar negativos)
  const barY = y(percentageActual);
  const barHeight = Math.max(0, y(0) - barY);
  const bgBarHeight = Math.max(0, y(0) - y(100)); // Altura total para el 100%

  // Extremos compartidos por las líneas de referencia
  const refX1 = barX - s.margin.left / 2;
  const refX2 = barX * 2 + s.margin.left + s.margin.right;

  // Etiqueta
  const labelY = isOutside ? barY - 8 : barY + 20;

  return (
    <section
      className="card bg-base-100 mx-auto w-full items-center rounded-2xl md:gap-4 md:p-4 md:shadow-lg"
      aria-labelledby="gauge-title"
    >
      <h2 id="gauge-title" className="text-center">
        {titleChart}
      </h2>

      <svg width={s.width} height={s.height}>
        {/* Indicador de capacidad total (100%) Animado */}
        <rect
          x={barX}
          y={y(100)}
          width={barWidth}
          height={bgBarHeight}
          rx={s.radius}
          fill="var(--color-total-water)"
        >
          {/* Anima la posición Y desde la base hacia arriba */}
          <animate
            attributeName="y"
            from={y(0)}
            to={y(100)}
            dur="800ms"
            begin="0ms"
            fill="freeze"
          />
          {/* Anima la altura desde 0 hasta la altura total */}
          <animate
            attributeName="height"
            from="0"
            to={bgBarHeight}
            dur="800ms"
            begin="0ms"
            fill="freeze"
          />
        </rect>

        {/* Nivel actual */}
        <BarRoundedTop
          x={barX}
          y={barY}
          width={barWidth}
          height={barHeight}
          bottomY={y(0)}
          delay="300ms"
          fill="var(--color-primary)"
        />

        {/* Línea de referencia: año anterior */}
        {dataOneYearAgo && (
          <ReferenceLine
            yPos={y(
              Math.max(
                0,
                (dataOneYearAgo.average * 100) / reservoirData.totalCapacity,
              ),
            )}
            x1={refX1}
            x2={refX2}
            stroke={"var(--line-average-last-year)"}
            dashArray="12"
            delay="600ms"
          />
        )}

        {/* Línea de referencia: hace 10 años */}
        {dataTenYearsAgo && (
          <ReferenceLine
            yPos={y(
              Math.max(
                0,
                (dataTenYearsAgo.average * 100) / reservoirData.totalCapacity,
              ),
            )}
            x1={refX1}
            x2={refX2}
            stroke={"var(--line-average-last-ten-years)"}
            dashArray="4"
            delay="800ms"
          />
        )}

        {/* Etiqueta con el nivel actual (Le añadimos fade-in para que no salga antes que la barra) */}
        <text
          x={barX + barWidth / 2}
          y={labelY}
          textAnchor="middle"
          fontSize="16px"
          fill="var(--color-brand-100)"
          fontWeight="900"
          opacity="0"
        >
          {reservoirData.currentVolume} Hm³
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="400ms"
            begin="800ms"
            fill="freeze"
          />
        </text>

        {/* Eje X */}
        <line
          x1={s.margin.left}
          x2={s.width - s.margin.right}
          y1={s.height - s.margin.bottom}
          y2={s.height - s.margin.bottom}
          stroke="#aaa"
        />
      </svg>

      <ChartLegend
        currentLevel={reservoirData.currentVolume}
        dataOneYearAgo={dataOneYearAgo}
        dataTenYearsAgo={dataTenYearsAgo}
      />
    </section>
  );
};
