import { useState } from "react";
import { createBooking } from "../services/BookingApi.js";
import Confirmation from "../Pages/Confirmation.jsx";

function BookingForm({ selectedStay, closeForm }) {
  const [roomType, setRoomType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [bookingId, setBookingId] = useState(null);
  const [savedBooking, setSavedBooking] = useState(null);

  // Get today's date
  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // Check-out must be at least one day after check-in
  const minimumCheckOut = checkIn ? new Date(checkIn + "T12:00:00") : null;

  if (minimumCheckOut) {
    minimumCheckOut.setDate(minimumCheckOut.getDate() + 1);
  }

  const minimumCheckOutString = minimumCheckOut
    ? [
        minimumCheckOut.getFullYear(),
        String(minimumCheckOut.getMonth() + 1).padStart(2, "0"),
        String(minimumCheckOut.getDate()).padStart(2, "0"),
      ].join("-")
    : todayString;

  // Clear all form fields
  function resetForm() {
    setFirstName("");
    setLastName("");
    setRoomType("");
    setEmail("");
    setPhoneNumber("");
    setCheckIn("");
    setCheckOut("");
    setError("");
    setFormSubmitted(false);
    setBookingId(null);
    setSavedBooking(null);
  }

  // Handle booking form submission
  async function handleSave(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setError("");

    if (checkIn < todayString) {
      setError("Check-in cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    const bookingData = {
      stay_id: selectedStay.id,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone: phoneNumber.trim(),
      room_type: roomType,
      check_in: checkIn,
      check_out: checkOut,
    };

    setIsSubmitting(true);

    try {
      const result = await createBooking(bookingData);

      setBookingId(result.bookingId);
      setSavedBooking(bookingData);
      setFormSubmitted(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  // Reset and close the form
  function handleCancel() {
    resetForm();
    closeForm();
  }

  if (formSubmitted && savedBooking) {
    return (
      <Confirmation
        bookingId={bookingId}
        selectedStay={selectedStay}
        bookingData={savedBooking}
        onClose={handleCancel}
      />
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
        {/* ROOM TYPE */}
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

        {/* GUEST NAME */}

        <div className="form-group">
          <label className="form-label" htmlFor="firstName">
            First name *
          </label>

          <input
            id="firstName"
            className="form-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lastName">
            Last name *
          </label>

          <input
            id="lastName"
            className="form-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        {/* EMAIL */}
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

        {/* PHONE */}
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

        {/* CHECK-IN */}
        <div className="form-group">
          <label className="form-label" htmlFor="checkIn">
            Check-in *
          </label>

          <input
            id="checkIn"
            className="form-input"
            type="date"
            value={checkIn}
            min={todayString}
            onChange={(e) => {
              const newCheckIn = e.target.value;

              setCheckIn(newCheckIn);

              if (checkOut && checkOut <= newCheckIn) {
                setCheckOut("");
              }

              setError("");
            }}
            required
          />
        </div>

        {/* CHECK-OUT */}
        <div className="form-group">
          <label className="form-label" htmlFor="checkOut">
            Check-out *
          </label>

          <input
            id="checkOut"
            className="form-input"
            type="date"
            value={checkOut}
            min={minimumCheckOutString}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        {/* BUTTONS */}
        <div className="booking-form__actions">
          <button
            className="button button-secondary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="button button-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Confirming..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookingForm;
