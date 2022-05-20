import styles from "../styles/Components/Loading.module.scss";
import { useState, useRef, useEffect } from "react";
import { Router } from "next/router";

import logo from "../util/LPS Logo.svg";
import Image from "next/image";

const Loading = () => {
	const loadingRef = useRef();

	return (
		<div ref={loadingRef} className={styles.loading}>
			<Image
				width="100px"
				height="100px"
				alt="Logo Failed to Load"
				src={logo}
				className={`${styles.logo} ${styles.first}`}
			/>
		</div>
	);
};

export default Loading;
