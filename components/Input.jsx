import styles from "../styles/Components/Input.module.scss";
import { useRef } from "react";
import { FaCheck } from "react-icons/fa";

const Input = (props) => {
	const { icon, label, type, checked, onChange } = props;
	const inputRef = useRef(null);

	return (
		<div className={`${styles.input} custom-input`}>
			{icon && icon}
			{type === "checkbox" && (
				<div
					onClick={onChange}
					ischecked={checked ? "true" : "false"}
					className={styles.checkbox}
				>
					<FaCheck className={`${checked && styles.checked}`} />
				</div>
			)}
			<input
				ref={inputRef}
				{...props}
				style={
					type === "checkbox"
						? { display: "none" }
						: { flex: "unset" }
				}
			/>
			{label && label}
		</div>
	);
};

export default Input;
