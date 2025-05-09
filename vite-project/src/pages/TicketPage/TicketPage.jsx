import { useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store/useStore";
import { formatDateShort } from "../../utils/formatDate";
import "./TicketPage.css";

function TicketPage() {
  const { tickets } = useStore();

  return (
    <div className="ticket-summary-page">
      {tickets.length === 0 ? (
        <>
          <h1>Tickets</h1>
          <p>Du har inga biljetter sparade ännu.</p>
          <Link to="/event">
            <button className="button">Utforska Events</button>
          </Link>
        </>
      ) : (
        <div className="ticket-summary-list">
          {tickets.map((ticket) => {
            const { day, month } = formatDateShort(ticket.when?.date || "N/A");
            return (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket">
                  <div className="ticket-section what">
                    <span className="label what">WHAT</span>
                    <h2>{ticket.name}</h2>
                  </div>
                  <div className="ticket-section where">
                    <span className="label where">WHERE</span>
                    <p><strong>{ticket.where}</strong></p>
                  </div>
                  <div className="ticket-details">
                    <div>
                      <span className="label when">WHEN</span>
                      <p>{day} {month}</p>
                    </div>
                    <div className="middle">
                      <span className="label from">FROM</span>
                      <p>{ticket.when?.from || "N/A"}</p>
                    </div>
                    <div>
                      <span className="label to">TO</span>
                      <p>{ticket.when?.to || "N/A"}</p>
                    </div>
                  </div>
                  <div className="ticket-section info">
                    <span className="label">INFO</span>
                    <p className="section-seat-info">{ticket.info || "Section "}{ticket.section} - seat {ticket.seat}, bring umbrella</p>
                  </div>
                  <div className="barcode">
                    <div className="bars"></div>
                    <p className="code">{ticket.code}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TicketPage;
