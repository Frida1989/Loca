const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchStays = async () => {
  // Get stays from the Express API.
  const response = await fetch(`${BASE_URL}/api/stays`);

  if (!response.ok) {
    throw new Error("Could not load stays. Please try again.");
  }

  return await response.json();
};
