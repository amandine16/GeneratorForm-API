const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

// Import model Form
const Form = require("../models/Form");
// const Question = require("../models/Question");

// create new form
router.post("/form/create", async (req, res) => {
  try {
    //   Search in BDD, if form already exist
    const form = await Form.findOne({ title: req.fields.title });
    if (form) {
      res.status(409).json({
        message: `This form's title is already exist`,
      });
    } else {
      if (req.fields.title) {
        //  For creation new form, question is empty array
        const newForm = new Form({
          title: req.fields.title,
          questions: [],
          // answers: [],
        });
        await newForm.save();
        res.status(200).json(newForm);
      } else {
        res.status(400).json({ message: "Missing parameters" });
      }
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

// Get one form
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

// Update form
router.post("/form/update/:id", async (req, res) => {
  try {
    //   Search the form in bdd
    const formToModify = await Form.findById(req.params.id);
    // if form exist
    if (formToModify) {
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
