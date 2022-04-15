import styles from "../styles/Pages/Dashboard.module.scss";
import { Button, Card } from "../proton";
import { useState } from "react";
import { FaUser, FaPlus, FaClipboardList } from "react-icons/fa";

const exStudent = () => {
	let e = [];
	for (let i = 0; i < Math.ceil(Math.random() * 30) + 5; i++) {
		e.push({
			name: `${["John", "Jane"][Math.floor(Math.random() * 2)]} ${
				["Doe", "Apple"][Math.floor(Math.random() * 2)]
			}`,
			studentID: `${Math.floor(Math.random() * 10)}${Math.floor(
				Math.random() * 10
			)}${Math.floor(Math.random() * 10)}`,
		});
	}

	return e;
};

const Dashboard = () => {
	const [loading, setLoading] = useState(false);

	// Temporary local variables. Should be replaced with server getters.
	const isCaptain = true;
	const students = [...exStudent()];

	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<Card noborder loading={loading}>
					<Card.Header>
						<div className={styles.header}>
							<h1>Dashboard</h1>
						</div>
					</Card.Header>

					<div className={styles.content}>
						<div className={styles.message}>
							<h1>Welcome back, [title] [firstname]!</h1>
						</div>

						<div className={styles.inputs}>
							<Button emphasis="primary">
								<FaUser />
								My Profile
							</Button>
							{!isCaptain && (
								<>
									<Button emphasis="primary">
										<FaPlus />
										Create New Report
									</Button>
								</>
							)}
							{isCaptain && (
								<>
									<Button emphasis="primary">
										<FaClipboardList />
										View All Reports
									</Button>
								</>
							)}
						</div>

						{isCaptain && (
							<div className={styles.students}>
								<div className={styles.header}>
									<h1>Your Students</h1>
								</div>
								<div className={styles.studentsList}>
									{students.map((student) => {
										const { name, studentID } = student;

										return (
											<div
												className={styles.student}
												key={studentID}
											>
												<div className={styles.info}>
													<div
														className={styles.pfp}
													></div>
													<div
														className={styles.data}
													>
														<span>{name}</span>
														<span>{studentID}</span>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</Card>
			</article>
		</main>
	);
};

export default Dashboard;
