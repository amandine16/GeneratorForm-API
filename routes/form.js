const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

// Import model Form
const Form = require("../models/Form");
// const Question = require("../models/Question");

// create new form
router.post("/form/create", async (req, res) => {
  try {
    if (req.fields.title) {
      //   Search in BDD, if form already exist
      const form = await Form.findOne({ title: req.fields.title });
      if (form) {
        res.status(409).json({
          message: `This form's title is already exist`,
        });
      } else {
        const newForm = new Form({
          title: req.fields.title,
          questions: [],
          //   createdAt :
        });
        await newForm.save();
        res.status(200).json(newForm);
      }
    } else {
      res.status(400).json({ message: "Missing parameters" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all forms
router.get("/forms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/form/:id", async (req, res) => {
  try {
    const formById = await Form.findById(req.params.id);
    if (formById) {
      res.status(200).json(formById);
    } else {
      res.status(400).json({ message: `The form does not exist` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/form/update/:id", async (req, res) => {
  try {
    //   Search the form in bdd
    const formToModify = await Form.findById(req.params.id);

    // if form exist
    if (formToModify) {
      if (req.fields.title || req.fields.rank || req.fields.question) {
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
        if (req.fields.rank) {
          formToModify.rank = req.fields.rank;
        }
        if (req.fields.question) {
          formToModify.questionAndAnswer.push(req.fields.question);
          // formToModify.questionAndAnswer.question.rank = req.fields.rank
        }
        if (req.fields.answer) {
          // à modifier => recup l'index de la question pour cibler la bonne réponse de question
          formToModify.questionAndAnswer.answer.push(req.fields.answer);
        }
        await formToModify.save();
        // send info only question
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

router.post("/form/delete/:id", async (req, res) => {
  try {
    const formToDelete = await Form.findById(req.params.id);
    // console.log(formToDelete);
    if (formToDelete) {
      await formToDelete.delete();
      res.status(200).json({ message: `The form is deleted` });
    } else {
      res.status(400).json({ message: `The form does not exist` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
