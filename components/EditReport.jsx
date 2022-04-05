import { useState } from "react";
import styles from "../styles/Components/EditReport.module.scss";
import { Button, Card } from "../proton";
import {
	FaPencilAlt,
	FaChevronDown,
	FaUserPlus,
	FaUserTimes,
} from "react-icons/fa";

import { Select, Option } from "./Select";

const Input = ({ children }) => {
	return <div className={styles.input}>{children}</div>;
};

const EditReport = ({ report, setLoading, loading }) => {
	const person = {
		// says weather the person is a victim, witness, suspect, or something else
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
		whoDiscribed: "",
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
		people: true, // CHANGE ALL TO FALSE AFTER DEV
		hosp: false,
	});

	const toggleDropdown = (dropdown) => {
		setDropdowns({ ...dropdowns, [dropdown]: !dropdowns[dropdown] });
		console.log(dropdowns);
	};

	const [activeReport, setActiveReport] = useState({
		caseNumber: "oi214joai3h523897",

		basicInfo: {
			incidentType: "",

			code: "",

			reportType: {
				keyRpt: false,
				fu: false,
			},

			status: "open",

			disposition: "",

			arsSectionNumber: "",

			location: "",

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

		peopleInfo: [person],

		hospitalInfo: {
			injured: false,
			treated: false,
			hospital: "",
			transportedBy: "",
			emsNo: 0,
			treatmentReasons: "",
			patientCondition: "",
			patientDispo: "",
			attendingPhysician: "",
		},

		synopsis: "",
	});

	const addPerson = () => {
		setActiveReport({
			...activeReport,
			peopleInfo: [...activeReport.peopleInfo, person],
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
		let newReport = { ...activeReport };

		let path = e.selectTarget
			? e.selectTarget.path.split(" ")
			: e.target.getAttribute("path").split(" ");

		let curRef = newReport;

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

	const submitForm = () => {
		setLoading(true);
		console.warn("implement submitting of editted report.");
		// setLoading(false);
	};

	const blurMe = (e) => {
		e.target.blur();
	};

	return (
		<form className={styles.reportForm} onSubmit={submitForm}>
			<section
				className={styles.basicInfo}
				dropped={dropdowns.basic ? "1" : "0"}
			>
				<header>
					<h1>Basic Information</h1>
					<Button
						type="button"
						hollow
						noborder
						icon
						emphasis="secondary"
						onClick={() => toggleDropdown("basic")}
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
							<label>Status</label>
							<Select
								placeholder="Status"
								path="basicInfo status"
								name="status"
								id="status"
								value={activeReport.basicInfo.status}
								onChange={handleChange}
							>
								<Option>Open</Option>
								<Option>Closed</Option>
								<Option>Verified</Option>
							</Select>
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
							<label>
								Responsible Officer (Rank Last, First Middle
								Name)
							</label>
							<ul>
								<li>
									<input
										type="text"
										placeholder="Rank"
										value={
											activeReport.basicInfo
												.responsibleOfficer.rank
										}
										path="basicInfo responsibleOfficer rank"
										onChange={handleChange}
									/>
								</li>
								<li>
									<input
										type="text"
										placeholder="Last"
										value={
											activeReport.basicInfo
												.responsibleOfficer.name
												.lastName
										}
										path="basicInfo responsibleOfficer name lastName"
										onChange={handleChange}
									/>{" "}
									<p>,</p>
								</li>
								<li>
									<input
										type="text"
										placeholder="First"
										value={
											activeReport.basicInfo
												.responsibleOfficer.name
												.firstName
										}
										path="basicInfo responsibleOfficer name firstName"
										onChange={handleChange}
									/>
								</li>
								<li>
									<input
										type="text"
										placeholder="Middle"
										value={
											activeReport.basicInfo
												.responsibleOfficer.name
												.middleName
										}
										path="basicInfo responsibleOfficer name middleName"
										onChange={handleChange}
									/>
								</li>
							</ul>
						</Input>
						<Input>
							<label>Badge Number</label>
							<input
								type="text"
								placeholder="Badge Number"
								value={
									activeReport.basicInfo.responsibleOfficer
										.badgeNumber
								}
								path="basicInfo responsibleOfficer badgeNumber"
								onChange={handleChange}
							/>
						</Input>
						<Input>
							<label>Division</label>
							<Select
								placeholder="Division"
								path="basicInfo responsibleOfficer division"
								name="status"
								id="status"
								value={
									activeReport.basicInfo.responsibleOfficer
										.division
								}
								onChange={handleChange}
							>
								<Option>Load</Option>
								<Option>In</Option>
								<Option>Options</Option>
							</Select>
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
							<label>Date / Day / Time Reported</label>
							<ul>
								<li>
									<ul style={{ gap: "0.15rem" }}>
										<li>
											<input
												value={
													activeReport.basicInfo
														.incidentReportedAt.date
														.day
												}
												path="basicInfo incidentReportedAt date day"
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
													activeReport.basicInfo
														.incidentReportedAt.date
														.month
												}
												path="basicInfo incidentReportedAt date month"
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
													activeReport.basicInfo
														.incidentReportedAt.date
														.year
												}
												path="basicInfo incidentReportedAt date year"
												onChange={handleChange}
												type="number"
												style={{ width: "2.5rem" }}
												maxLength={4}
												placeholder="YYYY"
											/>
										</li>
									</ul>
								</li>
								/
								<li>
									<Select
										placeholder="Day"
										path="basicInfo incidentReportedAt day"
										name="day"
										id="day"
										value={
											activeReport.basicInfo
												.incidentReportedAt.day
										}
										onChange={handleChange}
									>
										<Option>Sunday</Option>
										<Option>Monday</Option>
										<Option>Tuesday</Option>
										<Option>Wednesday</Option>
										<Option>Thursday</Option>
										<Option>Friday</Option>
										<Option>Saturday</Option>
									</Select>
								</li>
								/
								<li>
									<input
										value={
											activeReport.basicInfo
												.incidentReportedAt.time.hour
										}
										path="basicInfo incidentReportedAt time hour"
										onChange={handleChange}
										type="number"
										maxLength={2}
										placeholder="HH"
									/>
									:
									<input
										value={
											activeReport.basicInfo
												.incidentReportedAt.time.minute
										}
										path="basicInfo incidentReportedAt time minute"
										onChange={handleChange}
										type="number"
										maxLength={2}
										placeholder="MM"
									/>
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
							<label>Related Reports/Comments</label>

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
				<header>
					<h1>People Involved</h1>
					<Button
						type="button"
						hollow
						noborder
						icon
						emphasis="secondary"
						onClick={() => toggleDropdown("people")}
					>
						<FaChevronDown />
					</Button>
				</header>
				<div className={styles.sectionContent}>
					<span>
						{activeReport.peopleInfo.map((person) => {
							let key = activeReport.peopleInfo.indexOf(person);

							return (
								<div key={key}>
									PERSON
									<Button
										type="button"
										onClick={() => removePerson(person)}
										color="error"
										hollow
									>
										<FaUserTimes />
										Remove Person
									</Button>
								</div>
							);
						})}
					</span>

					<Button
						onClick={addPerson}
						type="button"
						hollow
						// emphasis="primary"
						color="success"
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
				<header>
					<h1>Hospital Information</h1>
					<Button
						type="button"
						hollow
						noborder
						icon
						emphasis="secondary"
						onClick={() => toggleDropdown("hosp")}
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
					</span>
				</div>
			</section>

			{`basicInformation: {
		

			incidentOccurredAt: {
				from: "",
				to: "",
			},

			relatedComments: "",
		},

		personalInformation: {
			// says weather the person is a victim, witness, suspect, or something else
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
			whoDiscribed: "",
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
		},

		hospitalInformation: {
			injured: false,
			treated: false,
			hospital: "",
			transportedBy: "",
			emsNo: 0,
			treatmentReasons: "",
			patientCondition: "",
			patientDispo: "",
			attendingPhysician: "",
		},

		synopsis: "",`}
		</form>
	);
};

export default EditReport;
