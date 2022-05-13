const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
	// The case number will be the mongoose _id

	// caseNumber: {
	// 	type: Number,
	// 	required: true
	// },

	personType: {
		type: String,
		required: true,
	},

	race: {
		type: String,
		required: true,
	},

	name: {
		firstName: {
			type: String,
			required: true,
			minLength: 1,
		},
		middleName: {
			type: String,
			required: false,
			minLength: 1,
		},
		lastName: {
			type: String,
			required: true,
			minLength: 1,
		},
		aka: {
			type: String,
			required: false,
		},
	},

	// DOB: {
	// 	type: Date,
	// 	required: true,
	// },

	age: {
		type: Number,
		required: true,
		min: 1,

		// let age equal the difference between the current date and the date of birth
		// get: function () {
		// 	return new Date().getFullYear() - this.DOB.getFullYear();
		// },
	},

	isJuvenile: {
		type: Boolean,
		required: true,
	},

	sex: {
		type: String,
		required: true,
	},

	occupation: {
		type: String,
		required: false,

		// if juvenile is true, then default to 'school attending'
	},

	homeAddress: {
		type: String,
		required: false,
	},

	employerAddress: {
		type: String,
		required: false,
	},

	phoneNumbers: {
		main: {
			type: String,
			required: true,
			min: 1,
		},
		secondary: {
			type: String,
			required: false,
		},
		business: {
			type: String,
			required: false,
		},
	},

	email: {
		type: String,
		required: false,
	},

	studentID: {
		type: String,
		required: false,
	},

	// victim relationships to suspect
	victimRelationshipToSuspect: {
		type: String,
		required: true,
		minLength: 1,
	},

	// who described the person
	whoDescribed: {
		type: String,
		required: true,
		minLength: 1,
	},

	// will prosecute the person
	willProsecute: {
		type: Boolean,
		required: true,
	},

	// blood achool content
	BAC: {
		type: Boolean,
		required: true,
	},
	BACResults: {
		type: Number,
		required: false,
	},

	personalDetails: {
		height: {
			type: String,
			required: true,
			minLength: 1,
		},
		weight: {
			type: String,
			required: true,
			minLength: 1,
		},
		build: {
			type: String,
			required: false,
		},
		hairColor: {
			type: String,
			required: true,
			minLength: 1,
		},
		hairCharacter: {
			type: String,
			required: false,
		},
		complexion: {
			type: String,
			required: false,
		},
		voice: {
			type: String,
			required: false,
		},
		eyeColor: {
			type: String,
			required: true,
			minLength: 1,
		},
		facialHairColor: {
			type: String,
			required: false,
		},
		facialHairChar: {
			type: String,
			required: false,
		},
		clothing: {
			type: String,
			required: true,
			minLength: 1,
		},
	},
});

module.exports = mongoose.models?.User || mongoose.model('Person', PersonSchema);
