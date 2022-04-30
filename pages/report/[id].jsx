import styles from "../../styles/Pages/SingleReport.module.scss";
import Input from "../../components/Input";
import { Button, Card } from "../../proton";
import { useState } from "react";
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

const tempReport = {};

export default function Report() {
	// const [view, setView] = useState(true);
	const [view, setView] = useState(true);
	const [loading, setLoading] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const [urgencyModal, setUrgencyModal] = useState(false);
	const [temporaryUrgency, setTemporaryUrgency] = useState(0);

	const deleteReport = () => {
		setDeleteModal(false);
		setLoading(true);

		console.log("implement deleteReport");

		// Should redirect if the delete succeeded.

		setLoading(false);
	};

	const toggleVerified = () => {
		console.log("Implement Verification Toggle");
	};

	const setUrgency = () => {
		setUrgencyModal(false);
		setLoading(true);

		console.log(temporaryUrgency);

		console.log("Implement Set Urgency");

		setLoading(false);
	};

	// THESE ARE TEMPORARY AND SHOULD BE REPLACED WITH SERVERSIDE GRABBERS OF SOME KIND.
	const isCaptain = false;
	const isCreator = true;
	const isVerified = false;
	const tag = 0;

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

			<article className={styles.main}>
				<Card noborder loading={loading}>
					<Card.Header>
						<div className={styles.header}>
							<span>
								<h1>CASE #: [CASE NUMBER]</h1>
								<h1>OFFICER: [RANK], [LASTNAME]</h1>
								<h1>BADGE #: [BADGE NUMBER]</h1>
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
									{!isCaptain && !isVerified && isCreator && (
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
									{!isVerified && (isCreator || isCaptain) && (
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
														<FaCheckCircle /> Verify
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
						<ViewReport
							{...{
								report: tempReport,
								loading,
								setLoading,
								view,
								setView,
							}}
						/>
					) : (
						<EditReport
							{...{
								report: tempReport,
								loading,
								setLoading,
								view,
								setView,
							}}
						/>
					)}
				</Card>
			</article>
		</main>
	);
}
