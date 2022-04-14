const router = require(`express`).Router();

const { createUser,
  loginUser,
  deleteUser,
  updateUser,
  changePassword } = require("../controllers/user");

router.post('/signup', createUser);
router.post('/login', loginUser);

router.delete('/:userId', deleteUser);

router.post('/:userId', updateUser);

router.post('/', changePassword);



module.exports = router;
