import { useEffect, useRef } from "react";
import * as d3 from "d3";

function RadialStackedBar({
  addedfoodItems,
  selectedNutrients,
  recommendedDailyIntake,
}) {
  const svgRef = useRef();

  const foodItems = addedfoodItems.map((item) => item.food);

  useEffect(() => {
    if (!foodItems.length) return;

    const width = 400;
    const height = 400;
    const innerRadius = 10;
    const outerRadius = Math.min(width, height) / 2;

    const foodKeys = foodItems.map((d) => d.name);

    const transformedData = selectedNutrients.map((nutrient) => {
      const nutrientData = { nutrient };
      foodItems.forEach((food) => {
        const rdi = recommendedDailyIntake[nutrient] || 1;
        nutrientData[food.name] = (food[nutrient] / rdi) * 100 || 0;
      });
      return nutrientData;
    });

    // ✅ Calculate total % RDI reached for each nutrient
    const totalRDIReached = {};
    selectedNutrients.forEach((nutrient) => {
      totalRDIReached[nutrient] = foodItems.reduce((sum, food) => {
        return (
          sum + ((food[nutrient] || 0) / recommendedDailyIntake[nutrient]) * 100
        );
      }, 0);
    });

    // ✅ Stack generator (each food item stacks inside a nutrient)
    const stack = d3.stack().keys(foodKeys);
    const stackedData = stack(transformedData);

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
      .domain(selectedNutrients)
      .range([0, 2 * Math.PI])
      .align(0);

    // ✅ Scale for radial height (total % of RDI)
    const yScale = d3
      .scaleRadial()
      .domain([0, 150]) // ✅ Extended to 150% to see overages
      .range([innerRadius, outerRadius]);

    // ✅ Draw 100% RDI Reference Ring
    svg
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", yScale(100)) // ✅ Draw at 100% RDI level
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("stroke-dasharray", "4 4") // ✅ Dashed line for visibility
      .attr("stroke-width", 1.5);

    // ✅ Colors for different food items (instead of nutrients)
    const color = d3.scaleOrdinal().domain(foodKeys).range(d3.schemeSet2);

    // ✅ Draw stacked bars with hover effects
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
          .startAngle((d) => xScale(d.data.nutrient))
          .endAngle((d) => xScale(d.data.nutrient) + xScale.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius)
      )
      .on("mouseover", function (event, d) {
        const foodName = d3.select(this.parentNode).datum().key; // ✅ Get food name
        const nutrientName = d.data.nutrient;
        const nutrientValue = d.data[foodName] || 0; // Get % of RDI

        tooltip
          .style("display", "block")
          .html(
            `<strong>${foodName}</strong><br>${nutrientName}: ${nutrientValue.toFixed(
              1
            )}% RDI`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);

        d3.select(this).attr("stroke", "black").attr("stroke-width", 2);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
        d3.select(this).attr("stroke", "none");
      });

    // ✅ Add Labels: Nutrient Names Inside Bars
    const labels = svg
      .append("g")
      .selectAll("g")
      .data(selectedNutrients)
      .enter()
      .append("g")
      .attr("transform", (d) => {
        const angle = xScale(d) + xScale.bandwidth() / 2 - Math.PI / 2;
        const x =
          Math.cos(angle) * (innerRadius + (outerRadius - innerRadius) / 2);
        const y =
          Math.sin(angle) * (innerRadius + (outerRadius - innerRadius) / 2);
        return `translate(${x}, ${y})`;
      });

    // ✅ Add Nutrient Name
    labels
      .append("text")
      .attr("text-anchor", "middle")
      .text((d) => d)
      .style("font-size", "10px")
      .style("fill", "#000")
      .style("font-weight", "bold");

    // ✅ Add RDI % Directly Below Nutrient Name
    labels
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "12px") // Offset below the nutrient name
      .text((d) => `${totalRDIReached[d].toFixed(1)}% RDI`)
      .style("font-size", "9px")
      .style("fill", "#333");

    // ✅ Remove tooltip on component unmount
    return () => {
      tooltip.remove();
    };
  }, [foodItems, selectedNutrients, recommendedDailyIntake]);

  return (
    <div style={{ textAlign: "center" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default RadialStackedBar;
