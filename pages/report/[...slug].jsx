import styles from "../../styles/Pages/SingleReport.module.scss";
import { Button, Card } from "../../proton";
import { useState, useEffect } from "react";
import EditReport from "../../components/EditReport";
import ViewReport from "../../components/ViewReport";
import {
	FaPencilAlt,
	FaTrash,
	FaCheckCircle,
	FaTimesCircle,
	FaQuestionCircle,
	FaExclamationCircle,
} from "react-icons/fa";
import Modal from "../../components/Modal";
import { Option, Select } from "../../components/Select";
import { useRouter } from "next/router";
import getReport from "../util/getReport";
import axios from "axios";

export default function Report({
	user,
	user: currentUser,
	user: { _id: currentUserId },
	token,
}) {
	const router = useRouter();
	const [id, mode] = router.query.slug;

	const [report, setReport] = useState(null);
	const [responsibleOfficer, setResponsibleOfficer] = useState(null);

	// const [view, setView] = useState(true);
	const [view, setView] = useState(true);
	const [loading, setLoading] = useState(false);

	const [deleteModal, setDeleteModal] = useState(false);
	const [urgencyModal, setUrgencyModal] = useState(false);
	const [temporaryUrgency, setTemporaryUrgency] = useState(0);

	const [isCaptain, setIsCaptain] = useState(false);
	const [isCreator, setIsCreator] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [tag, setTag] = useState(null);

	useEffect(() => {
		if (mode === "view") setView(true);
		else if (mode === "edit") setView(false);
	}, [mode]);

	useEffect(() => {
		if (isCaptain && !view) setView(true);
	}, [isCaptain]);

	const loadReport = async () => {
		setLoading(true);

		try {
			const report = await getReport(id, currentUserId);

			if (!report) router.push("/dashboard");

			setReport(report);
			setResponsibleOfficer(report.basicInfo.responsibleOfficer);
			setTag(report.basicInfo.importance);

			setIsVerified(report.basicInfo.verified);

			if (report.basicInfo.responsibleOfficer._id === currentUserId) {
				setIsCreator(true);
			} else {
				setIsCreator(false);
			}
		} catch {
			router.push("/dashboard");
		}

		setLoading(false);
	};

	useEffect(() => {
		if (!user) router.push("/");

		loadReport();
	}, []);

	// HOOK THIS UP TO BACKEND
	const authCheck = () => {
		if (currentUser.rank == "captain") {
			setIsCaptain(true);
		} else {
			setIsCaptain(false);
		}
	};

	useEffect(() => {
		authCheck();
	}, [currentUser]);

	const deleteReport = async () => {
		setDeleteModal(false);
		setLoading(true);

		try {
			console.log(temporaryUrgency);

			const res = await axios.delete(
				`http://localhost:3000/api/v1/report/${report._id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					data: {
						userId: currentUserId,
					},
				}
			);

			console.log(res);

			router.back();
		} catch (err) {
			console.error("Error on toggle verification function:", err);
		}

		setLoading(false);
	};

	const toggleVerified = async () => {
		setLoading(true);

		try {
			const res = await axios.post(
				`http://localhost:3000/api/v1/report/verify/${report._id}`,
				{
					userId: currentUserId,
				},

				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);
		} catch (err) {
			console.error("Error on toggle verification function:", err);
		}

		setLoading(false);

		loadReport();
	};

	const setUrgency = async () => {
		setUrgencyModal(false);
		setLoading(true);

		try {
			const res = await axios.post(
				`http://localhost:3000/api/v1/report/importance/${report._id}`,
				{
					userId: currentUserId,
					importance: temporaryUrgency,
				},
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);
		} catch (err) {
			console.error("Error on toggle verification function:", err);
		}

		setLoading(false);

		// router.reload();
		loadReport();
	};

	// THESE ARE TEMPORARY AND SHOULD BE REPLACED WITH SERVERSIDE GRABBERS OF SOME KIND.

	return (
		<main className={styles.container} shadow={"true"}>
			{deleteModal && (
				<Modal closeModal={() => setDeleteModal(false)}>
					<span>
						<h1>Delete this report?</h1>
						<p>
							This is a{" "}
							<b style={{ color: "red" }}>permanent action</b>,
							and the report will be gone{" "}
							<b style={{ color: "red" }}>forever</b>.
						</p>
					</span>
					<Button.Group>
						<Button emphasis="primary" onClick={deleteReport}>
							Cancel
						</Button>
						<Button emphasis="error" onClick={deleteReport}>
							Yes, delete it forever!
						</Button>
					</Button.Group>
				</Modal>
			)}

			{urgencyModal && (
				<Modal closeModal={() => setUrgencyModal(false)}>
					<span
						style={{
							minHeight: "225px",
							gap: ".5rem",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<h1>New Urgency Level</h1>
						<p>Change the urgency level for this report.</p>
						<Select
							arc={true}
							placeholder="Select Level"
							// absolutely
							value={temporaryUrgency}
							onChange={(e) =>
								setTemporaryUrgency(e.selectTarget.value)
							}
						>
							<Option val="3">Normal</Option>
							<Option val="2">Important</Option>
							<Option val="1">Urgent</Option>
						</Select>
					</span>

					<Button.Group>
						<Button
							emphasis="error"
							onClick={() => setUrgencyModal(false)}
						>
							Cancel
						</Button>
						<Button emphasis="success" onClick={setUrgency}>
							Apply
						</Button>
					</Button.Group>
				</Modal>
			)}

			{report && (
				<article className={styles.main}>
					<Card noborder loading={loading}>
						<Card.Header>
							<div className={styles.header}>
								<span>
									<h1>CASE #{report.caseNumber}</h1>
									{responsibleOfficer && (
										<>
											<h1>
												OFFICER:{" "}
												{responsibleOfficer.rank[0].toUpperCase() +
													responsibleOfficer.rank.slice(
														1,
														responsibleOfficer.rank
															.length
													)}{" "}
												{
													responsibleOfficer.name
														.lastName
												}
											</h1>
											<h1>
												BADGE #:{" "}
												{responsibleOfficer.badgeNumber}
											</h1>
										</>
									)}
								</span>

								<span className={styles.info}>
									{tag !== null && (
										<span className={styles.urgency}>
											Urgency:
											{tag === 1 ? (
												<span
													className={`${styles.tag} ${styles.tag1}`}
												>
													Urgent
												</span>
											) : tag === 2 ? (
												<span
													className={`${styles.tag} ${styles.tag2}`}
												>
													Important
												</span>
											) : (
												<span
													className={`${styles.tag} ${styles.tag3}`}
												>
													Normal
												</span>
											)}
										</span>
									)}

									{isVerified ? (
										<span className={styles.verified}>
											Verified
											<FaCheckCircle />
										</span>
									) : (
										<span>
											Unverified
											<FaQuestionCircle />
										</span>
									)}
								</span>
							</div>

							<div className={styles.inputs}>
								{view && (
									<Button.Group wrap>
										{!isCaptain &&
											!isVerified &&
											isCreator && (
												<Button
													compact
													onClick={() => {
														if (view) {
															setView(false);
														}
													}}
													emphasis="primary"
												>
													<FaPencilAlt />
													Edit
												</Button>
											)}
										{!isVerified &&
											(isCreator || isCaptain) && (
												<Button
													compact
													onClick={() =>
														!deleteModal &&
														setDeleteModal(true)
													}
													emphasis="error"
												>
													<FaTrash /> Delete
												</Button>
											)}
										{isCaptain && (
											<>
												<Button
													compact
													onClick={toggleVerified}
													emphasis={
														isVerified
															? "primary"
															: "success"
													}
												>
													{isVerified ? (
														<>
															<FaTimesCircle />{" "}
															Unverify
														</>
													) : (
														<>
															<FaCheckCircle />{" "}
															Verify
														</>
													)}
												</Button>
												<Button
													compact
													onClick={() =>
														!urgencyModal &&
														setUrgencyModal(true)
													}
													emphasis={
														isVerified
															? "secondary"
															: "primary"
													}
												>
													<FaExclamationCircle />
													Urgency
												</Button>
											</>
										)}
									</Button.Group>
								)}
							</div>
						</Card.Header>

						{!loading && view ? (
							<ViewReport {...{ currentUserId }} />
						) : (
							<EditReport
								{...{
									currentUserId,
									report,
									loading,
									setLoading,
									view,
									setView,
								}}
							/>
						)}
					</Card>
				</article>
			)}
		</main>
	);
}
