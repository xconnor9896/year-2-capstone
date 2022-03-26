import styles from "../styles/Components/Input.module.scss";

const Input = (props) => {
	const { icon } = props;

	return (
		<div className={styles.input}>
			{icon && icon}
			<input {...props} />
		</div>
	);
};

export default Input;
