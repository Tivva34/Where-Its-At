import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";
import Button from "../../components/button";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/event");
  };

  return (
    <div className="error-page">
      <h1>Woops</h1>
      <p>Looks like you got lost on your way to the Concert!</p>
        <div className="btn-container">
            <Button id="button" className="button" onClickFunction={handleGoBack} btntext="Gå tillbaks!" />
        </div>
    </div>
  );
}
