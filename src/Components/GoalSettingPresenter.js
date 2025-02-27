import { useState } from "react";
import DRI from "../Data/DRI.json";

function GoalSettingPresenter({ 
   
  onReceivedRecommendedIntake,
}) {
  const nutrients01 = {
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

  const defaultNutrients = {
    Calcium: 1000,
    Carbohydrates: 280.6,
    Energy: 2245,
    Fat: 87.3,
    Fibre: 30,
    Protein: 45.65,
    Salt: 5.75,
    Sodium: 2300,
    "Vitamin C": 95,
    "Vitamin D": 10,
    Zinc: 9.7,
  };

  const calculatedNutrients = {
    "Added sugar": 0,
    Alcohol: 0,
    Calcium: 1000,
    Carbohydrates: 280.6,
    Energy: 2245,
    Fat: "87.3",
    Fibre: 30,
    "Folate, total": 330,
    "Free sugar": 28.1,
    Iodide: 150,
    Iron: 15,
    Magnesium: 300,
    Phosphorus: 550,
    Potassium: 3500,
    Protein: 45.65,
    Riboflavin: 1.6,
    Salt: 5.75,
    Selenium: 75,
    Sodium: 2300,
    "Sum of monounsaturated fatty acids": 49.9,
    "Sum of polyunsaturated fatty acids": 24.9,
    "Sum of saturated fatty acids": 12.5,
    Thiamin: 0.9,
    "Vitamin B-6": 1.6,
    "Vitamin B-12": 4,
    "Vitamin C": 95,
    "Vitamin D": 10,
    "Vitamin E": 10,
    "Vitamin K": 65,
    Zinc: 9.7,
  };

  const alllNutrientsKeys = [
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
  const [displayedNutrients, setDisplayedNutrients] =
    useState(defaultNutrients);
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
  const [sexOption, setsexOption] = useState("Female");
  const [ageOption, setageOption] = useState("18-24 years");
  const [weight, setWeight] = useState(55);

  function updateRDI(sex, age, weight) {
    const result = DRI.rows.find(
      (item) => item.Sex === sex && item.Age === age
    );
    if (!result) return;

    console.log(sex, age, result);

    var newDRI = { ...result };

    if (age === "6 months" || age === "12 months") {
      newDRI.Energy = result.Energy * weight;
    }

    newDRI.Fat = parseFloat(((newDRI.Energy * 0.35) / 9).toFixed(1));
    newDRI.Carbohydrates = parseFloat(((newDRI.Energy * 0.5) / 4).toFixed(1));
    newDRI.Protein = result.Protein * weight;
    newDRI["Free sugar"] = parseFloat(((newDRI.Energy * 0.05) / 4).toFixed(1));
    newDRI["Sum of saturated fatty acids"] = parseFloat(
      ((newDRI.Energy * 0.05) / 9).toFixed(1)
    );
    newDRI["Sum of monounsaturated fatty acids"] = parseFloat(
      ((newDRI.Energy * 0.2) / 9).toFixed(1)
    );
    newDRI["Sum of polyunsaturated fatty acids"] = parseFloat(
      ((newDRI.Energy * 0.1) / 9).toFixed(1)
    );
    newDRI.Thiamin = parseFloat((newDRI.Energy * 0.0004184).toFixed(1));



    const cleanDRI = Object.fromEntries(
      Object.entries(newDRI).filter(([_, v]) => v !== null)
    );



    const filteredDRI = Object.fromEntries(
      Object.entries(cleanDRI).filter(([key]) =>
        displayedNutrients.hasOwnProperty(key)
      )
    );

    setDisplayedNutrients(filteredDRI);

    onReceivedRecommendedIntake(filteredDRI);
  }

  return (
    <div style={styles.goalContainer}>
      <div style={styles.goalCard}>
        <h3>Nutrition Goals</h3>
        <div id="default">
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
            <button onClick={() => updateRDI(sexOption, ageOption, weight)}>
              Update Goals
            </button>
          </p>
        </div>

        <div id="advanced">
          <div>
            {Object.entries(displayedNutrients).map(([key, value], index) => (
              <p key={index}>
                {key}: <span>{value}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
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
