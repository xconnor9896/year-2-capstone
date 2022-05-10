import { FaRegUser, FaStar } from "react-icons/fa";
import { baseURL } from "../util/baseURL";
import { parseCookies } from "nookies";
import Tabs from "../../components/Tabs";
import axios from "axios";
// import getUser from "../../server/controllers/user"

import styles from "../../styles/Pages/Profile.module.scss";

const Profile = ({ user }) => {
  const fName = user.name.firstName;
  const lName = user.name.lastName;
  const badgeNum = user.badgeNumber;
  const email = user.email;
  const rank = user.rank;

  return (
    <main className={styles.container}>
      <div className={styles.user}>
        <div className={styles.pfp}>
          <FaRegUser />
        </div>
        <div className={styles.banner}>
          <img />
        </div>
        <Tabs
          firstName={fName}
          lastName={lName}
          badgeNum={badgeNum}
          email={email}
          rank={rank}
        />
      </div>

      <div className={styles.display}>
        <div className={styles.classmate}>
          <h1>Tammy</h1>
        </div>
      </div>
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

    const user  = res.data;
    return { user };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Profile;
