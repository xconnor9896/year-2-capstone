import styles from "../styles/Pages/Dashboard.module.scss";

import { useEffect } from "react";

import { useRouter } from "next/router";
import { useState } from "react";

import { FaUser, FaFileSignature } from "react-icons/fa";

import { Card, Button } from "../proton";


import { baseURL } from "../server/util/authUser";

import Cookies from "js-cookie";
import axios from "axios";

const Dashboard = ({ user }) => {
	const {
		name: { firstName, lastName },
		rank,
		_id,
	} = user;

	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const route = (pathname) => {
		router.push(pathname);
	};

	const authCheck = () => {
		setLoading(true);
		if (!user) router.push("/");
		if (user.rank === "captain") {
			// Re-route if they are not.
			router.push("/captain/dashboard");
		}
		setLoading(false);
	};

	useEffect(() => {
		authCheck();
	}, [user]);

	const createReport = async () => {
		setLoading(true);

		try {
			const token = Cookies.get("token");

			// Creating the report.
			const res = await axios.get(
				`${baseURL}/api/v1/report/${user._id}`,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			if (!res || !res.data) throw new Error("No result returned.");

			const reportID = res.data;

			route(`/report/${reportID}/edit`);
		} catch (err) {
			console.error(err);
		}

		setLoading(false);
	};

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
							<p>
								All your reports are accessible on your profile.
							</p>
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
