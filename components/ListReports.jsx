import styles from "../styles/components/ListReports.module.scss";
import { Button, Card, Pagination } from "../proton";
import Input from "../components/Input";
import { FaFilter, FaSort } from "react-icons/fa";
import ReportTab from "./ReportTab";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const ListReports = ({ reports, loading, title }) => {
	const [search, setSearch] = useState("");
	const [filterType, setFilterType] = useState("none");
	const [sortType, setSortType] = useState("date");
	const [filterDropdown, setFilterDropdown] = useState(false);
	const [sortDropdown, setSortDropdown] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const router = useRouter();

	const handleSearch = (e) => {
		setSearch(e.target.value);

		console.log(
			search.slice(search.length - 5, search.length),
			"... connect search to server"
		);
	};

	const getReports = () => {
		let reportsGrabbed = [...reports];

		// FILTER AND SORT

		return reportsGrabbed;
	};

	const getReportsOnPage = () => {
		let reportsGrabbed = [...getReports()];
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
		// console.log(val);
	};
	const sort = (e) => {
		let val = e.target.name;
		setSortDropdown(false);
		setSortType(val);
		// console.log(val);
	};

	return (
		<div className={styles.container}>
			<Card dropshadow noborder emphasis="default" loading={loading}>
				<Card.Header>
					<h1>{title}</h1>

					<div className={styles.inputs}>
						<Button icon onClick={openSort}>
							<FaSort />
						</Button>
						<Button icon onClick={openFilter}>
							<FaFilter />
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
					<div ref={filterRef} className={styles.filterDropdown}>
						<h1>Filter</h1>
						<Button
							compact
							emphasis={
								filterType === "none" ? "primary" : "none"
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
								filterType === "unverified" ? "primary" : "none"
							}
							hollow
							outline
							noborder
							name="unverified"
							onClick={filter}
						>
							Unverified
						</Button>
						<Button
							compact
							emphasis={
								filterType === "verified" ? "primary" : "none"
							}
							hollow
							outline
							noborder
							name="verified"
							onClick={filter}
						>
							Verified
						</Button>
					</div>
				)}

				{sortDropdown && (
					<div ref={sortRef} className={styles.sortDropdown}>
						<h1>Sort</h1>
						<Button
							compact
							emphasis={sortType === "date" ? "primary" : "none"}
							hollow
							outline
							noborder
							name="date"
							onClick={sort}
						>
							Date
						</Button>
						<Button
							compact
							emphasis={
								sortType === "urgency" ? "primary" : "none"
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
								sortType === "nonurgency" ? "primary" : "none"
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
						{getReportsOnPage().map((report) => {
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
							getReports().length / itemsPerPage
						)}
						onPageChange={(page) => {
							setCurrentPage(page);
						}}
					/>
				</div>
			</Card>
		</div>
	);
};

export default ListReports;
