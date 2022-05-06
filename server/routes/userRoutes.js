const router = require(`express`).Router();

const {
	createUser,
	loginUser,
	deleteUser,
	updateUser,
	authUser,
	getUser,
	getAllUsers
} = require("../controllers/user");

const { authMiddleware } = require("../middleware/authMidware");

router.route("/signup").post(createUser);
router.post("/login", loginUser);
router
	.route("/:userId")
	.delete(authMiddleware, deleteUser)
	.post(authMiddleware, updateUser);
router.get("/", authUser);
router.get("/:userId", getUser);
router.get("/all", getAllUsers)

module.exports = router;
