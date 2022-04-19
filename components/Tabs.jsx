import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Components/Tabs.module.scss";

const Tabs = () => {
  const [tabOpen, setTabOpen] = useState(true);

  const tabsRef = useRef();

  const tabsHandler = (e) => {
    if (
      tabOpen &&
      tabsRef.current &&
      tabsRef.current !== e.target &&
      !tabsRef.current.contains(e.target)
    ) {
      setTabOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", tabsHandler);

    return () => {
      window.removeEventListener("click", tabsHandler);
    };
  }, [tabsRef, tabOpen]);

  return (
    <div className={styles.tabs}>
      <ul>
        <li onClick={() => setTabOpen(!tabOpen)} className={styles.tabItem}>
          <h3>Info</h3>
          <div className={`${tabOpen && styles.tab}`}></div>
        </li>
        <li onClick={() => setTabOpen(!tabOpen)} className={styles.tabItem}>
          <h3>Cases</h3>
          <div className={`${tabOpen && styles.tab}`}></div>
        </li>
        <li onClick={() => setTabOpen(!tabOpen)} className={styles.tabItem}>
          <h3>Contacts</h3>
          <div className={`${tabOpen && styles.tab}`}></div>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
