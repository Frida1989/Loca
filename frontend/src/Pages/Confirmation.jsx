function Confirmation({ bookingId, selectedStay, bookingData, onClose }) {
  return (
    <section className="confirmation">
      <div className="confirmation__header">
        <p className="section-eyebrow">YOUR RESERVATION</p>

        <h2 className="confirmation__title">
          You're all set, {bookingData.first_name}.
        </h2>

        <p className="confirmation__description">
          A new city, a new story. Your stay is confirmed.
        </p>
      </div>

      <div className="confirmation__details">
        <p>Booking reference: #{bookingId}</p>

        <h3>{selectedStay.name}</h3>
        <p>{selectedStay.city}</p>

        <p>Room: {bookingData.room_type}</p>
        <p>Check-in: {bookingData.check_in}</p>
        <p>Check-out: {bookingData.check_out}</p>
      </div>

      <button type="button" className="button button-primary" onClick={onClose}>
        Back to exploring
      </button>
    </section>
  );
}

export default Confirmation;
