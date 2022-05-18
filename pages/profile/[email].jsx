import { FaRegUser, FaStar } from "react-icons/fa";
import { baseURL } from "../util/baseURL";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import Tabs from "../../components/Tabs";
import axios from "axios";
import Input from "../../components/Input";
import Cookies from "js-cookie";
import getSquad from "../util/getSquad";
import styles from "../../styles/Pages/Profile.module.scss";

const Profile = ({ user }) => {
  const token = Cookies.get("token");

  const lName = user.name.lastName;
  const badgeNum = user.badgeNumber;
  const email = user.email;
  const rank = user.rank;
  console.log(user.name.lastName);

  const [squads, setSquads] = useState([]);

  const getUser = async (userId) => {
    try {
      const res = await axios.get(`${baseURL}/api/v1/user/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error(`Failed to get user with id ${userId}`, err);
      return null;
    }
  };

  const reloadSquads = async (body) => {
    if (!body || !body.squadNumber) return;

    const { squadNumber } = body;
    if (squadNumber) {
      // let squads = squadNumber;
      let squads = [];

      for (let num of squadNumber) {
        const squad = await getSquad(num);

        let newOfficers = [];

        for (let officer of squad.officers) {
          const newOfficer = await getUser(officer);

          newOfficers.push(newOfficer);
        }

        squad.officers = newOfficers;
        if (squad) squads.push(squad);
      }

      setSquads(squads);
    } else {
      return;
    }
  };

  useEffect(async () => {
    reloadSquads(await getUser(user._id));
  }, []);

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
        {squads.length < 1 && (
          <h3 className={styles.noMsg}>No Squads to Display</h3>
        )}
        {squads.map((squad) => {
          const { _id, squadName, squadNumber, officers } = squad;

          if (officers[0] && squadNumber == user.squadNumber[0]) {
            return officers.map((officer) => {
              const {
                name: { firstName, lastName },
                rank,
                badgeNumber,
                _id,
                profilePicURL,
                email,
              } = officer;

              return (
                <div className={styles.classmate}>
                  <h1>{`${firstName} ${lastName}, email: ${squadNumber}`}</h1>
                </div>
              );
            });
          }
        })}
      </div>
      <a href="http://localhost:3000/emailVefPage">Verfiy Your Email</a>
    </main>
  );
};

// Profile.getInitialProps = async (ctx) => {
//   try {
//     const { email: email } = ctx.query;
//     const { token } = parseCookies(ctx);
//     const res = await axios.get(`${baseURL}/api/v1/user/${email}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const user  = res.data;
//     return { user };
//   } catch (error) {
//     return { errorLoading: true };
//   }
// };

export default Profile;
