import styles from "../styles/pages/Dashboard.module.scss";
import { FaUpload, FaRegUser, FaRegIdBadge } from 'react-icons/fa'

const Dashboard = () => {
  const name = 'John'
  const rank = 'Cpt.'

	return (
		<main className={styles.container}>
			<article className={styles.main}>
        <div className="account">
          <h1 className="title">Welcome Back!</h1>
          <h2 className="name">{rank} {name}!</h2>
          <FaRegUser />
          <div className="name2">{rank} {name}</div>
          <button id="report"><FaUpload /> Make a new report</button>
          <button id="profile"><FaRegIdBadge /> My Profile</button>
        </div>

        <div className="divider"></div>

        <div className="cases">

        </div>
      </article>
		</main>
	);
}

export default Dashboard