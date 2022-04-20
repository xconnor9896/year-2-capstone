import { useState } from "react";
import styles from "../styles/Components/EditReport.module.scss";
import { Button, Card } from "../proton";
import {
	FaPencilAlt,
	FaChevronDown,
	FaUserPlus,
	FaUserTimes,
	FaTrash,
	FaSave,
} from "react-icons/fa";
const uuid = require("uuid").v4;

import { Select, Option } from "./Select";

const Input = ({ children }) => {
	return <div className={styles.input}>{children}</div>;
};

const EditReport = ({ report, setLoading, loading, setView }) => {
	const person = {
		// says weather the person is a victim, witness, suspect, or something else
		id: uuid(),
		personType: "",
		race: "",
		name: {
			firstName: "",
			middleName: "",
			lastName: "",
			aka: "",
		},
		DOB: "",
		age: 0,
		isJuvenile: false,
		sex: "",
		occupation: "",
		homeAddress: "",
		employerAddress: "",
		phoneNumbers: {
			main: "",
			secondary: "",
			business: "",
		},
		email: "",
		studentID: 0,
		victimRelationshipToSuspect: "",
		whoDescribed: "",
		willProsecute: false,
		BAC: false,
		BACResults: "",
		personalDetails: {
			height: "",
			weight: 0,
			build: "",
			hairColor: "",
			hairCharacter: "",
			complexion: "",
			voice: "",
			eyeColor: "",
			facialHairColor: "",
			facialHairChar: "",
			clothing: "",
		},
	};

	const [dropdowns, setDropdowns] = useState({
		basic: false,
		people: false,
		hosp: false,
		syno: false,
		cont: false,
	});
	const toggleDropdown = (dropdown) => {
		setDropdowns({ ...dropdowns, [dropdown]: !dropdowns[dropdown] });
	};

	const [personDropdowns, setPersonDropdowns] = useState({});
	const togglePersonDropdown = (id) => {
		let newPersonDropdowns = { ...personDropdowns };
		newPersonDropdowns[id]
			? (newPersonDropdowns[id] =
					newPersonDropdowns[id] === "1" ? "0" : "1")
			: (newPersonDropdowns[id] = "1");

		setPersonDropdowns({ ...newPersonDropdowns });
	};

	const [activeReport, setActiveReport] = useState({
		caseNumber: "oi214joai3h523897",

		approvedBy: {
			name: {
				firstName: "Tim",
				lastName: "P",
			},
		},

		basicInfo: {
			incidentType: "",

			code: "",

			reportType: {
				keyRpt: false,
				fu: false,
			},

			disposition: "",

			arsSectionNumber: "",

			location: "",

			synopsis: "",
			reportNarration: "",

			responsibleOfficer: {
				name: {
					firstName: "",
					middleName: "",
					lastName: "",
				},
				rank: "",
				badgeNumber: "",
				division: "",
			},

			beatOfOffense: "",

			domesticViolence: false,

			incidentReportedAt: {
				date: {
					month: "",
					day: "",
					year: "",
				},
				day: "",
				time: {
					hour: "",
					minute: "",
				},
			},

			incidentOccurredAt: {
				from: {
					date: {
						month: "",
						day: "",
						year: "",
					},

					time: {
						hour: "",
						minute: "",
					},
				},
				to: {
					date: {
						month: "",
						day: "",
						year: "",
					},

					time: {
						hour: "",
						minute: "",
					},
				},
			},

			relatedComments: "",
		},

		peopleInfo: [],

		hospitalInfo: {
			injured: false,
			treated: false,
			hospital: "",
			transportedBy: "",
			emsNo: 0,
			treatmentReasons: {
				mental: false,
				suicide: false,
				icf: false,
				scf: false,
				intox: false,
				drugs: false,
				indust: false,
				uncon: false,
				resisted: false,

				other: false,
			},
			patientCondition: "",
			patientDispo: "",
			attendingPhysician: "",
		},
	});

	const addPerson = () => {
		setActiveReport({
			...activeReport,

			peopleInfo: [
				...activeReport.peopleInfo,

				{
					...person,
					id: uuid(),
				},
			],
		});
	};

	const removePerson = (toDel) => {
		let newPeopleInfo = [...activeReport.peopleInfo].filter(
			(person) => person !== toDel
		);

		setActiveReport({
			...activeReport,
			peopleInfo: newPeopleInfo,
		});
	};

	// TOTALLY STATIC
	const handleChange = (e) => {
		if (loading) return;

		let newReport = { ...activeReport };

		let path = e.selectTarget
			? e.selectTarget.path.split(" ")
			: e.target.getAttribute("path").split(" ");

		let curRef = newReport;

		for (let i = 0; i < path.length; i++) {
			if (path[i].includes("id_")) {
				path[i] = Number(path[i].replace("id_", ""));
			}
		}

		for (let i = 0; i < path.length; i++) {
			if (i === path.length - 1) {
				if (e.selectTarget) {
					let val = e.selectTarget.value;
					curRef[path[i]] = val;
				} else {
					if (e.target.type === "checkbox") {
						curRef[path[i]] = e.target.checked;
					} else {
						// console.log(curRef);
						let val = e.target.value;
						if (
							e.target.maxLength &&
							e.target.maxLength !== null &&
							e.target.maxLength > 0 &&
							val.length > e.target.maxLength
						) {
							val = val.slice(0, e.target.maxLength);
						}
						curRef[path[i]] = val;
					}
				}
			} else {
				curRef = curRef[path[i]];
			}
		}

		setActiveReport({ ...newReport, ...activeReport });
	};

	const submitForm = (e) => {
		e.preventDefault();

		setLoading(true);
		console.warn("implement submitting of editted report.");
		setLoading(false);

		// If Success
		setView(true);
	};

	// const blurMe = (e) => {
	// 	e.target.blur();
	// };

	return (
		<form className={styles.reportForm} onSubmit={submitForm}>
			<section
				className={styles.basicInfo}
				dropped={dropdowns.basic ? "1" : "0"}
			>
				<header onClick={() => toggleDropdown("basic")}>
					<h1>Basic Information</h1>
					<Button
						type="button"
						hollow
						noborder
						icon
						emphasis="secondary"
					>
						<FaChevronDown />
					</Button>
				</header>
				<div className={styles.sectionContent}>
					<span>
						<Input>
							<label>Incident Type</label>
							<input
								value={activeReport.basicInfo.incidentType}
								path="basicInfo incidentType"
								onChange={handleChange}
								type="text"
								placeholder="Incident Type"
							/>
						</Input>
						<Input>
							<label>Code</label>
							<input
								type="number"
								placeholder="000"
								maxLength={3}
								value={activeReport.basicInfo.code}
								path="basicInfo code"
								onChange={handleChange}
							/>
						</Input>
						<Input>
							<label>Report Type</label>
							<ul>
								<li>
									<input
										type="checkbox"
										name="keyRpt"
										id="keyRpt"
										checked={
											activeReport.basicInfo.reportType
												.keyRpt
										}
										path="basicInfo reportType keyRpt"
										onChange={handleChange}
									/>
									<label htmlFor="keyRpt">Key Rpt</label>
								</li>

								<li>
									<input
										type="checkbox"
										name="fu"
										id="fu"
										checked={
											activeReport.basicInfo.reportType.fu
										}
										path="basicInfo reportType fu"
										onChange={handleChange}
									/>
									<label htmlFor="fu">F/U</label>
								</li>
							</ul>
						</Input>

						<Input>
							<label>Disposition</label>
							<input
								type="number"
								placeholder="000"
								maxLength={3}
								value={activeReport.basicInfo.disposition}
								path="basicInfo disposition"
								onChange={handleChange}
							/>
						</Input>
						<Input>
							<label>A.R.S Section Number</label>
							<input
								type="text"
								placeholder="00-000"
								maxLength={7}
								value={activeReport.basicInfo.arsSectionNumber}
								path="basicInfo arsSectionNumber"
								onChange={handleChange}
							/>
						</Input>
					</span>
					<span>
						<Input>
							<label>Location of Offense</label>
							<input
								type="text"
								placeholder="Location"
								value={activeReport.basicInfo.location}
								path="basicInfo location"
								onChange={handleChange}
							/>
						</Input>
					</span>

					<span>
						<Input>
							<label>Beat of Offense</label>
							<input
								value={activeReport.basicInfo.beatOfOffense}
								path="basicInfo beatOfOffense"
								onChange={handleChange}
								type="number"
								maxLength={3}
								placeholder="000"
							/>
						</Input>
						<Input>
							<label>Domestic Violence</label>
							<ul>
								<li>
									<input
										type="checkbox"
										name="domesticViolence"
										id="domesticViolence"
										checked={
											activeReport.basicInfo
												.domesticViolence
										}
										path="basicInfo domesticViolence"
										onChange={handleChange}
									/>
									<label htmlFor="domesticViolence">
										Yes
									</label>
								</li>
							</ul>
						</Input>

						<Input>
							<label>Date / Time Occured</label>
							<ul>
								From
								<li>
									<ul>
										<li>
											<ul style={{ gap: "0.15rem" }}>
												<li>
													<input
														value={
															activeReport
																.basicInfo
																.incidentOccurredAt
																.from.date.day
														}
														path="basicInfo incidentOccurredAt from date day"
														onChange={handleChange}
														type="number"
														maxLength={2}
														placeholder="DD"
													/>
												</li>
												-
												<li>
													<input
														value={
															activeReport
																.basicInfo
																.incidentOccurredAt
																.from.date.month
														}
														path="basicInfo incidentOccurredAt from date month"
														onChange={handleChange}
														type="number"
														maxLength={2}
														placeholder="MM"
													/>
												</li>
												-
												<li>
													<input
														value={
															activeReport
																.basicInfo
																.incidentOccurredAt
																.from.date.year
														}
														path="basicInfo incidentOccurredAt from date year"
														onChange={handleChange}
														type="number"
														style={{
															width: "2.5rem",
														}}
														maxLength={4}
														placeholder="YYYY"
													/>
												</li>
											</ul>
										</li>
										/
										<li>
											<input
												value={
													activeReport.basicInfo
														.incidentOccurredAt.from
														.time.hour
												}
												path="basicInfo incidentOccurredAt from time hour"
												onChange={handleChange}
												type="number"
												maxLength={2}
												placeholder="HH"
											/>
											:
											<input
												value={
													activeReport.basicInfo
														.incidentOccurredAt.from
														.time.minute
												}
												path="basicInfo incidentOccurredAt from time minute"
												onChange={handleChange}
												type="number"
												maxLength={2}
												placeholder="MM"
											/>
										</li>
									</ul>
								</li>
								To
								<li>
									<ul>
										<li>
											<ul style={{ gap: "0.15rem" }}>
												<li>
													<input
														value={
															activeReport
																.basicInfo
																.incidentOccurredAt
																.to.date.day
														}
														path="basicInfo incidentOccurredAt to date day"
														onChange={handleChange}
														type="number"
														maxLength={2}
														placeholder="DD"
													/>
												</li>
												-
												<li>
													<input
														value={
															activeReport
																.basicInfo
																.incidentOccurredAt
																.to.date.month
														}
														path="basicInfo incidentOccurredAt to date month"
														onChange={handleChange}
														type="number"
														maxLength={2}
														placeholder="MM"
													/>
												</li>
												-
												<li>
													<input
														value={
															activeReport
																.basicInfo
																.incidentOccurredAt
																.to.date.year
														}
														path="basicInfo incidentOccurredAt to date year"
														onChange={handleChange}
														type="number"
														style={{
															width: "2.5rem",
														}}
														maxLength={4}
														placeholder="YYYY"
													/>
												</li>
											</ul>
										</li>
										/
										<li>
											<input
												value={
													activeReport.basicInfo
														.incidentOccurredAt.to
														.time.hour
												}
												path="basicInfo incidentOccurredAt to time hour"
												onChange={handleChange}
												type="number"
												maxLength={2}
												placeholder="HH"
											/>
											:
											<input
												value={
													activeReport.basicInfo
														.incidentOccurredAt.to
														.time.minute
												}
												path="basicInfo incidentOccurredAt to time minute"
												onChange={handleChange}
												type="number"
												maxLength={2}
												placeholder="MM"
											/>
										</li>
									</ul>
								</li>
							</ul>
						</Input>
						<Input>
							<label nr="1">Related Reports/Comments</label>

							<textarea
								name="relatedComments"
								id="relatedComments"
								cols="50"
								rows="5"
								value={activeReport.basicInfo.relatedComments}
								path="basicInfo relatedComments"
								onChange={handleChange}
								type="text"
								placeholder="Related Comments"
							></textarea>
						</Input>
					</span>
				</div>
			</section>
			<section
				className={styles.peopleInfo}
				dropped={dropdowns.people ? "1" : "0"}
			>
				<header onClick={() => toggleDropdown("people")}>
					<h1>People Involved</h1>
					<Button
						type="button"
						hollow
						noborder
						icon
						emphasis="secondary"
					>
						<FaChevronDown />
					</Button>
				</header>
				<div className={styles.sectionContent}>
					<span className={styles.people}>
						{activeReport.peopleInfo.length == 0 && (
							<h5>No People To Display</h5>
						)}
						{activeReport.peopleInfo.map((person) => {
							const { id } = person;
							const index =
								activeReport.peopleInfo.indexOf(person);
							const personLoc = activeReport.peopleInfo[index];
							const path = `peopleInfo id_${index} `;

							const { name } = personLoc;
							const { firstName, middleName, lastName, aka } =
								name;

							return (
								<div
									key={id}
									dropped={
										personDropdowns[id]
											? personDropdowns[id]
											: "3"
									}
									className={styles.person}
								>
									<div
										className={styles.header}
										onClick={() => togglePersonDropdown(id)}
									>
										<span>
											{aka || firstName || lastName ? (
												firstName || lastName ? (
													<>
														{`${firstName} ${
															aka && `"${aka}"`
														} ${lastName}`.length <
														32
															? `${firstName} ${
																	aka &&
																	`"${aka}"`
															  } ${lastName}`
															: `${firstName} ${
																	aka &&
																	`"${aka}"`
															  } ${lastName}`.slice(
																	0,
																	32
															  ) + "..."}{" "}
													</>
												) : (
													<>{aka && aka}</>
												)
											) : (
												<>Unnamed Person</>
											)}
										</span>
										<Button.Group>
											<Button
												type="button"
												onClick={() =>
													removePerson(person)
												}
												hollow
												noborder
												color="error"
												icon
											>
												<FaTrash />
											</Button>
											<Button
												type="button"
												icon
												emphasis="primary"
												hollow
												noborder
												className={
													styles.dropdownToggle
												}
											>
												<FaChevronDown />
											</Button>
										</Button.Group>
									</div>
									<div className={styles.content}>
										<span>
											<Input>
												<label>Person Type</label>

												<Select
													placeholder="Person Type"
													path={path + "personType"}
													name="personType"
													id="personType"
													value={personLoc.personType}
													onChange={handleChange}
												>
													<Option val="Complainant">
														Complainant
													</Option>
													<Option val="Victim">
														Victim
													</Option>
													<Option>
														Reporting Person
													</Option>
													<Option val="Finder">
														Finder
													</Option>
													<Option val="Witness">
														Witness
													</Option>
													<Option val="Suspect">
														Suspect
													</Option>
												</Select>
											</Input>
											<Input>
												<label>Race / Ethnicity</label>

												<Select
													placeholder="Race / Ethnicity"
													path={path + "race"}
													name="race"
													id="race"
													value={personLoc.race}
													onChange={handleChange}
												>
													<Option>
														American Indian / Alaska
														Native
													</Option>
													<Option val="Asian">
														Asian
													</Option>
													<Option>
														Black / African American
													</Option>
													<Option>
														Hispanic / Latino
													</Option>
													<Option>
														Native Hawaiian / Other
														Pacific Islander
													</Option>
													<Option val="White">
														White
													</Option>
												</Select>
											</Input>
										</span>
										<span>
											<Input>
												<label>
													Name (Last, First Middle)
												</label>
												<ul>
													<li>
														<input
															type="text"
															placeholder="Last"
															value={
																personLoc.name
																	.lastName
															}
															path={
																path +
																"name lastName"
															}
															onChange={
																handleChange
															}
														/>
														<p>,</p>
													</li>
													<li>
														<input
															type="text"
															placeholder="First"
															value={
																personLoc.name
																	.firstName
															}
															path={
																path +
																"name firstName"
															}
															onChange={
																handleChange
															}
														/>
													</li>
													<li>
														<input
															type="text"
															placeholder="Middle"
															value={
																personLoc.name
																	.middleName
															}
															path={
																path +
																"name middleName"
															}
															onChange={
																handleChange
															}
														/>
													</li>
												</ul>
											</Input>
											<Input>
												<label>Age</label>
												<input
													type="number"
													placeholder="Age"
													maxLength={3}
													value={personLoc.age}
													path={path + "age"}
													onChange={handleChange}
												/>
											</Input>

											<Input>
												<label>Sex</label>

												<Select
													placeholder="Sex"
													path={path + "sex"}
													name="sex"
													id="sex"
													value={personLoc.sex}
													onChange={handleChange}
												>
													<Option val="Male">
														Male
													</Option>
													<Option val="Female">
														Female
													</Option>
												</Select>
											</Input>
										</span>
										<span>
											<Input>
												<label nr="1">
													Alias/Nickname
												</label>
												<input
													type="text"
													placeholder="AKA"
													value={personLoc.name.aka}
													path={path + "name aka"}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label nr="1">
													Occupation / For
													Juvenile-School Attending
												</label>
												<input
													type="text"
													placeholder="Occupation"
													value={personLoc.occupation}
													path={path + "occupation"}
													onChange={handleChange}
												/>
											</Input>
										</span>
										<span>
											<Input>
												<label nr="1">
													Home Address (City - County
													- State - Zip)
												</label>
												<input
													type="text"
													placeholder="Address"
													value={
														personLoc.homeAddress
													}
													path={path + "homeAddress"}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label nr="1">
													Employer Business Address
													(City - County - State -
													Zip)
												</label>
												<input
													type="text"
													placeholder="Address"
													value={
														personLoc.employerAddress
													}
													path={
														path + "employerAddress"
													}
													onChange={handleChange}
												/>
											</Input>
										</span>
										<span>
											<Input>
												<label>Main Phone</label>
												<input
													type="tel"
													maxLength={20}
													placeholder="000-000-0000"
													value={
														personLoc.phoneNumbers
															.main
													}
													path={
														path +
														"phoneNumbers main"
													}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label nr="1">
													Secondary Phone
												</label>
												<input
													type="tel"
													maxLength={20}
													placeholder="000-000-0000"
													value={
														personLoc.phoneNumbers
															.secondary
													}
													path={
														path +
														"phoneNumbers secondary"
													}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label nr="1">
													Business Phone
												</label>
												<input
													type="tel"
													maxLength={20}
													placeholder="000-000-0000"
													value={
														personLoc.phoneNumbers
															.business
													}
													path={
														path +
														"phoneNumbers business"
													}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label nr="1">Email</label>
												<input
													type="email"
													placeholder="em@il.com"
													value={personLoc.email}
													path={path + "email"}
													onChange={handleChange}
												/>
											</Input>
										</span>
										<span>
											<Input>
												<label nr="1">Student ID</label>
												<input
													type="number"
													maxLength={3}
													placeholder="000"
													value={personLoc.studentID}
													path={path + "studentID"}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label>
													Victim Relation to Suspect
												</label>
												<input
													type="string"
													placeholder="Relation"
													value={
														personLoc.victimRelationshipToSuspect
													}
													path={
														path +
														"victimRelationshipToSuspect"
													}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label>Who Described</label>
												<input
													type="string"
													placeholder="Who Described"
													value={
														personLoc.whoDescribed
													}
													path={path + "whoDescribed"}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label>Will Prosecute</label>
												<ul>
													<li>
														<input
															type="checkbox"
															name="willProsecute"
															id="willProsecute"
															checked={
																personLoc.willProsecute
															}
															path={
																path +
																"willProsecute"
															}
															onChange={
																handleChange
															}
														/>
														<label htmlFor="willProsecute">
															Will Prosecute
														</label>
													</li>
												</ul>
											</Input>
											<Input>
												<label>BAC</label>
												<ul>
													<li>
														<input
															type="checkbox"
															name="bac"
															id="bac"
															checked={
																personLoc.BAC
															}
															path={path + "BAC"}
															onChange={
																handleChange
															}
														/>
														<label htmlFor="bac">
															BAC
														</label>
													</li>
												</ul>
											</Input>
											<Input>
												<label>BAC Results</label>
												<input
													type="string"
													placeholder="BAC Results"
													value={personLoc.BACResults}
													path={path + "BACResults"}
													onChange={handleChange}
												/>
											</Input>
										</span>
										<span>
											<Input>
												<label>Height</label>
												<input
													type="string"
													placeholder={`0'0"`}
													value={
														personLoc
															.personalDetails
															.height
													}
													path={
														path +
														"personalDetails height"
													}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label>Weight</label>

												<ul>
													<li>
														<input
															type="number"
															placeholder="0"
															style={{
																width: "2.75rem",
															}}
															maxLength={4}
															value={
																personLoc
																	.personalDetails
																	.weight
															}
															path={
																path +
																"personalDetails weight"
															}
															onChange={
																handleChange
															}
														/>
														<label>Lbs</label>
													</li>
												</ul>
											</Input>
											<Input>
												<label>Build</label>
												<input
													type="string"
													placeholder="Build"
													value={
														personLoc
															.personalDetails
															.build
													}
													path={
														path +
														"personalDetails build"
													}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label>Hair Color</label>

												<Select
													placeholder="Hair Color"
													path={
														path +
														"personalDetails hairColor"
													}
													name="hairColor"
													id="hairColor"
													value={
														personLoc
															.personalDetails
															.hairColor
													}
													onChange={handleChange}
												>
													<Option val="Brown">
														Brown
													</Option>
													<Option val="Blonde">
														Blonde
													</Option>
													<Option val="Black">
														Black
													</Option>
													<Option val="Red">
														Red
													</Option>
													<Option val="Gray">
														Gray
													</Option>
													<Option val="Bald">
														Bald
													</Option>
													<Option val="Other">
														Other
													</Option>
												</Select>
											</Input>
											<Input>
												<label>Hair Character</label>
												<input
													type="string"
													placeholder="Hair Character"
													value={
														personLoc
															.personalDetails
															.hairCharacter
													}
													path={
														path +
														"personalDetails hairCharacter"
													}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label nr="1">Complexion</label>
												<input
													type="string"
													placeholder="Complexion"
													value={
														personLoc
															.personalDetails
															.complexion
													}
													path={
														path +
														"personalDetails complexion"
													}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label nr="1">Voice</label>
												<input
													type="string"
													placeholder="Voice"
													value={
														personLoc
															.personalDetails
															.voice
													}
													path={
														path +
														"personalDetails voice"
													}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label>Eye Color</label>
												<Select
													placeholder="Eye Color"
													path={
														path +
														"personalDetails eyeColor"
													}
													name="eyeColor"
													id="eyeColor"
													value={
														personLoc
															.personalDetails
															.eyeColor
													}
													onChange={handleChange}
												>
													<Option val="Amber">
														Amber
													</Option>
													<Option val="Blue">
														Blue
													</Option>
													<Option val="Brown">
														Brown
													</Option>
													<Option val="Gray">
														Gray
													</Option>
													<Option val="Green">
														Green
													</Option>
													<Option val="Hazel">
														Hazel
													</Option>
													<Option val="Red">
														Red
													</Option>
													<Option val="Other">
														Other
													</Option>
												</Select>
											</Input>
											<Input>
												<label>Facial Hair Color</label>
												<Select
													placeholder="Facial Hair Color"
													path={
														path +
														"personalDetails facialHairColor"
													}
													name="facialHairColor"
													id="facialHairColor"
													value={
														personLoc
															.personalDetails
															.facialHairColor
													}
													onChange={handleChange}
												>
													<Option val="Brown">
														Brown
													</Option>
													<Option val="Blonde">
														Blonde
													</Option>
													<Option val="Black">
														Black
													</Option>
													<Option val="Red">
														Red
													</Option>
													<Option val="Gray">
														Gray
													</Option>
													<Option val="Bald">
														Bald
													</Option>
													<Option val="Other">
														Other
													</Option>
												</Select>
											</Input>
											<Input>
												<label>
													Facial Hair Character
												</label>
												<input
													type="string"
													placeholder="Facial Hair Character"
													value={
														personLoc
															.personalDetails
															.facialHairChar
													}
													path={
														path +
														"personalDetails facialHairChar"
													}
													onChange={handleChange}
												/>
											</Input>
											<Input>
												<label>Clothing</label>

												<textarea
													name="relatedComments"
													id="relatedComments"
													cols="50"
													rows="5"
													value={
														personLoc
															.personalDetails
															.clothing
													}
													path={
														path +
														"personalDetails clothing"
													}
													onChange={handleChange}
													type="text"
													placeholder="Describe the clothing they had on..."
												></textarea>
											</Input>
										</span>
									</div>
								</div>
							);
						})}
					</span>

					<Button
						onClick={addPerson}
						type="button"
						emphasis="primary"
						// color="success"
					>
						<FaUserPlus />
						Add Person
					</Button>
				</div>
			</section>
			<section
				className={styles.hospitalInfo}
				dropped={dropdowns.hosp ? "1" : "0"}
			>
				<header onClick={() => toggleDropdown("hosp")}>
					<h1>Hospital Information</h1>
					<Button
						type="button"
						hollow
						noborder
						icon
						emphasis="secondary"
					>
						<FaChevronDown />
					</Button>
				</header>
				<div className={styles.sectionContent}>
					<span>
						<Input>
							<label>Injured?</label>
							<ul>
								<li>
									<input
										type="checkbox"
										name="injured"
										id="injured"
										checked={
											activeReport.hospitalInfo.injured
										}
										path="hospitalInfo injured"
										onChange={handleChange}
									/>
									<label htmlFor="injured">
										There was an injury during this
										incident.
									</label>
								</li>
							</ul>
						</Input>
						<Input>
							<label>Treated?</label>
							<ul>
								<li>
									<input
										type="checkbox"
										name="treated"
										id="treated"
										checked={
											activeReport.hospitalInfo.treated
										}
										path="hospitalInfo treated"
										onChange={handleChange}
									/>
									<label htmlFor="treated">
										The injured party was treated.
									</label>
								</li>
							</ul>
						</Input>
						<Input>
							<label>Hospital</label>
							<input
								value={activeReport.hospitalInfo.hospital}
								path="hospitalInfo hospital"
								onChange={handleChange}
								type="text"
								placeholder="Hospital"
							/>
						</Input>
						<Input>
							<label>Transported By</label>
							<input
								value={activeReport.hospitalInfo.transportedBy}
								path="hospitalInfo transportedBy"
								onChange={handleChange}
								type="text"
								placeholder="Transported By"
							/>
						</Input>
						<Input>
							<label>EMS Number</label>
							<input
								value={activeReport.hospitalInfo.emsNo}
								path="hospitalInfo emsNo"
								onChange={handleChange}
								type="number"
								maxLength={3}
								placeholder="000"
							/>
						</Input>
						<Input>
							<label>Treatment Reasons</label>
							<ul>
								<li>
									<input
										type="checkbox"
										name="mental"
										id="mental"
										checked={
											activeReport.hospitalInfo
												.treatmentReasons.mental
										}
										path="hospitalInfo treatmentReasons mental"
										onChange={handleChange}
									/>
									<label htmlFor="mental">Mental</label>
								</li>
								<li>
									<input
										type="checkbox"
										name="suicide"
										id="suicide"
										checked={
											activeReport.hospitalInfo
												.treatmentReasons.suicide
										}
										path="hospitalInfo treatmentReasons suicide"
										onChange={handleChange}
									/>
									<label htmlFor="suicide">Suicide</label>
								</li>
								<li>
									<input
										type="checkbox"
										name="icf"
										id="icf"
										checked={
											activeReport.hospitalInfo
												.treatmentReasons.icf
										}
										path="hospitalInfo treatmentReasons icf"
										onChange={handleChange}
									/>
									<label htmlFor="icf">I.C.F</label>
								</li>
								<li>
									<input
										type="checkbox"
										name="scf"
										id="scf"
										checked={
											activeReport.hospitalInfo
												.treatmentReasons.scf
										}
										path="hospitalInfo treatmentReasons scf"
										onChange={handleChange}
									/>
									<label htmlFor="scf">S.C.F</label>
								</li>
								<li>
									<input
										type="checkbox"
										name="intox"
										id="intox"
										checked={
											activeReport.hospitalInfo
												.treatmentReasons.intox
										}
										path="hospitalInfo treatmentReasons intox"
										onChange={handleChange}
									/>
									<label htmlFor="intox">Intox</label>
								</li>
								<li>
									<input
										type="checkbox"
										name="drugs"
										id="drugs"
										checked={
											activeReport.hospitalInfo
												.treatmentReasons.drugs
										}
										path="hospitalInfo treatmentReasons drugs"
										onChange={handleChange}
									/>
									<label htmlFor="drugs">Drugs</label>
								</li>
								<li>
									<input
										type="checkbox"
										name="indust"
										id="indust"
										checked={
											activeReport.hospitalInfo
												.treatmentReasons.indust
										}
										path="hospitalInfo treatmentReasons indust"
										onChange={handleChange}
									/>
									<label htmlFor="indust">Indust</label>
								</li>
								<li>
									<input
										type="checkbox"
										name="uncon"
										id="uncon"
										checked={
											activeReport.hospitalInfo
												.treatmentReasons.uncon
										}
										path="hospitalInfo treatmentReasons uncon"
										onChange={handleChange}
									/>
									<label htmlFor="uncon">Uncon</label>
								</li>
								<li>
									<input
										type="checkbox"
										name="resisted"
										id="resisted"
										checked={
											activeReport.hospitalInfo
												.treatmentReasons.resisted
										}
										path="hospitalInfo treatmentReasons resisted"
										onChange={handleChange}
									/>
									<label htmlFor="resisted">
										Resisted Arrest
									</label>
								</li>
								<li>
									<input
										type="checkbox"
										name="other"
										id="other"
										checked={
											activeReport.hospitalInfo
												.treatmentReasons.other
										}
										path="hospitalInfo treatmentReasons other"
										onChange={handleChange}
									/>
									<label htmlFor="other">Other</label>
								</li>
							</ul>
						</Input>
					</span>
					<span>
						<Input>
							<label>Patient Condition</label>
							<input
								value={
									activeReport.hospitalInfo.patientCondition
								}
								path="hospitalInfo patientCondition"
								onChange={handleChange}
								type="text"
								placeholder="Patient Condition"
							/>
						</Input>

						<Input>
							<label>Patient Disposition</label>
							<input
								value={activeReport.hospitalInfo.patientDispo}
								path="hospitalInfo patientDispo"
								onChange={handleChange}
								type="text"
								placeholder="Patient Disposition"
							/>
						</Input>

						<Input>
							<label>Attending Physician</label>
							<input
								value={
									activeReport.hospitalInfo.attendingPhysician
								}
								path="hospitalInfo attendingPhysician"
								onChange={handleChange}
								type="text"
								placeholder="Attending Physician"
							/>
						</Input>
					</span>
				</div>
			</section>
			<section
				className={styles.synopsis}
				dropped={dropdowns.cont ? "1" : "0"}
			>
				<header onClick={() => toggleDropdown("cont")}>
					<h1>Continued</h1>
					<Button
						type="button"
						hollow
						noborder
						icon
						emphasis="secondary"
					>
						<FaChevronDown />
					</Button>
				</header>
				<div className={styles.sectionContent}>
					<span>
						<Input>
							<label>Incident Type</label>
							<input
								value={activeReport.basicInfo.incidentType}
								path="basicInfo incidentType"
								onChange={handleChange}
								type="text"
								placeholder="Incident Type"
							/>
						</Input>
						<Input>
							<label>Code</label>
							<input
								type="number"
								placeholder="000"
								maxLength={3}
								value={activeReport.basicInfo.code}
								path="basicInfo code"
								onChange={handleChange}
							/>
						</Input>
						<Input>
							<label>Report Type</label>
							<ul>
								<li>
									<input
										type="checkbox"
										name="keyRpt"
										id="keyRpt"
										checked={
											activeReport.basicInfo.reportType
												.keyRpt
										}
										path="basicInfo reportType keyRpt"
										onChange={handleChange}
									/>
									<label htmlFor="keyRpt">Key Rpt</label>
								</li>

								<li>
									<input
										type="checkbox"
										name="fu"
										id="fu"
										checked={
											activeReport.basicInfo.reportType.fu
										}
										path="basicInfo reportType fu"
										onChange={handleChange}
									/>
									<label htmlFor="fu">F/U</label>
								</li>
							</ul>
						</Input>

						<Input>
							<label>Disposition</label>
							<input
								type="number"
								placeholder="000"
								maxLength={3}
								value={activeReport.basicInfo.disposition}
								path="basicInfo disposition"
								onChange={handleChange}
							/>
						</Input>
						<Input>
							<label>A.R.S Section Number</label>
							<input
								type="text"
								placeholder="00-000"
								maxLength={7}
								value={activeReport.basicInfo.arsSectionNumber}
								path="basicInfo arsSectionNumber"
								onChange={handleChange}
							/>
						</Input>
					</span>
					<span>
						<Input>
							<label>Location of Offense</label>
							<input
								type="text"
								placeholder="Location"
								value={activeReport.basicInfo.location}
								path="basicInfo location"
								onChange={handleChange}
							/>
						</Input>
					</span>
					<span>
						<Input>
							<textarea
								name="reportNarration"
								id="reportNarration"
								cols="50"
								rows="5"
								value={activeReport.basicInfo.reportNarration}
								path="basicInfo reportNarration"
								onChange={handleChange}
								type="text"
								style={{ width: "100%" }}
								placeholder="Type your report narrative here."
							></textarea>
						</Input>
					</span>
				</div>
			</section>
			<section
				className={styles.synopsis}
				dropped={dropdowns.syno ? "1" : "0"}
			>
				<header onClick={() => toggleDropdown("syno")}>
					<h1>Synopsis</h1>
					<Button
						type="button"
						hollow
						noborder
						icon
						emphasis="secondary"
					>
						<FaChevronDown />
					</Button>
				</header>
				<div
					className={`${styles.sectionContent} ${styles.synopsisContent}`}
				>
					<span>
						<Input>
							<textarea
								name="synopsis"
								id="synopsis"
								cols="50"
								rows="5"
								value={activeReport.basicInfo.synopsis}
								path="basicInfo synopsis"
								onChange={handleChange}
								type="text"
								maxLength={350}
								style={{ width: "100%" }}
								placeholder="Synopsis"
							></textarea>
						</Input>
					</span>
				</div>
			</section>
			<div className={styles.saveButton}>
				{/* <Button emphasis="primary">
					<FaSave /> Save Report
				</Button> */}
				<Button icon circular emphasis="primary">
					<FaSave />
				</Button>
			</div>
		</form>
	);
};

export default EditReport;
