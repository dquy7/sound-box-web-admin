const express = require("express");
const app = express();

// view trang
app.get("/", (req, res) => {
  res.render("music-basic/managemusic.hbs");
});

module.exports = app;
