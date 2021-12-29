import express from "express";
const { OK } = require('http-status-codes');

const userRoutes = require("./userRoutes");
const formRoutes = require("./formRoutes");

const router = express.Router();

router.use("/user", userRoutes);
router.use("/form", formRoutes);

exports.routes = router;
