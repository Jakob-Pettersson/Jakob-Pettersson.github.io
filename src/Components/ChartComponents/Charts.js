import RadarChart from "./RadarChart";
import RadialBar from "./RadialBar";

function Charts({ addedFoodItems, displayedNutrients, goals, hoveredItem }) {
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
      <RadialBar
        addedFoodItems={addedFoodItems}
        goals={goals}
        displayedNutrients={displayedNutrients}
        hover={hoveredItem}
      />
    </div>
  ) : (
    ""
  );
}

export default Charts;
