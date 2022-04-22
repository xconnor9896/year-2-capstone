import { useState, useRef, useEffect } from "react";
import styles from "../styles/Components/ViewReport.module.scss";
import { FaCheckSquare, FaSquare, FaPrint } from "react-icons/fa";
import { Button } from "../proton";
import { useRouter } from "next/router";
import ReportPrintout from "./ReportPrintout";
import { useReactToPrint } from "react-to-print";

const uuid = require("uuid").v4;

const ViewReport = () => {
	const router = useRouter();

	const { id } = router.query;

	const printoutRef = useRef(null);

	const handlePrint = useReactToPrint({
		content: () => printoutRef.current,
	});

	useEffect(() => {
		window.onkeydown = (e) => {
			if (e.ctrlKey && e.key === "p" && printoutRef.current) {
				e.preventDefault();
				handlePrint();
			}
		};
	}, []);

	// useEffect(() => {
	// 	const cur = printoutRef.current;

	// 	if (cur) {
	// 		handlePrint();
	// 	}
	// }, [printoutRef]);

	return (
		<div className={styles.viewReport}>
			<span ref={printoutRef}>
				<ReportPrintout id={id} />
			</span>

			<div className={styles.saveButton}>
				<Button onClick={handlePrint} icon circular emphasis="primary">
					<FaPrint />
				</Button>
			</div>
		</div>
	);
};

export default ViewReport;
