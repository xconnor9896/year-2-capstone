import styles from "../styles/pages/Reports.module.scss";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ListReports from "../components/ListReports";

export default function Reports() {
	const router = useRouter();

	// HOOK THIS UP TO BACKEND
	const authCheck = () => {
		let isAdmin = true;

		if (!isAdmin) {
			// Re-route if they aren't.
			router.route("/dashboard");
		}
	};

	useEffect(() => {
		authCheck();
	}, []);

	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<ListReports title="All Reports" userId={"none"} />
			</article>
		</main>
	);
}
