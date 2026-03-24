"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ChartModel } from "./chart.vm";
import { color, sizeChart as s } from "./constants";
import { ChartLegend } from "./chart-legend";

export const HistoryChart: React.FC<ChartModel> = ({
  titleChart,
  reservoirName,
  currentLevel,
  maxCapacity,
  dataOneYearAgo,
  dataTenYearsAgo,
}) => {
  const svgRef = useRef(null);

  /**
   * Muestra etiqueta dentro de la barra si el porcentaje
   *    del nivel del embalse es superior a 10%.
   * Si es inferior, muestra la etiqueta encima de la barra.
   */
  const percentageActual = (currentLevel * 100) / maxCapacity;
  const isOutSide = percentageActual < 10;

  const showLabelActualLevel = (y) => {
    if (percentageActual < 10) {
      return y(percentageActual) - 8;
    } else {
      return y(percentageActual) + 20;
    }
  };
  useEffect(() => {
    // Declara SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // ESCALA X
    const x = d3
      .scaleBand()
      .domain([reservoirName])
      .range([s.margin.left, s.width - s.margin.right])
      .padding(0.2);

    // ESCALA Y
    const y = d3
      .scaleLinear()
      .domain([0, 105])
      .range([s.height - s.margin.bottom, s.margin.top]);

    // EJE Y
    /**
    svg
      .append("g")
      .attr("transform", `translate(${s.margin.left},0)`)
      .call(d3.axisLeft(y));

    // Etiqueta Eje Y (%)
    svg
      .append("g")
      .attr("transform", `translate(${s.margin.left},0)`)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -s.margin.left)
          .attr("y", s.margin.top / 2)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("(%)"),
      );
    **/

    // NIVEL ACTUAL
    const barGroup = svg
      .append("g")
      .attr("fill", color.actualAverage)
      .selectAll("g")
      .data([reservoirName])
      .enter()
      .append("g");

    const barX = x(reservoirName);
    const barY = y(percentageActual);
    const barWidth = x.bandwidth(); // Ancho de las barras
    const barHeight = y(0) - barY;
    const radius = 10; // Border-radius

    // Barra de nivel actual con esquinas redondeadas
    barGroup
      .append("rect")
      .attr("x", barX)
      .attr("y", barY)
      .attr("width", barWidth)
      .attr("height", barHeight)
      .attr("rx", radius);

    // Muestra una segunda barra con la mitad de altura. Elimina esquinas inferiores redondeadas
    barGroup
      .append("rect")
      .attr("x", barX)
      .attr("y", barY + barHeight / 2)
      .attr("width", barWidth) // Ancho de las barras
      .attr("height", barHeight / 2);

    // Label que indica nivel actual en Hm³
    barGroup
      .append("text")
      .attr("x", (d) => x(reservoirName) + x.bandwidth() / 2)
      .attr("y", (d) => showLabelActualLevel(y))
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("fill", isOutSide ? "#333" : "#FFF")
      .style("font-weight", "900")
      .text(`${currentLevel} Hm³`);

    // MEDIA AÑO ANTERIOR
    dataOneYearAgo &&
      svg
        .append("line")
        .attr("y1", y((dataOneYearAgo.average * 100) / maxCapacity))
        .attr("y2", y((dataOneYearAgo.average * 100) / maxCapacity))
        .attr("x1", x(reservoirName) - s.margin.left / 2)
        .attr("x2", x(reservoirName) * 2 + s.margin.left + s.margin.right)
        .attr("stroke", color.averageLastYear)
        .attr("stroke-width", 5) // Grosor línea
        .attr("stroke-dasharray", "12"); // Espaciado entre guiones

    // MEDIA HACE 10 AÑOS
    dataTenYearsAgo &&
      svg
        .append("line")
        .attr("y1", y((dataTenYearsAgo.average * 100) / maxCapacity))
        .attr("y2", y((dataTenYearsAgo.average * 100) / maxCapacity))
        .attr("x1", x(reservoirName) - s.margin.left / 2)
        .attr("x2", x(reservoirName) * 2 + s.margin.left + s.margin.right)
        .attr("stroke", color.averageLast10Years)
        .attr("stroke-width", 5) // Grosor línea
        .attr("stroke-dasharray", "3"); // Espaciado entre guiones

    // Línea y Etiqueta Eje X
    svg
      .append("g")
      .attr("transform", `translate(0,${s.height - s.margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0)) // sin marcas
      .call((ax) => ax.selectAll("text").remove()) // sin etiquetas
      .call((ax) => ax.select(".domain").attr("stroke", "#aaa")); // Muestra línea Eje X sin mostrar ningún nombre
  }, []);
  return (
    <div
      className="w-full items-center rounded-2xl p-1"
      aria-labelledby="gauge-title"
    >
      <h2 id="gauge-title" className="text-center">
        {titleChart}
      </h2>
      <div className="flex w-full flex-col items-center justify-evenly gap-3 md:flex-row">
        <div>
          <svg ref={svgRef} width={s.width} height={s.height} />
        </div>
        <ChartLegend
          currentLevel={currentLevel}
          monthOneYearAgo={dataOneYearAgo.month}
          yearOneYearAgo={dataOneYearAgo.year}
          averageOneYearAgo={dataOneYearAgo.average}
          monthTenYearsAgo={dataTenYearsAgo.month}
          yearTenYearsAgo={dataTenYearsAgo.year}
          averageTenYearsAgo={dataTenYearsAgo.average}
        />
      </div>
    </div>
  );
};
