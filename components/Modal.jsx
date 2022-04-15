import { useState, useRef, useEffect } from "react";
import styles from "../styles/Components/Modal.module.scss";

const Modal = ({ props, children, closeModal }) => {
	const modalRef = useRef(null);

	useEffect(() => {
		const md = modalRef.current;

		if (!md) return;

		md.style.transition = "none ";
		md.style.top = "150vh";

		setTimeout(() => {
			md.style.transition = "all 0.5s ease-in-out";
			md.style.top = "50%";
		});
	}, [modalRef]);

	return (
		<div onClick={closeModal} className={styles.container}>
			<div
				{...props}
				onClick={(e) => {
					e.stopPropagation();
				}}
				ref={modalRef}
				className={styles.modal}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
