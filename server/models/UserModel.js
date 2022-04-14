const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  badgeNumber: {
    type: Number,
    required: true,
    unique: true
  },
  squadNumber: {
    type: Number,
    required: true,
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
    required: true,
    unique: true,
    trim: true
  },
  profilePicURL: {
    type: String,
  },
  rank: {
    type: String,
    enum: ["officer", "captain", "teacher", "admin"],
    default: 'officer'
  }
},
  // {timestamps: true} |||| COMMENTING THIS OUT, NOT SURE IF WE INCLUDE OR NOT
);

export default mongoose.model('User', UserSchema);