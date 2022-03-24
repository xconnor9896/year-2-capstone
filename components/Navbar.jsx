import React, { useState } from "react";
import styles from "../styles/Components/Navbar.module.scss";
import {
	FaAngleDoubleDown,
	FaAngleDoubleUp,
	FaHome,
	FaColumns,
	FaUser,
	FaSignOutAlt,
} from "react-icons/fa";
import { Button } from "../proton";

const Dropdown = () => {
	return (
		<div className={styles.dropdown}>
			<Button.Group vertical split>
				<Button hollow noborder color="white">
					<FaHome />
					Home
				</Button>
				<Button hollow noborder color="white">
					<FaColumns />
					Dashboard
				</Button>
				<Button hollow noborder color="white">
					<FaUser />
					Profile
				</Button>
			</Button.Group>

			<Button.Group vertical split>
				<Button hollow noborder color="white">
					<FaSignOutAlt />
					Sign Out
				</Button>
			</Button.Group>
		</div>
	);
};

const Navbar = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<div className={styles.navParent}>
			<nav className={styles.nav}>
				<Button
					onClick={() => setDropdownOpen(!dropdownOpen)}
					icon
					hollow
					noborder
					emphasis={dropdownOpen ? "secondary" : "primary"}
				>
					{dropdownOpen ? (
						<FaAngleDoubleUp
							style={{
								fontSize: "2rem",
							}}
						/>
					) : (
						<FaAngleDoubleDown
							style={{
								fontSize: "2rem",
							}}
						/>
					)}
				</Button>
				<img
					className={styles.logo}
					src="./LPS Logo.svg"
					alt="LPS Logo"
				/>
			</nav>

			{dropdownOpen && <Dropdown />}
		</div>
	);
};

export default Navbar;
