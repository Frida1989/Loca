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

// // POST, PUT, DELETE - Send data to backend
// export const fetchData = async (endpoint, method, body) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${endpoint}`, {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     // Check if the request was successful
//     if (!response.ok) {
//       throw new Error("Request failed");
//     }

//     // Convert JSON response to JavaScript data
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.log("Request error:", error);
//     throw error;
//   }
// };
