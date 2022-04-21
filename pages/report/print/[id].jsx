import { useRef, useEffect } from "react";
import styles from "../../../styles/Pages/Print.module.scss";
import { useRouter } from "next/router";
import ReportPrintout from "../../../components/ReportPrintout";
import { useReactToPrint } from "react-to-print";

const Print = () => {
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

	useEffect(() => {
		const cur = printoutRef.current;

		if (cur) {
			handlePrint();
		}
	}, [printoutRef]);

	// useEffect(() => {
	// 	console.log(printoutRef.current);
	// }, [printoutRef]);

	// useEffect(() => {
	// 	console.log("use effect");

	// 	if (printoutRef.current) {
	// 		window.print();
	// 	}
	// }, [router.pathname]);

	return (
		<div className={styles.print} ref={printoutRef}>
			<ReportPrintout id={id} />
		</div>
	);
};

export default Print;
