import styles from "../styles/pages/Reports.module.scss";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ListReports from "../components/ListReports";

const randString = () => {
	let l = "qwertyuiopasdfghjklzxcvbnm1234567890";

	let e = "";
	for (let i = 0; i < 10; i++) {
		e += l.split("")[Math.floor(Math.random() * l.length)];
	}

	return e;
};

const genExRep = () => {
	const exRep = {
		caseId: randString(),
		reportingOfficer: {
			name: "Officer John Doe",
			squad: `Squad #86${Math.ceil(Math.random() * 800) + 100}`,
		},
		verified: [true, false][Math.floor(Math.random() * 2)],
		tag: Math.ceil(Math.random() * 3),
		createdAt: Date.now(),
	};

	return exRep;
};

const exampleReports = [
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
];

export default function Reports() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	// HOOK THIS UP TO BACKEND
	const authCheck = () => {
		// Determine if a user is an admin.
		setLoading(true);

		let isAdmin = true;

		if (!isAdmin) {
			// Re-route if they aren't.
			router.route("/dashboard");
		}

		setLoading(false);
	};

	useEffect(() => {
		authCheck();
	}, []);

	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<ListReports
					title="All Reports"
					loading={loading}
					reports={exampleReports}
				/>
			</article>
		</main>
	);
}
