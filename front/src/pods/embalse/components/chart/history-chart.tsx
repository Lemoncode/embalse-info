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
  let percentageActual =
    (reservoirData.currentVolume * 100) / reservoirData.totalCapacity;
  if (percentageActual > 100) {
    percentageActual = 100;
  }
  const isOutside = percentageActual < 10;
  // Cálculo de escalas
  const x = d3
    .scaleBand()
    .domain([reservoirData.nombre])
    .range([s.margin.left, s.width - s.margin.right])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, 105])
    .range([s.height - s.margin.bottom, s.margin.top]);

  const barX = x(reservoirData.nombre);
  const barWidth = x.bandwidth();
  const barY = y(percentageActual);
  const barHeight = y(0) - barY;

  // Extremos compartidos por las líneas de referencia
  const refX1 = barX - s.margin.left / 2;
  const refX2 = barX * 2 + s.margin.left + s.margin.right;

  // Etiqueta: encima de la barra si el nivel es muy bajo (<10%), dentro si no
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
        {/* Indicador de capacidad total (100%) */}
        <rect
          x={barX}
          y={y(100)}
          width={barWidth}
          height={y(barHeight / 2)}
          rx={s.radius}
          fill="var(--color-total-water)"
        />

        {/* Nivel actual */}
        <BarRoundedTop
          x={barX}
          y={barY}
          width={barWidth}
          height={barHeight}
          fill="var(--color-primary)"
        />

        {/* Línea de referencia: mismo mes del año anterior */}
        {dataOneYearAgo && (
          <ReferenceLine
            yPos={y(
              (dataOneYearAgo.average * 100) / reservoirData.totalCapacity,
            )}
            x1={refX1}
            x2={refX2}
            stroke={"var(--line-average-last-year)"}
            dashArray="12"
          />
        )}

        {/* Línea de referencia: mismo mes hace 10 años */}
        {dataTenYearsAgo && (
          <ReferenceLine
            yPos={y(
              (dataTenYearsAgo.average * 100) / reservoirData.totalCapacity,
            )}
            x1={refX1}
            x2={refX2}
            stroke={"var(--line-average-last-ten-years)"}
            dashArray="4"
          />
        )}
        {/* Etiqueta con el nivel actual en Hm³ */}
        <text
          x={barX + barWidth / 2}
          y={labelY}
          textAnchor="middle"
          fontSize="16px"
          fill={
            isOutside ? "var(--color-base-content)" : "var(--color-brand-100)"
          }
          fontWeight="900"
        >
          {reservoirData.currentVolume} Hm³
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
