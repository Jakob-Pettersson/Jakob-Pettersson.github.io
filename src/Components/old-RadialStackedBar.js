import { useEffect, useRef } from "react";
import * as d3 from "d3";

function RadialStackedBar({ foodItems }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!foodItems.length) return;

    const width = 400;
    const height = 400;
    const innerRadius = 80;
    const outerRadius = Math.min(width, height) / 2;

    // ✅ Define the 7 keys for the bars
    const stackKeys = [
      "Calcium",
      "Potassium",
      "Magnesium",
      "Sodium",
      "Salt",
      "Selenium",
      "Zinc",
    ];

    // ✅ Stack generator
    const stack = d3.stack().keys(stackKeys);

    // ✅ Transform data correctly for stacking
    const stackedData = stack(
      foodItems.map((d) => ({
        name: d.name,
        Calcium: d.Calcium || 0,
        Potassium: d.Potassium || 0,
        Magnesium: d.Magnesium || 0,
        Sodium: d.Sodium || 0,
        Salt: d.Salt || 0,
        Selenium: d.Selenium || 0,
        Zinc: d.Zinc || 0,
      }))
    );

    // ✅ Clear previous SVG content before appending
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;")
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // ✅ Scale for bar angles (food names)
    const xScale = d3
      .scaleBand()
      .domain(foodItems.map((d) => d.name))
      .range([0, 2 * Math.PI])
      .align(0);

    // ✅ Scale for radial height (nutrient values)
    const yScale = d3
      .scaleRadial()
      .domain([0, d3.max(stackedData.flat(), (d) => d[1])]) // Use the max stacked value
      .range([innerRadius, outerRadius]);

    // ✅ Colors for 7 bars
    const color = d3.scaleOrdinal().domain(stackKeys).range(d3.schemeSet2); // Use D3's color scheme

    // ✅ Draw stacked bars
    svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("path")
      .data((d) => d)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius((d) => yScale(d[0]))
          .outerRadius((d) => yScale(d[1]))
          .startAngle((d) => xScale(d.data.name))
          .endAngle((d) => xScale(d.data.name) + xScale.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius)
      );

    // ✅ Add Labels (Optional)
    svg
      .append("g")
      .selectAll("text")
      .data(foodItems)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr(
        "x",
        (d) =>
          Math.cos(xScale(d.name) + xScale.bandwidth() / 2 - Math.PI / 2) *
          (outerRadius + 15)
      )
      .attr(
        "y",
        (d) =>
          Math.sin(xScale(d.name) + xScale.bandwidth() / 2 - Math.PI / 2) *
          (outerRadius + 15)
      )
      .text((d) => d.name)
      .style("font-size", "10px");
  }, [foodItems]);

  return <svg ref={svgRef}></svg>;
}

export default RadialStackedBar;
