import express from "express";
const { OK } = require('http-status-codes');

const userRoutes = require("./userRoutes");

const router = express.Router();

router.use('/user', userRoutes);

exports.routes = router;
