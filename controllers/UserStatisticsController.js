const express = require('express');
const app = express();

// view trang  chu
app.get('/', (req, res) => {
    res.render('user/userstatistics.hbs');
})


module.exports = app;