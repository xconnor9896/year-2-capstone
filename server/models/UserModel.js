const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: {
			firstName: {
				type: String,
				required: true,
			},
			middleName: {
				type: String,
				required: false,
			},
			lastName: {
				type: String,
				required: true,
			},
		},
		badgeNumber: {
			type: Number,
			required: true,
		},
		squadNumber: {
			type: [Number],
			default: [],
		},
		email: {
			type: String,
			required: true,
			unique: true,
			// verification from either west-mec.org or west-mec.edu goes here
		},
		password: {
			type: String,
			required: true,
			select: false,
		},

		profilePicURL: {
			type: String,
			required: true,
			default:
				"https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
		},
		rank: {
			type: String,
			enum: [
				"officer",
				"captain",
				//  "teacher",
				//  "admin"
			],
			default: "officer",
		},
	}
	// {timestamps: true} |||| COMMENTING THIS OUT, NOT SURE IF WE INCLUDE OR NOT
);

module.exports = mongoose.models?.User ||  mongoose.model('User', UserSchema);
