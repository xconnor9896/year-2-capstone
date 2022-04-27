const router = require(`express`).Router();

const {
  createUser,
  loginUser
} = require("../controllers/user");

router.route('/signup').post(createUser);
router.post('/login', loginUser);





module.exports = router;
