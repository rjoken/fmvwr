import React, { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <>
      <div className={styles.navbar}>
        <ul>
          <li>
            <a href="/viewer">Card Viewer</a>
          </li>
          <li>
            <a href="/calculator">Rank Calculator</a>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Navbar;
