"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ChartModel } from "./chart.vm";
import { color, sizeChart as s } from "./constants";
import { ChartLegend } from "./chart-legend";

export const ChartHistory: React.FC<ChartModel> = ({
  data,
  currentLevel,
  maxCapacity,
  averageLastYear,
  averageHistory,
  title,
}) => {
  console.log("DATA: ", data);
  const percentageLastYear = (averageLastYear * 100) / maxCapacity;

  const svgRef = useRef(null);

  useEffect(() => {
    // Declara SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // ESCALA X
    const x = d3
      .scaleBand()
      .domain([data.reservoir])
      .range([s.margin.left, s.width - s.margin.right])
      .padding(0.2);

    // ESCALA Y
    const y = d3
      .scaleLinear()
      .domain([0, 105])
      .range([s.height - s.margin.bottom, s.margin.top]);

    // Agrega Eje Y
    svg
      .append("g")
      .attr("transform", `translate(${s.margin.left},0)`)
      .call(d3.axisLeft(y));

    // BARRA DE NIVEL ACTUAL
    svg
      .append("g")
      .attr("fill", color.actualAverage)
      .selectAll("rect")
      .data([data])
      .enter()
      .append("rect")
      .attr("width", x.bandwidth()) // Ancho de las barras
      .attr("height", (d) => y(0) - y((currentLevel * 100) / maxCapacity))
      .attr("x", (d) => x(data.reservoir))
      .attr("y", (d) => y((currentLevel * 100) / maxCapacity)); // Muestra % de la media según capacidad máxima del embalse y no los Hm3

    // TODO: Media % Último año
    svg
      .append("line")
      .attr("y1", y((averageLastYear * 100) / maxCapacity))
      .attr("y2", y((averageLastYear * 100) / maxCapacity))
      .attr("x1", x(data.reservoir) - s.margin.left / 2)
      .attr("x2", x(data.reservoir) * 2 + s.margin.left + s.margin.right)
      .attr("stroke", color.averageLastYear)
      .attr("stroke-width", 2.5)
      .attr("stroke-dasharray", "7");

    // Media 10 años: línea vertical discontinua gris
    svg
      .append("line")
      .attr("y1", y((averageHistory * 100) / maxCapacity))
      .attr("y2", y((averageHistory * 100) / maxCapacity))
      .attr("x1", x(data.reservoir) - s.margin.left / 2)
      .attr("x2", x(data.reservoir) * 2 + s.margin.left + s.margin.right)
      .attr("stroke", color.averageLast10Years)
      .attr("stroke-width", 2.5)
      .attr("stroke-dasharray", "7");

    // Etiqueta Eje X
    svg
      .append("g")
      .attr("transform", `translate(0,${s.height - s.margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(() => data.reservoir));

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
          .attr("text-anchor", "start"),
      );
  }, []);
  return (
    <div
      className="w-full items-center rounded-2xl p-1"
      aria-labelledby="gauge-title"
    >
      <h2 id="gauge-title" className="text-center">
        {title}
      </h2>
      <div className="flex w-full flex-col items-center justify-evenly gap-3 md:flex-row">
        <div>
          <svg ref={svgRef} width={s.width} height={s.height} />
        </div>
        <ChartLegend
          key={data.id}
          currentLevel={currentLevel}
          averageLastYear={averageLastYear}
          averageHistory={averageHistory}
        />
      </div>
    </div>
  );
};
