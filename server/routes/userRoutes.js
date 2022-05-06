const router = require(`express`).Router();

const {
	createUser,
	loginUser,
	deleteUser,
	updateUser,
	authUser,
	// getUser,
	getUsername
} = require("../controllers/user");

const { authMiddleware } = require("../middleware/authMidware");

router.route("/signup").post(createUser);
router.post("/login", loginUser);
router.route("/:userId").delete(authMiddleware, deleteUser).post(authMiddleware, updateUser).get(getUsername);
router.get("/", authUser);

module.exports = router;
