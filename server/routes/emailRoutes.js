const router = require(`express`).Router();

const { sendVerfEmail, sendPassResetEmail, verifyController} = require("../controllers/emailCon")

router.route("/").post(sendVerfEmail)
router.route("/v1").post(verifyController)

module.exports = router 
