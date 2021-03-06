import styles from "../styles/Pages/Error.module.scss";
import { Button } from "../proton";
import { useRouter } from "next/router";

export default function Custom404() {
	const router = useRouter();

	const navTo = (url) => {
		router.push(url);
	};

	return (
		<main className={`${styles.container} ${styles.error}`}>
			<article className={styles.main}>
				<h1>404</h1>
				<h2>The page you were trying to access does not exist</h2>
				<p>
					You may have been given a bad link. If the problem persists,
					please let your teacher know.
				</p>
				<Button onClick={() => navTo("/dashboard")}>Dashboard</Button>
			</article>
		</main>
	);
}
