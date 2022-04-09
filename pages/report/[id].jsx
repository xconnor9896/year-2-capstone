import styles from "../../styles/Pages/SingleReport.module.scss";
import Input from "../../components/Input";
import { Button, Card } from "../../proton";
import { useState } from "react";
import EditReport from "../../components/EditReport";
import ViewReport from "../../components/ViewReport";
import { FaPencilAlt, FaSave } from "react-icons/fa";

const tempReport = {};

export default function Report() {
	// const [view, setView] = useState(true);
	const [view, setView] = useState(true);
	const [loading, setLoading] = useState(false);

	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<Card noborder loading={loading}>
					<Card.Header>
						<h1>Case #[CASE NUMBER]</h1>

						<div className={styles.inputs}>
							{view && (
								<Button
									onClick={() => {
										if (view) {
											setView(false);
										}
									}}
									emphasis="secondary"
								>
									<FaPencilAlt />
									Edit
								</Button>
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
