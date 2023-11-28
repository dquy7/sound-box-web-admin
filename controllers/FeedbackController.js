const express = require("express");
const app = express();

// view trang  chu
app.get("/", (req, res) => {
  res.render("feedback/feedback.hbs");
});

module.exports = app;
