import styles from "../styles/components/ListReports.module.scss";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import axios from "axios";
import getSquad from "../pages/util/getSquad";

import { FaFilter, FaSort, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button, Card, Pagination } from "../proton";
import Input from "../components/Input";
import ReportTab from "./ReportTab";

const ListReports = ({ currentUser, userID }) => {
	const router = useRouter();
	const token = Cookies.get("token");

	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState("Loading...");

	const userSpecific = userID ? true : false;

	const [reports, setReports] = useState([]);
	const [paginatedReports, setPaginatedReports] = useState([]);

	const [squads, setSquads] = useState([]);
	const [selectedSquad, setSelectedSquad] = useState("");

	const [filterType, setFilterType] = useState("none");
	const [sortType, setSortType] = useState("newest");

	const [filterDropdown, setFilterDropdown] = useState(false);
	const [sortDropdown, setSortDropdown] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [totalPages, setTotalPages] = useState(
		Math.floor(reports.length / itemsPerPage)
	);

	const getUser = async (userId) => {
		try {
			const res = await axios.get(
				`http://localhost:3000/api/v1/user/${userId}`,
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
		try {
			const res = await axios.post(
				`http://localhost:3000/api/v1/report/all`,
				{ userId: currentUser._id, targetId: userTarget._id },
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
				`http://localhost:3000/api/v1/report/all`,
				{ userId: currentUser._id },
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
	}, [userSpecific, selectedSquad]);

	useEffect(async () => {
		setLoading(true);

		let propogatedReports = await propogateReports(reports);

		if (selectedSquad !== "") {
			propogatedReports = propogatedReports.filter(
				(report) =>
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

	// Old code needs to be implemented below VVV

	const [search, setSearch] = useState("");

	const [filterIcon, setFilterIcon] = useState(<FaFilter />);
	const [sortIcon, setSortIcon] = useState(<FaSort />);

	const handleSearch = (e) => {
		setSearch(e.target.value);

		console.log(
			search.slice(search.length - 5, search.length),
			"... connect search to server"
		);
	};

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

	const filter = (e) => {
		let val = e.target.name;
		setFilterDropdown(false);
		setFilterType(val);

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
	const sort = (e) => {
		let val = e.target.name;
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

							<div className={styles.inputs}>
								<Input
									maxLength={60}
									value={search}
									onChange={handleSearch}
									type="text"
									placeholder="Search"
								/>
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
										filterType === "none"
											? "primary"
											: "none"
									}
									hollow
									outline
									noborder
									name="none"
									onClick={filter}
								>
									None
								</Button>
								<Button
									compact
									emphasis={
										filterType === "verified"
											? "primary"
											: "none"
									}
									hollow
									outline
									noborder
									name="verified"
									onClick={filter}
								>
									Verified
								</Button>
								<Button
									compact
									emphasis={
										filterType === "unverified"
											? "primary"
											: "none"
									}
									hollow
									outline
									noborder
									name="unverified"
									onClick={filter}
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
										sortType === "newest"
											? "primary"
											: "none"
									}
									hollow
									outline
									noborder
									name="newest"
									onClick={sort}
								>
									Newest
								</Button>
								<Button
									compact
									emphasis={
										sortType === "oldest"
											? "primary"
											: "none"
									}
									hollow
									outline
									noborder
									name="oldest"
									onClick={sort}
								>
									Oldest
								</Button>
								<Button
									compact
									emphasis={
										sortType === "urgency"
											? "primary"
											: "none"
									}
									hollow
									outline
									noborder
									name="urgency"
									onClick={sort}
								>
									Urgency
								</Button>
								<Button
									compact
									emphasis={
										sortType === "nonurgency"
											? "primary"
											: "none"
									}
									hollow
									outline
									noborder
									name="nonurgency"
									onClick={sort}
								>
									Nonurgency
								</Button>
							</div>
						)}

						<div className={styles.content}>
							<div className={styles.reportList}>
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
									console.log(page);
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
