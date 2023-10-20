const express = require('express');
const app = express();

// view trang  chu
app.get('/', (req, res) => {
    res.render('user/user.hbs');
})


module.exports = app;