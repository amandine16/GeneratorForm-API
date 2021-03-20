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
    const form = await Form.findById(req.fields.idForm).populate("Form");
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
router.get("/answers", async (req, res) => {
  try {
    const answers = await Answer.find();
    console.log(answers);
    res.status(200).json(answers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Answer
router.post("/answer/update/:idAnswer", async (req, res) => {
  try {
    //   Search the form in bdd
    const answers = await Answer.find(req.params.idAnswer);
    // if form exist
    if (answers) {
      if (req.fields.title || req.fields.questions) {
        if (req.fields.title) {
          //   Search in BDD, if form already exist
          const form = await Form.findOne({ title: req.fields.title });
          if (form) {
            res.status(409).json({
              message: `This form's title is already exist`,
            });
          } else {
            formToModify.title = req.fields.title;
          }
        }
        if (req.fields.questions) {
          formToModify.questions = req.fields.questions;
        }
        await formToModify.save();
        res.status(200).json(formToModify);
      } else {
        res.status(400).json({ message: "Missing parameters" });
      }
    } else {
      res.status(400).json({ message: `The form does not exist` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
