import styles from "../styles/Components/ReportTab.module.scss";
import { FaEye, FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import { Button } from "../proton";
import { useRouter } from "next/dist/client/router";

const ReportTab = ({ report, showOfficer, showExtraInfo }) => {
	const router = useRouter();

	const {
		basicInfo: {
			verified,
			importance,
			responsibleOfficer: { name, squadNumber },
		},
		caseNumber,
		_id,
	} = report;

	if (!name) return null;

	// console.log(report);

	const routeToReport = () => {
		router.push(`/report/${_id}`);
	};

	return (
		<div className={styles.reportTab}>
			<span className={styles.info}>
				Case #{caseNumber}
				{showOfficer && name && squadNumber && (
					<span>
						Officer {name.lastName}, {name.firstName} &ndash; Squad
						#{squadNumber[0]}
					</span>
				)}
			</span>
			<span className={styles.end}>
				{showExtraInfo && (
					<span className={styles.info}>
						{importance && !verified && (
							<span className={styles.urgency}>
								Urgency:
								{importance === 1 ? (
									<span
										className={`${styles.importance} ${styles.importance1}`}
									>
										Urgent
									</span>
								) : importance === 2 ? (
									<span
										className={`${styles.importance} ${styles.importance2}`}
									>
										Important
									</span>
								) : (
									<span
										className={`${styles.importance} ${styles.importance3}`}
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
