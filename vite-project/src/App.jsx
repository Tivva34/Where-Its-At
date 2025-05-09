import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./scripts/useLocalStorage";
import RootLayout from "./components/layout/RootLayout"; 
import HomePage from "./pages/HomePage/HomePage";
import EventPage from "./pages/EventPage/EventPage";
import TicketPage from "./pages/TicketPage/TicketPage"; 
import OrderPage from "./pages/OrderPage/OrderPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import './assets/Fonts/font.css';
import './index.css';

function App() {
  const { savedEvents, addToSaved, removeFromSaved } = useLocalStorage();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout savedEvents={savedEvents} addToSaved={addToSaved} removeFromSaved={removeFromSaved} />}>
          <Route index element={<HomePage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="event" element={<EventPage />} />
          <Route path="event/:id" element={<EventPage />} />
          <Route path="ticket" element={<TicketPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
