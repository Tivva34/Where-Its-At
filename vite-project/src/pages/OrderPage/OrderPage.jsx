import { useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./OrderPage.css";
import useStore from "../../store/useStore";
import { v4 as uuidv4 } from "uuid";
import Counter from "../../components/Counter";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

function OrderPage() {
  const { savedEvents, removeFromSaved } = useOutletContext();
  const { addMultipleTickets } = useStore();
  const [width, height] = useWindowSize();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const [ticketCounts, setTicketCounts] = useState(
    savedEvents.reduce((acc, event) => {
      acc[event.id] = event.ticketCount || 1;
      return acc;
    }, {})
  );
 
  const [eventsToRemove, setEventsToRemove] = useState([]);
  const totalPrice = savedEvents.reduce((sum, event) => {
    const pricePerTicket = event.price > 0 ? event.price : 0;
    const count = ticketCounts[event.id] || 1;
    return sum + pricePerTicket * count;
  }, 0);

  const handleOrderSubmit = () => {
    const tickets = savedEvents.flatMap((event) => {
      const ticketCount = ticketCounts[event.id] || 1;
      const section = String.fromCharCode(65 + Math.floor(Math.random() * 5));
      const startSeat = Math.floor(Math.random() * 500) + 1;

      return Array.from({ length: ticketCount }, (_, index) => {
        const seat = startSeat + index;
        const code = uuidv4().replace(/-/g, "").slice(0, 5).toUpperCase();

        return {
          ...event,
          id: uuidv4(),
          section,
          seat,
          code: `#${code}`,
        };
      });
    });

    addMultipleTickets(tickets);
    removeFromSaved();
    setOrderConfirmed(true);
  };

  
  const handleCountChange = (eventId, newCount) => {
    setTicketCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts, [eventId]: newCount };

      if (newCount <= 0) {
        setEventsToRemove((prevEvents) => [...prevEvents, eventId]);
      }

      return updatedCounts;
    });
  };

  
  useEffect(() => {
    if (eventsToRemove.length > 0) {
      eventsToRemove.forEach((eventId) => {
        removeFromSaved(eventId); 
      });
      setEventsToRemove([]); 
    }
  }, [eventsToRemove, removeFromSaved]);

  return (
  <div className="order-page">
    {orderConfirmed && <Confetti width={width} height={height} />}
    <h1 className="order-page__title">Order</h1>

    {orderConfirmed ? (
      <div className="order-confirmation">
        <p>
          <strong>Grymt!</strong> Dina biljetter finns nu på biljettsidan
        </p>
        <Link to="/ticket">
          <button className="button">Biljetter</button>
        </Link>
      </div>
      ) : savedEvents.length === 0 ? (
        <>
          <p className="order-page__empty">Du har inga events sparade än.</p>
          <Link to="/event" className="link-button">
            <button className="button">Utforska Events</button>
          </Link>
        </>
      ) : (
        <>
          <ul className="order-list">
            {savedEvents.map((event) => (
              <li key={event.id} className="ticket-item__order">
                <div className="ticket-box__order">
                  <div className="ticket-counter-box__order">
                    <div className="ticket-info__order">
                      <h3 className="ticket-name__order">{event.name}</h3>
                      <p className="ticket-details__order">
                        {event.when.date} kl {event.when.from} – {event.when.to}
                      </p>
                    </div>
                    <Counter
                      count={ticketCounts[event.id] || 1}
                      setCount={(newCount) => handleCountChange(event.id, newCount)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <p>Totalt värde på order</p>
            <p className="total-order-price">{totalPrice} SEK</p>
          </div>
          <button className="button" onClick={handleOrderSubmit}>Skicka order</button>
        </>
      )}
    </div>
  );
}

export default OrderPage;
