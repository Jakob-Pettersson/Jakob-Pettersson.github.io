


function AddedFoodListItem({
  onRemoveItem,
  onWeightChange,
  editingWeight,
  setEditingWeight,
  listItem,
  index,
  setHoveredItem,
  compareActivated,
  selectedItems,
  onSelectedItems,
}) {


  const handleHover = (e) => {
    if (e.type === "mouseover") {
      setHoveredItem(listItem);
    } else if (e.type === "mouseout") {
      setHoveredItem(null);
    }
  };

  console.log(compareActivated);
  console.log(selectedItems);

  const selectedItem = selectedItems.find((item) => item.id === listItem.food.id);
  console.log("Selected Item for", listItem.food.name, selectedItem); 
  const isSelected =
  compareActivated &&
  Array.isArray(selectedItems) &&
  selectedItems.some((item) => item.id === listItem.food.id);




  const handleSelected = () => {
    if (!compareActivated) return;
  
    const colorPalette = ["#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#a133ff", "#33fff0"];
  
    // ✅ Check if the item is already selected
    const existingItem = selectedItems.find((item) => item.id === listItem.food.id);
  
    let newSelectedItems;
  
    if (existingItem) {
      // ✅ Remove the item while keeping others unchanged
      newSelectedItems = selectedItems.filter((item) => item.id !== listItem.food.id);
    } else {
      // ✅ Check if the item already has a color assigned
      const usedColors = selectedItems.map((item) => item.color);
      const availableColor = colorPalette.find((color) => !usedColors.includes(color)) || "#000000"; // Fallback color
  
      const newItem = {
        id: listItem.food.id,
        weight: listItem.weight,
        color: availableColor, // ✅ Assigns a new color only when needed
      };
  
      newSelectedItems = [...selectedItems, newItem];
    }
  
    // ✅ Send updated selected items with their colors
    onSelectedItems(newSelectedItems);
  };

  return (
    <div
      key={index}
      style={{
        ...styles.listItem,
        ...(isSelected ? styles.selectedItem : {}),
        backgroundColor: isSelected ? selectedItem?.color || "#C3E6CB" : "#EEFAF4",
        cursor: compareActivated ? "pointer" : "default",
      }}
      onMouseOver={handleHover}
      onMouseOut={handleHover}
      onClick={compareActivated ? handleSelected : undefined}
    >
      <button
        style={styles.removeButton}
        onClick={() => onRemoveItem(listItem.food.id)}
      >
        X
      </button>

      <div style={styles.foodNameWrapper}>
        <div style={styles.foodName}>{listItem.food.name}</div>
      </div>
      <div style={styles.infoGp}>
        <div
          style={styles.weightContainer}
          onClick={() => setEditingWeight(listItem.food.id)}
        >
          {editingWeight === listItem.food.id ? (
            <input
              type="number"
              value={listItem.weight}
              onChange={(e) => onWeightChange(listItem.food.id, e.target.value)}
              onBlur={() => setEditingWeight(null)} // Exit edit mode when focus is lost
              autoFocus
              style={styles.weightInput}
            />
          ) : (
            <span style={styles.weightText}>{listItem.weight}g</span>
          )}
        </div>
        <div style={styles.foodGroup}>{listItem.food["Filter group"]}</div>
      </div>
    </div>
  );
}

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
    borderStyle: "solid",
    borderWidth: "0px 0px 0px 0px",
    borderColor: "#ddd",
  },
  selectedItem: {
    backgroundColor: "#C3E6CB", // Change background when selected
    borderColor: "#49A974",
    borderWidth: "2px",
    borderStyle: "solid",
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

export default AddedFoodListItem;
