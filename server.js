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

//routerss
<<<<<<< HEAD
// const userRoute = require("./server/controllers/user");
// app.use("/api/v1", userRoute);
=======
const userRoute = require("./server/routes/userRoutes");
app.use("/api/v1", userRoute);
>>>>>>> d4c33de1bb0b031b25b5b4e29f7444570896448a

//conect to database
connectDB();

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
