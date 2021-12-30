import express from "express";
const path = require('path');

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');


// initialize router and app
const apiRouter = require('./routes/apiRoutes/index');
const app = express();

// app config
app.use(express.json());

// api routes
app.use("/api", apiRouter.routes);

// catch unknown routes
app.use((req: any, res: any, next: Function) => {
  res.status(NOT_FOUND).json({
    message: "Unknown resource"
  });
});

// catch errors
app.use((error: any, req: any, res: any, next: Function): any | void => {
  console.log(error.stack);
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      message: error.message
    });
  }
  res.status(INTERNAL_SERVER_ERROR).json({
    message: error.message
  });
});


export { app };
