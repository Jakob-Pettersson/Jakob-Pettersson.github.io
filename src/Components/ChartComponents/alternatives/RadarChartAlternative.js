import { useEffect, useRef } from "react";
import * as d3 from "d3";

const foodItem = {
  food: {
    name: "Beef tallow",
    "Filter group": "Fat, oil",
    Energy: 656,
    Fat: 71,
    Protein: 7,
    Carbohydrates: 0,
    Fibre: 0,
    Water: 21.7,
    Alcohol: 0,
    Ash: 0.3,
    "Sugar total": 0,
    Monosaccharides: 0,
    Disaccharides: 0,
    "Added sugar": 0,
    "Free sugar": 0,
    Wholegrain: 0,
    "Sum of saturated fatty acids": 35.8,
    "Fatty acids 4:0-10:0": 0,
    "Fatty acid 12:0": 0.1,
    "Fatty acid 14:0": 3.2,
    "Fatty acid 16:0": 20.2,
    "Fatty acid 18:0": 10.8,
    "Fatty acid 20:0": 0.5,
    "Sum of monounsaturated fatty acids": 28.8,
    "Fatty acid 16:1": 2.6,
    "Fatty acid 18:1": 25.3,
    "Sum of polyunsaturated fatty acids": 2.8,
    "Fatty acids 18:2": 2.4,
    "Fatty acid 18:3": 0.3,
    "Fatty acid 20:4": 0,
    "EPA (Fatty acid 20:5)": 0,
    "DPA (Fatty acid 22:5)": 0,
    "DHA (Fatty acid 22:6)": 0,
    Cholesterol: 109,
    "Retinol equivalents": 22,
    Retinol: 19,
    "Beta-Carotene": 36,
    "Vitamin D": 0.1,
    "Vitamin E": 0.6,
    "Vitamin K": 0,
    Thiamin: 0,
    Riboflavin: 0,
    Niacin: 0,
    "Niacin equivalents": 1.28,
    "Vitamin B-6": 0,
    "Folate, total": 1,
    "Vitamin B-12": 0,
    "Vitamin C": 0,
    Phosphorus: 7,
    Iodide: 0,
    Iron: 0.3,
    Calcium: 0,
    Potassium: 6,
    Magnesium: 3,
    Sodium: 10,
    Salt: 0,
    Selenium: 1,
    Zinc: 0.1,
    id: 1,
  },
  weight: 123
};

