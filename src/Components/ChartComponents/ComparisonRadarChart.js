import { useEffect, useRef } from "react";
import * as d3 from "d3";

const items = [
  {
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
  {
    name: "Pork lard 85% fat",
    "Filter group": "Fat, oil",
    Energy: 763,
    Fat: 85,
    Protein: 2.8,
    Carbohydrates: 0,
    Fibre: 0,
    Water: 11.1,
    Alcohol: 0,
    Ash: 0.7,
    "Sugar total": 0,
    Monosaccharides: 0,
    Disaccharides: 0,
    "Added sugar": 0,
    "Free sugar": 0,
    Wholegrain: 0,
    "Sum of saturated fatty acids": 32.8,
    "Fatty acids 4:0-10:0": 0,
    "Fatty acid 12:0": 0.1,
    "Fatty acid 14:0": 1,
    "Fatty acid 16:0": 20.7,
    "Fatty acid 18:0": 10.6,
    "Fatty acid 20:0": 0.2,
    "Sum of monounsaturated fatty acids": 38.5,
    "Fatty acid 16:1": 2.3,
    "Fatty acid 18:1": 35.2,
    "Sum of polyunsaturated fatty acids": 9,
    "Fatty acids 18:2": 7.8,
    "Fatty acid 18:3": 0.7,
    "Fatty acid 20:4": 0,
    "EPA (Fatty acid 20:5)": 0,
    "DPA (Fatty acid 22:5)": 0,
    "DHA (Fatty acid 22:6)": 0,
    Cholesterol: 57,
    "Retinol equivalents": 4,
    Retinol: 4,
    "Beta-Carotene": 0,
    "Vitamin D": 0.6,
    "Vitamin E": 0.7,
    "Vitamin K": 0,
    Thiamin: 0.05,
    Riboflavin: 0.07,
    Niacin: 0.5,
    "Niacin equivalents": 1.01,
    "Vitamin B-6": 0.02,
    "Folate, total": 1,
    "Vitamin B-12": 0.6,
    "Vitamin C": 0,
    Phosphorus: 26,
    Iodide: 0,
    Iron: 0.2,
    Calcium: 4,
    Potassium: 65,
    Magnesium: 1,
    Sodium: 11,
    Salt: 0,
    Selenium: 5,
    Zinc: 0.4,
    id: 2,
  },
  {
    name: "Pork leaf lard 100% fat",
    "Filter group": "Fat, oil",
    Energy: 884,
    Fat: 100,
    Protein: 0,
    Carbohydrates: 0,
    Fibre: 0,
    Water: 0,
    Alcohol: 0,
    Ash: 0,
    "Sugar total": 0,
    Monosaccharides: 0,
    Disaccharides: 0,
    "Added sugar": 0,
    "Free sugar": 0,
    Wholegrain: 0,
    "Sum of saturated fatty acids": 48.8,
    "Fatty acids 4:0-10:0": 0,
    "Fatty acid 12:0": 0.1,
    "Fatty acid 14:0": 1.5,
    "Fatty acid 16:0": 26.7,
    "Fatty acid 18:0": 20,
    "Fatty acid 20:0": 0.2,
    "Sum of monounsaturated fatty acids": 37.5,
    "Fatty acid 16:1": 2,
    "Fatty acid 18:1": 34.1,
    "Sum of polyunsaturated fatty acids": 9.4,
    "Fatty acids 18:2": 7.9,
    "Fatty acid 18:3": 0.7,
    "Fatty acid 20:4": 0,
    "EPA (Fatty acid 20:5)": 0,
    "DPA (Fatty acid 22:5)": 0.2,
    "DHA (Fatty acid 22:6)": 0.3,
    Cholesterol: 95,
    "Retinol equivalents": 9,
    Retinol: 9,
    "Beta-Carotene": 0,
    "Vitamin D": 0,
    "Vitamin E": 1.2,
    "Vitamin K": 0,
    Thiamin: 0,
    Riboflavin: 0,
    Niacin: 0,
    "Niacin equivalents": 0,
    "Vitamin B-6": 0,
    "Folate, total": 0,
    "Vitamin B-12": 0,
    "Vitamin C": 0,
    Phosphorus: 3,
    Iodide: 0,
    Iron: 0.1,
    Calcium: 1,
    Potassium: 1,
    Magnesium: 1,
    Sodium: 2,
    Salt: 0,
    Selenium: 7,
    Zinc: 0.1,
    id: 3,
  },
];
function ComparisonRadarChart({ hoveredItem, displayedNutrients, goals }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!items) return;
    const width = 600;
    const height = 600;
    const innerRadius = 30;
    const outerRadius = Math.min(width, height) / 2;
    const labelsAngle = 0;

    const foodNutrients = items.map((foodItem) => {
      const nutrientIntake = displayedNutrients.map((nutrient) => {
        const nutrientData = { nutrient, intake: 0 };
        const rdi = goals[nutrient] || 1;
        nutrientData.intake = (foodItem[nutrient] * 100) / (rdi * 100) || 0;
        return nutrientData;
      });
      return nutrientIntake;
    });

    console.log("foodNutrients");
    console.log(foodNutrients);

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

    //Edits

    const getPathCoordinates = (data_point) => {
      let coordinates = data_point.map((entry) => [
        Math.sin(xScale(entry.nutrient) + alpha) * yScale(entry.intake),
        -Math.cos(xScale(entry.nutrient) + alpha) * yScale(entry.intake),
      ]);
      return coordinates;
    };

    let ticks = [0, 0.2, 0.4, 0.6, 0.8, 1];

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

    // --------------

    let alpha = (2 * Math.PI - labelsAngle) / (2 * displayedNutrients.length);

    let linesCoordinates = foodNutrients.map((foodItem) => {
      let linePoints = foodItem.map((entry) => [
        Math.sin(xScale(entry.nutrient) + alpha) * yScale(entry.intake),
        -Math.cos(xScale(entry.nutrient) + alpha) * yScale(entry.intake),
      ]);
      linePoints.push(linePoints[0]);
      return linePoints;
    });

    linesCoordinates.forEach((lineCoordinates) => {
      svg
        .append("path")
        .attr("d", d3.line()(lineCoordinates))
        .attr("stroke", "#4590bb")
        // with multiple points defined, if you leave out fill:none,
        // the overlapping space defined by the points is filled with
        // the default value of 'black'
        .attr("fill", "none");
    });

    const labels = svg
      .append("g")
      .selectAll("g")
      .data(displayedNutrients)
      .enter()
      .append("g")
      .attr("transform", (d) => {
        const angle = xScale(d) + xScale.bandwidth() / 2 - Math.PI / 2;
        const x = Math.cos(angle) * (outerRadius - innerRadius);
        const y = Math.sin(angle) * (outerRadius - innerRadius);
        return `translate(${x}, ${y})`;
      });

    labels
      .append("text")
      .attr("text-anchor", "middle")
      .text((d) => d)
      .style("font-size", "10px")
      .style("fill", "#000")
      .style("font-weight", "bold");

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
      
    // ✅ Add RDI % Directly Below Nutrient Name
    // labels
    //   .append("text")
    //   .attr("text-anchor", "middle")
    //   .attr("dy", "12px") // Offset below the nutrient name
    //   .text((d) => Math.round(d.intake * 10000) / 100 + "% RDI")
    //   .style("font-size", "9px")
    //   .style("fill", "#333");
  }, [displayedNutrients, goals, hoveredItem]);

  return (
    <div style={{ textAlign: "center" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default ComparisonRadarChart;
