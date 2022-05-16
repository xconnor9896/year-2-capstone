import styles from "../styles/Pages/Dashboard.module.scss";

import { useEffect } from "react";

import { useRouter } from "next/router";
import { useState } from "react";

import { FaUser, FaFileSignature } from "react-icons/fa";

import { Card, Button } from "../proton";

const Dashboard = ({ user }) => {
	const {
		name: { firstName, lastName },
		rank,
		_id,
	} = user;

	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const authCheck = () => {
		setLoading(true);
		if (!user) router.push("/");
		if (user.rank === "captain") {
			// Re-route if they aren't.
			router.push("/captain/dashboard");
		}
		setLoading(false);
	};

	useEffect(() => {
		authCheck();
	}, [user]);

	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<Card dropshadow noborder loading={loading}>
					<Card.Header>
						<div className={styles.header}>
							<h1>Your Dashboard</h1>
						</div>
					</Card.Header>

					<div className={styles.content}>
						<div className={styles.message}>
							<h1>
								Welcome back,{" "}
								{rank[0].toUpperCase() +
									rank.slice(1, rank.length)}{" "}
								{lastName}!
							</h1>
						</div>

						<div className={styles.inputs}>
							<Button
								onClick={() => route(`/profile/${_id}`)}
								emphasis="primary"
							>
								<FaUser />
								My Profile
							</Button>

							<Button
								onClick={() => createReport()}
								emphasis="primary"
							>
								<FaFileSignature />
								Create New Report
							</Button>
						</div>
					</div>
				</Card>
			</article>
		</main>
	);
};

export default Dashboard;
