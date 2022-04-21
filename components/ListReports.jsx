import styles from "../styles/components/ListReports.module.scss";
import { Button, Card, Pagination } from "../proton";
import Input from "../components/Input";
import {
	FaFilter,
	FaSort,
	FaCheckCircle,
	FaTimesCircle,
	FaSortUp,
	FaSortDown,
	FaCalendar,
} from "react-icons/fa";
import ReportTab from "./ReportTab";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { Select, Option } from "./Select";

const randString = () => {
	let l = "qwertyuiopasdfghjklzxcvbnm1234567890";

	let e = "";
	for (let i = 0; i < 10; i++) {
		e += l.split("")[Math.floor(Math.random() * l.length)];
	}

	return e;
};

const genExRep = () => {
	const exRep = {
		caseId: randString(),
		reportingOfficer: {
			name: "Officer John Doe",
			squad: `Squad #86${Math.ceil(Math.random() * 800) + 100}`,
		},
		verified: [true, false][Math.floor(Math.random() * 2)],
		tag: Math.ceil(Math.random() * 3),
		createdAt: Date.now(),
	};

	return exRep;
};

const exampleReports = [
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
	genExRep(),
];

const ListReports = ({ canSwitchGroups, userID, groupID, title, setTitle }) => {
	const [search, setSearch] = useState("");
	const [filterType, setFilterType] = useState("none");
	const [sortType, setSortType] = useState("newest");
	const [filterDropdown, setFilterDropdown] = useState(false);
	const [sortDropdown, setSortDropdown] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const router = useRouter();
	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(false);

	const [filterIcon, setFilterIcon] = useState(<FaFilter />);
	const [sortIcon, setSortIcon] = useState(<FaSort />);

	const handleSearch = (e) => {
		setSearch(e.target.value);

		console.log(
			search.slice(search.length - 5, search.length),
			"... connect search to server"
		);
	};

	const pullReportsFromServer = () => {
		setLoading(true);
		if (userID && userID !== null) {
			// PULL FOR SPECIFIC USER
			setTitle("#USER's Reports");
			setReports([]);
		} else if (groupID && groupID !== null) {
			// PULL FOR SPECIFIC GROUP
			setTitle("#GROUP's Reports");
			setReports([]);
		} else {
			// PULL ALL REPORTS
			setTitle("All Reports");
			setReports(exampleReports);
		}
		setLoading(false);
	};

	useEffect(() => {
		pullReportsFromServer();
	}, [search]);

	const filterAndSortReports = () => {
		let reportsGrabbed = [...reports];

		if (!reportsGrabbed || reportsGrabbed.length < 1) return [];

		// FILTER AND SORT SHOULD BE SERVERSIDE
		switch (filterType) {
			case "verified":
				reportsGrabbed = reportsGrabbed.filter(
					(report) => report.verified === true
				);
				break;
			case "unverified":
				reportsGrabbed = reportsGrabbed.filter(
					(report) => report.verified !== true
				);
				break;
			default:
				break;
		}

		return reportsGrabbed;
	};

	const paginateReports = () => {
		let reportsGrabbed = [...filterAndSortReports()];

		if (!reportsGrabbed || reportsGrabbed.length < 1) return [];

		reportsGrabbed = reportsGrabbed.slice(
			currentPage * itemsPerPage,
			currentPage * itemsPerPage + itemsPerPage
		);

		return reportsGrabbed;
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
							{canSwitchGroups ? (
								<>
									<Select
										absolutely
										placeholder="Select Group"
										value={title}
										onChange={(e) => {
											setTitle(e.selectTarget.value);
										}}
									>
										<Option value={"1"}>All Reports</Option>
										<Option value={"2"}>HOOK</Option>
										<Option value={"3"}>ME</Option>
										<Option value={"4"}>UP</Option>
									</Select>
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
								{paginateReports().map((report) => {
									return (
										<ReportTab
											{...{ report }}
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
								totalPages={Math.floor(
									filterAndSortReports().length / itemsPerPage
								)}
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
