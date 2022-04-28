//express app setup
const app = require("express")();
const { connectDB } = require("./server/util/connect");
const express = require("express");
require("dotenv").config();

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

const userRoutes = require("./server/routes/userRoutes");
const reportRoutes = require("./server/routes/reportRoutes");
const settingsRoutes = require("./server/routes/settingsRoutes");

// routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/report", reportRoutes);
app.use("/api/v1/settings", settingsRoutes);

//conect to database
connectDB();

//Testing sendgrid email
const { sendVefEmail } = require("./server/controllers/emailCon");

sendVefEmail;

nextApp.prepare().then(() => {
	app.all("*", (req, res) => handler(req, res));
	app.listen(PORT, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log(`server listining on ${PORT}`);
		}
	});
});
