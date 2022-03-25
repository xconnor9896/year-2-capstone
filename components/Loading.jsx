import styles from "../styles/Components/Loading.module.scss";
import { ProgressBar } from "../proton";
import { useState } from "react";
import { Router } from "next/router";
import Image from "next/image";

const Loading = () => {
	const [value, setValue] = useState(0);

	Router.events.on("routeChangeStart", () => {
		setValue(25);
	});

	Router.events.on("routeChangeComplete", () => {
		setValue(100);
	});

	return (
		<div className={styles.loading}>
			<section className={styles.spinner}>
				<img
					alt="LPS Logo"
					className={styles.logo}
					src="./LPS Logo.svg"
				/>
				<img
					alt="LPS Logo"
					className={styles.logo}
					src="./LPS Logo.svg"
				/>
			</section>
		</div>
	);
};

export default Loading;
