import express from "express";
const cors = require("cors");
const path = require('path');

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');


// initialize router and app
const apiRouter = require('./routes/apiRoutes/index');
const app = express();

// enable CORS
let corsOptions = {
  exposedHeaders: "access-token"
};
app.use(cors(corsOptions));

// app config
app.use(express.json());

// api routes
app.use("/api", apiRouter.routes);

// server static frontend files
 app.use(express.static(path.resolve("./") + "../../../frontend/build"));

// catch unknown routes
// app.use((req: any, res: any, next: Function) => {
//   res.status(NOT_FOUND).json({
//     message: "Unknown resource"
//   });
// });

// catch errors
app.use((error: any, req: any, res: any, next: Function): any | void => {
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
