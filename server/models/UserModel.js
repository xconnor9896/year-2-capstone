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
      type: Number || [{ type: Number }],
      required: false,
			default: 0
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
    username: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
    profilePicURL: {
      type: String,
    },
    rank: {
      type: String,
      enum: ["officer", "captain", "teacher", "admin"],
      default: "officer",
    },
  }
  // {timestamps: true} |||| COMMENTING THIS OUT, NOT SURE IF WE INCLUDE OR NOT
);

module.exports = mongoose.models?.User ||  mongoose.model('User', UserSchema);
