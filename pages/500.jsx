import styles from "../styles/Pages/Error.module.scss";
import { Button } from "../proton";
import { useRouter } from "next/router";

export default function Custom500() {
	const router = useRouter();

	const navTo = (url) => {
		router.push(url);
	};

	return (
		<main className={`${styles.container} ${styles.warning}`}>
			<article className={styles.main}>
				<h1>500</h1>
				<h2>Something went wrong on our end</h2>
				<p>
					Something broke server-side and it is not your fault. Please
					try again later.
				</p>
				<Button onClick={() => navTo("/dashboard")}>Dashboard</Button>
			</article>
		</main>
	);
}
