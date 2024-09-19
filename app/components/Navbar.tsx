import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className="flex flex-wrap bg-blue-500 sm:h-10 fixed top-0 w-full z-20">
        <a href="#" className="text-white font-bold no-underline px-3 py-2">
          FMViewer
        </a>
        <a href="/viewer" className="navbar-item">
          Card Viewer
        </a>
        <a href="/calc" className="navbar-item">
          Rank Calculator
        </a>
        <a href="#" className="navbar-item">
          Card Tracker
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
