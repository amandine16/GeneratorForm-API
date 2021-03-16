const mongoose = require("mongoose");

const Answer = mongoose.model("Answer", {
  answerText: { type: String, default: "New Answer number" },
  answerNumber: { type: Number, default: "New Answer number" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = Answer;
