// const express = require("express");
// const formidable = require("express-formidable");
// const router = express.Router();

// // Import model
// const Question = require("../models/Question");
// const Form = require("../models/Form");
// // Create answer
// router.post("/answer/create", async (req, res) => {
//   try {
//     // Check if question exist
//     const question = await Question.findById(req.fields.idquestion).populate(
//       "Question"
//     );
//     if (question) {
//       // If title parameters exist
//       if (req.fields.title) {
//         const ifQstExist = await Question.findOne({ title: req.fields.title });
//         // if question does not exist already
//         if (!ifQstExist) {
//           const newQuestion = await new Question({
//             title: req.fields.title,
//             // Created rank auto
//             rank: form.questions.length + 1,
//           });
//           // Add question in bdd
//           await newQuestion.save();
//           // Add question in form
//           await form.questions.push(newQuestion);
//           await form.save();
//           // Return all info on form and its question
//           const formAndQuestion = await Form.findById(
//             req.fields.idForm
//           ).populate({
//             path: "Question",
//           });
//           res.status(200).json(formAndQuestion);
//         } else {
//           res
//             .status(400)
//             .json(`This question :"${req.fields.title}" already exist`);
//         }
//       } else {
//         res.status(400).json({
//           message: `Missing parameters`,
//         });
//       }
//     } else {
//       res.status(400).json({
//         message: `This form with id : "${req.fields.idForm}" does not exist `,
//       });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Get all questions
// router.get("/questions", async (req, res) => {
//   try {
//     const questions = await Question.find().populate("Form");
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Update Question (order and title)
// router.post("/question/update/:id", async (req, res) => {
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

// module.exports = router;
