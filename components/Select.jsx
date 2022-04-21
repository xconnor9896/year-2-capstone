import { useState, useEffect, useRef } from "react";
import styles from "../styles/Components/Select.module.scss";
import { FaChevronDown } from "react-icons/fa";

export const Select = ({
	props,
	children,
	placeholder,
	onChange,
	value,
	path,
	absolutely,
	arc,
}) => {
	const [dropped, setDropped] = useState(false);
	// const [value, setValue] = useState(null);
	// const [option, setOption] = useState(null);
	const [lP, setLP] = useState("Select");

	const childrenRef = useRef(null);
	const thisRef = useRef(null);

	const childClick = (e) => {
		const opt =
			e.target.getAttribute("val") ||
			e.target.getAttribute("value") ||
			e.target.innerText;
		const place = e.target.innerText;
		// setOption({ disp: opt, value: opt.toLowerCase() });
		// setValue(opt.toLowerCase());
		setLP(place);
		onChange({
			selectTarget: {
				path,
				type: "select",
				label: place,
				value: opt.toLowerCase(),
			},
		});
	};

	useEffect(() => {
		if (childrenRef && arc === true) {
			const childs = childrenRef.current.children;

			if (childs) {
				const vals = [...childs]
					.filter((child) => {
						return child.children[0].getAttribute("val") == value;
					})
					.map((child) => {
						return child.children[0].innerText;
					});

				setLP(vals[0]);
			}
		}
	}, [value]);

	useEffect(() => {
		if (!dropped || !childrenRef || !childrenRef.current) return;

		const children = childrenRef.current.childNodes;

		for (let child of children) {
			child.removeEventListener("click", childClick);
			child.addEventListener("click", childClick);
		}

		// console.log(children);
	}, [dropped]);

	const handleInput = (e) => {
		if (e.key === "Enter") {
			setDropped(!dropped);
		}
	};

	return (
		<div
			className={`${styles.select} ${absolutely && styles.absolutely}`}
			dropped={dropped ? "1" : "0"}
			value={value}
			path={path}
			// type="select"
			onClick={() => setDropped(!dropped)}
			onKeyPress={handleInput}
			ref={thisRef}
			{...props}
			tabIndex={0}
		>
			<div className={styles.bar}>
				{arc === true
					? lP
						? lP
						: placeholder
					: value
					? value
					: placeholder
					? placeholder
					: lP}
				<FaChevronDown />
			</div>
			<div className={styles.dropdown} ref={childrenRef}>
				{children.map((child) => {
					if (
						value &&
						child.props.children &&
						child.props.children.toLowerCase() === value
					) {
						return (
							<span
								key={children.indexOf(child)}
								className={styles.selected}
							>
								{child}
							</span>
						);
					}

					return <span key={children.indexOf(child)}>{child}</span>;
				})}
			</div>
		</div>
	);
};

export const Option = ({ props, children, val }) => {
	return (
		<div tabIndex={0} {...props} val={val} className={styles.option}>
			{children}
		</div>
	);
};
