const mongoose = require("mongoose");

const Form = mongoose.model("Form", {
  title: String,
  questions: Array,
  // answers: { type: mongoose.Schema.Types.ObjectId, ref: "Answer" },
  // answers : String,
});

module.exports = Form;
