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
let emailUrl = "";

const sendVerfEmail = async (req, res) => {
  //us
  const { inputEmail } = req.body;
  user = userModel.find({});
  const randomNumberGen = () => {
    randomNumber = Math.floor(Math.random() * 10000000000000000) + 1000000;
    return randomNumber;
  };

  try {
    // const num = randomNumberGen();
    // console.log(randomNumber);
    const users = await userModel.find({});
    const user = users.find((user) => {
      return user.email == inputEmail;
    });
    console.log(user);
    user.verify = randomNumberGen().toString();
    await user.save();
    console.log(user);

    emailUrl = `${user.verify}`;

    if (user.email == inputEmail) {
      console.log(`We have ${inputEmail} as one of our users`);
    } else if (user.email != inputEmail) {
      console.log(`${inputEmail} we dont have this email as one of users`);
      inputEmail = 0;
    } else {
      console.log("idk what happended");
    }
    // return(emailUrl)
  } catch (err) {
    // alert(
    //   "Im sorry we dont have that email as a user please check the email or sign up"
    // );
    console.log(err);
    return res.status(500).send("error");
  }

  return sgMail
    .send(
      (verfEmail = {
        to: inputEmail, // Change to your recipient
        from: "ztaylo273@west-mec.org", // Change to your verified sender

        subject: "Email Verf",
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
        Start to Change to your password by clicking the button below
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
        method="post"
        action="http://localhost:3000/api/v1/email/v1?verify=${emailUrl}"
      >
        <button style="background-color: black; color: whitesmoke">
          Email Verify 
        </button>
      </form>
    </div>
      `,
      })
    )
    .then((data) => {
      return res.status(202).send("Email Sent");
    })
    .catch((error) => {
      console.error(error);
      return res.status(404).send(error);
    });
};

const verifyController = async (req, res) => {
  try {
    let params = req.query;
    console.log(params);
    let urlNumber = params.verfiy;

    console.log(urlNumber);
    return res.status(202).send("Nice");
  } catch (err) {
    console.log(err);
    return res.status(404).send(err);
  }
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

const sendPassResetEmail = async (req, res) => {
  const { inputEmail } = req.body;
  user = userModel.find({});
  const randomNumberGen = () => {
    randomNumber = Math.floor(Math.random() * 10000000000000000) + 1000000;
    return randomNumber;
  };

  try {
    // const num = randomNumberGen();
    // console.log(randomNumber);
    const users = await userModel.find({});
    const user = users.find((user) => {
      return user.email == inputEmail;
    });
    console.log(user);
    user.verify = randomNumberGen().toString();
    await user.save();
    console.log(user.verify);

    emailUrl = `${user.verify}`;

    if (user.email == inputEmail) {
      console.log(`We have ${inputEmail} as one of our users`);
    } else if (user.email != inputEmail) {
      console.log(`${inputEmail} we dont have this email as one of users`);
      inputEmail = 0;
    } else {
      console.log("idk what happended");
    }
    // return(emailUrl)
  } catch (err) {
    // alert(
    //   "Im sorry we dont have that email as a user please check the email or sign up"
    // );
    console.log(err);
    return res.status(500).send("error");
  }

  return sgMail
    .send(passwordResetEmail)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendVerfEmail, sendPassResetEmail, verifyController };
