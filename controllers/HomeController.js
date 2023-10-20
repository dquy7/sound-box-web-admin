const express = require('express');
const app = express();

// view trang  chu
app.get('/', (req, res) => {
    res.render('home/home.hbs');
})


module.exports = app;