const express = require('express');
const app = express();

// view trang  chu
app.get('/', (req, res) => {
    res.render('music/music.hbs');
})


module.exports = app;