// require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const { getMaxListeners } = require("../models/UserModel");
const userModel = require("../models/UserModel");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const getUserEmail = async (req, res) => {
  try {
    //us
    const {inputEmail} = req.body
    const user = await userModel.find({});
    const userEmail = user.find(({email}) => {
      return email == inputEmail
    })
    if(userEmail){
      //return no email
    }

console.log(inputEmail)

    res.json(  {email:userEmail.email});
  } catch (err) {
    res.send(err);
  }
};

// red

// console.log(sgMail)

const emailVefEmail = {
  to: userEmail, // Change to your recipient
  from: "ztaylo273@west-mec.org", // Change to your verified sender

  subject: "Email Verification",
  // text:"Testing",
  html: `   
  <div
  class="EmailVefDiv"
  style="
    border: 10px solid orange;
    background-color: black;
    padding: 1rem;
    color: whitesmoke;
    display: grid;
  "
>
<div class="svg" style="margin: auto">
  <img src="../../util/LPS Logo.png" alt="" />
</div>
  <h1 style="padding: 0.5rem; text-align: center">
    Thank You For Signing Up
  </h1>
  <h2 style="padding-bottom: 1rem; text-align: center">
    Please Verify Your Email By clicking the button below
  </h2>
  <form
    style="
      background-color: black;
      color: whitesmoke;
      margin: auto;
      height: 15%;
      width: 10%;
      font-size: 1rem;
    "
    action="http://localhost:3000"
    method="get"
  >
    <button style="background-color: black; color: whitesmoke">
      Verify Email
    </button>
  </form>
</div>
  `,
};

const sendVerfEmail = async () => {
   return sgMail
    .send(emailVefEmail)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const passwordResetEmail = {
  to: { userEmail }, // Change to your recipient
  from: "ztaylo273@west-mec.org", // Change to your verified sender
  templateId: "d-d330934900074645a6e27ddfac25cea0", //* I made two very simple Templates 1 for email Verfication and 1 for PassWord Reset More about this will be in daily-logs/zach.md
  // Not sure what this does for the emails but Ill leave it here just incase we may want/need it
  dynamicTemplateData: {
    subject: "Password Reset",
    name: "West Mec Law and Public Saftey",
    city: "Surprise",
  },
};

const sendPassResetEmail = () => {
  return sgMail
    .send(passwordResetEmail)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendVerfEmail, sendPassResetEmail, getUserEmail };
