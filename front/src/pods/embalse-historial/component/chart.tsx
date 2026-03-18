import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ChartModel } from "./chart.vm";
import { color, sizeChart as s } from "./constants";

export const Chart: React.FC<ChartModel> = ({ data, maxCapacity, title }) => {
  const svgRef = useRef(null);

  const reservoirData = { currentVolume: 30 }; // TODO: Provisional actual state

  useEffect(() => {
    //SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    //ESCALA X
    const x = d3
      .scaleBand()
      .domain([data.reservoir])
      .range([s.margin.left, s.width - s.margin.right])
      .padding(0.2);

    // ESCALA Y
    const y = d3
      .scaleLinear()
      .domain([0, 100])
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
      .attr(
        "height",
        (d) => y(0) - y((reservoirData.currentVolume * 100) / maxCapacity),
      )
      .attr("x", (d) => x(data.reservoir))
      .attr("y", (d) => y((reservoirData.currentVolume * 100) / maxCapacity)); // Muestra % de la media según capacidad máxima del embalse y no los Hm3

    // TODO: Media % Último año
    svg
      .append("line")
      .attr("y1", y(40))
      .attr("y2", y(40))
      .attr("x1", x(data.reservoir) - s.margin.left / 2)
      .attr("x2", x(data.reservoir) * 2 + s.margin.left + s.margin.right)
      .attr("stroke", color.averageLastYear)
      .attr("stroke-width", 2.5)
      .attr("stroke-dasharray", "3,2");

    // Media 10 años: línea vertical discontinua gris
    svg
      .append("line")
      .attr("y1", y(20))
      .attr("y2", y(20))
      .attr("x1", x(data.reservoir) - s.margin.left / 2)
      .attr("x2", x(data.reservoir) * 2 + s.margin.left + s.margin.right)
      .attr("stroke", color.averageLast10Years)
      .attr("stroke-width", 2.5)
      .attr("stroke-dasharray", "3,2");

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
          .attr("text-anchor", "start")
          .text("(%)"),
      );
  }, []);
  return (
    <div
      className="card bg-base-100 mx-auto w-full items-center rounded-2xl p-4 shadow-lg"
      aria-labelledby="gauge-title"
    >
      <h2 id="gauge-title" className="text-center">
        {title}
      </h2>
      <div>
        <svg ref={svgRef} width={s.width} height={s.height} />
      </div>
      <div className="card card-border p-3">
        <div>
          <span
            className="pr-2 text-lg font-black"
            style={{ color: color.actualAverage }}
          >
            -----
          </span>
          <span>Agua embalsada: {reservoirData.currentVolume} hm3</span>
        </div>
        <div>
          <span
            className="pr-2 text-lg font-black"
            style={{ color: color.averageLastYear }}
          >
            -----
          </span>
          <span>Media año anterior: X hm3</span>
        </div>
        <div>
          <span
            className="pr-2 text-lg font-black"
            style={{ color: color.averageLast10Years }}
          >
            -----
          </span>
          <span>Media histórica: X hm3</span>
        </div>
      </div>
    </div>
  );
};
