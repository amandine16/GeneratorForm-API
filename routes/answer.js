const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

// Import model
// const Question = require("../models/Question");
const Form = require("../models/Form");
const Answer = require("../models/Answer");
// Create answer
router.post("/answer/create", async (req, res) => {
  try {
    // Check if form exist
    const form = await Form.findById(req.fields.idForm);
    if (form) {
      if (req.fields.questionAndAnswers) {
        const newAnswer = await new Answer({
          questionAndAnswers: req.fields.questionAndAnswers,
          idForm: req.fields.idForm,
          // questionsAndAnswer: req.fields.qstRep,
          // ifForm: req.fields.idForm,
        });
        // Add answer in bdd
        await newAnswer.save();
        res.status(200).json(newAnswer);
      } else {
        res.status(400).json(`Missing parameters`);
      }
    } else {
      res.status(400).json({
        message: `This form does not exist`,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all answer
// router.get("/answers", async (req, res) => {
//   try {
//     const answers = await Answer.find();
//     console.log(answers);
//     res.status(200).json(answers);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// Get Answers by idForm
router.get("/answers/:idForm", async (req, res) => {
  try {
    const form = await Form.findById(req.params.idForm);
    if (form) {
      const answers = await Answer.find({ idForm: req.params.idForm });
      if (answers) {
        res.status(200).json(answers);
      } else {
        res.status(400).json("Error");
      }
    } else {
      res.status(400).json("This forms does not exist");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
