const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    unique: true
  },
  squadNumber: {
    type: Number || Array,
    required: false,
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
    select: false
  }, 
  username: {
    type: String,
    required: false,
    unique: true,
    trim: true
  },
  profilePicURL: {
    type: String,
    required: false,
  },
  rank: {
    type: String,
    enum: ["officer", "captain", "teacher", "admin"],
    default: 'officer',
    required: true,
  },
},
  // {timestamps: true} |||| COMMENTING THIS OUT, NOT SURE IF WE INCLUDE OR NOT
);

module.exports = mongoose.model('User', UserSchema);
