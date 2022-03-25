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
import Link from "next/link";
import Image from "next/image";
import logoImg from "../util/LPS Logo.svg";

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
				<Image alt="LPS Logo" width={48} height={48} src={logoImg} />
			</nav>

			{dropdownOpen && (
				<div className={styles.dropdown}>
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
			)}
		</div>
	);
};

export default Navbar;
