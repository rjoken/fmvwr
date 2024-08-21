import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CardViewer from "./components/CardViewer";
import RankCalculator from "./components/RankCalculator";

function App() {
  return (
    <>
      <Navbar />
      <div className="content-container">
        <Router>
          <Routes>
            <Route path="/" element={<CardViewer />} />
            <Route path="/viewer" element={<CardViewer />} />
            <Route path="/calculator" element={<RankCalculator />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
