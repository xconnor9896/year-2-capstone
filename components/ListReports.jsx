import styles from "../styles/Components/ListReports.module.scss";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import axios from "axios";
import getSquad from "../pages/util/getSquad";

import {baseURL} from "../pages/util/authUser";

import { FaFilter, FaSort, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button, Card, Pagination } from "../proton";
import ReportTab from "./ReportTab";

const ListReports = ({ currentUser, userID }) => {
	const router = useRouter();
	const token = Cookies.get("token");

	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState("Loading...");

	const userSpecific = userID !== null ? true : false;

	const [reports, setReports] = useState([]);
	const [paginatedReports, setPaginatedReports] = useState([]);

	const [squads, setSquads] = useState([]);
	const [selectedSquad, setSelectedSquad] = useState("");

	const [verified, setVerified] = useState(null);
	const [sortType, setSortType] = useState(null);

	const [filterDropdown, setFilterDropdown] = useState(false);
	const [sortDropdown, setSortDropdown] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [totalPages, setTotalPages] = useState(999);

	const getUser = async (userId) => {
		try {
			const res = await axios.get(
				`/api/v1/user/${userId}`,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			return res.data;
		} catch (err) {
			console.error(`Failed to get user with ID:`, userId, err);
			return null;
		}
	};

	const propogateReports = async (reports) => {
		let newReps = [...reports];

		console.log(newReps);

		for (let report of newReps) {
			const newResponsibleOfficer =
				typeof report.basicInfo.responsibleOfficer === "string"
					? await getUser(report.basicInfo.responsibleOfficer)
					: report.basicInfo.responsibleOfficer;

			report.basicInfo.responsibleOfficer = newResponsibleOfficer;
		}

		return newReps;
	};

	const getUsersReports = async (userTarget) => {
		// console.log(currentUser._id, userTarget._id);
		try {
			const res = await axios.post(
				`/api/v1/report/all`,
				{
					userId: currentUser._id,
					targetId: userTarget._id,
					verified,
					sort: sortType,
				},
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			return res.data;
		} catch (err) {
			console.error("Failed to get user's reports.", err);
			return null;
		}
	};

	const getAllReports = async () => {
		try {
			const res = await axios.post(
				`/api/v1/report/all`,
				{ userId: currentUser._id, verified, sort: sortType },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			return res.data;
		} catch (err) {
			console.error("Failed to get all reports.", err);
			return null;
		}
	};

	useEffect(async () => {
		setLoading(true);

		if (userSpecific) {
			// If we want to list one users reports.
			const userTarget = await getUser(userID);

			if (userTarget) {
				if (userTarget._id === currentUser._id) {
					// If you are the user who's reports are being accessed.
					setTitle("Your Reports");
				} else {
					setTitle(`${userTarget.name.firstName}'s Reports`);
				}

				const gottenReports = await getUsersReports(userTarget);

				setReports(gottenReports);
			}
		} else {
			// If we want to list all users reports under a certain squad.
			const gottenReports = await getAllReports();
			setReports(gottenReports);

			let squadSelection = [];

			for (let squadNumber of currentUser.squadNumber) {
				const squad = await getSquad(squadNumber);

				if (squad) {
					const { squadName, squadNumber } = squad;
					squadSelection.push({ squadName, squadNumber });
				}
			}

			setSquads(squadSelection);

			setTitle("All Reports");
		}

		setLoading(false);
	}, [userSpecific, selectedSquad, verified, sortType]);

	useEffect(async () => {
		setLoading(true);

		let propogatedReports = await propogateReports(reports);

		if (selectedSquad !== "") {
			propogatedReports = propogatedReports.filter(
				(report) =>
					report.basicInfo.responsibleOfficer.squadNumber.length >
						0 &&
					report.basicInfo.responsibleOfficer.squadNumber[0].toString() ===
						selectedSquad.toString()
			);
		}

		setTotalPages(Math.floor(propogatedReports.length / itemsPerPage));

		const paginatedReps = paginateReports(propogatedReports);

		setPaginatedReports(paginatedReps);

		setLoading(false);
	}, [reports, currentPage]);

	const paginateReports = (reps) => {
		setLoading(true);

		let reportsGrabbed = [...reps];

		if (!reportsGrabbed || reportsGrabbed.length < 1) return [];

		reportsGrabbed = reportsGrabbed.slice(
			(currentPage - 1) * itemsPerPage,
			(currentPage - 1) * itemsPerPage + itemsPerPage
		);

		setLoading(false);

		return reportsGrabbed;
	};

	const [filterIcon, setFilterIcon] = useState(<FaFilter />);
	const [sortIcon, setSortIcon] = useState(<FaSort />);

	const openFilter = () => {
		setFilterDropdown(true);
		setSortDropdown(false);
	};

	const openSort = () => {
		setFilterDropdown(false);
		setSortDropdown(true);
	};

	const sortRef = useRef();
	const filterRef = useRef();

	const clickHandler = (e) => {
		if (sortDropdown) {
			if (!sortRef.current) {
				// console.warn(
				// 	"sortRef unset. This means clicking outside the dropdown won't close it."
				// );
				return;
			}

			if (
				sortDropdown &&
				sortRef.current &&
				sortRef.current !== e.target &&
				!sortRef.current.contains(e.target)
			) {
				setSortDropdown(false);
			}
		} else {
			if (!filterRef.current) {
				// console.warn(
				// 	"filterRef unset. This means clicking outside the dropdown won't close it."
				// );
				return;
			}

			if (
				filterDropdown &&
				filterRef.current &&
				filterRef.current !== e.target &&
				!filterRef.current.contains(e.target)
			) {
				setFilterDropdown(false);
			}
		}
	};

	useEffect(() => {
		window.addEventListener("click", clickHandler);

		return () => {
			window.removeEventListener("click", clickHandler);
		};
	}, [filterRef, sortRef, filterDropdown, sortDropdown]);

	const filter = (val) => {
		setFilterDropdown(false);
		setVerified(val);

		setCurrentPage(1);

		switch (val) {
			case "verified":
				setFilterIcon(<FaCheckCircle />);
				return;
			case "unverified":
				setFilterIcon(<FaTimesCircle />);
				return;
			default:
				setFilterIcon(<FaFilter />);
				return;
		}
	};
	const sort = (val) => {
		setSortDropdown(false);
		setSortType(val);

		setCurrentPage(1);
	};

	return (
		<div className={styles.container}>
			<Card dropshadow noborder emphasis="default" loading={loading}>
				{!loading && (
					<>
						<Card.Header>
							{!userSpecific ? (
								<>
									<select
										placeholder="Select Squad"
										value={selectedSquad}
										onChange={(e) => {
											setSelectedSquad(e.target.value);
										}}
									>
										<option value={""}>All Reports</option>

										{squads &&
											squads.length > 0 &&
											squads.map((squad) => {
												const {
													squadName,
													squadNumber,
												} = squad;

												return (
													<option
														key={squadNumber}
														value={squadNumber}
													>
														{squadName}
													</option>
												);
											})}
									</select>
								</>
							) : (
								<h1>{title}</h1>
							)}

							<div className={styles.inputs}>
								<Button
									compact
									emphasis="primary"
									onClick={openSort}
								>
									{sortIcon}
									Sort
								</Button>
								<Button
									compact
									emphasis="secondary"
									onClick={openFilter}
								>
									{filterIcon}
									Filter
								</Button>
							</div>
						</Card.Header>
						{filterDropdown && (
							<div
								ref={filterRef}
								className={styles.filterDropdown}
							>
								<h1>Filter</h1>
								<Button
									compact
									emphasis={
										verified === null ? "primary" : "none"
									}
									hollow
									outline
									noborder
									onClick={() => filter(null)}
								>
									None
								</Button>
								<Button
									compact
									emphasis={
										verified === true ? "primary" : "none"
									}
									hollow
									outline
									noborder
									onClick={() => filter(true)}
								>
									Verified
								</Button>
								<Button
									compact
									emphasis={
										verified === false ? "primary" : "none"
									}
									hollow
									outline
									noborder
									onClick={() => filter(false)}
								>
									Unverified
								</Button>
							</div>
						)}
						{sortDropdown && (
							<div ref={sortRef} className={styles.sortDropdown}>
								<h1>Sort</h1>
								<Button
									compact
									emphasis={
										sortType === 1 ? "primary" : "none"
									}
									hollow
									outline
									noborder
									onClick={() => sort(1)}
								>
									Newest
								</Button>
								<Button
									compact
									emphasis={
										sortType === 2 ? "primary" : "none"
									}
									hollow
									outline
									noborder
									onClick={() => sort(2)}
								>
									Oldest
								</Button>
								<Button
									compact
									emphasis={
										sortType === 3 ? "primary" : "none"
									}
									hollow
									outline
									noborder
									onClick={() => sort(3)}
								>
									Urgency
								</Button>
								<Button
									compact
									emphasis={
										sortType === 4 ? "primary" : "none"
									}
									hollow
									outline
									noborder
									onClick={() => sort(4)}
								>
									Nonurgency
								</Button>
							</div>
						)}

						<div className={styles.content}>
							<div className={styles.reportList}>
								{!paginatedReports ||
									(paginatedReports.length < 1 && (
										<span style={{ margin: "auto auto" }}>
											No reports to display...
										</span>
									))}
								{paginatedReports.map((report) => {
									return (
										<ReportTab
											key={report._id}
											report={report}
											showOfficer={true}
											showExtraInfo={true}
										/>
									);
								})}
							</div>
							<Pagination
								arrows
								jumpArrows
								activePage={currentPage}
								totalPages={totalPages}
								onPageChange={(page) => {
									setCurrentPage(page);
								}}
							/>
						</div>
					</>
				)}
			</Card>
		</div>
	);
};

export default ListReports;
