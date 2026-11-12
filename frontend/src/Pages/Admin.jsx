import { useState, useEffect } from "react";
import {
  getAllBookings,
  deleteBooking,
  updateBooking,
} from "../services/AdminApi.js";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit form
  const [editId, setEditId] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  async function loadBookings() {
    try {
      const data = await getAllBookings();
      setBookings(data);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  // Delete a booking
  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this booking?");

    if (!confirmed) return;

    try {
      await deleteBooking(id);
      await loadBookings();
    } catch (error) {
      setError(error.message);
    }
  }

  // Fill the edit form with current values
  function handleEdit(booking) {
    setEditId(booking.id);
    setRoomType(booking.room_type);
    setCheckIn(booking.check_in);
    setCheckOut(booking.check_out);
  }

  // Save the edited booking
  async function handleSave(id) {
    try {
      await updateBooking(id, {
        room_type: roomType,
        check_in: checkIn,
        check_out: checkOut,
      });

      setEditId(null);
      await loadBookings();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="admin">
      <h1>Admin Dashboard</h1>
      <p>Manage your Loca bookings.</p>

      {loading && <p>Loading bookings...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}

      <ul className="admin__list">
        {bookings.map((booking) => (
          <li className="admin__item" key={booking.id}>
            <h2>
              #{booking.id} — {booking.first_name} {booking.last_name}
            </h2>

            <p>Email: {booking.email}</p>
            <p>Stay: {booking.stay_name}</p>
            <p>City: {booking.stay_city}</p>
            <p>Room: {booking.room_type}</p>
            <p>Check-in: {booking.check_in}</p>
            <p>Check-out: {booking.check_out}</p>

            <button onClick={() => handleEdit(booking)}>Edit</button>

            <button onClick={() => handleDelete(booking.id)}>Delete</button>

            {/* Show form only for selected booking */}
            {editId === booking.id && (
              <div>
                <h3>Edit Booking</h3>

                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                </select>

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />

                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                />

                <button onClick={() => handleSave(booking.id)}>Save</button>

                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Admin;
