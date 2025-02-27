function AddedFoodListItem({
  onRemoveItem,
  onWeightChange,
  editingWeight,
  setEditingWeight,
  listItem,
  index,
  setHoveredItem,
}) {
  const handleHover = (e) => {
    if (e.type === "mouseover") {
      setHoveredItem(listItem);
    } else if (e.type === "mouseout") {
      setHoveredItem(null);
    }
  };

  return (
    <div
      key={index}
      style={styles.listItem}
      onMouseOver={handleHover}
      onMouseOut={handleHover}
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
