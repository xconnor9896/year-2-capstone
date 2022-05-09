const router = require(`express`).Router();

const { sendVerfEmail, sendPassResetEmail, verifyController, passwordChange} = require("../controllers/emailCon")

router.route("/reset").post(sendPassResetEmail)
router.route("/verf").post(sendVerfEmail)
router.route("/v1").post(verifyController)
router.route("/v2").post(passwordChange)

module.exports = router 
