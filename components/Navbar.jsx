import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Components/Navbar.module.scss";
import {
	FaAngleDoubleRight,
	FaColumns,
	FaUser,
	FaSignOutAlt,
} from "react-icons/fa";
import { Button } from "../proton";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../util/LPS Logo.svg";

const Navbar = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const dropdownRef = useRef();

	const clickHandler = (e) => {
		if (!dropdownRef.current) {
			console.warn(
				"dropdownRef unset. This means clicking outside the dropdown won't close it."
			);
			return;
		}

		if (
			dropdownOpen &&
			dropdownRef.current &&
			dropdownRef.current !== e.target &&
			!dropdownRef.current.contains(e.target)
		) {
			setDropdownOpen(false);
		}
	};

	useEffect(() => {
		window.addEventListener("click", clickHandler);

		return () => {
			window.removeEventListener("click", clickHandler);
		};
	}, [dropdownRef, dropdownOpen]);

	return (
		<div className={styles.navParent}>
			<div
				ref={dropdownRef}
				className={`${styles.dropdown} ${
					dropdownOpen && styles.dropped
				}`}
			>
				<section>
					<Link href="/dashboard">
						<button>
							<FaColumns />
							Dashboard
						</button>
					</Link>
					<Link href="/profile/1">
						<button>
							<FaUser />
							Profile
						</button>
					</Link>
				</section>

				<section>
					<Link href="/">
						<button>
							<FaSignOutAlt />
							Sign Out
						</button>
					</Link>
				</section>
			</div>
			<nav className={styles.nav}>
				<Button
					onClick={() => setDropdownOpen(!dropdownOpen)}
					icon
					hollow
					noborder
					emphasis={dropdownOpen ? "secondary" : "primary"}
				>
					<FaAngleDoubleRight
						style={{
							fontSize: "2rem",
						}}
						className={`${dropdownOpen && styles.flipped}`}
					/>
				</Button>
				<Image alt="LPS Logo" width={48} height={48} src={logoImg} />
			</nav>
		</div>
	);
};

export default Navbar;
