const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

// Import model
// const Question = require("../models/Question");
const Form = require("../models/Form");
// Create answer
router.post("/answer/create", async (req, res) => {
  try {
    // Check if form exist
    const form = await Form.findById(req.fields.idForm).populate("Form");
    if (form) {
      if (req.fields.answer) {
        const newAnswer = await new Answer({
          answer: req.fields.answer,

          ifForm: req.fields.idForm,
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
    const answers = await Answer.find().populate("Form");
    res.status(200).json(answers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// // Update Question (order and title)
// router.post("/answer/update/:id", async (req, res) => {
//   try {
//     //   Search the question in bdd
//     const questionToModify = await Question.findById(req.params.id).populate({
//       path: "Form",
//     });
//     // if question exist
//     if (questionToModify) {
//       if (req.fields.title) {
//         questionToModify.title = req.fields.title;
//         await questionToModify.save();
//         res.status(200).json({
//           message: `The title has been modified by : "${req.fields.title}"`,
//           result: questionToModify,
//         });
//       } else {
//         res.status(400).json({ message: "Missing parameters" });
//       }
//     } else {
//       res
//         .status(400)
//         .json({ message: `The question : "${req.params.id}" does not exist` });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Delete Question
// router.post("/question/delete/:id", async (req, res) => {
//   try {
//     const questionToDelete = await Question.findById(req.params.id);
//     if (questionToDelete) {
//       await questionToDelete.delete();
//       res
//         .status(200)
//         .json({ message: `The question ${req.params.id} is deleted` });
//     } else {
//       res
//         .status(400)
//         .json({ message: `The question ${req.params.id} does not exist` });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

module.exports = router;
