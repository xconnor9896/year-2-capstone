import { useState } from "react";
import styles from "../styles/Components/EditReport.module.scss";
import { Button, Card } from "../proton";
import { FaPencilAlt } from "react-icons/fa";

const Input = ({ children }) => {
	return <div className={styles.input}>{children}</div>;
};

const EditReport = ({ report, setLoading, loading }) => {
	const [activeReport, setActiveReport] = useState({
		caseNumber: "oi214joai3h523897",

		basicInfo: {
			incidentType: "",

			code: "",

			reportType: {
				reclass: true,
				keyRpt: false,
				fu: false,
			},

			status: "",

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

			incidentReportedAt: "",

			incidentOccurredAt: {
				from: "",
				to: "",
			},

			relatedComments: "",
		},

		personalInfo: {
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

	// TOTALLY STATIC
	const handleChange = (e) => {
		let newReport = { ...activeReport };

		let path = e.target.getAttribute("path").split(" ");

		let curRef = newReport;

		for (let i = 0; i < path.length; i++) {
			if (i === path.length - 1) {
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

	return (
		<form className={styles.reportForm} onSubmit={submitForm}>
			<section className={styles.basicInfo}>
				<header>
					<h1>Basic Information</h1>
				</header>
				<span className={styles.inputSpan}>
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
									name="reclass"
									id="reclass"
									checked={
										activeReport.basicInfo.reportType
											.reclass
									}
									path="basicInfo reportType reclass"
									onChange={handleChange}
								/>
								<label htmlFor="reclass">Reclass</label>
							</li>

							<li>
								<input
									type="checkbox"
									name="keyRpt"
									id="keyRpt"
									checked={
										activeReport.basicInfo.reportType.keyRpt
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
				</span>
			</section>

			{`basicInformation: {
		



			reportType: "",

			status: "",

			arsSectionNumber: "",

			location: "",

			responsibleOfficer: {
				name: {
					firstName: "",
					middleName: "",
					lastName: "",
				},
				rank: "",
				badgeNumber: 0,
				division: "",
			},

			beatOfOffense: "",

			domesticViolence: false,

			incidentReportedAt: "",

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
