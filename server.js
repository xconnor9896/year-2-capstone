//express app setup
const app = require("express")();
const { connectDB } = require("./server/util/connect");
const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");

// const app = express();
const PORT = process.env.PORT || 3000;

//next app setup
//create a check for dev vs production
const dev = process.env.NODE_ENV !== "production";
const next = require("next");

//there are giant error warning that pop up when in dev, production will just hide them, we should see them if we want to fix them
const nextApp = next({ dev });

//this is a built in next router that will handle All the request made to the server
const handler = nextApp.getRequestHandler();

//middlewares
app.use(express.json());
app.use(
	fileUpload({
		useTempFiles: true,
	})
);

// cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET,
});

//routerss
const userRoutes = require("./server/routes/userRoutes");
const squadRoutes = require("./server/routes/squadRoutes");
const reportRoutes = require("./server/routes/reportRoutes");
const settingsRoutes = require("./server/routes/settingsRoutes");
const getUserEmail = require("./server/routes/emailRoutes");
const { authMiddleware } = require("./server/middleware/authMidware");

// routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/squad", authMiddleware, squadRoutes);
app.use("/api/v1/report", reportRoutes);
app.use("/api/v1/settings", settingsRoutes);
app.use("/api/v1/email", getUserEmail);

//conect to database
connectDB();

//Testing sendgrid email
// const {sendVerfEmail, sendPassResetEmail, getUserEmail} = require("./server/controllers/emailCon")

// sendVerfEmail()

nextApp.prepare().then(() => {
	app.all("*", (req, res) => handler(req, res));
	app.listen(PORT, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log(`server listening on ${PORT}`);
		}
	});
});
