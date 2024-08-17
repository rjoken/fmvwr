import React, { useState } from "react";
import styles from "./Navbar.module.css";

interface Props {
  onPageClick: (page: number) => void;
}

function Navbar({ onPageClick }: Props) {
  // Return ID of clicked page to parent so that it can determine which components to render
  const handleNavbarClick = (page: number) => {
    onPageClick(page);
  };

  return (
    <>
      <div className={styles.navbar}>
        <ul>
          <li>
            <a onClick={() => handleNavbarClick(0)}>Card Viewer</a>
          </li>
          <li>
            <a onClick={() => handleNavbarClick(1)}>Rank Calculator</a>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Navbar;
