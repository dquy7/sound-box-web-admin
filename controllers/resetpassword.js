const express = require("express");
const app = express();

// view trang  chu
app.get("/", (req, res) => {
  res.render("login/resetpassword.hbs");
});

module.exports = app;
