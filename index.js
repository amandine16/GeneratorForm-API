// Initilisation
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
// Sets the environment variables
require("dotenv").config();
// Allows to receive parameters transmitted in HTTP POST method
app.use(formidable());
// The cors module allows to authorized request from outside
app.use(cors());

// Mongoose connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Declaration road
const formRoute = require("./routes/form.js");
app.use(formRoute);
const answerRoute = require("./routes/answer.js");
app.use(answerRoute);

// Road unknow
app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
// Listen server
app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
