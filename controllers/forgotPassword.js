const express = require("express");
const app = express();

// view trang  chu
app.get("/", (req, res) => {
  res.render("login/forgotPassword.hbs");
});

module.exports = app;
