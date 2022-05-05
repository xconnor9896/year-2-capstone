// import the user schema
// const User = require('../models/UserModel');

// report model

const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
	// The case number will be the mongoose _id

	caseNumber: {
		type: Number,
		required: true,
	},

	basicInfo: {
		incidentType: {
			type: String,
			required: false,
			default: "",
		},

		code: {
			type: String,
			required: false,
			default: "",
		},

		reportType: {
			keyRpt: {
				type: Boolean,
				required: false,
				default: false,
			},

			fu: {
				type: Boolean,
				required: false,
				default: false,
			},
		},

		importance: {
			type: Number,
			enum: [1, 2, 3],
			required: true,
			default: 3,
		},

		verified: {
			type: Boolean,
			required: true,
			default: false,
		},

		disposition: {
			type: String,
			required: false,
			default: "",
		},

		arsSectionNumber: {
			type: String,
			required: false,
			default: "",
		},

		locationOfOffense: {
			type: String,
			required: false,
			default: "",
		},

		responsibleOfficer: {
			// name: {
			//   firstName: "",
			//   middleName: "",
			//   lastName: "",
			// },
			// rank: "",
			// badgeNumber: "",
			// division: "",

			// use the user model
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		beatOfOffense: {
			type: String,
			required: false,
			default: "",
		},

		domesticViolence: {
			type: Boolean,
			required: false,
			default: false,
		},

		incidentReportedAt: {
			date: {
				month: {
					type: String,
					required: false,
					default: "",
				},
				day: {
					type: String,
					required: false,
					default: "",
				},
				year: {
					type: String,
					required: false,
					default: "",
				},
			},
			day: {
				type: String,
				required: false,
				default: "",
			},
			time: {
				hour: {
					type: String,
					required: false,
					default: "",
				},
				minute: {
					type: String,
					required: false,
					default: "",
				},
			},
		},

		incidentOccurredAt: {
			from: {
				date: {
					month: {
						type: String,
						required: false,
						default: "",
					},
					day: {
						type: String,
						required: false,
						default: "",
					},
					year: {
						type: String,
						required: false,
						default: "",
					},
				},

				time: {
					hour: {
						type: String,
						required: false,
						default: "",
					},
					minute: {
						type: String,
						required: false,
						default: "",
					},
				},
			},
			to: {
				date: {
					month: {
						type: String,
						required: false,
						default: "",
					},
					day: {
						type: String,
						required: false,
						default: "",
					},
					year: {
						type: String,
						required: false,
						default: "",
					},
				},

				time: {
					hour: {
						type: String,
						required: false,
						default: "",
					},
					minute: {
						type: String,
						required: false,
						default: "",
					},
				},
			},
		},

		relatedComments: {
			type: String,
			required: false,
			default: "",
		},
		synopsis: {
			type: String,
			required: false,
			maxCount: 300,
			default: "",
		},

		reportNarrative: {
			type: String,
			required: false,
			maxCount: 500,
			default: "",
		},
	},

	peopleInfo: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Person",
			// makes there be at least one person
			required: false,
		},
	],

	hospitalInfo: {
		injuryOccurred: {
			type: Boolean,
			required: false,
			default: false,
		},
		injuryTreated: {
			type: Boolean,
			required: false,
			default: false,
		},
		hospital: {
			type: String,
			required: false,
			default: "",
		},
		transportedBy: {
			type: String,
			required: false,
			default: "",
		},
		emsNumber: {
			type: Number,
			required: false,
			default: 0,
		},
		treatmentReasons: {
			mental: {
				type: Boolean,
				required: false,
				default: false,
			},
			suicide: {
				type: Boolean,
				required: false,
				default: false,
			},
			icf: {
				type: Boolean,
				required: false,
				default: false,
			},
			scf: {
				type: Boolean,
				required: false,
				default: false,
			},
			intox: {
				type: Boolean,
				required: false,
				default: false,
			},
			drugs: {
				type: Boolean,
				required: false,
				default: false,
			},
			indust: {
				type: Boolean,
				required: false,
				default: false,
			},
			uncon: {
				type: Boolean,
				required: false,
				default: false,
			},
			resisted: {
				type: Boolean,
				required: false,
				default: false,
			},
			other: {
				type: Boolean,
				required: false,
				default: false,
			},
		},
		patientCondition: {
			type: String,
			required: false,
		},
		patientDispo: {
			type: String,
			required: false,
		},
		attendingPhysician: {
			type: String,
			required: false,
		},
	},

	submittedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: false,
	},

	submittedAt: {
		type: Date,
		required: false,
		default: Date.now,
	},

	ApprovedBy: {
		type: String,
		required: false,

		// make it so that only captains can approve
	},

	ApprovedAt: {
		date: {
			month: {
				default: "",
				type: String,
				required: false,
			},
			day: {
				default: "",
				type: String,
				required: false,
			},
			year: {
				default: "",
				type: String,
				required: false,
			},
		},
		time: {
			hour: {
				default: "",
				type: String,
				required: false,
			},
			minute: {
				default: "",
				type: String,
				required: false,
			},
		},
	},
});
module.exports = mongoose.model("Report", ReportSchema);

module.exports = mongoose.model("Report", ReportSchema);
