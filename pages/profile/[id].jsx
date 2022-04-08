import {
  FaRegUser,
  FaUpload,
  FaRegIdBadge,
  FaEye,
  FaPrint,
} from "react-icons/fa";
import { MdOutlineLocalPolice, MdOutlineGroups } from "react-icons/Md";
import { AiOutlineStar } from "react-icons/Ai";

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
          <li className={styles.name}>{name}</li>
          <li className={styles.badgeNum}>
            <MdOutlineLocalPolice />
            {badgeNum}
          </li>
          <li className={styles.rank}><AiOutlineStar/>{rank}</li>
          <li className={styles.squadNum}><MdOutlineGroups/>{squadNum}</li>
        </ul>
      </div>
    </main>
  );
}
