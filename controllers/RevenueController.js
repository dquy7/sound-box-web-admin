const express = require('express');
const app = express();

// view trang  chu
app.get('/', (req, res) => {
    res.render('revenue/revenue.hbs');
})


module.exports = app;