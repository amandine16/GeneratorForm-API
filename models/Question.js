const mongoose = require("mongoose");

const Question = mongoose.model("Question", {
  title: { type: String, default: "New question", required: true },
  // coté front, si à true, alors on enverra un input textarea, sinon une note de 1 à 5
  typeText: { type: Boolean, default: true },
  rank: { type: Number },
  answer: { type: mongoose.Schema.Types.Mixed, ref: "Answer" },
  idForm: { type: mongoose.Schema.Types.Mixed, ref: "Form" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = Question;
