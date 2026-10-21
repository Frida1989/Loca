const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function createBooking(bookingData) {
  // Save the booking in SQLite through Express.
  const response = await fetch(`${BASE_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      data.error || "Could not create booking. Please try again.",
    );
  }

  return await response.json();
}
