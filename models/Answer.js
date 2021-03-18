const mongoose = require("mongoose");

const Answer = mongoose.model("Answer", {
  answer: Array,
  idForm: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
});

module.exports = Answer;
