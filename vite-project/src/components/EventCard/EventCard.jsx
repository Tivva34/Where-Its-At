import { Link } from "react-router-dom";
import "./EventCard.css";


const formatDate = (dateString) => {
  if (!dateString) return { day: "N/A", month: "N/A" };
  const dateObj = new Date(dateString);
  if (isNaN(dateObj)) return { day: "N/A", month: "N/A" };

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "short" });
  return { day, month };
};
function EventCard({ event }) {
  const { day, month } = formatDate(event.when.date);

  return (
    <Link to={`/event/${event.id}`} id={event.id} className="event-card">
      <div className="date-box">
        <span className="day">{day}</span>
        <span className="month">{month}</span>
      </div>
    <div className="event-line">
      <div className="event-info">
        <h3>{event.name}</h3>
        <p className="event-location">{event.where}</p>
        <p className="event-time">
          {event.when.from} - {event.when.to}
        </p>
      </div>

      <div className="price">
        {event.price > 0 ? `${event.price} sek` : "Gratis"}
      </div>
      </div>
    </Link>
  );
}


export default EventCard;
