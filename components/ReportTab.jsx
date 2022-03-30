import styles from "../styles/Components/ReportTab.module.scss";
import { FaEye, FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import { Button } from "../proton";
import { useRouter } from "next/dist/client/router";

const ReportTab = ({ report, showOfficer, showExtraInfo }) => {
	const router = useRouter();

	const { reportingOfficer, caseId, verified, tag } = report;
	const { squad, name } = reportingOfficer;

	const routeToReport = () => {
		router.push(`/report/${caseId}`);
	};

	return (
		<div className={styles.reportTab}>
			<span className={styles.info}>
				Case #{caseId}
				{showOfficer && (
					<span>
						{name}, {squad}
					</span>
				)}
			</span>
			<span className={styles.end}>
				{showExtraInfo && (
					<span className={styles.info}>
						{tag && (
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

						{verified ? (
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
				)}

				<Button compact onClick={routeToReport}>
					<FaEye /> View
				</Button>
			</span>
		</div>
	);
};

export default ReportTab;
