import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Components/Tabs.module.scss";
import { baseURL } from "../pages/util/baseURL";
import { parseCookies } from "nookies";
import axios from "axios";
import {
  FaNetworkWired,
  FaUserFriends,
  FaPen,
  FaInfoCircle,
} from "react-icons/fa";

const Tabs = ({ data }) => {
  const [tabOpen, setTabOpen] = useState(1);

  const name = "Lee";
  const lName = "Lee";
  const phone = "(623) 945-8746";
  const prefix = "Lt";
  // *=====================================================================

  console.log(data);

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

Tabs.getInitialProps = async (ctx) => {
  try {
    const { id: userId } = ctx.query;
    console.log(userId);
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseURL}/api/v1/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { data } = res;
    console.log("this is the users data", data);
    return { data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Tabs;
