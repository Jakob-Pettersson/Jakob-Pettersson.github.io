import { useState, useMemo, useEffect } from "react";

const SearchCategories = ({ onCategorySelect, results }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // ✅ Memoize unique groups to prevent unnecessary recalculations
  const uniqueGroups = useMemo(
    () => [...new Set(results.map((item) => item.group))],
    [results]
  );

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelected) => {
      if (!prevSelected) prevSelected = []; // 🔹 Ensure prevSelected is always an array
      return prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category) // Remove category
        : [...prevSelected, category]; // Add category
    });
  };

  useEffect(() => {
    if (selectedCategories) onCategorySelect(selectedCategories);
  }, [selectedCategories, onCategorySelect]);

  return (
    <div style={styles.categories}>
      {uniqueGroups.map((category, index) => (
        <div
          key={index}
          style={{
            ...styles.categoryItem,
            backgroundColor: selectedCategories?.includes(category)
              ? "#A3E0BF"
              : "#EEFAF4",
          }}
          onClick={() => handleCategoryClick(category)}
        >
          {category || "Uncategorized"}
        </div>
      ))}
    </div>
  );
};

const styles = {
  categories: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    paddingRight: "10px",
    maxHeight: "400px",
    overflowY: "auto",
  },
  categoryItem: {
    padding: "8px",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer",
  },
};

export default SearchCategories;
