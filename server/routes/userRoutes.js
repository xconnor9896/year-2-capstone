const router = require(`express`).Router();

const {
	createUser,
	loginUser,
	deleteUser,
	updateUser,
	authUser,
	getUser,
	getAllUsers,
	getEmail,
	getCode,
	updateCode,
} = require("../controllers/user");

const { authMiddleware } = require("../middleware/authMidware");

router.route("/signup").post(createUser);
router.post("/login", loginUser);
router.get("/all", authMiddleware, getAllUsers);
router.get("/", authMiddleware, authUser);
router
  .route("/code/:userId")
  .get(authMiddleware, getCode)
  .post(authMiddleware, updateCode);

router
  .route("/:userId")
  .delete(authMiddleware, deleteUser)
  .post(authMiddleware, updateUser)
  .get(authMiddleware, getUser);
router.route("/:email").get(getEmail);

module.exports = router;
