import RadarChart from "./RadarChart";
import RadialBar from "./RadialBar";
import RadarChartCompare from "./RadarChartCompare";

function Charts({ addedFoodItems, displayedNutrients, goals, hoveredItem, selectedItems,compareActivated, comparingItem}) {

  console.log(selectedItems);
  console.log(addedFoodItems);
  console.log(comparingItem);




  return addedFoodItems ? (
    <div style={{ position: "relative" }}>
      
      {hoveredItem && (
        <div style={{ position: "absolute" }}>
          <RadarChart
            displayedNutrients={displayedNutrients}
            goals={goals}
            hoveredItem={hoveredItem}
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
