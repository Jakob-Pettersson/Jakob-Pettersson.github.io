import RadarChart from "./RadarChart";
import RadialBar from "./RadialBar";
import RadarChartCompare from "./RadarChartCompare";

function Charts({ addedFoodItems, displayedNutrients, goals, hoveredItem, selectedItems,compareActivated, comparingItem}) {






  return addedFoodItems ? (
    <div style={{ position: "relative" }}>
      
      {hoveredItem && (
        <div style={{ position: "absolute" }}>
          <RadarChart
            displayedNutrients={displayedNutrients}
            goals={goals}
            hoveredItem={hoveredItem}
            selectedItems={selectedItems}
          />
        </div>
      )}
      {compareActivated && (
        <div style={{ position: "absolute" }}>
          <RadarChartCompare
            displayedNutrients={displayedNutrients}
            goals={goals}
            selectedItems={selectedItems}
            compareActivated={compareActivated}
            comparingItem={comparingItem}
          />
        </div>
      )}
      <RadialBar
        addedFoodItems={addedFoodItems}
        goals={goals}
        displayedNutrients={displayedNutrients}
        hover={hoveredItem}
        compareActivated={compareActivated}
      />
    </div>
  ) : (
    ""
  );
}

export default Charts;
