const express = require("express");
const app = express();

// view login
app.get("/", (req, res) => {
  res.render("revenue/tkrevenue.hbs");
});

module.exports = app;
