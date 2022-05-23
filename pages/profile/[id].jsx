import { baseURL } from "../util/baseURL";
import ListReports from "../../components/ListReports";
import { FaInfoCircle, FaUsers } from "react-icons/fa";
import Tabs from "../../components/Tabs";
import getSquad from "../util/getSquad";
import styles from "../../styles/Pages/Profile.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Profile({ user: currentUser, user: { _id } }) {
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get("token");

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [squads, setSquads] = useState([]);

  const getUser = async (userId) => {
    try {
      const res = await axios.get(`/api/v1/user/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error(`Failed to get user with ID:`, userId, err);

      return null;
    }
  };

  const reloadSquads = async (user) => {
    if (!user || !user.squadNumber) return;

    const { squadNumber } = user;
    if (squadNumber) {
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
    setLoading(true);
    reloadSquads(await getUser(currentUser._id));
    setUser(await getUser(id));
    setLoading(false);
  }, []);

  if (loading || !user) return <>Loading profile...</>;

  const {
    name: { firstName, lastName },
    badgeNumber,
    email,
    rank,
    profilePicURL,
  } = user;

  return (
    <main className={styles.container}>
      <div className={styles.user}>
        <div
          className={styles.pfp}
          style={
            profilePicURL && {
              backgroundImage: `url("${profilePicURL}")`,
            }
          }
        ></div>
        <div className={styles.banner}>
          <div
            className={styles.imgBanner}
            style={
              profilePicURL && {
                backgroundImage: `url("${profilePicURL}")`,
              }
            }
          ></div>
          {/* <a href="http://localhost:3000/emailVefPage">Verfiy Your Email</a> */}
        </div>
        <h1 className={styles.userTitle}>
          {rank === "captain" ? <>Cpt</> : <>officer</>}. {lastName}
        </h1>
        <Tabs
          firstName={firstName}
          lastName={lastName}
          badgeNum={badgeNumber}
          email={email}
          rank={rank}
        />
      </div>

      <div className={styles.display}>
        {squads.length < 1 && (
          <h3 className={styles.noMsg}>
            Hmmm seems lonely in here... ask your teacher to add you to a squad!
          </h3>
        )}
        {squads.map((squad) => {
          const { _id, squadName, squadNumber, officers } = squad;

          if (currentUser) {
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
                  <a className={styles.inner} href={`/profile/${_id}`}>
                    <div
                      className={styles.pfp}
                      style={
                        profilePicURL && {
                          backgroundImage: `url("${profilePicURL}")`,
                        }
                      }
                    ></div>
                    <h2>{`${firstName} ${lastName}`}</h2>
                  </a>
                </div>
              );
            });
          }
        })}
      </div>
    </main>
  );
}
