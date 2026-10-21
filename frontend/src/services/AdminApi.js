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
