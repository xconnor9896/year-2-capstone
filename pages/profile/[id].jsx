import {
    FaRegUser,
    FaUpload,
    FaRegIdBadge,
    FaEye,
    FaPrint,
  } from "react-icons/fa";
  import { FaStar } from "react-icons/Fa";
  
  //! This is just a placeholder for the icons there will be more soon
  
  import styles from "../../styles/Pages/Profile.module.scss";
  
  export default function Profile() {
    const name = "John Doe";
    const badgeNum = "297502";
    const rank = "Lt.";
    const caseId = "1992197";
    const squad = "K-9Unit";
    const squadNum = "593";
  
    const view = true;
  
    return (
      <main className={styles.container}>
        <div className={styles.user}>
          <div className={styles.pfp}>
            <FaRegUser />
          </div>
          {/* ======================================================= */}
          <div className={styles.miniNav}>
            <ul>
              <li><div></div><h2>Info</h2></li>
              <li><div></div><h2>Contact</h2></li>
              <li><div></div><h2>Cases</h2></li>
            </ul>
          </div>
          {/* ======================================================= */}
          <div className={styles.studentInfo}>
            <ul>
              <li>
                <h3>
                  <FaStar /> {name}
                </h3>
              </li>
              <li>
                <h3>
                  <FaStar /> {badgeNum}
                </h3>
              </li>
              <li>
                <h3>
                  <FaStar /> {rank}
                </h3>
              </li>
              <li>
                <h3>
                  <FaStar /> {squad}
                </h3>
              </li>
              <li>
                <h3>
                  <FaStar /> {squadNum}
                </h3>
              </li>
            </ul>
          </div>
          {/* ======================================================= */}
          <div className={styles.contactInfo}>
            <ul>
              <li>
                <h3>
                  <FaStar /> {name}
                </h3>
              </li>
              <li>
                <h3>
                  <FaStar /> {badgeNum}
                </h3>
              </li>
              <li>
                <h3>
                  <FaStar /> {rank}
                </h3>
              </li>
              <li>
                <h3>
                  <FaStar /> {squad}
                </h3>
              </li>
              <li>
                <h3>
                  <FaStar /> {squadNum}
                </h3>
              </li>
            </ul>
          </div>
          {/* ======================================================= */}
          <div className={styles.display}></div>
        </div>
      </main>
    );
  }
  