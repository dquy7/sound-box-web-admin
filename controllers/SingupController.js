const express = require('express');
const app = express();

// view login
app.get('/', (req, res) => {
    res.render('singup/singup.hbs');
})


module.exports = app;