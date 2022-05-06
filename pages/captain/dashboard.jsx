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

import { v4 as uuid } from "uuid";
import Modal from "../../components/Modal";

const exStudent = () => {
	let e = [];
	for (let i = 0; i < Math.ceil(Math.random() * 30) + 5; i++) {
		e.push({
			name: `${["John", "Jane"][Math.floor(Math.random() * 2)]} ${
				["Doe", "Apple"][Math.floor(Math.random() * 2)]
			}`,
			studentID: `${Math.floor(Math.random() * 10)}${Math.floor(
				Math.random() * 10
			)}${Math.floor(Math.random() * 10)}`,
			_id: uuid(),
		});
	}

	return e;
};

const Dashboard = ({ user }) => {
	const [loading, setLoading] = useState(false);

	// AUTH AND ROUTING
	const router = useRouter();

	const route = (path) => {
		router.push(path);
	};

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

	// DELETE GROUP MODAL
	const [deleteModal, setDeleteModal] = useState(false);
	const openDeleteModal = (groupId) => {
		console.log(groupId);

		setDeleteModal(groupId);
	};

	const [addStudentDropdown, setAddStudentDropdown] = useState(false);
	// Temporary local variables. Should be replaced with server getters.
	const [dropdowns, setDropdowns] = useState({});
	const toggleDropdown = (dropdown) => {
		setDropdowns({ ...dropdowns, [dropdown]: !dropdowns[dropdown] });
	};

	const groups = [
		{
			_id: 0,
			name: "Unnamed Group",
			students: [...exStudent()],
		},
		{ _id: 1, name: "Unnamed Group 2", students: [...exStudent()] },
	];

	const TEMP_addableStudents = [...exStudent()];

	const updateGroup = (e, id) => {
		e.preventDefault();

		setLoading(true);

		console.log("Hook up group management", id);

		setLoading(false);
	};

	const addGroup = () => {
		setLoading(true);

		console.log("Hook up adding GROUPS");

		setLoading(false);
	};

	const deleteGroup = (id) => {
		setLoading(true);

		console.log("Hook up deleting GROUPS");

		setLoading(false);
	};

	const addStudents = (e, id) => {
		e.preventDefault();

		setLoading(true);

		console.log("Hook up adding students to group", id);

		setLoading(false);
	};

	const removeFromGroup = (id) => {
		setLoading(true);

		console.log("Hook up remove from group.", id);

		setLoading(false);
	};

	return (
		<main className={styles.container}>
			{deleteModal !== false && (
				<Modal closeModal={() => setDeleteModal(false)}>
					<span>
						<h1>Delete [groupName] and?</h1>
						<p>
							This is a{" "}
							<b style={{ color: "red" }}>permanent action</b>,
							and any associated students will stop having a group
							assigned to them.
						</p>
					</span>
					<Button.Group>
						<Button emphasis="primary" onClick={() => {}}>
							Cancel
						</Button>
						<Button emphasis="error" onClick={deleteReport}>
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

						<div className={styles.groupManagement}>
							<h1>Your Groups</h1>
							<div className={styles.groups}>
								{groups.length < 1 && (
									<h3 className={styles.noMsg}>
										No Groups to Display
									</h3>
								)}
								{groups.map((group) => {
									const { _id, name, students } = group;

									return (
										<div
											dropped={
												dropdowns.hasOwnProperty(_id) &&
												dropdowns[_id] == true
													? "true"
													: "false"
											}
											className={styles.group}
										>
											<header
												onClick={() =>
													toggleDropdown(_id)
												}
											>
												<h3>{name}</h3>
												<FaChevronDown />
											</header>

											<div className={styles.content}>
												<form
													onSubmit={(e) =>
														updateGroup(e, _id)
													}
													className={styles.sect}
													dropped={
														dropdowns.hasOwnProperty(
															_id +
																"_changeGroupName"
														) &&
														dropdowns[
															_id +
																"_changeGroupName"
														] == true
															? "true"
															: "false"
													}
												>
													<header
														onClick={() =>
															toggleDropdown(
																_id +
																	"_changeGroupName"
															)
														}
													>
														<h3>
															Change Group Name
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
															placeholder="Group Name"
															maxLength={64}
														/>
														<Button
															type="submit"
															emphasis="primary"
														>
															<FaSave />
															Apply Changes
														</Button>
													</div>
												</form>

												<form
													onSubmit={(e) =>
														addStudents(e, _id)
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
														<h3>Add Students</h3>
														<FaChevronDown />
													</header>
													<div
														className={
															styles.content
														}
													>
														<ul>
															{TEMP_addableStudents.map(
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
															)}
														</ul>
														<Button
															type="submit"
															emphasis="primary"
														>
															<FaUserPlus />
															Add These Students
														</Button>
													</div>
												</form>

												<div
													className={`${styles.students} ${styles.sect}`}
													dropped={
														dropdowns.hasOwnProperty(
															_id + "_students"
														) &&
														dropdowns[
															_id + "_students"
														] == true
															? "true"
															: "false"
													}
												>
													<header
														onClick={() =>
															toggleDropdown(
																_id +
																	"_students"
															)
														}
													>
														<h3>
															Students Already in
															Group
														</h3>
														<FaChevronDown />
													</header>
													<div
														className={
															styles.content
														}
													>
														{students.length <
															1 && (
															<h3>
																No Students to
																Display
															</h3>
														)}
														{students.map(
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
																		<Button.Group
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
																					removeFromGroup(
																						_id
																					)
																				}
																				compact
																				emphasis="error"
																			>
																				<FaTrash />
																				Remove
																			</Button>
																		</Button.Group>
																	</div>
																);
															}
														)}
													</div>
												</div>

												<Button
													onClick={() =>
														openDeleteModal(_id)
													}
													emphasis="error"
												>
													<FaTrash />
													Permanently Delete Group
												</Button>
											</div>
										</div>
									);
								})}
								<Button
									emphasis="primary"
									hollow
									onClick={addGroup}
								>
									<FaPlus /> Add Group
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
