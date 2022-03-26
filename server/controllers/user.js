const defaultProfilePic = require("../util/defaultPic");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE USER
.post('/signup') 
req.body {user} //? The new user in a user object
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const createUser = async (req, res) => {
  const { name, email, badgeNumber, squadNumber, password, rank, username } =
    req.body.user;

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
      rank,
      username,
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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
LOGIN USER
.post('/login') 
req.body { email, password } //? Your email and password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const loginUser = async (req, res) => {
  const { email, password } = req.body;

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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
DELETE USER
.delete('/:userId') 
req.params { userId } //? Your Id
req.body { _id } //? Targets Id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const deleteUser = async (req, res) => {
  const { _id } = req.body;
  const { userId } = req.params;

  try {
    const user = UserModel.findById(userId);

    if (user.rank !== "captain") {
      return res
        .status(401)
        .send("Please contact your captain about deleting your account");
    }

    const deleted = UserModel.deleteOne({ _id });

    if (deleted) {
      return res.status(200).send("User Deleted");
    } else {
      return res.status(404).send("User Not Found");
    }
  } catch (error) {
    console.log("error at deleteUser controller");
    console.log(error);
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CHANGE USERNAME
.delete('/:userId') 
req.params {userId} //? Targets Id
req.body {username} //? New Username
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const changeUsername = async (req, res) => {
  const { username } = req.body;
  const { userId } = req.params;

  try {
    let user = UserModel.findById(userId);
    user.username = username;
    user = await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log("error at changeUsername controller");
    console.log(error);
  }
};
module.exports = { createUser, loginUser, deleteUser, changeUsername };
