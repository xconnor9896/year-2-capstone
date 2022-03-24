import styles from "../styles/pages/Home.module.scss";
import { Button } from "../proton";

export default function Home() {
	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<Button>Button Example</Button>

				<Button.Group>
					<Button emphasis="primary">Button Example</Button>
					<Button hollow underline emphasis="secondary">
						Button Example
					</Button>
				</Button.Group>
			</article>
		</main>
	);
}
