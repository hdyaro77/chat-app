const express = require("express");
const dotenv = require("dotenv");
const app = require("./app");
var cors = require("cors");
dotenv.config({ path: "./config.env" });
app.use(cors());
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server is listening on port :", port);
});
