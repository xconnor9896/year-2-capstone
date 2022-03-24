import Navbar from "../components/Navbar";
import styles from "../styles/pages/Reports.module.scss";

export default function Reports() {
	return (
		<main className={styles.container}>
            <Navbar/>
			<article className={styles.main}>VIEW ALL REPORTS</article>
		</main>
	);
}
