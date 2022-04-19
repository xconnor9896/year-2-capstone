import { useState } from "react";
import styles from "../styles/Components/ViewReport.module.scss";
import { FaCheckSquare, FaSquare } from "react-icons/fa";

const uuid = require("uuid").v4;

const ViewReport = () => {
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

		basicInfo: {
			incidentType: "Vehicle Collision",

			code: "382",

			reportType: {
				keyRpt: true,
				fu: true,
			},

			status: "verified",

			disposition: "1",

			arsSectionNumber: "84-447",

			location: "Peoria, Arizona, United States of America",

			synopsis:
				"Things happened stuff and things it really do be happenin",
			reportNarration:
				"Things happened stuff and things it really do be happenin",

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
				ressistedArrest: true,
				other: true,
			},
			patientCondition: "Running Frantically Inplace",
			patientDispo: "Angy",
			attendingPhysician: "Dr. Phil",
		},
	});

	const { basicInfo, peopleInfo, hospitalInfo } = activeReport;

	return (
		<div className={styles.viewReport}>
			<header>
				<h1>West-MEC Police Department</h1>
				<h2>
					Incident Report - <em>#{activeReport.caseNumber}</em>
				</h2>
			</header>

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
								{basicInfo.responsibleOfficer.name.lastName},{" "}
								{basicInfo.responsibleOfficer.name.firstName}{" "}
								{basicInfo.responsibleOfficer.name.middleName}
							</p>
						</span>
						<span>
							<label>ID Number</label>
							<p>{basicInfo.responsibleOfficer.badgeNumber}</p>
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
							<p>{basicInfo.domesticViolence ? "Yes" : "No"}</p>
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
								{basicInfo.incidentOccurredAt.from.date.month}/
								{basicInfo.incidentOccurredAt.from.date.day}/
								{basicInfo.incidentOccurredAt.from.date.year} /{" "}
								{basicInfo.incidentOccurredAt.from.time.hour}:
								{basicInfo.incidentOccurredAt.from.time.minute}
							</p>
						</span>
						<span>
							<label>Date / Time / Occurred To</label>
							<p>
								{basicInfo.incidentOccurredAt.to.date.month}/
								{basicInfo.incidentOccurredAt.to.date.day}/
								{basicInfo.incidentOccurredAt.to.date.year} /{" "}
								{basicInfo.incidentOccurredAt.to.time.hour}:
								{basicInfo.incidentOccurredAt.to.time.minute}
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
					<article key={_id}>
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
									<label>Name (Last, First Middle)</label>
									<p>
										{name.lastName}, {name.firstName}{" "}
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
										Occupation/For Juvenile-School Attending
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
									<label>Employer / Business Address</label>
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
									<p>{willProsecute ? "Yes" : "No"}</p>
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
					</div>
				</section>
			</article>

			<article>
				<section>
					<header>Cont</header>
				</section>
				<section></section>
			</article>
		</div>
	);
};

export default ViewReport;
