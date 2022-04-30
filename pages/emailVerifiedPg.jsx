import styles from "../styles/pages/EmailVerifiedPg.module.scss";
import {FaCheckCircle} from "react-icons/fa"

const emailVerifiedPg = () => {
  return (
    <div className={styles.container}>
        <FaCheckCircle/>
      <h1>
        Email has been verified
      </h1>
    </div>
  )
}
 export default emailVerifiedPg;