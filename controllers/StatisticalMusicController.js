const express = require("express");
const app = express();

// view trang  chu
app.get("/", (req, res) => {
  res.render("music-basic/statistical.hbs");
});

module.exports = app;
