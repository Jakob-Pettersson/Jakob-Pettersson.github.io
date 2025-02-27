import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import MainContent from './Components/MainContent';

function App() {
  return (
    <div className="App" style={styles.app}>
       <Navbar style={styles.navbar}/>
        <MainContent style={styles.mainContainer}/>
    </div>
  );
}

export default App;
const styles = {
  app: {
    overflowX: "hidden",
    flexDirection: "column", // 🔹 Stack items vertically
    alignItems: "center", // 🔹 Center horizontally (optional)
    justifyContent: "space-between", // 🔹 Adjust spacing
    width: "100vw", 
    maxWidth: "100vw",
   
  },
  navbar:{
    width: "100vw", 
    maxWidth: "100vw",
    justifyContent: "space-between",
    alignItems: "center"
  },
  mainContainer:{
    width: "100vw", 
    maxWidth: "100vw",
  }

}