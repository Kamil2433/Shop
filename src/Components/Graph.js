import React from "react";
import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { line } from "d3-shape";
import { useShop } from "../Context/Shoppingcontext";
import Piechart from "./Piechart";
import './graph.css'

export default function Graph() {
  const { dataforbar } = useShop();

  const svgRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      drawChart();
    }, 3000);
  }, [dataforbar]);

  const drawChart = () => {
    // const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const margin = { top: 5, right: 20, bottom: 0, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 100 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("overflow", "visible")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(dataforbar.map((d) => d.name));
    y.domain([0, d3.max(dataforbar, (d) => d.count)]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(dataforbar)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.count))
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "steelblue");

    svg
      .append("g")
      .attr("transform", `translate(0, ${height + 10})`) // Adjusted y position
      .selectAll(".country-label")
      .data(dataforbar)
      .enter()
      .append("text")
      .attr("class", "country-label")
      .attr("x", (d) => x(d.name) + x.bandwidth() / 2)
      .attr("y", 3) // Adjusted y position
      .attr("text-anchor", "middle")
      .text((d) => d.name)
      .style("font-size", "2px")
      .style("fill", "black")
      .style("overflow", "visible");
  };

  return (
    <div className="graph-container">
    <div className="graph-and-pie-container">
      <svg
        ref={svgRef}
        style={{
          height: "500",
          width: "500",
          marginTop: "200",
          marginLeft: "50",
        }}
      ></svg>
    <div>

      <Piechart/>
    </div>
    </div>
  </div>
  );
}
