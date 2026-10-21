import { useState, useEffect } from "react";
import { getAllBookings } from "../services/AdminApi.js";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getAllBookings();
        setBookings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  return (
    <main className="admin">
      <h1>Admin Dashboard</h1>
      <p>Manage your Loca bookings.</p>

      {loading && <p>Loading bookings...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}

      {!loading && !error && (
        <ul className="admin__list">
          {bookings.map((booking) => (
            <li className="admin__item" key={booking.id}>
              <h2>
                #{booking.id} — {booking.first_name} {booking.last_name}
              </h2>

              <p>Email: {booking.email}</p>
              <p>Room: {booking.room_type}</p>
              <p>Check-in: {booking.check_in}</p>
              <p>Check-out: {booking.check_out}</p>
              <p>Stay ID: {booking.stay_id}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Admin;
