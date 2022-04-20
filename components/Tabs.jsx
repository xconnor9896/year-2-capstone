import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Components/Tabs.module.scss";

const Tabs = () => {
  const [tabOpen, setTabOpen] = useState(1);

  const name = "Lee";
  const phone = "(623) 945-8746";
  const prefix = "Lt";
  // *=====================================================================

  return (
    <div className={styles.tabs}>
      <ul>
        <li
          onClick={() => setTabOpen(1)}
          className={tabOpen === 1 ? styles.activated : styles.hide}
        >
          <h3>Info</h3>
          <div></div>
        </li>
        <li
          onClick={() => setTabOpen(2)}
          className={tabOpen === 2 ? styles.activated : styles.hide}
        >
          <h3>Cases</h3>
          <div></div>
        </li>
        <li
          onClick={() => setTabOpen(3)}
          className={tabOpen === 3 ? styles.activated : styles.hide}
        >
          <h3>Contacts</h3>
          <div></div>
        </li>
      </ul>
      <ul>
        <li className={tabOpen === 1 ? styles.active : styles.hidden}>
          <h2>
            {prefix}.{name}
          </h2>
          <h2>Rank</h2>
          <h2>Squad</h2>
        </li>
        <li className={tabOpen === 2 ? styles.active : styles.hidden}>
          <h2>
            All of {prefix}. {name}'s Reports
          </h2>
        </li>
        <li className={tabOpen === 3 ? styles.active : styles.hidden}>
          <h2>Phone: {phone}</h2>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
