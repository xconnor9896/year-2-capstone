import { FaRegUser, FaStar } from "react-icons/fa";
import { baseURL } from "../util/baseURL";
import { parseCookies } from "nookies";
import Tabs from "../../components/Tabs";

import axios from "axios";
// import getUser from "../../server/controllers/user"

import styles from "../../styles/Pages/Profile.module.scss";

const Profile = ({ data }) => {

  // const fName = data.name.firstName;
  // const lName = data.name.lastName;
  const badgeNum = "297502";
  const rank = "Lt.";
  const caseId = "1992197";
  const squad = "K-9Unit";
  const squadNum = "593";

  // console.log(`${fName} ${lName}`);

  return (
    <main className={styles.container}>
      <div className={styles.user}>
        <div className={styles.pfp}>
          <FaRegUser />
        </div>
        {/* <h1>{data[0]}</h1> */}
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

Profile.getInitialProps = async (ctx) => {
  try {
    const { id: userId } = ctx.query;
    console.log(userId);
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseURL}/api/v1/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { data } = res;
    // console.log("this is the users data", data);
    return { data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Profile;