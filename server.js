const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// IMPORT CONTROLLERS
const testJWTRouter = require("./controllers/test-jwt");
const usersRouter = require("./controllers/users");
const profilesRouter = require("./controllers/profiles");
const hootRouter = require("./controllers/hoots");
// IMPORT MIDDLEWARE
const verifyToken = require("./middleware/verify-token");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
// MIDDLEWARE
app.use(cors());
app.use(express.json());

// Routes go here
app.use("/test-jwt", testJWTRouter);
app.use("/users", usersRouter);
app.use("/profiles", profilesRouter);
// This will make req.user available in every hoot controller function
// this decodes the jwt
app.use(verifyToken);
app.use("/hoots", hootRouter);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
