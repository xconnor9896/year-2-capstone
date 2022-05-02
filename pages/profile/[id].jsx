import React, { useEffect, useState } from "react";
import { FaRegUser, FaStar } from "react-icons/fa";
import { useRouter } from "next/router";
import { baseURL } from "../util/baseURL";
import { parseCookies } from "nookies";
import Tabs from "../../components/Tabs";

import axios from "axios";
// import getUser from "../../server/controllers/user"

import styles from "../../styles/Pages/Profile.module.scss";

const Profile = ({ profile }) => {
  const router = useRouter();

  const name = "John Doe";
  const badgeNum = "297502";
  const rank = "Lt.";
  const caseId = "1992197";
  const squad = "K-9Unit";
  const squadNum = "593";

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const { username } = router.query;
  //       const res = await axios.get(`${baseURL}/api/v1/${username}`, {
  //         headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  //       });
  //       setUser(res.data)
  //       // console.log(user);
  //     } catch (error) {
  //       console.log("error loading user");
  //     }
  //   };
  //   getUser();
  // }, [router.query.username]);

  // console.log(user);

  return (
    <main className={styles.container}>
      <div className={styles.user}>
        <div className={styles.pfp}>
          <FaRegUser />
        </div>
        {/* <h1>{username}</h1> */}
        <div className={styles.banner}>
          <img />
        </div>
        <Tabs />
      </div>

      <div className={styles.display}>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
      </div>
    </main>
  );
};

// Profile.getInitialProps = async (ctx) => {
//   try {
//     const { id: userId } = ctx.query;
//     console.log(userId);
//     const { token } = parseCookies(ctx);

//     const res = await axios.get(`${baseURL}/api/v1/user/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log(`fadsfsadsad ${res}`);

//     const { data } = res;
//     return { data };
//   } catch (error) {
//     return { errorLoading: true };
//   }
// };

export default Profile;
