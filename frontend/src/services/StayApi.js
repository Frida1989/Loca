const BASE_URL = "http://localhost:5000";

export const fetchStays = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/stays`);

    if (!response.ok) {
      throw new Error("Failed to fetch stays");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("GET stays error:", error);
    throw error;
  }
};
