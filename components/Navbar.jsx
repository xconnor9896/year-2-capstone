import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Components/Navbar.module.scss";
import {
	FaAngleDown,
	FaColumns,
	FaUser,
	FaSignOutAlt,
	FaClipboardList,
} from "react-icons/fa";
import { Button } from "../proton";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../util/LPS Logo.svg";
import { logoutUser } from "../pages/util/authUser";
import { Router } from "next/router";

const Navbar = ({ user }) => {
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

	Router.events.on("routeChangeComplete", () => {
		setDropdownOpen(false);
	});

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
					{user && (
						<>
							<Link href={`/profile/${user._id}`}>
								<button>
									<FaUser />
									Profile
								</button>
							</Link>
							{user.rank === "captain" && (
								<Link href={`/reports`}>
									<button>
										<FaClipboardList />
										Reports
									</button>
								</Link>
							)}
						</>
					)}
				</section>

				<section>
					<button onClick={() => logoutUser()}>
						<FaSignOutAlt />
						Sign Out
					</button>
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
					<div className={`${dropdownOpen && styles.flipped}`}>
						<span>
							<FaAngleDown
								className="arrTop"
								style={{
									fontSize: "2rem",
								}}
							/>
						</span>
						<span>
							<FaAngleDown
								className="arrBottom"
								style={{
									fontSize: "2rem",
								}}
							/>
						</span>
						<div className="box"></div>
					</div>
				</Button>
				<Image alt="LPS Logo" width={48} height={48} src={logoImg} />
			</nav>
		</div>
	);
};

export default Navbar;
