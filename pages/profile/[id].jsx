import {
  FaRegUser,
  FaUpload,
  FaRegIdBadge,
  FaEye,
  FaPrint,
} from "react-icons/fa";

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
        <ul>
          <li className={styles.row}>
            <h3>Rank: {rank}</h3>
          </li>
          <li className={styles.row}>
            <h3>Squad: {squadNum}</h3>
          </li>
          <li className={styles.row}>
            <h3>Badge: {badgeNum}</h3>
          </li>
        </ul>
      </div>

      <div className={styles.contactInfo}>
        <ul>
          <li className={styles.phone}>
            <h3>(623)-251-8175</h3>
          </li>
        </ul>
      </div>

      <div className={styles.cases}>
        <h3>My Cases</h3>
      </div>
      <div className={styles.recents}></div>
    </main>
  );
}
