const express = require("express");
const app = express();

// view trang
app.get("/", (req, res) => {
  res.render("home/playmusic.hbs");
});

module.exports = app;
