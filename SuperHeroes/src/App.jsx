import { useState } from "react";
import "./App.css";
import History from "../components/History";
import BanList from "../components/BanList";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  // State variables to manage superhero data, ban list, and history
  const [superhero, setSuperhero] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  // Function to Fetch a Random Superhero
  const fetchSuperhero = async () => {
    let foundValidHero = false;
    
    while (!foundValidHero) {
      // Generate random ID for random superhero selection
      const randomId = Math.floor(Math.random() * 731) + 1;
      const API_URL = `https://www.superheroapi.com/api.php/${ACCESS_KEY}/${randomId}`;

      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Check if API returned valid data
        if (!data || data.response === "error") {
          alert("Oops! Something went wrong with that query, let's try again!");
          return;
        }

        // Check if this superhero is banned
        if (
          banList.includes(data.biography.publisher) ||
          banList.includes(data.biography.alignment) ||
          banList.includes(data.appearance.race)
        ) {
          console.log("Skipping banned superhero:", data.name);
          continue; // Try another hero
        }

        // If we get here, we found a valid hero
        foundValidHero = true;
        setSuperhero(data);
        setHistory((prev) => [...prev, data]);
        
      } catch (error) {
        console.error("Error fetching superhero:", error);
        alert("There was an error fetching superhero data.");
        return;
      }
    }
  };

  // Function to Add to Ban List
  // Adds a new attribute to the ban list if it's not already banned
  // This can be publisher, alignment, race, or power stats
  const addToBanList = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  };

  // Function to Remove from Ban List
  // Removes an attribute from the ban list when clicked in the ban list
  // Uses filter to create new array without the clicked attribute
  const removeBan = (attribute) => {
    setBanList(banList.filter(item => item !== attribute));
  };

  return (
    <div className="app-container">
      <History history={history} />
      <div className="main-section">
        <h1>SuperHero Discovery</h1>
        <h2>Leap Into the Superhero Universe!</h2>
        <h5>Aryan Lakhani &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Z number- Z23724811</h5>
        🦸‍♂️🦹‍♂️🦸‍♀️🦹‍♀️
        
        {/* Discover Button */}
        <div className="discover-container">
          <button type="button" className="discover-button" onClick={fetchSuperhero}>
          🔮 Discover!
          </button>
        </div>
    
        {/* Superhero Display Section */}
        {superhero && (
          <div className="hero-card">
            
            {/* Hero Name */}
            <h2 className="hero-name">{superhero.name}</h2>
    
            {/* Hero Image */}
            <div className="hero-image-container">
              <img 
                src={superhero.image.url} 
                alt={superhero.name} 
                className="hero-image" 
              />
            </div>
    
            {/* Attributes Section */}
            <div className="hero-attributes">
              <button className="info-button" onClick={() => addToBanList(superhero.biography.publisher)}>
                {superhero.biography.publisher ? superhero.biography.publisher : "Unknown Publisher"}
              </button>
    
              <button className="info-button" onClick={() => addToBanList(superhero.biography.alignment)}>
                {superhero.biography.alignment ? superhero.biography.alignment : "Unknown Alignment"}
              </button>
    
              <button className="info-button" onClick={() => addToBanList(superhero.appearance.race)}>
                {superhero.appearance.race && superhero.appearance.race !== "null" ? superhero.appearance.race : "Unknown Race"}
              </button>
            </div>
    
            {/* Power Levels Section */}
            <div className="powerstats-container">
              {Object.entries(superhero.powerstats).map(([statName, statValue]) => (
                <button 
                  key={statName} 
                  className="power-button" 
                  onClick={() => addToBanList(`${statName}: ${statValue}`)}
                >
                  {statName}: {statValue !== "null" ? statValue : "/"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <BanList banList={banList} removeBan={removeBan} />
    </div>
  );
  
}

export default App;
