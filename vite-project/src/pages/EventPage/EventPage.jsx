import { useParams, useOutletContext } from "react-router-dom";
import { useFetch } from "../../scripts/useFetch";
import EventCard from "../../components/EventCard/EventCard";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { formatDateShort } from "../../utils/formatDate";
import "./EventPage.css";
import Counter from "../../components/Counter";

function EventPage() {
  const { id } = useParams();
  const { data, loading, error } = useFetch("https://santosnr6.github.io/Data/events.json");
  const { savedEvents, addToSaved } = useOutletContext();
  const [ticketCount, setTicketCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <div className="container">Loading events...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  const isSingleView = !!id;

  if (isSingleView && data?.events) {
    const event = data.events.find((event) => event.id === id);
    if (!event) return <div className="container">Event not found.</div>;

    const { day, month } = formatDateShort(event.when.date);

    return (
      <div className={` single-event-view`}>
        <div className="single-event-page">
          <h1>Event</h1>
          <p className="event-page-description">You are about to score some tickets to</p>
          <div className="event-group">
            <h2 className="event-title">{event.name}</h2>
            <p className="event-info event-info-time">{day} {month} kl {event.when.from} – {event.when.to}</p>
            <p className="event-info event-info-where">@ {event.where}</p>
          </div>
          <div className="ticket-counter-box">
            <span className="ticket-counter-label">{event.price * ticketCount} Sek</span>
            <Counter
              count={ticketCount}
              setCount={(newCount) => setTicketCount(newCount)}
            />
          </div>
            <div className="btn-container">
              <button className="button" onClick={() => addToSaved({ ...event, ticketCount })}> Lägg i varukorgen</button>
            </div>
        </div>
      </div>
    );
  }

  const filteredEvents = data?.events?.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.where.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="single-event-page">
      <h1>Events</h1>
      <div className="search-bar-wrapper">
        <div className="search-bar-input-wrapper">
           <label htmlFor="search" className="visually-hidden">Search Events</label>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="event-search-input" />
        </div>
      </div>
      <div className="event-list">
        {filteredEvents?.length > 0 ? (
          filteredEvents.map((event) => {
            const { day, month } = formatDateShort(event.when.date);
            return (
              <EventCard key={event.id} event={{ ...event, formattedDate: `${day} ${month}` }}/>
            );
          })
        ) : (
          <p>Inga event hittades.</p>
        )}
      </div>
    </div>
  );
}

export default EventPage;
