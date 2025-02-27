// src/Filter.js
import { useState } from "react";

function Filter({ foodItems }) {
  const [selectedOption, setSelectedOption] = useState("All");

  const options = ["All", "Popular", "Recent", "Sugar Free", "Gluten Free"];

  const styles = {
    listContainer: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      width: "200px",
      backgroundColor: "#f9f9f9",
    },
    listItem: {
      padding: "8px",
      borderBottom: "1px solid #ddd",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    tick: {
      color: "green",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.listContainer}>
      {options.map((option) => (
        <div
          key={option}
          style={styles.listItem}
          onClick={() => setSelectedOption(option)}
        >
          {option}
          {selectedOption === option && <span style={styles.tick}>✔</span>}
        </div>
      ))}
    </div>
  );
}

export default Filter;