function RadarChart({ addedfoodItems, selectedNutrients, goals }) {
  const svgRef = useRef();

  const foodItems = addedfoodItems.map((item) => item.food);

  useEffect(() => {
    if (!foodItems.length) return;

    const width = 600;
    const height = 600;
    const innerRadius = 30;
    const outerRadius = Math.min(width, height) / 2;
    const labelsAngle = Math.PI / 7;

    const nutrientIntake = selectedNutrients.map((nutrient) => {
      const nutrientData = { nutrient, intake: 0 };
      const rdi = goals[nutrient] || 1;
      nutrientData.intake =
        (foodItem.food[nutrient] * foodItem.weight) / (rdi * 100) || 0;
      return nutrientData;
    });

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
      .domain(selectedNutrients)
      .range([labelsAngle / 2, 2 * Math.PI - labelsAngle / 2])
      .align(0);

    // ✅ Scale for radial height (total % of RDI)
    const yScale = d3
      .scaleLinear()
      .domain([0, 1.5]) // ✅ Extended to 150% to see overages
      .range([innerRadius, outerRadius]);

    let ticks = [0, 0.2, 0.4, 0.6, 0.8, 1];
    // ✅ Draw stacked bars with hover effects
    svg
      .append("g")
      .selectAll("g")
      .data(nutrientIntake)
      .enter()
      .append("path")
      .attr("fill", "#aa54bb")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius((d) => yScale(d.intake))
          .startAngle((d) => xScale(d.nutrient))
          .endAngle((d) => xScale(d.nutrient) + xScale.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius)
      );

    // svg
    //   .selectAll("circle")
    //   .data(ticks)
    //   .join((enter) =>
    //     enter
    //       .append("circle")
    //       .attr("cx", 0)
    //       .attr("cy", 0)
    //       .attr("r", (d) => yScale(d))
    //       .attr("fill", "none")
    //       .attr("stroke", "#aaa")
    //       // .attr("stroke-dasharray", "4 4")
    //       .attr("stroke-width", 0.5)
    //   );

    // svg
    //   .append("g")
    //   .selectAll("g")
    //   .data(nutrientIntake)
    //   .enter()
    //   .append("path")
    //   .attr("fill", "#ffffff")
    //   .attr("opacity", 0.15)
    //   .attr(
    //     "d",
    //     d3
    //       .arc()
    //       .innerRadius(innerRadius - 2)
    //       .outerRadius(yScale(1.1))
    //       .startAngle(-labelsAngle / 2)
    //       .endAngle(labelsAngle / 2)
    //       .padAngle(0.01)
    //       .padRadius(innerRadius)
    //   );

    // svg
    //   .selectAll(".ticklabel")
    //   .data(ticks)
    //   .join((enter) =>
    //     enter
    //       .append("text")
    //       .attr("class", "ticklabel")
    //       .style("font-size", "10px")
    //       .attr("x", (d) => {
    //         if (d === 0) {
    //           return -7;
    //         }
    //         if (d === 1) {
    //           return -12;
    //         }
    //         return -9;
    //       })
    //       .attr("y", (d) => -yScale(d) + 4)
    //       .text((d) => (d * 100).toString() + "%")
    //   );
      
    // // Create lines between each nutrient segment
    // let lineAngles = [];
    // for (var i = 0; i < selectedNutrients.length + 2; i++) {
    //   if (i === 0) {
    //     lineAngles.push(
    //       labelsAngle / 2 +
    //         (i * (2 * Math.PI - labelsAngle)) / selectedNutrients.length
    //     );
    //   } else if (i === selectedNutrients.length + 1) {
    //     lineAngles.push(
    //       labelsAngle / 2 +
    //         ((i - 1) * (2 * Math.PI - labelsAngle)) / selectedNutrients.length
    //     );
    //   } else {
    //     lineAngles.push(
    //       (labelsAngle + (2 * i - 1) * ((2 * Math.PI - labelsAngle) / selectedNutrients.length)) / 2
    //     );
    //   }
    // }
    
    // svg
    //   .selectAll("segmentSeperators")
    //   .data(lineAngles)
    //   .join((enter) =>
    //     enter
    //       .append("line")
    //       .attr("x1", (d) => Math.sin(d) * yScale(-0.015))
    //       .attr("y1", (d) => -Math.cos(d) * yScale(-0.015))
    //       .attr("x2", (d) => Math.sin(d) * yScale(1))
    //       .attr("y2", (d) => -Math.cos(d) * yScale(1))
    //       .attr("stroke", "#ddd")
    //   );

    // Create lines for points axes. 
    // svg
    // .selectAll("line")
    // .data(lineAngles)
    // .join((enter) =>
    //   enter
    //     .append("line")
    //     .attr("x1", (d) => Math.sin(d + 5) * yScale(-0.015))
    //     .attr("y1", (d) => -Math.cos(d + 5) * yScale(-0.015))
    //     .attr("x2", (d) => Math.sin(d + 5) * yScale(1))
    //     .attr("y2", (d) => -Math.cos(d + 5) * yScale(1))
    //     .attr("stroke", "#ddd")
    // );

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
    labels
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "12px") // Offset below the nutrient name
      .text((d) => Math.round(d.intake * 10000) / 100 + "% RDI")
      .style("font-size", "9px")
      .style("fill", "#333");
  }, [foodItems, selectedNutrients, goals, addedfoodItems]);

  return (
    <div style={{ textAlign: "center" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default RadarChart;
