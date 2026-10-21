import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./Home.jsx";
import About from "./About.jsx";
import Layout from "../Layouts/Layouts.jsx";
import NotFound from "./NotFound.jsx";
import Admin from "./Admin.jsx";

import { fetchStays } from "../services/StayApi.js";

function App() {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllStays = async () => {
    try {
      const data = await fetchStays();
      setStays(data);
    } catch (error) {
      setError("Could not load stays. Please try again later.");
      console.log("Could not load stays:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStays();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={<Home stays={stays} loading={loading} error={error} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/admin-secret-bookings" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
