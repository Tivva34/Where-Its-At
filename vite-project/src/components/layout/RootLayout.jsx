import { Outlet } from "react-router-dom";
import { useLocalStorage } from "../../scripts/useLocalStorage";
import Footer from "../Footer/Footer";
import "./RootLayout.css";
import "../Footer/Footer.css"

function RootLayout() {
  const { savedEvents, addToSaved, removeFromSaved } = useLocalStorage();

  return (
    <div className="root-layout">
      <main className="main-content">
        <Outlet context={{ savedEvents, addToSaved, removeFromSaved }} />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
