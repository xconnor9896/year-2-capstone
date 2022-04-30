// require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const { getMaxListeners } = require("../models/UserModel");
const userModel = require("../models/UserModel");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const getUserEmail = async (req, res) => {
//   try {
//     //us
//     const {inputEmail} = req.body
//     const user = await userModel.find({});
//     const userEmail = user.find(({email}) => {
//       return email == inputEmail
//     })
//     if(userEmail){
//       //return no email
//     }

// console.log(inputEmail)

//     res.json(  {email:userEmail.email});
//   } catch (err) {
//     res.send(err);
//   }
// };

// red

// console.log(sgMail)

const sendVerfEmail = async (req, res) => {
  //us
  const { inputEmail } = req.body;
  try {
    const user = await userModel.find({});
    const userEmail = user.find(({ email }) => {
      return email == inputEmail;
    });
    if (userEmail.email == inputEmail) {
      console.log(`We have ${inputEmail} as one of our users`);
    } else if (userEmail != inputEmail) {
      console.log(`${inputEmail} we dont have this email as one of users`);
      inputEmail = 0;
    } else {
      console.log("idk what happended");
    }
  } catch (err) {
    alert(
      "Im sorry we dont have that email as a user please check the email or sign up"
    );
    console.log(err);
    res.status(500).send("error");
  }

  // console.log(inputEmail);

  return (
    sgMail
      .send(
        (verfEmail = {
          to: inputEmail, // Change to your recipient
          from: "ztaylo273@west-mec.org", // Change to your verified sender

          subject: "Email Verification",
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
        })
      )
      // user =  userModel.find({});
      // const randomNumberGen = () => {
      //   randomNumber = Math.floor(Math.random() * 100000000000000000000);
      //   if (randomNumber > 1000000000) {
      //     return (randomNumber = Math.floor(
      //       Math.random() * 100000000000000000000
      //     ));
      //   } else {
      //     console.log(randomNumber);
      //     randomNumberGen();
      //   }
      // };
      .then((data) => {
        res.status(202).send("Email Sent");
      })
      .catch((error) => {
        console.error(error);
        res.status(404).send(error);
      })
  );
};

// const passwordResetEmail = {
//   to: { userEmail }, // Change to your recipient
//   from: "ztaylo273@west-mec.org", // Change to your verified sender
//   html:"",
//   // Not sure what this does for the emails but Ill leave it here just incase we may want/need it
//   dynamicTemplateData: {
//     subject: "Password Reset",
//     name: "West Mec Law and Public Saftey",
//     city: "Surprise",
//   },
// };

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

module.exports = { sendVerfEmail, sendPassResetEmail };
