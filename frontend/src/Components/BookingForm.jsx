import { useState } from "react";

function BookingForm({ selectedStay, closeForm }) {
  const [roomType, setRoomType] = useState("");
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  function resetForm() {
    setGuestName("");
    setRoomType("");
    setEmail("");
    setPhoneNumber("");
    setCheckIn("");
    setCheckOut("");
    setError("");
    setFormSubmitted(false);
  }

  function handleSave(e) {
    e.preventDefault();
    setError("");

    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    const bookingData = {
      stay_id: selectedStay.id,
      guest_name: guestName,
      email: email,
      phone: phoneNumber,
      room_type: roomType,
      check_in: checkIn,
      check_out: checkOut,
    };

    console.log("Booking form test:", bookingData);

    // POST to backend will be added later.
    setFormSubmitted(true);
  }

  function handleCancel() {
    resetForm();
    closeForm();
  }

  if (formSubmitted) {
    return (
      <section className="booking-form__success">
        <h2>Form validated!</h2>
        <p>
          Your booking details for {selectedStay.name}
          are ready to be sent.
        </p>
        <p>This is a test. No booking has been saved yet.</p>

        <button
          type="button"
          className="button button-primary"
          onClick={handleCancel}
        >
          Close
        </button>
      </section>
    );
  }

  return (
    <section className="booking-form__container">
      <div className="booking-form__header">
        <p className="section-eyebrow">BOOK YOUR STAY</p>

        <h2 className="section-title">{selectedStay.name}</h2>

        <p>{selectedStay.city}</p>
      </div>

      <form className="booking-form" onSubmit={handleSave}>
        <div className="form-group">
          <label className="form-label" htmlFor="roomType">
            Room type *
          </label>

          <select
            id="roomType"
            className="form-select"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          >
            <option value="">Select room type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="guest-name">
            Guest name *
          </label>

          <input
            id="guest-name"
            className="form-input"
            type="text"
            value={guestName}
            placeholder="Your full name"
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="guest-email">
            Email *
          </label>

          <input
            id="guest-email"
            className="form-input"
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phoneNumber">
            Mobile *
          </label>

          <input
            id="phoneNumber"
            className="form-input"
            type="tel"
            value={phoneNumber}
            placeholder="+46 70 123 45 67"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="checkIn">
            Check-in *
          </label>

          <input
            id="checkIn"
            className="form-input"
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="checkOut">
            Check-out *
          </label>

          <input
            id="checkOut"
            className="form-input"
            type="date"
            value={checkOut}
            min={checkIn || undefined}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="booking-form__actions">
          <button
            className="button button-secondary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button className="button button-primary" type="submit">
            Confirm Booking
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookingForm;
