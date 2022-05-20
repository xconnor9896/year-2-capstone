const mongoose = require("mongoose");

const NumberSchema = new mongoose.Schema(
	{
		number: {
			type: Number,
			required: true,
			default: 1,
		},
	}
	// {timestamps: true} |||| COMMENTING THIS OUT, NOT SURE IF WE INCLUDE OR NOT
);
module.exports =
	mongoose.models?.Number || mongoose.model("Number", NumberSchema);
