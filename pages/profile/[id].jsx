import { FaRegUser, FaStar } from "react-icons/Fa";
import Tabs from "../../components/Tabs";

//! This is just a placeholder for the icons there will be more soon

import styles from "../../styles/Pages/Profile.module.scss";

export default function Profile() {
  const name = "John Doe";
  const badgeNum = "297502";
  const rank = "Lt.";
  const caseId = "1992197";
  const squad = "K-9Unit";
  const squadNum = "593";

  return (
    <main className={styles.container}>
      <div className={styles.user}>
        <div className={styles.pfp}>
          <FaRegUser />
        </div>
        <Tabs />
      </div>
      <div className={styles.display}></div>
    </main>
  );
}
