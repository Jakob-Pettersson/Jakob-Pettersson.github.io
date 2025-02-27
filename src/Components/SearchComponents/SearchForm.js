import { useEffect, useRef, useState } from "react";
import foodDataSearch from "../../Data/foodTableForSearch.json";
import SearchResultsContainer from "./SearchResultsContainer";

function SearchForm({ onAddFood }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input) {
      const results = foodDataSearch.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <div style={styles.searchBar}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        style={styles.input}
      />
      <SearchResultsContainer
        style={styles.searchResultsContainer}
        results={filteredResults}
        onAddFood={onAddFood}
      />
    </div>
  );
}

// 🔹 Styles
const styles = {
  searchBar: {},
  input: {
    width: "89vw", // 90% of viewport width
    maxWidth: "90vw", // Ensures it doesn't exceed screen width
    padding: "10px",
    paddingLeft: "45px",
    border: "1px solid #ddd",
    cursor: "pointer", // Indicates it's clickable
    borderRadius: "10px", // Optional for styling
    fontSize: "22px",
  },
};

export default SearchForm;
