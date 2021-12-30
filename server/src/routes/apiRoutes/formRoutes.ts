import express from "express";


const router = express.Router();
const formController = require("../../controllers/formController");

// POST endpoints
router.post("/createNew", formController.createNew);
router.post("/updateFields/:formId", formController.updateFields);
router.post("/handleSubmit/:formId", formController.handleSubmit);

// GET endpoints
router.get("/getForms", formController.getForms);
router.get("/getForm/:formId", formController.getForm);

// DELETE endpoints
router.delete("/delete/:formId", formController.delete);


module.exports = router;
