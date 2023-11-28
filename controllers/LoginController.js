const express = require("express");
const app = express();

// view login
app.get("/", (req, res) => {
  res.render("login/login.hbs");
});

module.exports = app;
