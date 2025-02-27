import { useEffect, useRef } from "react";
import * as d3 from "d3";

function RadialBar({ addedFoodItems, displayedNutrients, goals, hover,compareActivated }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 700;
    const height = 700;
    const innerRadius = 30;
    const outerRadius = Math.min(width, height) / 2;
    const labelsAngle = Math.PI / 20;

    const nutrientIntake = displayedNutrients.map((nutrient) => {
      const nutrientData = { nutrient, totalIntake: 0 };
      addedFoodItems.forEach((foodItem) => {
        const rdi = goals[nutrient] || 1;
        nutrientData["totalIntake"] +=
          (foodItem.food[nutrient] * foodItem.weight) / (rdi * 100) || 0;
      });
      return nutrientData;
    });

    // ✅ Clear previous SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // ✅ Create Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid black")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("font-size", "12px")
      .style("display", "none");

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

    var barColor = d3
      .scaleLinear()
      .domain([0, 0.5, 1, 1.25, 1.5])
      .range(["#cb1b1b", "#ffff3f", "#009400", "#ffff3f", "#cb1b1b"]);

    let ticks = [0, 0.2, 0.4, 0.6, 0.8, 1];

    nutrientIntake.forEach((nutrient) => {
      svg
        .append("g")
        .selectAll("g")
        .data([nutrient])
        .enter()
        .append("path")
        .attr("fill", barColor(nutrient.totalIntake))
        .attr("fill-opacity", () => compareActivated ? 0.1 : (hover ? 0.3 : 1))
        .attr(
          "d",
          d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius((d) => yScale(d.totalIntake))
            .startAngle((d) => xScale(d.nutrient))
            .endAngle((d) => xScale(d.nutrient) + xScale.bandwidth())
            .padAngle(0.01)
            .padRadius(innerRadius)
        );
    });


    svg
      .selectAll("circle")
      .data(ticks)
      .join((enter) =>
        enter
          .append("circle")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", (d) => yScale(d))
          .attr("fill", "none")
          .attr("stroke", "#aaa")
          // .attr("stroke-dasharray", "4 4")
          .attr("stroke-width", 0.5)
      );

    svg
      .append("g")
      .selectAll("g")
      .data(nutrientIntake)
      .enter()
      .append("path")
      .attr("fill", "#ffffff")
      .attr("opacity", 0.15)
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(innerRadius - 2)
          .outerRadius(yScale(1.1))
          .startAngle(-labelsAngle / 2)
          .endAngle(labelsAngle / 2)
          .padAngle(0.01)
          .padRadius(innerRadius)
      );

    svg
      .selectAll(".ticklabel")
      .data(ticks)
      .join((enter) =>
        enter
          .append("text")
          .attr("class", "ticklabel")
          .style("font-size", "10px")
          .attr("x", (d) => {
            if (d === 0) {
              return -7;
            }
            if (d === 1) {
              return -12;
            }
            return -9;
          })
          .attr("y", (d) => -yScale(d) + 4)
          .text((d) => (d * 100).toString() + "%")
      );

    let lineAngles = [];
    for (var i = 0; i < displayedNutrients.length + 1; i++) {
      lineAngles.push(
        labelsAngle / 2 +
          (i * (2 * Math.PI - labelsAngle)) / displayedNutrients.length
      );
    }
    svg
      .selectAll("line")
      .data(lineAngles)
      .join((enter) =>
        enter
          .append("line")
          .attr("x1", (d) => Math.sin(d) * yScale(-0.015))
          .attr("y1", (d) => -Math.cos(d) * yScale(-0.015))
          .attr("x2", (d) => Math.sin(d) * yScale(1))
          .attr("y2", (d) => -Math.cos(d) * yScale(1))
          .attr("stroke", "#ddd")
      );

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

    // ✅ Add Nutrient Name
    labels
      .append("text")
      .attr("text-anchor", "middle")
      .text((d) => d.nutrient)
      .style("font-size", "10px")
      .style("fill", "#000")
      .style("font-weight", "bold");

    // ✅ Add RDI % Directly Below Nutrient Name
    if (!hover) {
      labels
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "12px") // Offset below the nutrient name
        .text((d) => Math.round(d.totalIntake * 10000) / 100 + "% RDI")
        .style("font-size", "9px")
        .style("fill", "#333");
    }

    // ✅ Remove tooltip on component unmount
    return () => {
      tooltip.remove();
    };
  }, [addedFoodItems, displayedNutrients, goals, hover, compareActivated]);

  return (
    <div style={styles.radialBar}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default RadialBar;

const styles = {
  radialBar: { textAlign: "center" },
};
