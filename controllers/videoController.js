const express = require("express");
const app = express();

// view trang  chu
app.get("/", (req, res) => {
  res.render("videos/video.hbs");
});

module.exports = app;
