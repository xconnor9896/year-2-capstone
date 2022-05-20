import styles from "../../styles/Pages/AdminDashboard.module.scss";
import { Button, Card } from "../../proton";
import { useState, useEffect } from "react";
import {
	FaUser,
	FaPlus,
	FaClipboardList,
	FaTrash,
	FaSave,
	FaUserPlus,
	FaChevronDown,
} from "react-icons/fa";
import { useRouter } from "next/router";
import Input from "../../components/Input";
import Cookies from "js-cookie";

import {baseURL} from "../util/authUser";

import getSquad from "../util/getSquad";

import axios from "axios";

import Modal from "../../components/Modal";

const Dashboard = ({ user }) => {
	const router = useRouter();

	const route = (path) => {
		router.push(path);
	};

	const [loading, setLoading] = useState(false);
	const [teacherCodeLoading, setTeacherCodeLoading] = useState(false);

	const [squadNumber, setSquadNumber] = useState(
		user.squadNumber ? user.squadNumber : null
	);
	const [squads, setSquads] = useState([]);

	const token = Cookies.get("token");

	// AUTH
	const authCheck = () => {
		if (!user) router.push("/");
		if (user.rank !== "captain") {
			// Re-route if they are not.
			router.push("/dashboard");
		}
	};

	useEffect(() => {
		authCheck();
	}, [user]);

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
			console.error(`Failed to get user with id ${userId}`, err);
			return null;
		}
	};

	const [teacherCode, setTeacherCode] = useState("Loading...");
	const getTeacherCode = async (userId) => {
		setLoading(true);
		try {
			const res = await axios.get(
				`/api/v1/user/code/${userId}`,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			setTeacherCode(res.data.teacherCode);
		} catch (err) {
			console.error(`Failed to get user with id ${userId}`, err);
			setTeacherCode("Failed to load... Please try again later.");
		}
		setLoading(false);
	};

	const updateTeacherCode = async (userId, newCode) => {
		setTeacherCodeLoading(true);
		try {
			const res = await axios.post(
				`/api/v1/user/code/${userId}`,
				{ newCode },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			setTeacherCode(res.data.teacherCode);
		} catch (err) {
			setTeacherCode(err.response.data);
			console.error(`Failed to get user with id ${userId}`, err);
		}
		setTeacherCodeLoading(false);
	};

	const [addableOfficers, setAddableOfficers] = useState(null);
	const getAddableOfficers = async () => {
		setLoading(true);

		try {
			// console.log(userId);
			// Getting the report data.
			const res = await axios.get(
				`/api/v1/user/all`,

				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			if (!res || !res.data) throw new Error("No result returned.");

			setAddableOfficers(res.data);
		} catch (err) {
			console.error("Failed to rename squad.", err);
		}

		setLoading(false);
	};

	const reloadSquads = async (body) => {
		setLoading(true);

		if (!body || !body.squadNumber) return;

		const { squadNumber } = body;
		if (squadNumber) {
			// let squads = squadNumber;
			let squads = [];

			for (let num of squadNumber) {
				const squad = await getSquad(num);

				let newOfficers = [];

				for (let officer of squad.officers) {
					const newOfficer = await getUser(officer);

					newOfficers.push(newOfficer);
				}

				squad.officers = newOfficers;

				if (squad) squads.push(squad);
			}

			setSquads(squads);
		} else {
			return;
		}

		await getAddableOfficers();

		setLoading(false);
	};

	// DELETE squad MODAL
	const [deleteModal, setDeleteModal] = useState(false);
	const openDeleteModal = async (squadNumber) => {
		const gottenSquad = await getSquad(squadNumber);

		if (gottenSquad) {
			setDeleteModal(gottenSquad);
		} else {
			setDeleteModal(false);
		}
	};

	// Temporary local variables. Should be replaced with server getters.
	const [dropdowns, setDropdowns] = useState({});
	const toggleDropdown = (dropdown) => {
		setDropdowns({ ...dropdowns, [dropdown]: !dropdowns[dropdown] });
	};

	// Functions
	const createSquad = async () => {
		setLoading(true);

		try {
			// console.log(userId);
			// Getting the report data.
			const res = await axios.post(
				`/api/v1/squad`,
				{ userId: user._id },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			if (!res) throw new Error("No result returned.");

			reloadSquads(res.data);
		} catch (err) {
			console.error("Failed to add squad.", err);
		}

		setLoading(false);
	};

	const deleteSquad = async (squadNumber) => {
		setLoading(true);

		try {
			const res = await axios.delete(
				`/api/v1/squad/${squadNumber}`,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
					data: {
						userId: user._id,
					},
				}
			);

			reloadSquads(res.data);

			setDeleteModal(false);
		} catch (err) {
			console.error("Failed to delete squad.", err);
		}

		setLoading(false);
	};

	const changeSquadName = async (_id, squadNumber, newName) => {
		setLoading(true);

		// console.log(squadNumber, newName);

		try {
			// console.log(userId);
			// Getting the report data.
			const res = await axios.post(
				`/api/v1/squad/name/${squadNumber}`,
				{ userId: user._id, squadName: newName },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			if (!res) throw new Error("No result returned.");

			reloadSquads(res.data);

			document.getElementById(`newSquadName-${_id}`).value = "";
		} catch (err) {
			console.error("Failed to rename squad.", err);
		}

		setLoading(false);
	};

	const addOfficerToSquad = async (squadNumber, officerId) => {
		setLoading(true);

		try {
			// console.log(userId);
			// Getting the report data.
			const res = await axios.post(
				`/api/v1/squad/${squadNumber}`,
				{ userId: officerId },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			if (!res || !res.data) throw new Error("No result returned.");

			await reloadSquads(await getUser(user._id));

			// console.log(res);
		} catch (err) {
			console.error("Failed to add officer to squad.", err);
		}

		setLoading(false);
	};

	const removeFromSquad = async (squadNumber, officerId) => {
		setLoading(true);

		try {
			// console.log(userId);
			// Getting the report data.
			const res = await axios.post(
				`/api/v1/squad/remove/${squadNumber}`,
				{ officerId, userId: user._id },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			if (!res || !res.data) throw new Error("No result returned.");

			await reloadSquads(await getUser(user._id));

			// console.log(res);
		} catch (err) {
			console.error("Failed to add officer to squad.", err);
		}

		setLoading(false);
	};

	useEffect(async () => {
		// Get squads
		reloadSquads(await getUser(user._id));
		getAddableOfficers();
	}, []);

	useEffect(() => {
		getTeacherCode(user._id);
	}, []);

	return (
		<main className={styles.container}>
			{deleteModal !== false && (
				<Modal closeModal={() => setDeleteModal(false)}>
					<span>
						<h1>Delete {deleteModal.squadName}?</h1>
						<p>
							Deleting Squad #{deleteModal.squadNumber} is a{" "}
							<b style={{ color: "red" }}>permanent action</b>,
							and any associated officers will stop having a squad
							assigned to them.
						</p>
					</span>
					<Button.Group split wrap>
						<Button
							emphasis="primary"
							onClick={() => setDeleteModal(false)}
						>
							Cancel
						</Button>
						<Button
							emphasis="error"
							onClick={() => deleteSquad(deleteModal.squadNumber)}
						>
							Yes, delete it forever!
						</Button>
					</Button.Group>
				</Modal>
			)}

			<article className={styles.main}>
				<Card dropshadow noborder loading={loading}>
					<Card.Header>
						<div className={styles.header}>
							<h1>
								{user.name.firstName ? (
									<>{user.name.firstName}&apos;s</>
								) : (
									"Your"
								)}{" "}
								Dashboard
							</h1>
						</div>
					</Card.Header>

					<div className={styles.content}>
						<div className={styles.message}>
							<h1>
								Welcome back,{" "}
								{user.rank[0].toUpperCase() +
									user.rank.slice(1, user.rank.length)}{" "}
								{user.name.lastName
									? user.name.lastName
									: user.name.firstName &&
									  user.name.firstName}
								!
							</h1>
						</div>

						<div className={styles.inputs}>
							<Button
								onClick={() => route(`/profile/${user._id}`)}
								emphasis="primary"
							>
								<FaUser />
								My Profile
							</Button>

							{/* <>
								<Button emphasis="primary">
									<FaPlus />
									Create New Report
								</Button>
							</> */}

							<Button
								onClick={() => route("/reports")}
								emphasis="primary"
							>
								<FaClipboardList />
								View All Reports
							</Button>
						</div>

						<div className={styles.squadManagement}>
							<h1>Your Squads</h1>
							<div className={styles.squads}>
								{squads.length < 1 && (
									<h3 className={styles.noMsg}>
										No Squads to Display
									</h3>
								)}
								{squads.map((squad) => {
									const {
										_id,
										squadName,
										squadNumber,
										officers,
									} = squad;

									return (
										<div
											dropped={
												dropdowns.hasOwnProperty(_id) &&
												dropdowns[_id] == true
													? "true"
													: "false"
											}
											key={_id}
											className={styles.squad}
										>
											<header
												onClick={() =>
													toggleDropdown(_id)
												}
											>
												<h3>
													<span>
														Squad #{squadNumber}
													</span>
													<span>{squadName}</span>
												</h3>

												<FaChevronDown />
											</header>

											<div className={styles.content}>
												<form
													onSubmit={(e) =>
														e.preventDefault()
													}
													className={styles.sect}
													dropped={
														dropdowns.hasOwnProperty(
															_id +
																"_changeSquadName"
														) &&
														dropdowns[
															_id +
																"_changeSquadName"
														] == true
															? "true"
															: "false"
													}
												>
													<header
														onClick={() =>
															toggleDropdown(
																_id +
																	"_changeSquadName"
															)
														}
													>
														<h3>
															Change Squad Name
														</h3>
														<FaChevronDown />
													</header>
													<div
														className={
															styles.content
														}
													>
														<Input
															type="text"
															maxLength={64}
															id={`newSquadName-${_id}`}
															placeholder={
																squadName
															}
														/>
														<Button
															type="button"
															emphasis="primary"
															onClick={() => {
																const val =
																	document.getElementById(
																		`newSquadName-${_id}`
																	).value;

																if (
																	val.length >
																	0
																) {
																	changeSquadName(
																		_id,
																		squadNumber,
																		val
																	);
																}
															}}
														>
															<FaSave />
															Apply Changes
														</Button>
													</div>
												</form>

												{addableOfficers &&
													addableOfficers.filter(
														(officer) =>
															officer.rank !==
															"captain"
													).length > 0 && (
														<div
															className={`${styles.addOfficerForm} ${styles.sect}`}
															dropped={
																dropdowns.hasOwnProperty(
																	_id +
																		"_addOfficerForm"
																) &&
																dropdowns[
																	_id +
																		"_addOfficerForm"
																] == true
																	? "true"
																	: "false"
															}
														>
															<header
																onClick={() =>
																	toggleDropdown(
																		_id +
																			"_addOfficerForm"
																	)
																}
															>
																<h3>
																	Add Officers
																</h3>
																<FaChevronDown />
															</header>
															<div
																className={
																	styles.content
																}
															>
																<ul
																	className={
																		styles.officers
																	}
																>
																	{addableOfficers
																		.filter(
																			(
																				officer
																			) =>
																				officer.rank !==
																				"captain"
																		)
																		.map(
																			(
																				officer
																			) => {
																				const {
																					name: {
																						firstName,
																						lastName,
																					},
																					rank,
																					badgeNumber,
																					_id,
																					profilePicURL,
																				} = officer;

																				return (
																					<li
																						className={
																							styles.officer
																						}
																						key={
																							_id
																						}
																					>
																						<div
																							className={
																								styles.info
																							}
																						>
																							<div
																								className={
																									styles.pfp
																								}
																								style={
																									profilePicURL && {
																										backgroundImage: `url("${profilePicURL}")`,
																									}
																								}
																							></div>
																							<div
																								className={
																									styles.data
																								}
																							>
																								<span>
																									Officer{" "}
																									{
																										lastName
																									}

																									,{" "}
																									{
																										firstName
																									}
																								</span>
																								<span>
																									#
																									{
																										badgeNumber
																									}
																								</span>
																							</div>
																						</div>

																						<nav>
																							<Button
																								onClick={() =>
																									addOfficerToSquad(
																										squadNumber,
																										_id
																									)
																								}
																								compact
																								emphasis="primary"
																							>
																								<FaUserPlus />
																								Add
																								Officer
																							</Button>
																						</nav>
																					</li>
																				);
																			}
																		)}
																</ul>
															</div>
														</div>
													)}

												{officers &&
													officers.filter(
														(officer) =>
															officer.rank !==
															"captain"
													).length > 0 && (
														<div
															className={`${styles.officers} ${styles.sect}`}
															dropped={
																dropdowns.hasOwnProperty(
																	_id +
																		"_officers"
																) &&
																dropdowns[
																	_id +
																		"_officers"
																] == true
																	? "true"
																	: "false"
															}
														>
															<header
																onClick={() =>
																	toggleDropdown(
																		_id +
																			"_officers"
																	)
																}
															>
																<h3>
																	Officers in
																	this Squad
																</h3>
																<FaChevronDown />
															</header>
															<div
																className={
																	styles.content
																}
															>
																<ul
																	className={
																		styles.officers
																	}
																>
																	{officers
																		.filter(
																			(
																				officer
																			) =>
																				officer.rank !==
																				"captain"
																		)
																		.map(
																			(
																				officer
																			) => {
																				const {
																					name: {
																						firstName,
																						lastName,
																					},
																					rank,
																					badgeNumber,
																					_id,
																					profilePicURL,
																				} = officer;

																				return (
																					<li
																						className={
																							styles.officer
																						}
																						key={
																							_id
																						}
																					>
																						<div
																							className={
																								styles.info
																							}
																						>
																							<div
																								className={
																									styles.pfp
																								}
																								style={
																									profilePicURL && {
																										backgroundImage: `url("${profilePicURL}")`,
																									}
																								}
																							></div>
																							<div
																								className={
																									styles.data
																								}
																							>
																								<span>
																									Officer{" "}
																									{
																										lastName
																									}

																									,{" "}
																									{
																										firstName
																									}
																								</span>
																								<span>
																									#
																									{
																										badgeNumber
																									}
																								</span>
																							</div>
																						</div>

																						<nav>
																							<Button
																								onClick={() =>
																									route(
																										`/profile/${_id}`
																									)
																								}
																								compact
																								emphasis="primary"
																							>
																								<FaUser />
																								View
																							</Button>
																							<Button
																								onClick={() =>
																									removeFromSquad(
																										squadNumber,
																										_id
																									)
																								}
																								compact
																								emphasis="error"
																							>
																								<FaTrash />
																								Remove
																							</Button>
																						</nav>
																					</li>
																				);
																			}
																		)}
																</ul>
															</div>
														</div>
													)}

												<Button
													onClick={() =>
														openDeleteModal(
															squadNumber
														)
													}
													emphasis="error"
												>
													<FaTrash />
													Permanently Delete Squad
												</Button>
											</div>
										</div>
									);
								})}
								<Button
									emphasis="primary"
									hollow
									onClick={createSquad}
								>
									<FaPlus /> Add Squad
								</Button>
							</div>
							<div className={styles.teacherCodeForm}>
								<p>
									<span>Teacher Code</span>
									<span>{teacherCode}</span>
								</p>
								<p>
									Change the teacher code:
									<span>
										<input
											type="text"
											placeholder="New Code"
											name="teacherCode"
											id="teacherCode"
										/>
										<Button
											emphasis="primary"
											compact
											type="button"
											loading={teacherCodeLoading}
											onClick={() => {
												const newCode =
													document.getElementById(
														"teacherCode"
													).value;

												if (newCode.length < 1) return;

												updateTeacherCode(
													user._id,
													newCode
												);
											}}
										>
											Submit
										</Button>
									</span>
								</p>
							</div>
						</div>
					</div>
				</Card>
			</article>
		</main>
	);
};

export default Dashboard;
