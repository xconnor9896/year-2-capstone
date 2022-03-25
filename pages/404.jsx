import styles from "../styles/pages/Error.module.scss";
import { Button } from "../proton";

export default function Custom404() {
	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<h1>404: Page not found</h1>
				{/* <Button.Group>
					<Button>Dashboard</Button>
				</Button.Group> */}
			</article>
		</main>
	);
}
