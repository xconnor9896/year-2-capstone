import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Components/Tabs.module.scss";
import { FaNetworkWired, FaUserFriends, FaInfoCircle } from "react-icons/fa";

const Tabs = ({ firstName, lastName, email, rank, badgeNum }) => {
  const [tabOpen, setTabOpen] = useState(1);

  // *=====================================================================

  return (
    <div className={styles.tabs}>
      <ul className={styles.selection}>
        <li
          onClick={() => setTabOpen(1)}
          className={tabOpen === 1 ? styles.activated : styles.hide}
        >
          <div>
            <FaInfoCircle />
          </div>
        </li>
        <li
          onClick={() => setTabOpen(2)}
          className={tabOpen === 2 ? styles.activated : styles.hide}
        >
          <div>
            <FaNetworkWired />
          </div>
        </li>
        <li
          onClick={() => setTabOpen(3)}
          className={tabOpen === 3 ? styles.activated : styles.hide}
        >
          <div>
            <FaUserFriends />
          </div>
        </li>
      </ul>
      <ul className={styles.info}>
        <li className={tabOpen === 1 ? styles.active : styles.hidden}>
          <div className={styles.infoBlock}>
            <h1 className={styles.title}>{firstName} {lastName}</h1>
          </div>
        </li>
        <li className={tabOpen === 2 ? styles.active : styles.hidden}>
          <div className={styles.infoBlock}></div>
        </li>
        <li className={tabOpen === 3 ? styles.active : styles.hidden}>
          <div className={styles.infoBlock}>
          <h1 className={styles.title}>Email: {email}</h1>
          <h1 className={styles.title}>Badge Num: {badgeNum}</h1>
          <h1 className={styles.title}>Rank: {rank}</h1>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
