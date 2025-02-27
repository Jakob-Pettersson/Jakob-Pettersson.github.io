import { useRef, useEffect } from "react";
import * as d3 from "d3";

const foodItem = {
  name: "Beef tallow",
  amount: 123,
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
};

function RadarChart({ selectedNutrients, goals }) {
  const svgRef = useRef();

  useEffect(() => {
    let data = [];
    let features = selectedNutrients;

    var point = {};
    selectedNutrients.forEach((nutrient) => {
      point[nutrient] =
        (foodItem[nutrient] * foodItem["amount"]) / goals[nutrient];
    });
    data.push(point);

    let width = 600;
    let height = 600;

    let radialScale = d3.scaleLinear().domain([0, 100]).range([0, 250]);

    const angleToCoordinate = (angle, value) => {
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return { x: width / 2 + x, y: height / 2 - y };
    };

    const getPathCoordinates = (data_point) => {
      let coordinates = [];
      for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
      }
      return coordinates;
    };

    d3.select(svgRef.current).selectAll("*").remove();
    let svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    let ticks = [20, 40, 60, 80, 100];

    svg
      .selectAll("circle")
      .data(ticks)
      .join((enter) =>
        enter
          .append("circle")
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .attr("fill", "none")
          .attr("stroke", "gray")
          .attr("r", (d) => radialScale(d))
      );

    svg
      .selectAll(".ticklabel")
      .data(ticks)
      .join((enter) =>
        enter
          .append("text")
          .attr("class", "ticklabel")
          .attr("x", width / 2)
          .attr("y", (d) => height / 2 - radialScale(d))
          .text((d) => d.toString() + "%")
      );

    let featureData = features.map((f, i) => {
      let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
      return {
        name: f,
        angle: angle,
        line_coord: angleToCoordinate(angle, 100),
        label_coord: angleToCoordinate(angle, 105),
      };
    });

    // draw axis line
    svg
      .selectAll("line")
      .data(featureData)
      .join((enter) =>
        enter
          .append("line")
          .attr("x1", width / 2)
          .attr("y1", height / 2)
          .attr("x2", (d) => d.line_coord.x)
          .attr("y2", (d) => d.line_coord.y)
          .attr("stroke", "black")
      );

    // draw axis label
    svg
      .selectAll(".axislabel")
      .data(featureData)
      .join((enter) =>
        enter
          .append("text")
          .attr("x", (d) => d.label_coord.x)
          .attr("y", (d) => d.label_coord.y)
          .text((d) => d.name)
      );

    let line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);

    let colors = ["red"];

    // draw the path element
    svg
      .selectAll("path")
      .data(data)
      .join((enter) =>
        enter
          .append("path")
          .datum((d) => getPathCoordinates(d))
          .attr("d", line)
          .attr("stroke-width", 3)
          .attr("stroke", (_, i) => colors[i])
          .attr("fill", (_, i) => colors[i])
          .attr("stroke-opacity", 0.8)
          .attr("opacity", 0.8)
      );
  }, [selectedNutrients, goals]);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}

export default RadarChart;
