const router = require(`express`).Router();

const {
	createUser,
	loginUser,
	deleteUser,
	updateUser,
	authUser,
	getUser,
	getAllUsers,
} = require("../controllers/user");

const { authMiddleware } = require("../middleware/authMidware");

router.route("/signup").post(createUser);
router.post("/login", loginUser);
router.get("/all", authMiddleware, getAllUsers);
router
	.route("/:userId")
	.delete(authMiddleware, deleteUser)
	.post(authMiddleware, updateUser)
	.get(authMiddleware, getUser);
router.get("/", authMiddleware, authUser);

module.exports = router;
