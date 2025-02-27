// src/Navbar.js

function Navbar() {
  // Define styles as JavaScript objects
  const styles = {
    navbar: {
      backgroundColor: "#1f2937", // Tailwind's bg-gray-800
      width: "100vw",
      maxWidth: "100vw",
      color: "white",
      padding: "16px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "600",
    },
    links: {
      display: "flex",
      gap: "24px",
      listStyle: "none",
    },
    link: {
      textDecoration: "none",
      color: "white",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#d1d5db", // Tailwind's text-gray-300
    },
    buttons: {
      display: "flex",
      gap: "12px",
    },
    button: {
      backgroundColor: "#2563eb", // Tailwind's bg-blue-600
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#1e40af", // Darker blue
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* App Title */}
      <div style={styles.title}>My App</div>

      {/* Buttons (4 from left to right) */}
      <div style={styles.buttons}>
        <button style={styles.button}>Home</button>
        <button style={styles.button}>About</button>
        <button style={styles.button}>Team</button>
        <button style={styles.button}>KTH</button>
      </div>
    </nav>
  );
}

export default Navbar;
