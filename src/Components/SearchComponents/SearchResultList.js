import { useState } from "react";
import WeightInput from "./WeightInput";

const SearchResultList = ({ results, onAddFood }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [weight, setWeight] = useState("100");

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setWeight("100"); // Reset weight when selecting a new item
  };

  const handleAddFood = () => {
    if (selectedItem) {
      console.log("====================================");
      console.log(weight);
      console.log("====================================");
      onAddFood(selectedItem, weight); // Pass data to parent
      setSelectedItem(null); // Reset selected item after adding
      setWeight("100"); // Reset weight
    }
  };

  return (
    <div style={styles.results}>
      {results.map((item, index) => (
        <div key={index}>
          {selectedItem?.id === item.id ? ( // If item is selected, render the selectedItem UI
            <div style={styles.selectedItem}>
              <h3 style={styles.h3}>{selectedItem.name}</h3>
              <WeightInput
                value={weight}
                onChange={setWeight}
                style={styles.weightInput}
              />
              <button
                onClick={handleAddFood}
                style={styles.addButton}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor =
                    styles.addButtonHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor =
                    styles.addButton.backgroundColor)
                }
              >
                Add Food
              </button>
            </div>
          ) : (
            // Otherwise, render the normal list item
            <div
              style={styles.resultItem}
              onClick={() => handleSelectItem(item)}
            >
              {item.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Styles for layout
const styles = {
  results: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxHeight: "400px",
    overflowY: "auto",
  },
  resultItem: {
    padding: "8px",
    backgroundColor: "#EEFAF4",
    borderRadius: "10px",
    cursor: "pointer",
  },
  selectedItem: {
    // padding: "20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    alignItems: "center", // Center content horizontally
    justifyContent: "center",
  },
  h3: {
    margin: "10px 0",
    fontSize: "18px",
    // fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },

  weightInput: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    textAlign: "left",
  },

  addButton: {
    width: "100%", // Full width button
    padding: "10px",
    marginTop: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#49A974", // Green color
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },

  addButtonHover: {
    backgroundColor: "#0F723C", // Darker green on hover
    color: "white",
  },
  input: {
    padding: "6px",
    marginTop: "8px",
    width: "100px",
  },
};

export default SearchResultList;
