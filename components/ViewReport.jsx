import { useState, useRef, useEffect } from "react";
import styles from "../styles/Components/ViewReport.module.scss";
import { FaCheckSquare, FaSquare, FaPrint } from "react-icons/fa";
import { Button } from "../proton";
import { useRouter } from "next/router";
import ReportPrintout from "./ReportPrintout";

const uuid = require("uuid").v4;

const ViewReport = () => {
	const router = useRouter();

	const { id } = router.query;

	useEffect(() => {
		window.onkeydown = (e) => {
			if (e.ctrlKey && e.key === "p") {
				e.preventDefault();
				handlePrint();
			}
		};
	}, []);
	const handlePrint = () => {
		console.log(id);
		router.push(`/report/print/${id}`);
	};

	return (
		<div className={styles.viewReport}>
			<ReportPrintout id={id} />

			<div className={styles.saveButton}>
				<Button onClick={handlePrint} icon circular emphasis="primary">
					<FaPrint />
				</Button>
			</div>
		</div>
	);
};

export default ViewReport;
