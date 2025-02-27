function WeightInput({ value, onChange }) {
  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, ""); // Allow only numbers
    onChange(newValue);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="100"
        value={value || "100"}
        onChange={handleChange}
        onBlur={() => {
          if (!value) onChange("100"); // Set 100 when unfocused if empty
        }}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#EEFAF4",
          borderRadius: "5px",
          width: "100px",
          textAlign: "right",
          fontSize: "20px",
        }}
      />{" "}
      g
    </div>
  );
}

export default WeightInput;
