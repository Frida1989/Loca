const API_URL = "http://localhost:5000";

// Get all bookings from backend
export async function getAllBookings() {
  const response = await fetch(`${API_URL}/api/bookings`);

  if (!response.ok) {
    throw new Error("Could not fetch bookings");
  }

  const data = await response.json();

  return data;
}

export async function deleteBooking(id) {
  const response = await fetch(`${API_URL}/api/bookings/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete booking");
  }
}

export async function updateBooking(id, updatedBooking) {
  const response = await fetch(`${API_URL}/api/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBooking),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not update booking");
  }

  return data;
}
