import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendarDays,faShoppingCart,faTicket,} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <footer className="footer">
      <Link to="/event" aria-label="Events" className={currentPath === "/event" ? "active" : ""}>
        <FontAwesomeIcon icon={faCalendarDays} size="lg" />
      </Link>
      <Link to="/order"  aria-label="Order Summary" className={currentPath === "/order" ? "active" : ""}>
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
      </Link>
      <Link to="/ticket"  aria-label="Your Tickets" className={currentPath === "/ticket" ? "active" : ""}>
        <FontAwesomeIcon icon={faTicket} size="lg" />
      </Link>
    </footer>
  );
}

export default Footer;
