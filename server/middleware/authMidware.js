const jwt = require("jsonwebtoken"); // This isnt done just a structure

const authMiddleware = (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send("Auth headers not recieved.");
		}

		if (req.headers.authorization.split(" ")[0] !== "Bearer") {
			return res.status(401).send("Authorization not in proper format..");
		}

		const auth = req.headers.authorization.split(" ")[1];

		const { userId } = jwt.verify(auth, process.env.JWT_SECRET);

		req.userId = userId;
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).send("Unknown auth error.");
	}
};

module.exports = { authMiddleware };
