import { useState } from "react";
import SearchCategories from "./SearchCategories";
import SearchResultList from "./SearchResultList";

const SearchResultsContainer = ({ results, onAddFood }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredResults = selectedCategories.length
    ? results.filter((item) => selectedCategories.includes(item.group))
    : results;

  return (
    <div style={styles.container}>
      <SearchCategories
        results={results}
        onCategorySelect={setSelectedCategories}
      />
      <SearchResultList results={filteredResults} onAddFood={onAddFood} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#D7EBE0",
  },
};

export default SearchResultsContainer;
