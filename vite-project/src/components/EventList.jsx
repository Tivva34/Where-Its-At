import TicketCard from "./TicketCard/TicketCard";

function EventList({ arr }) {
  return (
    <ul className="list">
      {arr.map((event) => (
        <TicketCard key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;