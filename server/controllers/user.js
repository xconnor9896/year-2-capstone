const defaultProfilePic = require("../util/defaultPic");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

const UserModel = require("../models/UserModel");

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE USER
.post('/signup') 
req.body {user} //? The new user in a user object
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const createUser = async (req, res) => {
  const {
    user,
    user: { email, password },
  } = req.body;

  let {profilePicUrl} = user 

  try {
    if (!isEmail(email)) return res.status(401).send("Invalid Email");
    if (password.length < 8) {
      return res
        .status(401)
        .send("Password must be at least 8 characters long");
    }
    if (password.length > 100) {
      return res
        .status(401)
        .send("Password must be less than 100 characters long");
    }

    let checkUser;
    checkUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (checkUser) return res.status(401).send("Email already used");

    if (!profilePicUrl) {
      profilePicUrl = defaultProfilePic;
    }

    let newUser = new UserModel({
      ...user,
      profilePicUrl,
    });

    newUser.password = await bcrypt.hash(password, 10);
    newUser = await newUser.save();

		const payload = { userID: user._id };
		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: "1w" },
			(err, token) => {
				if (err) throw err;
				res.status(201).json(token);
			}
		);
	} catch (error) {
		console.log(error);
		return res.status(400).send("error at createUser controller");
	}
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
LOGIN USER
.post('/login') 
req.body { email, password } //? Your email and password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!isEmail(email)) return res.status(401).send("Invalid Email");
		if (password.length < 8)
			return res
				.status(401)
				.send("Password must be at least 8 characters long");

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
		console.log(error);
		return res.status(400).send("error at loginUser controller");
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
		const user = await UserModel.findById(userId);

		if (user.rank !== "captain") {
			return res
				.status(403)
				.send(
					"Please contact your captain about deleting your account"
				);
		}

		const deleted = await UserModel.deleteOne({ _id });

		if (deleted) {
			return res.status(200).send("User Deleted");
		} else {
			return res.status(404).send("User Not Found");
		}
	} catch (error) {
		console.log(error);
		return res.status(400).send("error at deleteUser controller");
	}
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
UPDATE USER
.post('/:userId') 
req.params {userId} //? Targets Id
req.body {key, input} //? updates user based off the key and input
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const updateUser = async (req, res) => {
	const { key, input } = req.body;
	const { userId } = req.params;

	try {
		if (key !== "password" && key !== "email") {
			let user = await UserModel.findById(userId);
			if (!user) {
				return res.status(404).send("user not found");
			}
			user[key] = input;
			user = await user.save();

			return res.status(200).json(user);
		} else {
			res.status(400).send(
				"You can not update the email or the password"
			);
		}
	} catch (error) {
		console.log(error);
		return res.status(400).send("error at updateUser controller");
	}
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CHANGE PASSWORD
.post('/') 
req.body {email, password} //? email, and new password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const changePassword = async (req, res) => {
	const { email, password } = req.body;

	try {
		let user = await UserModel.findOne({ email: email.toLowerCase() });
		user.password = bcrypt.hash(password, 10);
		user = await user.save();

		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(400).send("error at changePassword controller");
	}
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
AUTH USER
.get('/user') 
req //? Token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const authUser = async (req, res) => {
	const {
		userId,

		headers: { authorization },
	} = req;

	try {
		let id = userId;

		const token = authorization.split(" ")[1];

		if (!userId && !token) return res.status(404).send("User Not Found");

		if (!userId && token) {
			id = jwt.verify(token, process.env.JWT_SECRET).userId;
		}

		const user = await UserModel.findById(id);

		return res.status(200).json({ user });
	} catch (error) {
		console.log("error at authUser controller");
		console.error(error);
	}
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GET USER
.post('/:userId') 
req.params {userId} //? Targets userId
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await UserModel.findById(userId);
		if (user) {
			return res.status(200).json(user);
		} else {
			return res.status(404).send("No user with given Id");
		}
	} catch (error) {
		console.log(error);
		return res.status(400).send("error at getUser controller");
	}
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GET SQUAD
.post('/squad/:squadNumber') 
req.params {squadNumber} //? Targets userId
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getSquad = async (req, res) => {
  const { squadNumber } = req.params;
  try {
    const users = await UserModel.find({squadNumber});

    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(404).send("No users in the given squad");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at getSquad controller");
  }
}

module.exports = {
	createUser,
	loginUser,
	deleteUser,
	updateUser,
	changePassword,
	authUser,
	getUser,
  getSquad
};
