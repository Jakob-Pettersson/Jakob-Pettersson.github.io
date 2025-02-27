import { useEffect, useRef } from "react";
import * as d3 from "d3";

function RadarChartCompare({ hoveredItem, displayedNutrients, goals, compareActivated, comparingItem ,selectedItems}) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 700;
    const height = 700;
    const innerRadius = 30;
    const outerRadius = Math.min(width, height) / 2;
    const labelsAngle = Math.PI / 20;

    // ✅ Determine which item to draw
    const itemsToDraw = compareActivated
      ? comparingItem // Only draw comparingItem
      : hoveredItem
      ? [hoveredItem] // Only draw hoveredItem
      : [];

    if (itemsToDraw.length === 0) return;

    // ✅ Clear previous SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // ✅ Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;")
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // ✅ Scale for bar angles (nutrients instead of food)
    const xScale = d3
      .scaleBand()
      .domain(displayedNutrients)
      .range([labelsAngle / 2, 2 * Math.PI - labelsAngle / 2])
      .align(0);

    // ✅ Scale for radial height (total % of RDI)
    const yScale = d3
      .scaleLinear()
      .domain([0, 1.5]) // ✅ Extended to 150% to see overages
      .range([innerRadius, outerRadius]);

    let alpha = (2 * Math.PI - labelsAngle) / (2 * displayedNutrients.length);

    // ✅ Define a color scale for multiple radar lines
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // ✅ Draw radar lines for each item
    itemsToDraw.forEach((item, index) => {
        console.log(item);
        
      const nutrientIntake = displayedNutrients.map((nutrient) => {
        const rdi = goals[nutrient] || 1;
        return {
          nutrient,
          intake: (item.food[nutrient] * item.weight) / (rdi * 100) || 0,
        };
      });

      const linePoints = nutrientIntake.map((entry) => [
        Math.sin(xScale(entry.nutrient) + alpha) * yScale(entry.intake),
        -Math.cos(xScale(entry.nutrient) + alpha) * yScale(entry.intake),
      ]);

      svg
        .append("path")
        .attr("d", d3.line()(linePoints))
        .attr("stroke", item.color) // Assign different colors
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("opacity", compareActivated ? 0.7 : 1); // Lower opacity in compare mode
    });

  }, [displayedNutrients, goals, hoveredItem, comparingItem, compareActivated]);

  return (
    <div style={{ textAlign: "center" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default RadarChartCompare;
