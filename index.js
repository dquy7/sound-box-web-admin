const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var { engine } = require('express-handlebars');
const HomeController = require('./controllers/HomeController');
const LoginController = require('./controllers/LoginController');
const SingupController = require('./controllers/SingupController');
const MusicController = require('./controllers/MusicController');
const UserController = require('./controllers/UserController');
const RevenueController = require('./controllers/RevenueController');
const { Link } = require('react-router-dom');

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set('view engine','.hbs');
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use('/home',HomeController);
app.use('/login',LoginController);
app.use('/music',MusicController);
app.use('/signup',SingupController);
app.use('/user',UserController);
app.use('/revenue',RevenueController);

app.listen(8000,()=>{
    console.log("App running at 8000");
})