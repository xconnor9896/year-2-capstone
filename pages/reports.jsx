import styles from "../styles/pages/Reports.module.scss";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ListReports from "../components/ListReports";
import { Button } from "../proton";
import { FaChevronLeft } from "react-icons/fa";

export default function Reports() {
	const router = useRouter();

	const [groupID, setGroupID] = useState(null);
	const [title, setTitle] = useState("All Reports");

	// HOOK THIS UP TO BACKEND
	const authCheck = () => {
		let isAdmin = true;

		if (!isAdmin) {
			// Re-route if they aren't.
			router.route("/dashboard");
		}
	};

	const route = (path) => {
		router.push(path);
	};

	useEffect(() => {
		authCheck();
	}, []);

	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<Button
					fab
					style={{ padding: "0.5rem" }}
					circular
					icon
					emphasis="primary"
					onClick={() => route("/dashboard")}
				>
					<FaChevronLeft />
				</Button>
				<ListReports
					title={title}
					setTitle={setTitle}
					groupID={groupID}
					userID={null}
					canSwitchGroups={true}
				/>
			</article>
		</main>
	);
}
