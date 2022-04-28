const router = require(`express`).Router();

const { sendVerfEmail, sendPassResetEmail, getUserEmail} = require("../controllers/emailCon")

router.route("/").get(sendVerfEmail)

module.exports =  router 
