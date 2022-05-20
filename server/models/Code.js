const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema(
	{
		code: {
			type: String,
			required: true,
			default: "abc",
		},
	}
	// {timestamps: true} |||| COMMENTING THIS OUT, NOT SURE IF WE INCLUDE OR NOT
);
module.exports =
	mongoose.models.Number || mongoose.model("Code", CodeSchema);
