const UserModel = require('../models/UserModel'); // Just copyed and pasted from the social media project 
// const FollowerModel = require('../models/FollowerModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const isEmail = require('validator/lib/isEmail');
const getUserAuth = async (req, res) => {
  const { userId } = req;
  if (!userId) return res.status(500).send("A user couldn't be found.")

  try {
    const user = await UserModel.findById(userId);
    const followStats = await FollowerModel.findOne({ user: userId });
    return res.status(200).json({ user, followStats });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Uh oh! There was a server error in getUserAuth!")
  }
}

module.exports = { getUserAuth };