"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ReservoirHistoryModel } from "../embalse-historial.vm";

interface Props {
  data: ReservoirHistoryModel;
  maxCapacity: number;
}
interface MonthsAverage {
  month: number;
  average: number;
}
const monthsName: string[] = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const monthsNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const Chart: React.FC<Props> = ({ data, maxCapacity }) => {
  const months: MonthsAverage[] = data.months;
  console.log("DATA: ", months);
  console.log("maxCapacity: ", maxCapacity);
  console.log("CUENTA: ", (data.months[0].average * 100) / maxCapacity);

  63 - (100 % 12);

  // Se obtiene la capacidad máxima alcanzada que se utilizará en eje Y con un pequeño margen (* 1.2)
  // const maxCapacity = Math.max(...months.map((month) => month.average));

  const handleDates = (date: string) => {
    const [year, month] = date.split("-").map(Number);
    return new Date(Date.UTC(year, month, 1));
  };

  const startDate = handleDates(data.metadata.startDate);
  const endDate = handleDates(data.metadata.endDate);

  // Declare the chart dimensions and margins.
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;
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
      .attr("height", (d) => y(0) - y(d.average))
      .attr("x", (d) => x(d.month))
      .attr("y", (d) => y(d.average));

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
  return <svg ref={svgRef} width={width} height={height} />;
};
