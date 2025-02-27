import SearchForm from "./SearchForm";

function SearchBar({ toggleSearchBar, onAddFood }) {
  return (
    <div style={styles.searchBar}>
      <button onClick={toggleSearchBar} style={styles.toggleButton}>
        X
      </button>
      <SearchForm onAddFood={onAddFood} style={styles.searchForm} />
    </div>
  );
}

const styles = {
  searchBar: {
    // width: "90vw",
    flexDirection: "row",
    display: "flex",
    position: "absolute",
    padding: "10px",
    zIndex: 1,
  },
  searchForm: {
    // width: "100vw",
  },
  toggleButton: {
    position: "absolute",
    width: "20px",
    height: "20px",
    border: "none",
    borderRadius: "15px",
    margin: "10px",
    backgroundColor: "transparent",
    color: "#57ADD0",
    cursor: "pointer",
    fontSize: "20px",
  },
};

export default SearchBar;
