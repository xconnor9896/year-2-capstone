// require("dotenv").config();
let baseURL = `https://west-mec-law-and-public-safety.herokuapp.com`;
const sgMail = require("@sendgrid/mail");
const { getMaxListeners } = require("../models/UserModel");
const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
		user.verfiy = randomNumberGen().toString();
		await user.save();
		console.log(user);

		emailUrl = `${user.verfiy}`;

		if (user.email == inputEmail) {
			console.log(`We have ${inputEmail} as one of our users`);
		} else if (user.email != inputEmail) {
			console.log(
				`${inputEmail} we dont have this email as one of users`
			);
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

	// sending the email
	return (
		sgMail
			//This is the actually sending the email which i used html to style and over all create
			.send(
				(verfEmail = {
					to: inputEmail, // Change to your recipient
					from: "westmeclps@gmail.com", // Change to your verified sender

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
        Verfiy your email by clicking the button below
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
        action="${baseURL(window)}/api/v1/email/v1?verify=${emailUrl}"
      >
        <button style="background-color: black; color: whitesmoke">
          Email Verify 
        </button>
      </form>
    </div>
      `,
				})
			)
			// This is just here so u can stop it from running after its done and also to let the user know tp check their email
			.then((data) => {
				return res.status(202).send("Email Sent");
			})
			//This is to make it log a error and stop the function so its not just running forever this is where you would put anything to tell the user that its not working
			.catch((error) => {
				console.error(error);
				return res.status(401).send(error);
			})
	);
};

//This is what runs when they get to the page
const verifyController = async (req, res) => {
	try {
		let params = req.query;
		// console.log(params);
		let urlNumber = params.verify;
		const users = await userModel.find({}); // getting all the users

		// finding the user i want to change by using the number we get from the url and checking it by all the users verfiy
		const user = users.find((user) => {
			return user.verfiy == urlNumber;
		});
		console.log(user);
		// console.log(`This is the choosen user`)
		// console.log(urlNumber)
		user.verfiy = "true";
		user.save();
		// console.log(user.verfiy)
		return res.status(202).redirect("/emailVerifiedPg");
	} catch (err) {
		console.log(err);
		return res.status(401).send(err);
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
	//Getting some data a number that ill use later
	const { inputEmail } = req.body;
	user = userModel.find({});
	const randomNumberGen = () => {
		randomNumber = Math.floor(Math.random() * 10000000000000000) + 1000000;
		return randomNumber;
	};

	//Checks and making a random Number so i can use it for a orignaal url
	try {
		// const num = randomNumberGen();
		// console.log(randomNumber);
		const users = await userModel.find({});
		const user = users.find((user) => {
			return user.email == inputEmail;
		});

		if (user.email == inputEmail) {
			console.log(`We have ${inputEmail} as one of our users`);
		} else if (user.email != inputEmail) {
			console.log(
				`${inputEmail} we dont have this email as one of users`
			);
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
	//It actually sending the email
	return sgMail
		.send(
			(resetPass = {
				to: inputEmail, // Change to your recipient
				from: "westmeclps@gmail.com", // Change to your verified sender

				subject: "Password Reset",
				html: `   
        <div
        class="PasswordReset"
        style="
          border: 10px solid orange;
          background-color: black;
          padding: 1rem;
          color: whitesmoke;
          display: grid;
        "
      >
        <h1 style="color: orange; margin: auto">
          West Mec Law And Public Safety
        </h1>
        <h2 style="padding: 0.5rem; text-align: center">
          Want to Change Your Password?
        </h2>
        <h3 style="padding-bottom: 1rem; text-align: center">
          Please Click the Button Below to Start Changing Your Password
        </h3>
        <form
          style="
            background-color: black;
            color: whitesmoke;
            margin: auto;
            height: 15%;
            width: 10%;
            font-size: 1rem;
          "
          action="${baseURL(window)}/changePassword"
          method="post"
        >
          <button style="background-color: black; color: whitesmoke;  border: whitesmoke ">
            Change Password
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
			return res.status(401).send(error);
		});
};

const passwordChange = async (req, res) => {
	const users = await userModel.find({});

	let inputEmail = req.body.inputEmail;
	let inputPassword = req.body.inputPassword;
	let confirmPassword = req.body.confirmPassword;

	const user = users.find((user) => {
		return user.email == inputEmail;
	});

	if (
		!user ||
		user == undefined ||
		user.email == undefined ||
		!inputEmail ||
		inputEmail == undefined ||
		!confirmPassword
	) {
		return res.send("<h1>Im sorry we couldnt find that user<h1>");
	}

	try {
		// console.log(`This is the inputed email ${inputEmail} and this is the users ${users}`)

		console.log(user);
		// if (user.email == undefined) {
		//   alert(
		//     "Im sorry that email doesnt exist in our website check if you mispelled or that you have signed up "
		//   );
		// }

		console.log(`This is the email ${user.email}`);
		console.log(`This is the password ${user.password}`);
		if (inputPassword == confirmPassword && inputEmail == user.email) {
			bcrypt.genSalt(10, (err, salt) =>
				bcrypt.hash(inputPassword, salt, (err, hash) => {
					if (err) throw err;
					user.password = hash;
					user.save();
					res.redirect("/");
				})
			);
		} else {
			console.log("Password didnt match at emailCon line 285");
			return;
		}
	} catch (err) {
		// console.log(`This is the catch error ${err}`);
		return res.status(401).send(` Im sorry something went wrong ${err}`);
	}
};

module.exports = {
	sendVerfEmail,
	sendPassResetEmail,
	verifyController,
	passwordChange,
};
