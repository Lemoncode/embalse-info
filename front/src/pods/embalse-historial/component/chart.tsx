"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ChartModel, MonthsAverage } from "./chart.vm";
import {
  monthsNumber,
  monthsName,
  width,
  height,
  marginTop,
  marginRight,
  marginLeft,
  marginBottom,
} from "./constants";

export const Chart: React.FC<ChartModel> = ({ data, maxCapacity, title }) => {
  const months: MonthsAverage[] = data.months;
  const svgRef = useRef(null);

  useEffect(() => {
    if (!months || months.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Limpiar SVG antes de redibujar

    // Declara escala de posición horizontal (X)
    const x = d3
      .scaleBand()
      .domain(monthsNumber)
      .range([marginLeft, width - marginRight])
      .padding(0.4);

    // Declara escala de posición vertical (Y)
    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);

    // Dibuja las barras
    svg
      .append("g")
      .attr("fill", "#3DA9B7")
      .selectAll("rect")
      .data(months)
      .enter()
      .append("rect")
      .attr("width", 30) // Ancho de las barras
      .attr("height", (d) => y(0) - y((d.average * 100) / maxCapacity)) // Establece el formato de los datos en %
      .attr("x", (d) => x(d.month))
      .attr("y", (d) => y((d.average * 100) / maxCapacity)); // Muestra % de la media según capacidad máxima del embalse y no los Hm3

    // Agrega Eje X
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickFormat((d) => monthsName[d - 1]));

    // Agrega Eje Y
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  // Return the SVG element.
  return (
    <div
      className="card bg-base-100 mx-auto w-full items-center gap-6 rounded-2xl p-4 shadow-lg"
      aria-labelledby="gauge-title"
    >
      <h2 id="gauge-title" className="text-center">
        {title}
      </h2>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};
