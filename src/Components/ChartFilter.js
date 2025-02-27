// src/Filter.js
import { useState, useEffect } from "react";

function ChartFilter({ onSelectionChange }) {
  const options = [
    "Energy",
    "Fat",
    "Protein",
    "Carbohydrates",
    "Fibre",
    "Water",
    "Alcohol",
    "Ash",
    "Sugar total",
    "Monosaccharides",
    "Disaccharides",
    "Added sugar",
    "Free sugar",
    "Wholegrain total",
    "Sum of saturated fatty acids",
    "Fatty acids 4:0-10:0",
    "Fatty acid 12:0",
    "Fatty acid 14:0",
    "Fatty acid 16:0",
    "Fatty acid 18:0",
    "Fatty acid 20:0",
    "Sum of monounsaturated fatty acids",
    "Fatty acid 16:1",
    "Fatty acid 18:1",
    "Sum of polyunsaturated fatty acids",
    "Fatty acids 18:2",
    "Fatty acid 18:3",
    "Fatty acid 20:4",
    "EPA (Fatty acid 20:5)",
    "DPA (Fatty acid 22:5)",
    "DHA (Fatty acid 22:6)",
    "Cholesterol",
    "Retinol equivalents",
    "Retinol",
    "Beta-Carotene",
    "Vitamin D",
    "Vitamin E",
    "Vitamin K",
    "Thiamin",
    "Riboflavin",
    "Niacin",
    "Niacin equivalents",
    "Vitamin B-6",
    "Folate, total",
    "Vitamin B-12",
    "Vitamin C",
    "Phosphorus",
    "Iodide",
    "Iron",
    "Calcium",
    "Potassium",
    "Magnesium",
    "Sodium",
    "Salt",
    "Selenium",
    "Zinc",
  ];
  const macros = ["Energy", "Fat", "Protein", "Carbohydrates"];
  const [selectedOptions, setSelectedOptions] = useState(macros);

  const handleOptionClick = (option) => {
    setSelectedOptions(
      (prevSelected) =>
        prevSelected.includes(option)
          ? prevSelected.filter((item) => item !== option) // Remove if already selected
          : [...prevSelected, option] // Add if not selected
    );
  };

  useEffect(() => {
    onSelectionChange(selectedOptions);
  }, [selectedOptions, onSelectionChange]);

  return (
    <div style={styles.listContainer}>
      {options.map((option) => (
        <div
          key={option}
          style={styles.listItem}
          onClick={() => handleOptionClick(option)}
        >
          {option}
          {selectedOptions.includes(option) && (
            <span style={styles.tick}>✔</span>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  listContainer: {
    padding: "10px",
    border: "0px solid #ccc",
    borderRadius: "8px",
    width: "200px",
    backgroundColor: "#EBF6FA",
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #fff",
    color: "#3C4244",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tick: {
    color: "#57ADD0",
    fontWeight: "bold",
  },
};

export default ChartFilter;
