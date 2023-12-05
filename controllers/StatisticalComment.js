const express = require("express");
const app = express();

// view login
app.get("/", (req, res) => {
  res.render("revenue/statisticalcomment.hbs");
});

module.exports = app;
