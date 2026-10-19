import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./Home.jsx";
import About from "./About.jsx";
import StayDetails from "../Components/StayDetails.jsx";
import Layout from "../Layouts/Layouts.jsx";

import { fetchStays } from "../services/StayApi.js";

function App() {
  const [stays, setStays] = useState([]);

  const getAllStays = async () => {
    try {
      const data = await fetchStays();
      setStays(data);
    } catch (error) {
      console.log("Could not load stays:", error);
    }
  };

  useEffect(() => {
    getAllStays();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home stays={stays} />} />

        <Route path="/about" element={<About />} />

        <Route path="/stay/:stayId" element={<StayDetails stays={stays} />} />

        <Route path="*" element={<h2>Page not found</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
