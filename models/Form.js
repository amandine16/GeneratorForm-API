const mongoose = require("mongoose");

const Form = mongoose.model("Form", {
  title: String,
  questions: Array,
});

module.exports = Form;
