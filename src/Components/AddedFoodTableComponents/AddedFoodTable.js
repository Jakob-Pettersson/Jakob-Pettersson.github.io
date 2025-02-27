import { useState } from "react";
import AddedFoodListItem from "./AddedFoodListItem";

function AddedFoodTable({
  foodItems,
  onRemoveItem,
  onWeightChange,
  setHoveredItem,
  compareActivated,
  selectedItems,
  onSelectedItems,
}) {
  const [editingWeight, setEditingWeight] = useState(null);
 

  return (
    <div style={styles.listContainer}>
      {foodItems.length > 0 ? (
        foodItems.map((listItem, index) => (
          <AddedFoodListItem
            editingWeight={editingWeight}
            setEditingWeight={setEditingWeight}
            onRemoveItem={onRemoveItem}
            onWeightChange={onWeightChange}
            listItem={listItem}
            index={index}
            setHoveredItem={setHoveredItem}
            key={index}
            compareActivated={compareActivated}
            selectedItems={selectedItems}
            onSelectedItems={onSelectedItems}
          />
        ))
      ) : (
        <div style={styles.listItem}>No food items added yet.</div>
      )}
    </div>
  );
}

export default AddedFoodTable;
const styles = {
  listContainer: {
    // marginTop: "20px",
    // padding: "10px",
    width: "100%",
    maxWidth: "250px",
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px",
    borderBottom: "0px solid #ddd", // Divider line
    backgroundColor: "#EEFAF4",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "500px",
    gap: "10px",
    marginBottom: "10px",
    position: "relative",
  },

  foodGroup: {
    fontSize: "14px",
    fontWeight: "bold",
    flexDirection: "row",
    color: "#49A974",
    minWidth: "100px",
    textAlign: "right",
  },

  foodNameWrapper: {
    width: "100%", // 🔹 Ensures it spans the full width
    paddingRight: "10px", // 🔹 Adds space between the text and the button
  },

  foodName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "left", // 🔹 Forces text alignment to the left
    alignSelf: "flex-start", // 🔹 Overrides `alignItems: "center"` from parent
  },
  infoGp: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  weightContainer: {
    cursor: "pointer",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "10px",
    minWidth: "100px",
    padding: "5px",
  },

  weightText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#000",
  },

  weightInput: {
    width: "50px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "18px",
  },

  removeButton: {
    position: "absolute", // 🔹 Keeps it at the top-right of the screen
    top: "10px", // 🔹 Aligns to the top of the parent
    right: "10px",
    width: "30px",
    height: "30px",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: "#EA7F79",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "right",
    justifyContent: "center",
    transition: "background 0.3s ease",
  },

  removeButtonHover: {
    backgroundColor: "#e04a4a",
  },
};
