require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

userEmail = "";

const emailVefEmail = {
  to: { userEmail }, // Change to your recipient
  from: "ztaylo273@west-mec.org", // Change to your verified sender
  templateId: "d-d57cf8bc57bd482384462979d6fd0ee6", //* I made two very simple Templates 1 for email Verfication and 1 for PassWord Reset More about this will be in daily-logs/zach.md
  // Not sure what this does for the emails but Ill leave it here just incase we may want/need it
  dynamicTemplateData: {
    subject: "Email Vef",
    name: "West Mec Law and Public Saftey",
    city: "Surprise",
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

export default { sendVerfEmail, sendPassResetEmail}
