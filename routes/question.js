// const express = require("express");
// const formidable = require("express-formidable");
// const router = express.Router();

// // Import model
// const Form = require("../models/Form");
// const Question = require("../models/Question");

// // Create question on Form
// router.post("/question/create", async (req, res) => {
//   try {
//     // Check if form exist
//     const form = await Form.findById(req.fields.idForm).populate("Question");
//     if (form) {
//       // If title parameters exist
//       if (req.fields.title) {
//         const ifQstExist = await Question.findOne({ title: req.fields.title });
//         // if question does not exist already
//         if (!ifQstExist) {
//           const newQuestion = await new Question({
//             title: req.fields.title,
//             // Created rank auto
//             rank: form.questions.length + 1,
//             // Add objectId of form in question
//             idForm: form,
//           });
//           // Add question in bdd
//           await newQuestion.save();
//           // Add question in form
//           await form.questions.push(newQuestion);
//           await form.save();
//           // Return all info on form and all question
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
//     console.log(questionToDelete);
//     if (questionToDelete) {
//       await Form.update(
//         { _id: questionToDelete.idForm },
//         { $pull: { questions: {} } }
//       );

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

// router.post("/question/deleteInForm/:idQuestion", async (req, res) => {
//   try {
//     // Search in the BDD the question
//     const questionToDelete = await Question.findById(req.params.idQuestion);
//     console.log(questionToDelete);
//     const idForm = questionToDelete.idForm;
//     // Search in bdd , the form
//     const form = await Form.findById(idForm);
//     console.log(form);
//     if (form) {
//       for (i = 0; i < form.questions.length; i++) {
//         if (form.questions[i]._id === req.params.id) {
//           form.questions.splice(i, 1);
//           await form.save();
//           res.status(200).json({
//             message: "question deleted",
//           });
//         }
//         res
//           .status(400)
//           .json({ message: "The question does not exist in form" });
//       }
//     } else {
//       res.status(409).json({ message: "The form does not exist" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ message: error.message });
//   }
// });
// module.exports = router;
