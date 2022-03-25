const defaultProfilePic = require("../util/defaultPic");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

const createUser = async (req, res) => {
  const { name, email, badgeNumber, squadNumber, password } = req.body.user;

  if (!isEmail(email)) return res.status(401).send("Invalid");
  if (password.length < 8) {
    return res.status(401).send("Password must be at least 8 characters long");
  }
  if (password.length > 100) {
    return res
      .status(401)
      .send("Password must be less than 100 characters long");
  }

  try {
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) return res.status(401).send("Email already used");

    user = new UserModel({
      name,
      email: email.toLowerCase(),
      password: "",
      profilePic: rec.body.profilePic || defaultProfilePic,
      badgeNumber,
      squadNumber: squadNumber || 0,
    });

    user.password = bcrypt.hash(password, 10);
    user = await user.save;

    const payload = { userID: user._id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.log("error at createUser controller");
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body.user;

  if (!isEmail(email)) return res.status(401).send("Invalid Email");
  if (password.length < 8)
    return res.status(401).send("Password must be at least 8 characters long");

  try {
    const user = await UserModel.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) return res.status(401).send("Invalid Credentials");

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) return res.status(401).send("Invalid Credentials");

    const payload = { userId: user._id };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1w" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.log("error at loginUser controller");
    console.log(error);
  }
};

module.exports = { createUser, loginUser };
