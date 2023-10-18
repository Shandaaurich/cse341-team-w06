const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const cors = require("cors");
const createError = require("http-errors");

const port = process.env.PORT || 8080;
const app = express();

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"))

  //404 handler and pass to error handler
  .use((req, res, next) => {
    next(createError(404, "Not found"));
  })

  //Error handler
  .use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    });
  });

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
