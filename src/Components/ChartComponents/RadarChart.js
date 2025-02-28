import { useEffect, useRef } from "react";
import * as d3 from "d3";

function RadarChart({ hoveredItem, displayedNutrients, goals,compareActivated, selectedItems }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!hoveredItem) return;

    const width = 700;
    const height = 700;
    const innerRadius = 30;
    const outerRadius = Math.min(width, height) / 2;
    const labelsAngle = Math.PI / 20;

    const itemsToDraw = compareActivated ? selectedItems : hoveredItem ? [hoveredItem] : [];

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


    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    

    const nutrientIntake = displayedNutrients.map((nutrient) => {
      const nutrientData = { nutrient, intake: 0 };
      const rdi = goals[nutrient] || 1;
      nutrientData.intake =
        (hoveredItem.food[nutrient] * hoveredItem.weight) / (rdi * 100) || 0;
      return nutrientData;
    });
    
    
    let linePoints = nutrientIntake.map((entry) => [
      Math.sin(xScale(entry.nutrient) + alpha) * yScale(entry.intake),
      -Math.cos(xScale(entry.nutrient) + alpha) * yScale(entry.intake),
    ]);

    svg
      .append("path")
      .attr("d", d3.line()(linePoints))
      .attr("stroke", "#1661D9")
      .attr("stroke-width", 3)
      // with multiple points defined, if you leave out fill:none,
      // the overlapping space defined by the points is filled with
      // the default value of 'black'
      .attr("fill", "none");

    const labels = svg
      .append("g")
      .selectAll("g")
      .data(nutrientIntake)
      .enter()
      .append("g")
      .attr("transform", (d) => {
        const angle = xScale(d.nutrient) + xScale.bandwidth() / 2 - Math.PI / 2;
        const x = Math.cos(angle) * (outerRadius - innerRadius);
        const y = Math.sin(angle) * (outerRadius - innerRadius);
        return `translate(${x}, ${y})`;
      });

    // ✅ Add RDI % Directly Below Nutrient Name
    labels
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "12px") // Offset below the nutrient name
      .text((d) => Math.round(d.intake * 10000) / 100 + "% RDI")
      .style("font-size", "9px")
      .style("fill", "#333");
  }, [displayedNutrients, goals, hoveredItem]);

  return (
    <div style={{ textAlign: "center" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default RadarChart;
