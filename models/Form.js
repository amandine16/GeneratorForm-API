const mongoose = require("mongoose");

const Form = mongoose.model("Form", {
  title: { type: String, default: "new form" },
  // questions: [{ type: mongoose.Schema.Types.Mixed, ref: "Question" }],
  questionAndAnswer: [],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = Form;
