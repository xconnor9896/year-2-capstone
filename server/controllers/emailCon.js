// require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const { getMaxListeners } = require("../models/UserModel");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY)
userEmail = "zrtsurprise@gmail.com";
// console.log(sgMail)

const emailVefEmail = {
  to: { userEmail }, // Change to your recipient
  from: "ztaylo273@west-mec.org", // Change to your verified sender
  //VVVVVV Not sure what this does for the emails but Ill leave it here just incase we may want/need it VVVVV
  
  dynamicTemplateData: {
    subject: "Email Verification",
    name: "West Mec Law and Public Saftey",
    city: "Surprise",
    text:"testing",
    html:`<div style:{background:black}>
        <h1>Testing</h1>
    </div>`
  },
};

const sendVerfEmail = () => {
    return sgMail
    .send(emailVefEmail)
    .then(() => {
        console.log("Email sent");
    })
    .catch((error) => {
        console.error(error);
    });
};

// sendVerfEmail()


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

module.exports = { sendVerfEmail, sendPassResetEmail}
