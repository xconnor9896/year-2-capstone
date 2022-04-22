import { useState, useRef, useEffect } from "react";
import styles from "../styles/Components/ReportPrintout.module.scss";
import { FaCheckSquare, FaSquare } from "react-icons/fa";

const uuid = require("uuid").v4;

const ReportPrintout = ({ id }) => {
	const person = {
		// says weather the person is a victim, witness, suspect, or something else
		_id: uuid(),
		personType: "Complainant",
		race: "Native Hawaiian / Other Pacific Islander",
		name: {
			firstName: "Bjørn",
			middleName: "Frode",
			lastName: "Gorm",
			aka: "The BFG",
		},
		age: 102,
		isJuvenile: true,
		sex: "Female",
		occupation: "Front-End Designer",
		homeAddress: "79428 East Drivers Parkway, Phoenix, AZ, 85384, USA",
		employerAddress: "79428 East Drivers Parkway, Phoenix, AZ, 85384, USA",
		phoneNumbers: {
			main: "+1 (789) 789-789-7897",
			secondary: "+1 (789) 789-789-7897",
			business: "+1 (789) 789-789-7897",
		},
		email: "jwefjaowiej237598237@joijwe.caw",
		studentID: 98778,
		victimRelationshipToSuspect: "Brother",
		whoDescribed: "Joe Mama",
		willProsecute: true,
		BAC: true,
		BACResults: "Known Criminal",
		personalDetails: {
			height: `5'11"`,
			weight: "300",
			build: "Burly",
			hairColor: "Brown",
			hairCharacter: "Frosted Tips",
			complexion: "White",
			voice: "Tenor",
			eyeColor: "Brown",
			facialHairColor: "Brown",
			facialHairChar: "Spikey",
			clothing: "None 😳",
		},
	};

	const checkbox = (val) => {
		if (val && val === true) {
			return <FaCheckSquare />;
		} else {
			return <FaSquare />;
		}
	};

	const [activeReport, setActiveReport] = useState({
		caseNumber: "oi214joai3h523897",

		approvedBy: {
			badgeNumber: 123,
			rank: "captain",
		},

		approvedAt: {
			date: {
				month: "01",
				day: "06",
				year: "2021",
			},

			time: {
				hour: "12",
				minute: "49",
			},
		},

		basicInfo: {
			incidentType: "Vehicle Collision",

			code: "382",

			reportType: {
				keyRpt: true,
				fu: true,
			},

			disposition: "1",

			arsSectionNumber: "84-447",

			location: "Peoria, Arizona, United States of America",

			synopsis:
				"Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
			reportNarration:
				"Things happened stuff and things it really do be happenin judshdhuygyuydyuwqgydyuqgyudyguwqygudwqgudgyuwqgyudgyuqwgyudgquydgwqyudq d hhdqgdg what is the day. somepeople be under the ground. Wait did you hear that, i didn't. Wait maybe i was just thinking",

			responsibleOfficer: {
				name: {
					firstName: "Joe",
					middleName: "B.",
					lastName: "Mama",
				},
				rank: "Officer",
				badgeNumber: "123",
				division: "Surprise",
			},

			beatOfOffense: "983",

			domesticViolence: true,

			incidentReportedAt: {
				date: {
					month: "01",
					day: "06",
					year: "2021",
				},
				day: "Wednesday",
				time: {
					hour: "16",
					minute: "49",
				},
			},

			incidentOccurredAt: {
				from: {
					date: {
						month: "01",
						day: "06",
						year: "2021",
					},

					time: {
						hour: "12",
						minute: "49",
					},
				},
				to: {
					date: {
						month: "01",
						day: "06",
						year: "2021",
					},

					time: {
						hour: "16",
						minute: "40",
					},
				},
			},

			relatedComments:
				"Things happened stuff and things it really do be happenin",
		},

		peopleInfo: [
			{ ...person, e: uuid(), age: Math.ceil(Math.random() * 56) + 5 },
			{ ...person, e: uuid(), age: Math.ceil(Math.random() * 56) + 5 },
			{ ...person, e: uuid(), age: Math.ceil(Math.random() * 56) + 5 },
			// { ...person, e: uuid(), age: Math.ceil(Math.random() * 56) + 5 },
			// { ...person, e: uuid(), age: Math.ceil(Math.random() * 56) + 5 },
			// { ...person, e: uuid(), age: Math.ceil(Math.random() * 56) + 5 },
			// { ...person, e: uuid(), age: Math.ceil(Math.random() * 56) + 5 },
			// { ...person, e: uuid(), age: Math.ceil(Math.random() * 56) + 5 },
			// { ...person, e: uuid(), age: Math.ceil(Math.random() * 56) + 5 },
		],

		hospitalInfo: {
			injured: true,
			treated: false,
			hospital: "St. Bill's Hospital",
			transportedBy:
				"Joe's Party Bus, Food Truck, and Emergency Services",
			emsNo: 3,
			treatmentReasons: {
				mental: true,
				suicide: true,
				icf: true,
				scf: true,
				intox: false,
				drugs: true,
				indust: true,
				uncon: true,
				resisted: true,
				other: true,
			},
			patientCondition: "Running Frantically Inplace",
			patientDispo: "Angy",
			attendingPhysician: "Dr. Phil",
		},
	});

	const reportPrintout = useRef(null);
	useEffect(() => {
		window.onkeydown = (e) => {
			if (e.ctrlKey && e.key === "p") {
				e.preventDefault();
				handlePrint();
			}
		};
	}, []);
	const handlePrint = () => {
		const rep = reportPrintout.current;

		if (!rep) return router.push("/500");

		console.log(rep);

		window.print();
	};

	const { basicInfo, peopleInfo, hospitalInfo } = activeReport;

	return (
		<div className={styles.reportPrintout} ref={reportPrintout}>
			<header>
				<h1>
					West-MEC Police Department
					<h2>
						Incident Report - <em>#{id}</em>
					</h2>
				</h1>
			</header>

			<div className={styles.page}>
				<article>
					<section>
						<header>Basic</header>
					</section>
					<section>
						<div>
							<span>
								<label>Incident Type</label>
								<p>{basicInfo.incidentType}</p>
							</span>
							<span>
								<label>Code</label>
								<p>{basicInfo.code}</p>
							</span>
							<span>
								<ul>
									<li>
										{checkbox(basicInfo.reportType.keyRpt)}
										Key Rpt
									</li>
									<li>
										{checkbox(basicInfo.reportType.fu)}
										F/U
									</li>
								</ul>
							</span>
							<span>
								<label>Status</label>
								<p>{basicInfo.status}</p>
							</span>
							<span>
								<label>Dispo.</label>
								<p>{basicInfo.disposition}</p>
							</span>
							<span>
								<label>A.R.S Section No.</label>
								<p>{basicInfo.arsSectionNumber}</p>
							</span>
						</div>
						<div>
							<span>
								<label>Location of Offense</label>
								<p>{basicInfo.location}</p>
							</span>
						</div>
						<div>
							<span>
								<label>
									Responsible Officer (Rank Last, First Middle
									Name)
								</label>
								<p>
									{basicInfo.responsibleOfficer.rank}{" "}
									{basicInfo.responsibleOfficer.name.lastName}
									,{" "}
									{
										basicInfo.responsibleOfficer.name
											.firstName
									}{" "}
									{
										basicInfo.responsibleOfficer.name
											.middleName
									}
								</p>
							</span>
							<span>
								<label>ID Number</label>
								<p>
									{basicInfo.responsibleOfficer.badgeNumber}
								</p>
							</span>
							<span>
								<label>Division</label>
								<p>{basicInfo.responsibleOfficer.division}</p>
							</span>
						</div>
						<div>
							<span>
								<label>Beat of Offense</label>
								<p>{basicInfo.beatOfOffense}</p>
							</span>
							<span>
								<label>Domestic Violence</label>
								<p>
									{basicInfo.domesticViolence ? "Yes" : "No"}
								</p>
							</span>
							<span>
								<label>Date / Day / Time Reported</label>
								<p>
									{basicInfo.incidentReportedAt.date.month}/
									{basicInfo.incidentReportedAt.date.day}/
									{basicInfo.incidentReportedAt.date.year} /{" "}
									{basicInfo.incidentReportedAt.day} /{" "}
									{basicInfo.incidentReportedAt.time.hour}:
									{basicInfo.incidentReportedAt.time.minute}
								</p>
							</span>
							<span>
								<label>Date / Time / Occurred From</label>
								<p>
									{
										basicInfo.incidentOccurredAt.from.date
											.month
									}
									/
									{basicInfo.incidentOccurredAt.from.date.day}
									/
									{
										basicInfo.incidentOccurredAt.from.date
											.year
									}{" "}
									/{" "}
									{
										basicInfo.incidentOccurredAt.from.time
											.hour
									}
									:
									{
										basicInfo.incidentOccurredAt.from.time
											.minute
									}
								</p>
							</span>
							<span>
								<label>Date / Time / Occurred To</label>
								<p>
									{basicInfo.incidentOccurredAt.to.date.month}
									/{basicInfo.incidentOccurredAt.to.date.day}/
									{basicInfo.incidentOccurredAt.to.date.year}{" "}
									/{" "}
									{basicInfo.incidentOccurredAt.to.time.hour}:
									{
										basicInfo.incidentOccurredAt.to.time
											.minute
									}
								</p>
							</span>
						</div>
						<div>
							<span>
								<label>Related Reports/Comments</label>
								<p>{basicInfo.relatedComments}</p>
							</span>
						</div>
					</section>
				</article>

				{peopleInfo.map((person) => {
					const key = peopleInfo.indexOf(person);

					const onlyPerson = peopleInfo.length === 1;

					const {
						_id,
						personType,
						race,
						name,
						age,
						sex,
						occupation,
						homeAddress,
						employerAddress,
						phoneNumbers,
						email,
						studentID,
						victimRelationshipToSuspect,
						whoDescribed,
						willProsecute,
						BAC,
						BACResults,
						personalDetails,
					} = person;

					const {
						height,
						weight,
						build,
						hairColor,
						hairCharacter,
						complexion,
						voice,
						eyeColor,
						facialHairColor,
						facialHairChar,
						clothing,
					} = personalDetails;

					return (
						<div className={styles.personWrapper}>
							<article key={_id} className={styles.personStyles}>
								<section>
									<header>
										Person {!onlyPerson && <>#{key + 1}</>}
									</header>
								</section>
								<section>
									<div>
										<span>
											<label>Person Type</label>
											<p>{personType}</p>
										</span>
										<span>
											<label>Race</label>
											<p>{race}</p>
										</span>
									</div>
									<div>
										<span>
											<label>
												Name (Last, First Middle)
											</label>
											<p>
												{name.lastName},{" "}
												{name.firstName}{" "}
												{name.middleName}
											</p>
										</span>
										<span>
											<label>Age</label>
											<p>{age}</p>
										</span>
										<span>
											<label>Juv.</label>
											<p>{age < 18 ? "Yes" : "No"}</p>
										</span>
										<span>
											<label>Sex</label>
											<p>{sex}</p>
										</span>
									</div>
									<div>
										<span>
											<label>AKA</label>
											<p>{name.aka}</p>
										</span>
										<span>
											<label>
												Occupation/For Juvenile-School
												Attending
											</label>
											<p>{occupation}</p>
										</span>
									</div>
									<div>
										<span>
											<label>Home Address</label>
											<p>{homeAddress}</p>
										</span>
									</div>
									<div>
										<span>
											<label>
												Employer / Business Address
											</label>
											<p>{employerAddress}</p>
										</span>
									</div>
									<div>
										<span>
											<label>Main Phone</label>
											<p>{phoneNumbers.main}</p>
										</span>
										<span>
											<label>Secondary Phone</label>
											<p>{phoneNumbers.secondary}</p>
										</span>
										<span>
											<label>Business Phone</label>
											<p>{phoneNumbers.business}</p>
										</span>
										<span>
											<label>Email</label>
											<p>{email}</p>
										</span>
									</div>
									<div>
										<span>
											<label>SID</label>
											<p>{studentID}</p>
										</span>
										<span>
											<label>Victim Rel To Suspect</label>
											<p>{victimRelationshipToSuspect}</p>
										</span>
										<span>
											<label>Who Described</label>
											<p>{whoDescribed}</p>
										</span>
										<span>
											<label>Will Prosecute</label>
											<p>
												{willProsecute ? "Yes" : "No"}
											</p>
										</span>
										<span>
											<label>BAC</label>
											<p>{BAC ? "Yes" : "No"}</p>
										</span>
										<span>
											<label>BAC Results</label>
											<p>{BACResults}</p>
										</span>
									</div>
									<div>
										<span>
											<label>Height</label>
											<p>{height}</p>
										</span>
										<span>
											<label>Weight</label>
											<p>{weight}lbs</p>
										</span>
										<span>
											<label>Build</label>
											<p>{build}</p>
										</span>
										<span>
											<label>Hair Color</label>
											<p>{hairColor}</p>
										</span>
										<span>
											<label>Hair Char</label>
											<p>{hairCharacter}</p>
										</span>
										<span>
											<label>Compl</label>
											<p>{complexion}</p>
										</span>
										<span>
											<label>Voice</label>
											<p>{voice}</p>
										</span>
										<span>
											<label>Eyes</label>
											<p>{eyeColor}</p>
										</span>
										<span>
											<label>Fac Hair Color</label>
											<p>{facialHairColor}</p>
										</span>
										<span>
											<label>Facial Hair Char</label>
											<p>{facialHairChar}</p>
										</span>
										<span>
											<label>Clothing</label>
											<p>{clothing}</p>
										</span>
									</div>
								</section>
							</article>
							{/* <div className={styles.pageBreak}></div> */}
						</div>
					);
				})}

				<article>
					<section>
						<header>Hosp</header>
					</section>
					<section>
						<div>
							<span>
								<label>Injured</label>
								<p>{hospitalInfo.injured ? "Yes" : "No"}</p>
							</span>
							<span>
								<label>Treated</label>
								<p>{hospitalInfo.treated ? "Yes" : "No"}</p>
							</span>
							<span>
								<label>Hospital</label>
								<p>{hospitalInfo.hospital}</p>
							</span>
							<span>
								<label>Transported By</label>
								<p>{hospitalInfo.transportedBy}</p>
							</span>
							<span>
								<label>EMS #</label>
								<p>{hospitalInfo.emsNo}</p>
							</span>
						</div>
						<div>
							<span>
								<label>Treatment Reason</label>
								<ul>
									{Object.entries(
										hospitalInfo.treatmentReasons
									).map((reason, index) => {
										const reasonTitles = [
											"Mental",
											"Suicide",
											"I.C.F",
											"S.C.F",
											"Intox",
											"Drugs",
											"Indust",
											"Uncon",
											"Resisted Arrest",
											"Other",
										];

										const isSelected = reason[1];
										const title = reasonTitles[index];

										return (
											<li>
												{checkbox(isSelected)}
												{title}
											</li>
										);
									})}
								</ul>
							</span>
							<span>
								<label>Patient Condition</label>
								<p>{hospitalInfo.patientCondition}</p>
							</span>
							<span>
								<label>Patient Dispo</label>
								<p>{hospitalInfo.patientDispo}</p>
							</span>
							<span>
								<label>Attending Physician</label>
								<p>{hospitalInfo.attendingPhysician}</p>
							</span>
						</div>
					</section>
				</article>
				{/* <div className={styles.pageBreak}></div> */}
			</div>

			{/* <div className={styles.pageBreak}></div> */}

			<div className={styles.page}>
				<article>
					<section>
						<header>Synopsis</header>
					</section>
					<section>
						<div>
							<span>
								<p>{basicInfo.synopsis}</p>
							</span>
						</div>
					</section>
				</article>
			</div>

			<div className={styles.pageBreak}></div>

			<div className={`${styles.page} ${styles.continuationPage}`}>
				<h4>Continuation Page</h4>

				<article>
					<section style={{ display: "none" }}></section>
					<section>
						<div>
							<span>
								<label>Incident Type</label>
								<p>{basicInfo.incidentType}</p>
							</span>
							<span>
								<label>Code</label>
								<p>{basicInfo.code}</p>
							</span>
							<span>
								<ul>
									<li>
										{checkbox(basicInfo.reportType.keyRpt)}
										Key Rpt
									</li>
									<li>
										{checkbox(basicInfo.reportType.fu)}
										F/U
									</li>
								</ul>
							</span>
							<span>
								<label>Status</label>
								<p>{basicInfo.status}</p>
							</span>
							<span>
								<label>Dispo.</label>
								<p>{basicInfo.disposition}</p>
							</span>
							<span>
								<label>A.R.S Section No.</label>
								<p>{basicInfo.arsSectionNumber}</p>
							</span>
						</div>
						<div>
							<span>
								<label>
									Complainant (Last, First Middle Name)
								</label>
								<p>
									{basicInfo.responsibleOfficer.name.lastName}
									,{" "}
									{
										basicInfo.responsibleOfficer.name
											.firstName
									}{" "}
									{
										basicInfo.responsibleOfficer.name
											.middleName
									}
								</p>
							</span>
							<span>
								<label>Date of Occurence</label>
								<p>
									{
										basicInfo.incidentOccurredAt.from.date
											.month
									}
									/
									{basicInfo.incidentOccurredAt.from.date.day}
									/
									{
										basicInfo.incidentOccurredAt.from.date
											.year
									}
								</p>
							</span>
						</div>
						<div>
							<span>
								<label>Location of Offense</label>
								<p>{basicInfo.location}</p>
							</span>
						</div>
					</section>
				</article>
				<article className={styles.narrative}>
					<header>Narrative</header>
					<section>{basicInfo.reportNarration}</section>
				</article>


				

			</div>

			<footer className={styles.footer}>
				<section>
					<div>
						Submitted By:
						<span>
							<b>
								<span>ID NUMBER:</span>{" "}
								{basicInfo.responsibleOfficer.badgeNumber}
							</b>
							<b>
								<span>RANK:</span>{" "}
								{basicInfo.responsibleOfficer.rank}
							</b>
							<b>
								<span>Date/Time:</span>{" "}
								{basicInfo.incidentReportedAt.date.month}/
								{basicInfo.incidentReportedAt.date.day}/
								{basicInfo.incidentReportedAt.date.year} /{" "}
								{basicInfo.incidentReportedAt.time.hour}:
								{basicInfo.incidentReportedAt.time.minute}
							</b>
						</span>
					</div>
					<div>
						Approved By:
						<span>
							{activeReport.approvedBy ? (
								<>
									<b>
										<span>ID NUMBER:</span>{" "}
										{activeReport.approvedBy.badgeNumber}
									</b>
									<b>
										<span>RANK:</span>{" "}
										{activeReport.approvedBy.rank[0].toUpperCase() +
											activeReport.approvedBy.rank.slice(
												1,
												activeReport.approvedBy.rank
													.length
											)}
									</b>
									<b>
										<span>Date/Time:</span>{" "}
										{activeReport.approvedAt.date.month}/
										{activeReport.approvedAt.date.day}/
										{activeReport.approvedAt.date.year} /{" "}
										{activeReport.approvedAt.time.hour}:
										{activeReport.approvedAt.time.minute}
									</b>
								</>
							) : (
								<b>Unapproved</b>
							)}
						</span>
					</div>
				</section>
				<section>
					<p>MDC-WMPD-192 Rev. Dec. 2022</p>
					<p>
						This report was prepared, signed, reviewed, submitted,
						and filed electronically via secure portal developed by
						West-MEC Central Campus Coding Department
					</p>
					<p></p>
				</section>
			</footer>

			
		</div>
	);
};

export default ReportPrintout;
