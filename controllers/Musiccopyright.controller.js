const express = require("express");
const app = express();

// view trang
app.get("/", (req, res) => {
  res.render("music-basic/musiccopyright.hbs");
});

module.exports = app;
