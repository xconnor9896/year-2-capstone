import styles from "../styles/Components/Loading.module.scss";
import { useState, useRef, useEffect } from "react";
import { Router } from "next/router";

const Loading = () => {
	const loadingRef = useRef();

	return (
		<div ref={loadingRef} className={styles.loading}>
			<img
				alt="LPS Logo"
				className={`${styles.logo} ${styles.first}`}
				src="./LPS Logo.svg"
			/>
		</div>
	);
};

export default Loading;
