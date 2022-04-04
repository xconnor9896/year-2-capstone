const router = require(`express`).Router();

const {
  deleteUser,
  updateUser,
  changePassword,
} = require("../controllers/user");

//* these will all have /:userId in front  
router.route("/delete").delete(deleteUser);
router.route("/").post(updateUser);
router.route("/updatePassword").post(changePassword); //* The change password button will send them a email and that email will send them to this url

module.exports = router;
