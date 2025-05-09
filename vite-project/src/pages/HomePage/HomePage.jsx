import heroImage from "../../assets/Images/Concert.png"; 
import "./HomePage.css";

function HomePage() {
  return (
    <div className="container">
      <div className="home-container">
        <img src={heroImage} alt="Karaktär med partyhatt och serpentiner" className="home-image" />
        <div className="home-text">
          <h1>Where it's @</h1>
          <p>Ticketing made easy</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
