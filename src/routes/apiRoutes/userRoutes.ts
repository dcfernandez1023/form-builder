let express = require('express');


const router = express.Router();
const userController = require("../../controllers/userController");

// POST endpoints
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgotPassword", userController.sendForgotPasswordEmail);
router.post("/refreshAccessToken", userController.refreshAccessToken);
router.post("/resetPassword", userController.resetPassword);
router.post("/updateFields", userController.updateFields);
router.post("/delete", userController.delete);

// GET endpoints
// router.get("/getUserByEmail", userController.getUserByEmail);
router.get("/getUser", userController.getUserById);


module.exports = router;
