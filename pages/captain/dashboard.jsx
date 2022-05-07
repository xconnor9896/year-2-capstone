import styles from "../../styles/Pages/TimsDashboard.module.scss";
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

import axios from "axios";

import Modal from "../../components/Modal";

const Dashboard = ({ user }) => {
	const router = useRouter();

	const route = (path) => {
		router.push(path);
	};

	const [loading, setLoading] = useState(false);

	const [squadNumber, setSquadNumber] = useState(user.squadNumber);
	const [squads, setSquads] = useState([]);

	const token = Cookies.get("token");

	const getSquad = async (squadNumber) => {
		try {
			const res = await axios.get(
				`http://localhost:3000/api/v1/squad/${squadNumber}`,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			return res.data;
		} catch (err) {
			console.error("Failed to get squad.", err);
			return null;
		}
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

				if (squad) squads.push(squad);
			}

			setSquads(squads);
		} else {
			return;
		}

		setLoading(false);
	};

	useEffect(() => {
		// Get squads
		reloadSquads(user);
	}, []);

	// AUTH
	const authCheck = () => {
		if (!user) router.push("/");
		if (user.rank !== "captain") {
			// Re-route if they aren't.
			router.push("/dashboard");
		}
	};

	useEffect(() => {
		authCheck();
	}, [user]);

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
				`http://localhost:3000/api/v1/squad`,
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
				`http://localhost:3000/api/v1/squad/${squadNumber}`,
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

		console.log(squadNumber, newName);

		try {
			// console.log(userId);
			// Getting the report data.
			const res = await axios.post(
				`http://localhost:3000/api/v1/squad/name/${squadNumber}`,
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

	const updateSquad = async (e, id) => {
		e.preventDefault();

		setLoading(true);

		console.log("Hook up squad management", id);
		// reloadSquads();

		setLoading(false);
	};

	const addOfficersToSquad = async (e, id) => {
		e.preventDefault();

		setLoading(true);

		console.log("Hook up adding officers to squad", id);
		// reloadSquads();

		setLoading(false);
	};

	const removeFromSquad = async (id) => {
		setLoading(true);

		console.log("Hook up remove from squad.", id);
		// reloadSquads();

		setLoading(false);
	};

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
									<>{user.name.firstName}'s</>
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

									// console.log(squad);

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
														updateSquad(e, _id)
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
															placeholder="Squad Name"
															maxLength={64}
															id={`newSquadName-${_id}`}
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

												<form
													onSubmit={(e) =>
														addOfficersToSquad(
															e,
															_id
														)
													}
													className={`${styles.addStudentForm} ${styles.sect}`}
													dropped={
														dropdowns.hasOwnProperty(
															_id +
																"_addStudentForm"
														) &&
														dropdowns[
															_id +
																"_addStudentForm"
														] == true
															? "true"
															: "false"
													}
												>
													<header
														onClick={() =>
															toggleDropdown(
																_id +
																	"_addStudentForm"
															)
														}
													>
														<h3>Add Officers</h3>
														<FaChevronDown />
													</header>
													<div
														className={
															styles.content
														}
													>
														<ul>
															{/* {TEMP_addableOfficers.map(
																(student) => {
																	const {
																		name,
																		studentID,
																		_id,
																	} = student;

																	return (
																		<li
																			key={
																				_id
																			}
																		>
																			<Input
																				name={
																					_id
																				}
																				id={
																					_id
																				}
																				type="checkbox"
																				checked={
																					true
																				}
																				label={
																					<label
																						htmlFor={
																							_id
																						}
																					>
																						{
																							name
																						}
																					</label>
																				}
																			/>
																		</li>
																	);
																}
															)} */}
														</ul>
														<Button
															type="submit"
															emphasis="primary"
														>
															<FaUserPlus />
															Add These Officers
														</Button>
													</div>
												</form>

												<div
													className={`${styles.officers} ${styles.sect}`}
													dropped={
														dropdowns.hasOwnProperty(
															_id + "_officers"
														) &&
														dropdowns[
															_id + "_officers"
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
															Officers Already in
															Squad
														</h3>
														<FaChevronDown />
													</header>
													<div
														className={
															styles.content
														}
													>
														{officers.length <
															1 && (
															<h3>
																No Officers to
																Display
															</h3>
														)}
														{officers.map(
															(student) => {
																const {
																	name,
																	studentID,
																	_id: linkID,
																} = student;

																return (
																	<div
																		className={
																			styles.student
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
																			></div>
																			<div
																				className={
																					styles.data
																				}
																			>
																				<span>
																					{
																						name
																					}
																				</span>
																				<span>
																					{
																						studentID
																					}
																				</span>
																			</div>
																		</div>
																		<Button.Squad
																			split
																		>
																			<Button
																				onClick={() =>
																					route(
																						`/profile/${linkID}`
																					)
																				}
																				compact
																				emphasis="secondary"
																			>
																				<FaUser />
																				View
																			</Button>
																			<Button
																				onClick={() =>
																					removeFromSquad(
																						_id
																					)
																				}
																				compact
																				emphasis="error"
																			>
																				<FaTrash />
																				Remove
																			</Button>
																		</Button.Squad>
																	</div>
																);
															}
														)}
													</div>
												</div>

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
						</div>
					</div>
				</Card>
			</article>
		</main>
	);
};

export default Dashboard;
