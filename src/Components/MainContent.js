import { useState } from "react";
import AddedFoodTable from "./AddedFoodTableComponents/AddedFoodTable";
import SearchBar from "./SearchComponents/SearchBar";
import fullfoodData from "../Data/fullFoodData.json";
import GoalSettingPresenter from "./GoalSettingPresenter";
import ChartFilter from "./ChartFilter";
import Charts from "./ChartComponents/Charts";
import ComparisonRadarChart from "./ChartComponents/ComparisonRadarChart";

function MainContent() {
  const [recommendedDailyIntake, setRecommendedDailyIntake] = useState({
    Calcium: 1000,
    Potassium: 4700,
    Magnesium: 400,
    Sodium: 2300,
    Selenium: 55,
    Zinc: 11,
    "Vitamin E": 15,
    "Vitamin K": 120,
    "Vitamin C": 90,
    Iron: 18,
    Fibre: 28,
    Protein: 50,
    Carbohydrates: 275,
    "Sugar total": 50,
    Energy: 1000,
    Fat: 300,
  });

  const [foodItems, setFoodItems] = useState([]);

  const nutrientOptions = [
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
    "Phosphorus, P",
    "Iodide, I",
    "Iron",
    "Calcium",
    "Potassium",
    "Magnesium",
    "Sodium",
    "Salt",
    "Selenium",
    "Zinc",
  ];

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [displayedNutrients, setDisplayedNutrients] = useState(nutrientOptions);
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);

  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Track sidebar visibility

  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev); // Toggle visibility
  };

  const handleWeightChange = (foodId, newWeight) => {
    setFoodItems((prevFoodItems) =>
      prevFoodItems.map((item) =>
        item.food.id === foodId ? { ...item, weight: newWeight } : item
      )
    );
  };

  const handleDisplayedChange = (selectedOptions) => {
    setDisplayedNutrients(selectedOptions);
  };

  const handleAddFood = (food, weight) => {
    console.log("Food:", food);
    console.log("Weight:", weight);

    const foundFood = fullfoodData.find((item) => item.id === food.id);
    console.log("Found Food:", foundFood);

    if (foundFood) {
      // Store the food object inside a `food` key along with weight
      setFoodItems([...foodItems, { food: foundFood, weight }]);
      toggleSearchBar(); // Close the search bar after adding food
    }
  };

  const handleRemoveFood = (foodId) => {
    console.log("Removing food with ID:", foodId);

    // Find the food item in foodItems based on food.id
    const foundFood = foodItems.find((item) => item.food.id === foodId);
    if (!foundFood) return; // Exit if food not found

    // Remove the object from foodItems
    setFoodItems((prevFoodItems) =>
      prevFoodItems.filter((item) => item.food.id !== foodId)
    );
  };

  return (
    <>
      <ComparisonRadarChart
        displayedNutrients={displayedNutrients}
        goals={recommendedDailyIntake}
        hoveredItem={hoveredItem}
      />
      <div style={styles.mainContainer}>
        {/* Toggle Sidebar Button */}
        {!showSearchBar ? (
          <div style={styles.searchContainer} onClick={toggleSearchBar}>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search..."
              readOnly
            />
          </div>
        ) : (
          <SearchBar
            toggleSearchBar={toggleSearchBar}
            onAddFood={handleAddFood}
            style={styles.searchBar}
          />
        )}

        {showSearchBar && <div style={styles.searchWrapper}> </div>}

        <div style={styles.visContainer}>
          <div style={styles.foodTableContainer}>
            <div style={styles.foodTableTitleWrap}>
              <div style={styles.foodTableTitle}>Food Table</div>
            </div>
            <AddedFoodTable
              foodItems={foodItems}
              onRemoveItem={handleRemoveFood}
              onWeightChange={handleWeightChange}
              setHoveredItem={setHoveredItem}
            />
          </div>
          <div style={styles.chartContainer}>
            <Charts
              addedFoodItems={foodItems}
              displayedNutrients={displayedNutrients}
              goals={recommendedDailyIntake}
              hoveredItem={hoveredItem}
            />
            <button style={styles.settingBtn} onClick={toggleSidebar}>
              Goal Setting
            </button>
          </div>
          <div>
            <div style={styles.foodTableTitleWrap}>
              <div style={styles.nutrientsTitle}>Displayed Nutrients</div>
            </div>
            <ChartFilter onSelectionChange={handleDisplayedChange} />
          </div>
          {isSidebarVisible && (
            <div style={styles.sidebar}>
              <button onClick={toggleSidebar}>Close Goal Setting</button>
              <h3>Sidebar Content</h3>
              <p>Here are the goal-setting options...</p>
              <GoalSettingPresenter
                recommendedDailyIntake={recommendedDailyIntake}
                setRecommendedDailyIntake={setRecommendedDailyIntake}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// 🔹 Styles
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column", // 🔹 Stack items vertically
    alignItems: "center", // 🔹 Center horizontally (optional)
    // justifyContent: "space-between", // 🔹 Adjust spacing
    width: "100vw",
    maxWidth: "100vw",
  },
  searchBar: {
    backgroundColor: "blue",
    // width: "100vw",
    flexDirection: "row",
    display: "flex",
    // alignItems: "center",
    zIndex: 1,
  },
  searchContainer: {
    width: "90vw", // 90% of viewport width
    // maxWidth: "100vw", // Ensures it doesn't exceed screen width
    padding: "10px",
    cursor: "pointer", // Indicates it's clickable
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    width: "100%", // 90% of viewport width
    // maxWidth: "100vw", // Ensures it doesn't exceed screen width
    padding: "10px",
    border: "1px solid #ddd",
    cursor: "pointer", // Indicates it's clickable
    borderRadius: "10px", // Optional for styling
    fontSize: "22px",
    // justifyContent: "center",
  },

  searchWrapper: {
    height: "60px",
  },
  visContainer: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "20px",
    width: "95vw",
  },
  foodTableContainer: {
    // width: "100%",
    marginTop: "40px",
    borderRadius: "10px",
    // padding: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // gap: "10px",
  },

  foodTableTitleWrap: {
    width: "100%",
    textAlign: "left",
    paddingBottom: "10px",
  },
  foodTableTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#49A974",
    textAlign: "left",
    // paddingBottom: "10px",
  },
  nutrientsTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#57ADD0",
    textAlign: "left",
  },
  chartContainer: {},

  settingBtn: {
    padding: "10px 25px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#EBF6FA",
    color: "#57ADD0",
    cursor: "pointer",
    fontSize: "14px",
  },
  toggleButton: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    marginBottom: "10px",
  },
  sidebar: {
    position: "fixed",
    right: 0,
    top: 0,
    width: "250px",
    height: "100%",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderLeft: "1px solid #ddd",
  },
};

export default MainContent;
