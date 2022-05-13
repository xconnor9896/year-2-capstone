const mongoose = require("mongoose");

const SquadSchema = new mongoose.Schema(
	{
		captain: {
			type: String,
			required: true,
		},
		officers: [
			{
				type: String,
				required: false,
			},
		],
		squadName: {
			type: String,
			required: true,
		},
		squadNumber: {
			type: Number,
			required: true,
			unique: true,
		},
	}
	// {timestamps: true} |||| COMMENTING THIS OUT, NOT SURE IF WE INCLUDE OR NOT
);
module.exports = mongoose.models?.Squad || mongoose.model("Squad", SquadSchema);
