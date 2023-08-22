const express = require("express");
const MainErrorClass = require("./utilities/craeteError");
const app = express();
const routes = require("./routes/index.routes");

app.use(express.json());

app.use((req, res, next) => {
  console.log("Middleware SID MY");
  next();
});

app.use("/app", routes);
// ^ Default Route
app.all("*", (req, res, next) => {
  // let err = new Error(`URL : ${req.originalUrl}  is not Found.`);
  // err.statusCode = 404;
  // err.status = 'fails';

  next(new MainErrorClass(`URL : ${req.originalUrl}  is not Found.`, 404)); //If we pass any value inside next(err),then all middlewares are get skipped after this
});
app.use((req, res, next) => {
  //? Skipping this middleware
  console.log("Middleware SID MY========2");
  next();
});
//! Global Error Handling Middleware
const globalErrorHnddler = require("./error/mainFileError"); //*VIMP
app.use(globalErrorHnddler); //* VIMP

module.exports = app;
