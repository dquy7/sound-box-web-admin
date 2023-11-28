const express = require("express");
const app = express();

// view trang  chu
app.get("/", (req, res) => {
  res.render("feedback/statistical.hbs");
});

module.exports = app;
