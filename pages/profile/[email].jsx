import { FaRegUser, FaStar } from "react-icons/fa";
import { baseURL } from "../util/baseURL";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import Tabs from "../../components/Tabs";
import axios from "axios";
// import getUser from "../../server/controllers/user"

import styles from "../../styles/Pages/Profile.module.scss";

const Profile = ({ user }) => {
  const lName = user.name.lastName;
  const badgeNum = user.badgeNumber;
  const email = user.email;
  const rank = user.rank;
  console.log(user.name.lastName);

  return (
    <main className={styles.container}>
      <div className={styles.user}>
        <div className={styles.pfp}>
          <FaRegUser />
        </div>
        <div className={styles.banner}>
          <img />
        </div>
        <Tabs lastName={lName} badgeNum={badgeNum} email={email} rank={rank} />
      </div>

      <div className={styles.display}>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
      </div>
      <a href="http://localhost:3000/emailVefPage">Verfiy Your Email</a>
    </main>
  );
};

Profile.getInitialProps = async (ctx) => {
  try {
    const { email: email } = ctx.query;
    
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseURL}/api/v1/user/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const wok = await axios.get(`${baseURL}/api/v1/user/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = res.data;
    return { user };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Profile;