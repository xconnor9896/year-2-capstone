const router = require(`express`).Router();

const {
  createUser,
  loginUser,
  deleteUser,
  updateUser,
  authUser,
  getUser
} = require("../controllers/user");

const {authMiddleware} = require('../middleware/authMidware')

router.route('/signup').post(createUser);
router.post('/login', loginUser);
router.route('/:userId').delete(authMiddleware, deleteUser).post(authMiddleware, updateUser) 
router.get("/user", authUser)
router.get('/user/:userId', getUser)




module.exports = router;
