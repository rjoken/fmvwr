import "./App.css";
import React, { useState } from "react";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import CardViewer from "./components/CardViewer";
import RankCalculator from "./components/RankCalculator";

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <Navbar onPageClick={setCurrentPage} />
      <Title />
      <div className="content-container">
        {currentPage === 0 && <CardViewer />}
        {currentPage === 1 && <RankCalculator />}
      </div>
    </>
  );
}

export default App;
