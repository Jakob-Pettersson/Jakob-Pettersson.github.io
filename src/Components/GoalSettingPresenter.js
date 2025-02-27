import { useState } from "react";
import DRI from "../Data/DRI.json";

function GoalSettingPresenter({
  recommendedDailyIntake,
  setRecommendedDailyIntake,
}) {
  const goals = [{ title: "Nutrition Goals" }];
  const nutrients = {
    "Energy (kcal/kg)": "Energy",
    "Fat, total (g/kg)": "Fat",
    "Protein (g)": "Protein",
    "Carbohydrates available (g)": "Carbohydrates",
    "Fibre (g)": "Fibre",
    "Water (g)": "Water",
    "Alcohol (g)": "Alcohol",
    "Ash (g)": "Ash",
    "Sugar total (g)": "Sugar total",
    "Monosaccharides (g)": "Monosaccharides",
    "Disaccharides (g)": "Disaccharides",
    "Added sugar (g)": "Added sugar",
    "Free sugar (g)": "Free sugar",
    "Wholegrain total (g)": "Wholegrain total",
    "Sum of saturated fatty acids (g)": "Sum of saturated fatty acids",
    "Fatty acids 4:0-10:0 (g)": "Fatty acids 4:0-10:0",
    "Fatty acid 12:0 (g)": "Fatty acid 12:0",
    "Fatty acid 14:0 (g)": "Fatty acid 14:0",
    "Fatty acid 16:0 (g)": "Fatty acid 16:0",
    "Fatty acid 18:0 (g)": "Fatty acid 18:0",
    "Fatty acid 20:0 (g)": "Fatty acid 20:0",
    "Sum of monounsaturated fatty acids (g)":
      "Sum of monounsaturated fatty acids",
    "Fatty acid 16:1 (g)": "Fatty acid 16:1",
    "Fatty acid 18:1 (g)": "Fatty acid 18:1",
    "Sum of polyunsaturated fatty acids (g)":
      "Sum of polyunsaturated fatty acids",
    "Fatty acids 18:2 (g)": "Fatty acids 18:2",
    "Fatty acid 18:3 (g)": "Fatty acid 18:3",
    "Fatty acid 20:4 (g)": "Fatty acid 20:4",
    "EPA (Fatty acid 20:5) (g)": "EPA (Fatty acid 20:5)",
    "DPA (Fatty acid 22:5) (g)": "DPA (Fatty acid 22:5)",
    "DHA (Fatty acid 22:6) (g)": "DHA (Fatty acid 22:6)",
    "Cholesterol (mg)": "Cholesterol",
    "Retinol equivalents (RE/µg)": "Retinol equivalents",
    "Retinol (µg)": "Retinol",
    "Beta-Carotene (µg)": "Beta-Carotene",
    "Vitamin D (µg)": "Vitamin D",
    "Vitamin E (mg)": "Vitamin E",
    "Vitamin K (µg)": "Vitamin K",
    "Thiamin (mg/kg)": "Thiamin",
    "Riboflavin (mg)": "Riboflavin",
    "Niacin (mg)": "Niacin",
    "Niacin equivalents (NE/mg)": "Niacin equivalents",
    "Vitamin B-6 (mg)": "Vitamin B-6",
    "Folate, total (µg)": "Folate, total",
    "Vitamin B-12 (µg)": "Vitamin B-12",
    "Vitamin C (mg)": "Vitamin C",
    "Phosphorus, P (mg)": "Phosphorus",
    "Iodide, I (µg)": "Iodide",
    "Iron, Fe (mg)": "Iron",
    "Calcium, Ca (mg)": "Calcium",
    "Potassium, K (mg)": "Potassium",
    "Magnesium, Mg (mg)": "Magnesium",
    "Sodium, Na (mg)": "Sodium",
    "Salt, NaCl (g)": "Salt",
    "Selenium, Se (µg)": "Selenium",
    "Zinc, Zn (mg)": "Zinc",
  };
  const sexOptions = ["Male", "Female"];
  const ageOptions = [
    "6 months",
    "12 months",
    "1-3 years",
    "4-6 years",
    "7-10 years",
    "11-14 years",
    "15-17 years",
    "18-24 years",
    "25-50 years",
    "51-70 years",
    ">70 years",
  ];
  const [sexOption, setsexOption] = useState("Male");
  const [ageOption, setageOption] = useState("6 months");
  const [weight, setWeight] = useState(50);

  return (
    <div style={styles.goalContainer}>
      {goals.map((goal, index) => (
        <div key={index} style={styles.goalCard}>
          <h3>{goal.title}</h3>
          <p id="default">
            <p>
              Sex:
              <select
                onChange={(e) => setsexOption(e.target.value)}
                value={sexOption}
              >
                {sexOptions.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            </p>
            <p>
              Age:
              <select
                onChange={(e) => setageOption(e.target.value)}
                value={ageOption}
              >
                {ageOptions.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            </p>
            <p>
              Weight:
              <input
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              ></input>
            </p>
            <p>
              <button
                onClick={() =>
                  setRecommendedDailyIntake(
                    updateRDI(sexOption, ageOption, weight)
                  )
                }
              >
                Update Goals
              </button>
            </p>
          </p>
          <p id="advanced" style={{ display: "none" }}>
            {Object.keys(nutrients).map((option) => (
              <p>
                {option}:<input></input>
              </p>
            ))}
          </p>
          <p onClick={toggle}>Advanced View</p>
        </div>
      ))}
    </div>
  );
}

function toggle() {
  var x = document.getElementById("advanced");
  var y = document.getElementById("default");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
}

function updateRDI(sex, age, weight) {
  const result = DRI.rows.find((item) => item.Sex === sex && item.Age === age);
  console.log(sex);
  console.log(age);
  console.log(result);
  var newDRI = { ...result };
  if (age === "6 months" || age === "12 months") {
    newDRI.Energy = result.Energy * weight;
  }
  newDRI.Fat = ((newDRI.Energy * 0.35) / 9).toFixed(1);
  newDRI.Carbohydrates = ((newDRI.Energy * 0.5) / 4).toFixed(1);
  newDRI.Protein = result.Protein * weight;
  newDRI["Free sugar"] = ((newDRI.Energy * 0.05) / 4).toFixed(1);
  newDRI["Sum of saturated fatty acids"] = ((newDRI.Energy * 0.05) / 9).toFixed(
    1
  );
  newDRI["Sum of monounsaturated fatty acids"] = (
    (newDRI.Energy * 0.2) /
    9
  ).toFixed(1);
  newDRI["Sum of polyunsaturated fatty acids"] = (
    (newDRI.Energy * 0.1) /
    9
  ).toFixed(1);
  newDRI.Thiamin = (newDRI.Energy * 0.0004184).toFixed(1);

  console.log(newDRI);
  return newDRI;
}

export default GoalSettingPresenter;

const styles = {
  goalContainer: {
    display: "flex",
    gap: "20px",
    padding: "10px",
    whiteSpace: "nowrap",
    flexDirection: "row",
  },
  goalCard: {
    minWidth: "250px",
    padding: "15px",
    borderRadius: "10px",
    background: "#f9f9f9",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
};
