const mongoose = require("mongoose");

const Answer = mongoose.model("Answer", {
  answer: Array,
  idForm: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  questions: Array,
  // questions : [{intitulé : "q1" , rep : [{0 : "non", 1 : "oui" } ]}, q2,q3]
});

module.exports = Answer;
