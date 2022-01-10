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

// serve static frontend files
let frontendDir: string = process.env.FRONTEND_DIR ?? "";
console.log("Front-end Dir: " + frontendDir);
app.use(express.static(frontendDir));
app.get('*', (req,res) =>{
  res.sendFile(path.resolve(frontendDir + "/index.html"));
});
// app.use(express.static(path.resolve("./") + "../../frontend/build"));
// app.get('*', (req,res) =>{
//   res.sendFile(path.resolve("../frontend/build/index.html"));
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
