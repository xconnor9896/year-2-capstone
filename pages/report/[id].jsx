import styles from "../../styles/Pages/SingleReport.module.scss";
import Input from "../../components/Input";
import { Button, Card } from "../../proton";
import { useState } from "react";
import EditReport from "../../components/EditReport";
import ViewReport from "../../components/ViewReport";
import { FaPencilAlt, FaSave } from "react-icons/fa";

const randString = () => {
	let l = "qwertyuiopasdfghjklzxcvbnm1234567890";

	let e = "";
	for (let i = 0; i < 10; i++) {
		e += l.split("")[Math.floor(Math.random() * l.length)];
	}

	return e;
};

const tempReport = {
	caseNumber: randString(),

	basicInformation: {
		incidentType: "",

		code: 0,

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

	synopsis: "",
};

export default function Report() {
	// const [view, setView] = useState(true);
	const [view, setView] = useState(false);
	const [loading, setLoading] = useState(false);

	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<Card noborder loading={loading}>
					<Card.Header>
						<h1>Case #{tempReport.caseNumber}</h1>

						<div className={styles.inputs}>
							{view && (
								<Button
									onClick={() => {
										if (view) {
											setView(false);
										}
									}}
									emphasis="secondary"
								>
									<FaPencilAlt />
									Edit
								</Button>
							)}
						</div>
					</Card.Header>

					{!loading && view ? (
						<ViewReport
							{...{ report: tempReport, loading, setLoading }}
						/>
					) : (
						<EditReport
							{...{ report: tempReport, loading, setLoading }}
						/>
					)}
				</Card>
			</article>
		</main>
	);
}
