const router = require(`express`).Router();

const {
	createUser,
	loginUser,
	deleteUser,
	updateUser,
	authUser,
	getUser,
	getEmail
} = require("../controllers/user");

const { authMiddleware } = require("../middleware/authMidware");

router.route("/signup").post(createUser);
router.post("/login", loginUser);
router.route("/:userId").delete(authMiddleware, deleteUser).post(authMiddleware, updateUser)
router.route("/:email").get(getEmail);
router.get("/", authUser);

module.exports = router;